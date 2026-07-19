import { useState, useRef, useEffect } from "react";
import { useChat } from "../chatbot.ts";

const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "What are some of your testimonials?",
  "How much do you charge",
  "How do I consult with you?",
];

const ChatWidget = () => {
  const [open, setOpen]       = useState(false);
  const [input, setInput]     = useState("");
  const [started, setStarted] = useState(false);
  const bottomRef             = useRef<HTMLDivElement>(null);
  const inputRef              = useRef<HTMLInputElement>(null);

  const { messages, streaming, error, sendMessage } = useChat();

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || streaming) return;
    setInput("");
    setStarted(true);
    await sendMessage(content);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        className={`cw-bubble${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {open ? (
            /* X icon */
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            /* Chat icon */
            <>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </>
          )}
        </svg>
      </button>

      {/* ── Chat Panel ──────────────────────────────────────── */}
      {open && (
        <div className="cw-panel" role="dialog" aria-label="Chat with Devin's assistant">

          {/* Header */}
          <div className="cw-header">
            <div className="cw-avatar">⚡</div>
            <div className="cw-header-info">
              <div className="cw-header-name">Enrique's Assistant</div>
              <div className="cw-header-status">
                <span className="cw-status-dot" />
                Online — ask me anything
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="cw-messages">
            {!started ? (
              <div className="cw-welcome">
                <div className="cw-welcome-icon">👋</div>
                <div className="cw-welcome-title">Hey, I'm Enrique's AI</div>
                <p className="cw-welcome-sub">
                  Ask me about his services, projects, or how to start working together.
                </p>
                <div className="cw-suggestions">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      className="cw-suggestion"
                      onClick={() => handleSend(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`cw-msg ${msg.role}`}>
                  {msg.role === "assistant" && (
                    <div className="cw-msg-mini-avatar">⚡</div>
                  )}
                  <div className="cw-msg-body">
                    {msg.content || (
                      streaming && i === messages.length - 1 ? (
                        <div className="cw-typing">
                          <span /><span /><span />
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              ))
            )}
            {error && <div className="cw-error">{error}</div>}
            <div ref={bottomRef} />
          </div>

          {/* Input footer */}
          <div className="cw-footer">
            <input
              ref={inputRef}
              className="cw-input"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={streaming}
            />
            <button
              className="cw-send"
              onClick={() => handleSend()}
              disabled={!input.trim() || streaming}
              aria-label="Send"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default ChatWidget;