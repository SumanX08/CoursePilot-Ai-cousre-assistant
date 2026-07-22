import { Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const suggestions = [
  "How do API routes work?",
  "Explain Expo Router",
  "What are Layouts?",
  "How does authentication work?",
];

export default function Hero({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-full"
    >
      <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-5 mb-6">
        <BookOpen className="w-10 h-10 text-violet-400" />
      </div>

      <h1 className="text-5xl font-bold text-white tracking-tight">
      CoursePilot
      </h1>

      <p className="text-zinc-400 mt-4 text-center max-w-xl">
        Ask anything about your course and instantly find the lesson and
        timestamp where it's explained.
      </p>

      <div className="grid grid-cols-2 gap-3 mt-10 w-full max-w-2xl">
        {suggestions.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition p-4 text-left"
          >
            <Sparkles className="w-4 h-4 text-violet-400 mb-2" />
            <p className="text-sm text-zinc-300">{item}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
}