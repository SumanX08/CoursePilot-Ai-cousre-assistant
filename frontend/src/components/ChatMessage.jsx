import { motion } from "framer-motion";
import {
  Bot,
  User,
  BookOpen,
  Clock3,
} from "lucide-react";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  const format = (text) => {
    const parts = text.split(/(\[Lesson:.*?@.*?\])/g);

    return parts.map((part, i) => {
      if (part.startsWith("[Lesson:")) {
        return (
          <div
            key={i}
            className="inline-flex items-center gap-2 rounded-lg bg-violet-500/10 border border-violet-500/30 px-3 py-2 mt-4"
          >
            <BookOpen size={15} />
            <Clock3 size={15} />
            <span>{part}</span>
          </div>
        );
      }

      return <span key={i}>{part}</span>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-3xl rounded-2xl border p-5 ${
          isUser
            ? "bg-violet-600 border-violet-600"
            : "bg-zinc-900 border-zinc-800"
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          {isUser ? (
            <User size={18} />
          ) : (
            <Bot className="text-violet-400" size={18} />
          )}

          <span className="font-semibold">
            {isUser ? "You" : "CourseMind"}
          </span>
        </div>

        <div className="whitespace-pre-wrap leading-8 text-zinc-100">
          {format(message.content)}
        </div>
      </div>
    </motion.div>
  );
}