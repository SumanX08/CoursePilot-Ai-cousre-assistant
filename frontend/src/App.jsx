import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderCircle, Sparkles } from "lucide-react";

import Hero from "./components/Hero";
import ChatMessage from "./components/ChatMessage";
import PromptBox from "./components/PromptBox";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function askQuestion(question) {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL ||
        "http://localhost:3000";

      const response = await fetch(
        `${apiUrl}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: question,
          }),
        }
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.answer ||
            data.error ||
            "Unable to generate answer.",
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong while contacting the server.",
        },
      ]);
    }

    setLoading(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    askQuestion(input);
  };

  return (
    <div className="h-screen bg-[#09090B] text-white flex flex-col">

      {/* Background Glow */}

      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[140px] bg-violet-600/15" />

        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[160px] bg-cyan-500/10" />

      </div>

      {/* Header */}

      <header className="relative z-10 border-b border-zinc-800">

        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

          <div>

            <h1 className="font-bold text-2xl tracking-tight">
              CoursePilot
            </h1>

            <p className="text-sm text-zinc-500 mt-1">
              Advanced Retrieval-Augmented Course Assistant
            </p>

          </div>

          <div className="hidden md:flex items-center gap-2 text-zinc-400 text-sm">

            <Sparkles
              size={16}
              className="text-violet-400"
            />

            Powered by Advanced RAG

          </div>

        </div>

      </header>

      {/* Chat */}

      <main className="relative flex-1 overflow-y-auto">

        {messages.length === 0 ? (

          <Hero
            onSelect={(question) => {
              setInput(question);
              askQuestion(question);
            }}
          />

        ) : (

          <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

            <AnimatePresence>

              {messages.map((message, index) => (

                <ChatMessage
                  key={index}
                  message={message}
                />

              ))}

            </AnimatePresence>

            {loading && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="flex justify-start"
              >

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 w-fit">

                  <div className="flex items-center gap-3">

                    <LoaderCircle
                      size={18}
                      className="animate-spin text-violet-400"
                    />

                    <div>

                      <p className="font-medium">
                        Searching course...
                      </p>

                      <p className="text-sm text-zinc-500 mt-1">
                        Retrieving relevant lessons
                      </p>

                    </div>

                  </div>

                </div>

              </motion.div>

            )}

            <div ref={messagesEndRef} />

          </div>

        )}

      </main>

      {/* Prompt */}

      <footer className="relative border-t border-zinc-800 bg-[#09090B]/90 backdrop-blur-xl px-6 py-6">

        <PromptBox
          input={input}
          setInput={setInput}
          loading={loading}
          onSubmit={handleSubmit}
        />

      </footer>

    </div>
  );
}