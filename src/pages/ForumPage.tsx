import { MessageSquare } from "lucide-react";

export function ForumPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <MessageSquare className="w-7 h-7 text-zinc-300" />
      </div>
      <h1 className="text-2xl font-medium text-zinc-900 mb-3">Forum</h1>
      <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mx-auto">
        A place to ask questions, discuss courses, and connect with fellow students.
        Coming soon.
      </p>
    </div>
  );
}
