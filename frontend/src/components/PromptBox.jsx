import { SendHorizontal } from "lucide-react";

export default function PromptBox({
  input,
  setInput,
  onSubmit,
  loading,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-5xl mx-auto w-full"
    >
      <div className="flex items-center rounded-2xl border border-zinc-700 bg-zinc-900 overflow-hidden">
        <input
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about the course..."
          className="flex-1 bg-transparent px-6 py-5 outline-none text-white placeholder:text-zinc-500"
        />

        <button
          disabled={loading || !input.trim()}
          className="bg-violet-600 hover:bg-violet-500 transition h-full px-6 py-5 disabled:opacity-40"
        >
          <SendHorizontal size={18} />
        </button>
      </div>
    </form>
  );
}