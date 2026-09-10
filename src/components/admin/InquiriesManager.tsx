"use client";

import { useEffect, useState } from "react";
import { Archive, Send } from "lucide-react";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
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

export default function InquiriesManager() {
  const { showToast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | "all">("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = statusFilter === "all" ? "/inquiries" : `/inquiries?status=${statusFilter}`;
    api
      .get<Inquiry[]>(path)
      .then(setInquiries)
      .finally(() => setLoading(false));
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
        <div className="flex flex-col gap-2 rounded-2xl border border-blush bg-white p-2">
          {loading ? (
            <SkeletonRows className="p-2" />
          ) : inquiries.length === 0 ? (
            <p className="p-4 text-sm text-ink/50">No inquiries here yet.</p>
          ) : (
            inquiries.map((inquiry) => (
              <button
                key={inquiry._id}
                onClick={() => {
                  setSelected(inquiry);
                  setReply("");
                }}
                className={`rounded-md px-4 py-3 text-left transition-colors ${
                  selected?._id === inquiry._id ? "bg-blush" : "hover:bg-blush/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-ink">{inquiry.name}</p>
                  <span className="text-xs uppercase text-ink/40">{inquiry.status}</span>
                </div>
                <p className="text-xs text-ink/50">{inquiry.topic}</p>
              </button>
            ))
          )}
        </div>

        <div className="rounded-2xl border border-blush bg-white p-6">
          {!selected ? (
            <p className="text-sm text-ink/50">Select an inquiry to view details.</p>
          ) : (
            <div className="flex flex-col gap-4">
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
                  className="rounded-md border border-blush px-4 py-3 text-sm text-ink outline-none focus:border-coral"
                />
                <div className="flex items-center gap-4">
                  <Button onClick={handleReply} disabled={sending || !reply.trim()} size="md">
                    <Send className="h-4 w-4" />
                    {sending ? "Sending..." : "Send reply"}
                  </Button>
                  <button
                    onClick={() => handleStatusChange("closed")}
                    className="flex items-center gap-1.5 text-sm text-ink/50 hover:text-coral-deep"
                  >
                    <Archive className="h-4 w-4" />
                    Mark as closed
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
