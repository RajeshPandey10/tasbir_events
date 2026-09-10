"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-6 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start gap-3">
          {danger ? (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral/10 text-coral-deep">
              <AlertTriangle className="h-5 w-5" />
            </span>
          ) : null}
          <div>
            <p id="confirm-dialog-title" className="font-display text-lg text-ink">
              {title}
            </p>
            <p className="mt-1 text-sm text-ink/70">{description}</p>
          </div>
        </div>

        <div className="mt-2 flex justify-end gap-3">
          <Button variant="ghost" size="md" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            ref={confirmRef}
            variant="primary"
            size="md"
            onClick={onConfirm}
            disabled={loading}
            className={danger ? "bg-coral-deep hover:bg-coral-deep" : ""}
          >
            {loading ? "Working..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
