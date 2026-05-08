"use client";
import React, { useRef, useState } from "react";

const demoReplies: Record<string, string> = {
  "tell me about pricing":
    'Our modules start from <strong>$250/solution</strong> each. Every module is independently priced — buy only what you need. Need a custom quote? <a href="#contact" style="color:#2563eb;font-weight:600;">Book a consultation →</a>',
  "what products do you offer?":
    'We offer 6 modules:<br>• <strong>CRM for Manufacturing</strong><br>• <strong>SMB Operations Portal</strong><br>• <strong>Automation Tools</strong><br>• <strong>Analytics & Reporting</strong><br>• <strong>Customer Service Lite</strong><br>• <strong>Bookings Add-On</strong><br><br>Each works standalone or as part of the full platform.',
  "how do i get started?":
    'Getting started is simple:<br>1️⃣ Intro call (30 min)<br>2️⃣ Scoping & recommendation<br>3️⃣ Setup & data import<br>4️⃣ Team enablement & go-live<br><br>Most teams are fully operational within days, not months.',
  "i need a demo":
    'Great! Fill out our <a href="#contact" style="color:#2563eb;font-weight:600;">contact form</a> and our team will schedule a personalized demo tailored to your industry and team size. Usually within 24 hours! 🚀',
  default:
    'Thanks for your message! This is a UI demo — full AI integration is coming soon. In the meantime, feel free to <a href="#contact" style="color:#2563eb;font-weight:600;">book a consultation</a> with our team. 😊',
};

const quickReplies = [
  { label: "Pricing 💰", value: "tell me about pricing" },
  { label: "Products 📦", value: "what products do you offer?" },
  { label: "Get started 🚀", value: "how do i get started?" },
  { label: "Book demo 📅", value: "i need a demo" },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      html:
        "👋 Hi there! I'm the <strong>SMB Assistant</strong> — here to help you explore our platform, pricing, and solutions.<br><br>What can I help you with today?",
      time: "just now",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  function sendMessage(msg?: string) {
    const text = (msg ?? input).trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { type: "user", html: text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setInput("");
    setTimeout(() => {
      const key = text.toLowerCase();
      const reply = demoReplies[key] || demoReplies.default;
      setMessages((prev) => [
        ...prev,
        { type: "bot", html: reply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }, 600);
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        aria-label="Open chat"
        onClick={() => setOpen((v) => !v)}
        className="fixed z-[9999] bottom-7 right-7 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#0f2d59] to-[#2563eb] border-none cursor-pointer shadow-xl flex items-center justify-center transition-transform"
        style={{ boxShadow: "0 8px 32px rgba(37,99,235,0.45),0 2px 8px rgba(0,0,0,0.18)" }}
      >
        {/* Chat icon */}
        <svg
          className={`w-7 h-7 text-white transition-all ${open ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.836L3 20l1.09-3.63A7.966 7.966 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {/* Close icon */}
        <svg
          className={`w-6 h-6 text-white absolute transition-all ${open ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
        {/* Unread badge */}
        {!open && (
          <span className="absolute top-0 right-0 w-[18px] h-[18px] bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-extrabold text-white font-sans">
            1
          </span>
        )}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed z-[9998] bottom-[100px] right-7 w-[380px] max-w-[calc(100vw-40px)] rounded-2xl overflow-hidden shadow-2xl font-sans transition-all duration-300 ${open ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"}`}
        style={{ background: "white" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0f2d59] to-[#1a4d8a] p-5 flex items-center gap-3">
          <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#2563eb] to-[#60a5fa] flex items-center justify-center flex-shrink-0 shadow">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.607L5 14.5m14.8.5-2.049-6.928M5 14.5l-1.049-3.928" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-white text-[15px] leading-tight">SMB Assistant</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
              <span className="text-xs text-blue-100 font-medium">Online · AI-powered support</span>
            </div>
          </div>
        </div>
        {/* Subheader chips */}
        <div className="bg-[#f8faff] px-4 py-2 border-b border-[#e8edf5] flex gap-2 overflow-x-auto">
          {quickReplies.map((qr) => (
            <button
              key={qr.value}
              onClick={() => sendMessage(qr.value)}
              className="whitespace-nowrap text-xs font-semibold text-[#2563eb] bg-white border border-[#dbeafe] rounded-full px-3 py-1 transition hover:bg-[#eff6ff]"
            >
              {qr.label}
            </button>
          ))}
        </div>
        {/* Messages area */}
        <div className="bg-white h-[340px] overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ scrollBehavior: "smooth" }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 items-end animate-fadeIn ${msg.type === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mb-1 ${msg.type === "bot" ? "bg-gradient-to-br from-[#0f2d59] to-[#2563eb]" : "bg-[#e0e7ef]"}`}
              >
                {msg.type === "bot" ? (
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.607L5 14.5m14.8.5-2.049-6.928M5 14.5l-1.049-3.928" />
                  </svg>
                ) : (
                  <span className="text-xs font-bold text-[#2563eb]">You</span>
                )}
              </div>
              <div className="max-w-[78%]">
                <div
                  className={`rounded-2xl px-4 py-2 text-[13.5px] leading-[1.55] font-medium ${msg.type === "bot"
                    ? "bg-[#f1f5f9] text-[#1e293b] rounded-bl-md"
                    : "bg-[#2563eb] text-white rounded-br-md"}`}
                  dangerouslySetInnerHTML={{ __html: msg.html }}
                />
                <div className="text-[10.5px] text-[#94a3b8] mt-1 pl-1">{msg.time}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input bar */}
        <div className="bg-white border-t border-[#e8edf5] px-4 py-3 flex items-end gap-2">
          <textarea
            rows={1}
            placeholder="Ask me anything…"
            className="flex-1 resize-none border border-[#e2e8f0] rounded-xl px-3 py-2 text-[13.5px] text-[#1e293b] leading-[1.5] outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 max-h-[100px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            onClick={() => sendMessage()}
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0f2d59] to-[#2563eb] flex items-center justify-center shadow-md hover:scale-105 transition"
          >
            <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
        {/* Footer note */}
        <div className="bg-[#f8faff] px-4 py-2 border-t border-[#e8edf5] text-center">
          <span className="text-[10.5px] text-[#94a3b8] font-medium">
            Powered by <strong className="text-[#2563eb]">ITVT AI</strong> · AI integration coming soon
          </span>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}
