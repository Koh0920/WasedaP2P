import { FileText, Image, File, ArrowUp } from "lucide-react";
import type { Note } from "@/types";
import { cn } from "@/lib/utils";

function FileTypeIcon({ type, className }: { type: string; className?: string }) {
  if (type === "PDF") return <FileText className={cn("text-zinc-300", className)} />;
  if (type === "Image") return <Image className={cn("text-zinc-300", className)} />;
  return <File className={cn("text-zinc-300", className)} />;
}

interface NoteCardProps {
  note: Note;
  onVote: (id: string, type: "up" | "down") => void;
  onClick: () => void;
}

export function NoteCard({ note, onVote, onClick }: NoteCardProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="h-24 bg-zinc-50 flex items-center justify-center">
        <FileTypeIcon type={note.fileType} className="w-8 h-8" />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium text-zinc-900 leading-snug group-hover:text-orange-600 transition-colors duration-150 truncate mb-0.5">
          {note.courseName}
        </h3>
        <p className="text-xs text-zinc-400 mb-0.5">{note.professorName}</p>
        <p className="text-xs text-zinc-300 mb-2.5">
          {note.semester} {note.year}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400">@{note.uploader.username}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onVote(note.id, "up");
              }}
              className="p-1 text-zinc-400 hover:text-orange-600 transition-colors duration-150 cursor-pointer"
              aria-label="Upvote"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <span className={cn("text-xs font-medium", note.netScore > 0 ? "text-orange-600" : "text-zinc-400")}>
              {note.netScore}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
