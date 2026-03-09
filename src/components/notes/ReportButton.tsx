import { useState } from "react";
import { Flag } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { reportNote } from "@/services/api";

const REPORT_REASONS = [
  "Incorrect information",
  "Copyright violation",
  "Spam or irrelevant",
  "Offensive content",
  "Other",
];

interface ReportButtonProps {
  noteId: string;
}

export function ReportButton({ noteId }: ReportButtonProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!reason) return;
    setLoading(true);
    try {
      await reportNote(noteId, reason);
      toast.success("Report submitted. Thank you for keeping the community safe.");
      setOpen(false);
      setReason("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-700 transition-colors duration-150 cursor-pointer"
      >
        <Flag className="w-4 h-4" />
        Report
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base font-medium text-zinc-900">Report this note</DialogTitle>
            <DialogDescription className="text-sm text-zinc-500">
              Select a reason and we will review it.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 mt-2">
            {REPORT_REASONS.map((r) => (
              <label
                key={r}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-50 cursor-pointer transition-colors duration-150"
              >
                <input
                  type="radio"
                  name="report-reason"
                  value={r}
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  className="accent-orange-500"
                />
                <span className="text-sm text-zinc-700">{r}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!reason || loading}
              className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer"
            >
              {loading ? "Submitting..." : "Submit report"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
