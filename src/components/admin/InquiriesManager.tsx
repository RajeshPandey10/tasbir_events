"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Archive, Send, Trash2 } from "lucide-react";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { SkeletonRows } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import { Inquiry, InquiryStatus } from "@/lib/types";

const STATUS_FILTERS: { label: string; value: InquiryStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Replied", value: "replied" },
  { label: "Closed", value: "closed" },
];

const STATUS_DOT: Record<InquiryStatus, string> = {
  new: "bg-coral",
  replied: "bg-gold",
  closed: "bg-ink/30",
};

export default function InquiriesManager() {
  const { showToast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | "all">("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<Inquiry | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    const path = statusFilter === "all" ? "/inquiries" : `/inquiries?status=${statusFilter}`;
    api.get<Inquiry[]>(path).then((data) => {
      if (!active) return;
      setInquiries(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [statusFilter]);

  const handleReply = async () => {
    if (!selected || !reply.trim()) return;
    setSending(true);
    try {
      const updated = await api.post<Inquiry>(`/inquiries/${selected._id}/reply`, { reply });
      setInquiries((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
      setSelected(updated);
      setReply("");
      showToast("success", "Reply sent to customer");
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Reply failed");
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (status: InquiryStatus) => {
    if (!selected) return;
    const updated = await api.patch<Inquiry>(`/inquiries/${selected._id}/status`, { status });
    setInquiries((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
    setSelected(updated);
    showToast("success", `Marked as ${status}`);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await api.delete(`/inquiries/${pendingDelete._id}`);
      setInquiries((prev) => prev.filter((i) => i._id !== pendingDelete._id));
      if (selected?._id === pendingDelete._id) setSelected(null);
      showToast("success", "Inquiry deleted");
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Inquiries</h1>
      <p className="mt-2 text-sm text-ink/60">Read and reply to messages submitted through the contact form.</p>

      <div className="mt-6 flex gap-2">
        {STATUS_FILTERS.map((filter) => (
          <Pill
            key={filter.value}
            active={statusFilter === filter.value}
            onClick={() => {
              setStatusFilter(filter.value);
              setSelected(null);
            }}
          >
            {filter.label}
          </Pill>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-1 rounded-2xl border border-blush bg-white p-2 md:max-h-[70vh] md:overflow-y-auto">
          {loading ? (
            <SkeletonRows className="p-2" />
          ) : inquiries.length === 0 ? (
            <p className="p-4 text-sm text-ink/50">No inquiries here yet.</p>
          ) : (
            <AnimatePresence initial={false}>
              {inquiries.map((inquiry) => (
                <motion.div
                  key={inquiry._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`group relative flex items-center rounded-md transition-colors ${
                    selected?._id === inquiry._id ? "bg-blush" : "hover:bg-blush/50"
                  }`}
                >
                  <button
                    onClick={() => {
                      setSelected(inquiry);
                      setReply("");
                    }}
                    className="flex-1 rounded-md px-4 py-3 text-left"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="flex items-center gap-2 text-sm text-ink">
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[inquiry.status]}`} />
                        {inquiry.name}
                      </p>
                      <span className="text-xs uppercase text-ink/40">{inquiry.status}</span>
                    </div>
                    <p className="pl-3.5 text-xs text-ink/50">{inquiry.topic}</p>
                  </button>
                  <button
                    onClick={() => setPendingDelete(inquiry)}
                    aria-label={`Delete inquiry from ${inquiry.name}`}
                    className="mr-3 shrink-0 text-ink/30 opacity-100 transition-opacity hover:text-coral-deep md:opacity-0 md:group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <div className="rounded-2xl border border-blush bg-white p-6">
          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-ink/50"
              >
                Select an inquiry to view details.
              </motion.p>
            ) : (
              <motion.div
                key={selected._id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col gap-4"
              >
                <div>
                  <p className="font-display text-lg text-ink">{selected.name}</p>
                  <p className="text-sm text-ink/60">
                    {selected.email} · {selected.phone}
                  </p>
                  <p className="mt-1 text-sm text-coral">{selected.topic}</p>
                </div>

                <p className="whitespace-pre-wrap rounded-md bg-blush/40 p-4 text-sm text-ink/80">{selected.message}</p>

                {selected.adminReply ? (
                  <div className="rounded-md border border-blush p-4">
                    <p className="text-xs text-ink/50">Your reply</p>
                    <p className="mt-1 whitespace-pre-wrap text-sm text-ink/80">{selected.adminReply}</p>
                  </div>
                ) : null}

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-ink/70">Reply</label>
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    rows={4}
                    className="rounded-md border border-blush px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-coral"
                  />
                  <div className="flex items-center gap-4">
                    <Button onClick={handleReply} disabled={sending || !reply.trim()} size="md">
                      {sending ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      {sending ? "Sending..." : "Send reply"}
                    </Button>
                    <button
                      onClick={() => handleStatusChange("closed")}
                      className="flex items-center gap-1.5 text-sm text-ink/50 transition-colors hover:text-coral-deep"
                    >
                      <Archive className="h-4 w-4" />
                      Mark as closed
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this inquiry?"
        description={`The message from "${pendingDelete?.name}" will be permanently removed.`}
        confirmLabel="Delete"
        danger
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
