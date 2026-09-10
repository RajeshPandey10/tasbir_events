"use client";

import { useEffect, useMemo, useState } from "react";
import { Star, Trash2, UploadCloud, X } from "lucide-react";
import { FormField, fieldInputClasses } from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import FramedImage from "@/components/ui/FramedImage";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { SkeletonGalleryGrid } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import { FRAME_PRESETS, Frame, GALLERY_CATEGORIES, GalleryCategory, GalleryItem, FrameType } from "@/lib/types";

export default function GalleryManager() {
  const { showToast } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<GalleryCategory>("wedding");
  const [isFeatured, setIsFeatured] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const previews = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);
  const [frameType, setFrameType] = useState<FrameType>("none");
  const [customFrame, setCustomFrame] = useState<Frame | null>(null);
  const [frames, setFrames] = useState<Frame[]>([]);
  const [error, setError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<GalleryItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadItems = () => {
    api
      .get<GalleryItem[]>("/gallery")
      .then(setItems)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadItems();
    api.get<Frame[]>("/frames").then(setFrames);
  }, []);

  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(event.target.files ?? []));
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setTitle("");
    setFiles([]);
    setIsFeatured(false);
    setFrameType("none");
    setCustomFrame(null);
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (files.length === 0) {
      setError("Choose at least one photo to upload");
      return;
    }
    setUploading(true);
    setError("");

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    formData.append("title", title);
    formData.append("category", category);
    formData.append("isFeatured", String(isFeatured));
    formData.append("frameType", frameType);
    if (frameType === "custom" && customFrame) {
      formData.append("frameImageUrl", customFrame.imageUrl);
      formData.append("frameCloudinaryId", customFrame.cloudinaryId);
    }

    try {
      await api.postForm("/gallery", formData);
      resetForm();
      loadItems();
      showToast("success", "Photos uploaded");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
      showToast("error", message);
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await api.delete(`/gallery/${pendingDelete._id}`);
      setItems((prev) => prev.filter((item) => item._id !== pendingDelete._id));
      showToast("success", "Gallery entry deleted");
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  };

  const handleToggleFeatured = async (item: GalleryItem) => {
    const updated = await api.put<GalleryItem>(`/gallery/${item._id}`, { isFeatured: !item.isFeatured });
    setItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
    showToast("success", updated.isFeatured ? "Featured on homepage" : "Removed from homepage");
  };

  const previewImages = previews.map((url) => ({ url, cloudinaryId: "preview" }));

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Gallery</h1>
      <p className="mt-2 text-sm text-ink/60">Upload and manage the photos shown on the public site.</p>

      <form onSubmit={handleUpload} className="mt-8 flex flex-col gap-6 rounded-2xl border border-blush bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Title" htmlFor="gallery-title">
            <input
              id="gallery-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={fieldInputClasses()}
            />
          </FormField>

          <FormField label="Category" htmlFor="gallery-category">
            <select
              id="gallery-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as GalleryCategory)}
              className={fieldInputClasses()}
            >
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField label="Photos" htmlFor="gallery-images">
          <input
            id="gallery-images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesChange}
            className="text-sm text-ink/70"
          />
        </FormField>
        <p className="-mt-4 text-xs text-ink/50">JPG, PNG, or WebP — up to 8MB each, up to 10 photos per entry.</p>

        {previews.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {previews.map((url, index) => (
              <div key={url} className="relative h-20 w-20 overflow-hidden rounded-lg border border-blush">
                <FramedImage
                  images={[{ url, cloudinaryId: "preview" }]}
                  alt={`Selected photo ${index + 1}`}
                  frameType={frameType}
                  frameImageUrl={customFrame?.imageUrl}
                  sizes="80px"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  aria-label="Remove photo"
                  className="absolute right-1 top-1 rounded-full bg-ink/70 p-0.5 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        ) : null}

        {previews.length > 0 ? (
          <div>
            <p className="text-sm text-ink/70">Frame style</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {FRAME_PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset.value}
                  onClick={() => {
                    setFrameType(preset.value);
                    setCustomFrame(null);
                  }}
                  className={`flex flex-col items-center gap-1.5 rounded-lg p-1.5 transition-colors ${
                    frameType === preset.value ? "bg-blush ring-2 ring-coral" : "hover:bg-blush/50"
                  }`}
                >
                  <div className="h-16 w-16 overflow-hidden rounded-md">
                    <FramedImage images={[previewImages[0]]} alt={preset.label} frameType={preset.value} sizes="64px" />
                  </div>
                  <span className="text-xs text-ink/60">{preset.label}</span>
                </button>
              ))}

              {frames.map((frame) => (
                <button
                  type="button"
                  key={frame._id}
                  onClick={() => {
                    setFrameType("custom");
                    setCustomFrame(frame);
                  }}
                  className={`flex flex-col items-center gap-1.5 rounded-lg p-1.5 transition-colors ${
                    frameType === "custom" && customFrame?._id === frame._id
                      ? "bg-blush ring-2 ring-coral"
                      : "hover:bg-blush/50"
                  }`}
                >
                  <div className="h-16 w-16 overflow-hidden rounded-md">
                    <FramedImage
                      images={[previewImages[0]]}
                      alt={frame.name}
                      frameType="custom"
                      frameImageUrl={frame.imageUrl}
                      sizes="64px"
                    />
                  </div>
                  <span className="max-w-16 truncate text-xs text-ink/60">{frame.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <label className="flex items-center gap-2 self-start text-sm text-ink/70">
          <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
          Feature on homepage
        </label>

        {error ? <p className="text-sm text-coral-deep">{error}</p> : null}

        <Button type="submit" disabled={uploading} size="md" className="self-start">
          <UploadCloud className="h-4 w-4" />
          {uploading ? "Uploading..." : "Upload photos"}
        </Button>
      </form>

      {loading ? (
        <SkeletonGalleryGrid count={4} />
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((item) => (
            <div key={item._id} className="overflow-hidden rounded-xl border border-blush bg-white">
              <div className="relative aspect-square">
                <FramedImage images={item.images} alt={item.title} frameType={item.frameType} frameImageUrl={item.frameImageUrl} />
                {item.images.length > 1 ? (
                  <span className="absolute bottom-2 right-2 rounded-full bg-ink/60 px-2 py-0.5 text-xs text-white">
                    {item.images.length} photos
                  </span>
                ) : null}
              </div>
              <div className="p-3">
                <p className="truncate text-sm text-ink">{item.title}</p>
                <p className="text-xs text-ink/50">{item.category}</p>
                <div className="mt-2 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleFeatured(item)}
                    aria-label={item.isFeatured ? "Remove from homepage" : "Feature on homepage"}
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      item.isFeatured ? "text-gold" : "text-ink/40 hover:text-gold"
                    }`}
                  >
                    <Star className="h-3.5 w-3.5" fill={item.isFeatured ? "currentColor" : "none"} />
                    {item.isFeatured ? "Featured" : "Feature"}
                  </button>
                  <button
                    onClick={() => setPendingDelete(item)}
                    aria-label="Delete"
                    className="text-ink/40 transition-colors hover:text-coral-deep"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this gallery entry?"
        description={`"${pendingDelete?.title}" and its ${pendingDelete?.images.length ?? 0} photo(s) will be permanently removed from the site.`}
        confirmLabel="Delete"
        danger
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
