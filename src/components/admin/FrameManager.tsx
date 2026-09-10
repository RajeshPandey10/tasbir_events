"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, UploadCloud } from "lucide-react";
import { FormField, fieldInputClasses } from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { SkeletonRows } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import { Frame } from "@/lib/types";

export default function FrameManager() {
  const { showToast } = useToast();
  const [frames, setFrames] = useState<Frame[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Frame | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadFrames = () => {
    api
      .get<Frame[]>("/frames")
      .then(setFrames)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadFrames();
  }, []);

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError("Choose a frame image to upload");
      return;
    }
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);

    try {
      const created = await api.postForm<Frame>("/frames", formData);
      setFrames((prev) => [created, ...prev]);
      setName("");
      setFile(null);
      showToast("success", "Frame uploaded");
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
      await api.delete(`/frames/${pendingDelete._id}`);
      setFrames((prev) => prev.filter((frame) => frame._id !== pendingDelete._id));
      showToast("success", "Frame deleted");
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Frames</h1>
      <p className="mt-2 text-sm text-ink/60">
        Upload decorative frame graphics here once, then pick from them when adding gallery photos. Use a
        transparent PNG with the middle cut out so the photo shows through.
      </p>

      <form onSubmit={handleUpload} className="mt-8 grid gap-4 rounded-2xl border border-blush bg-white p-6 md:grid-cols-2">
        <FormField label="Frame name" htmlFor="frame-name">
          <input
            id="frame-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Gold Rose Border"
            required
            className={fieldInputClasses()}
          />
        </FormField>

        <FormField label="Frame image (transparent PNG)" htmlFor="frame-file">
          <input
            id="frame-file"
            type="file"
            accept="image/png,image/webp"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="text-sm text-ink/70"
          />
        </FormField>

        {error ? <p className="text-sm text-coral-deep md:col-span-2">{error}</p> : null}

        <Button type="submit" disabled={uploading} size="md" className="self-start md:col-span-2">
          <UploadCloud className="h-4 w-4" />
          {uploading ? "Uploading..." : "Upload frame"}
        </Button>
      </form>

      {loading ? (
        <SkeletonRows className="mt-10" />
      ) : frames.length === 0 ? (
        <p className="mt-10 text-sm text-ink/50">No custom frames yet — upload one above.</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {frames.map((frame) => (
            <div
              key={frame._id}
              className="overflow-hidden rounded-xl border border-blush bg-[repeating-conic-gradient(#f5e3dd_0_25%,#ffffff_0_50%)] bg-size-[16px_16px]"
            >
              <div className="relative aspect-square">
                <Image src={frame.imageUrl} alt={frame.name} fill className="object-contain" />
              </div>
              <div className="flex items-center justify-between bg-white p-3">
                <p className="truncate text-sm text-ink">{frame.name}</p>
                <button
                  onClick={() => setPendingDelete(frame)}
                  aria-label={`Delete ${frame.name}`}
                  className="text-ink/40 transition-colors hover:text-coral-deep"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this frame?"
        description={`"${pendingDelete?.name}" will be removed. Gallery photos already using it will keep showing it, but it can't be selected for new photos.`}
        confirmLabel="Delete frame"
        danger
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
