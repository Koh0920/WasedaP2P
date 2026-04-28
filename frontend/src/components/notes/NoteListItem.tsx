import { ArrowUp, ArrowDown } from "lucide-react";
import { format } from "date-fns";
import type { Note } from "@/types";
import { cn } from "@/lib/utils";

interface NoteListItemProps {
  note: Note;
  onVote: (id: string, type: "up" | "down") => void;
  onClick: () => void;
}

export function NoteListItem({ note, onVote, onClick }: NoteListItemProps) {
  return (
    <div
      onClick={onClick}
      className="group py-2.5 cursor-pointer hover:bg-zinc-50/50 transition-colors duration-150 -mx-3 px-3 rounded-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-0.5">
            <h3 className="text-sm font-medium text-zinc-900 group-hover:text-orange-600 transition-colors duration-150">
              {note.courseName}
            </h3>
            <span className="text-xs text-zinc-400">{note.fileType}</span>
          </div>
          <p className="text-xs text-zinc-400 mb-0.5">{note.professorName}</p>
          <div className="flex items-center gap-1 text-xs text-zinc-300">
            <span>@{note.uploader.username}</span>
            <span>·</span>
            <span>{format(note.uploadDate, "MMM d")}</span>
            <span>·</span>
            <span>{note.semester} {note.year}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onVote(note.id, "up"); }}
            className="p-1.5 text-zinc-400 hover:text-orange-600 transition-colors duration-150 cursor-pointer"
            aria-label="Upvote"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <span className={cn("text-sm font-medium min-w-[24px] text-center", note.netScore > 0 ? "text-orange-600" : "text-zinc-400")}>
            {note.netScore}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onVote(note.id, "down"); }}
            className="p-1.5 text-zinc-400 hover:text-zinc-600 transition-colors duration-150 cursor-pointer"
            aria-label="Downvote"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
