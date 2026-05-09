"use client";
import React, { useEffect, useRef } from "react";

const items = [
  {
    icon: "🥭",
    text: "গোপালভোগ আম — সরকারি ক্যালেন্ডার অনুযায়ী সংগ্রহ শুরু ০৫ মে",
  },
  { icon: "🥭", text: "হিমসাগর / খিরসাপাত আম — ২৫ মে থেকে পাওয়া যাচ্ছে" },
  { icon: "🥭", text: "ল্যাংড়া আম — ০৬ জুন থেকে সংগ্রহ শুরু" },
  { icon: "🥭", text: "আম্রপালি ও ফজলি আম — ১৫ জুন থেকে পাওয়া যাবে" },
  {
    icon: "🫙",
    text: "খাঁটি ঘাওয়া ঘি — সম্পূর্ণ প্রাকৃতিক, সুলভ মূল্যে পাওয়া যায়",
  },
  { icon: "🥭", text: "সকল ধরনের আম ও খাঁটি ঘি সুলভ দামে পাওয়া যাচ্ছে" },
  { icon: "📞", text: "যোগাযোগ করুন:", phone: "01637508889" },
];

const SPEED = 80; // pixels per second

const TopMarque: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const lastRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const origItems = Array.from(track.children) as HTMLElement[];
    origItems.forEach((item) => {
      track.appendChild(item.cloneNode(true));
    });

    const half = track.scrollWidth / 2;

    const tick = (ts: number) => {
      if (!lastRef.current) lastRef.current = ts;
      const delta = ts - lastRef.current;
      lastRef.current = ts;

      if (!pausedRef.current) {
        posRef.current += (SPEED * delta) / 1000;
        if (posRef.current >= half) posRef.current -= half;
        track.style.transform = `translateX(${-posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, #0a6e2e 0%, #1a8c3c 60%, #0f7a34 100%)",
        padding: "9px 0",
        overflow: "hidden",
        position: "relative",
        borderTop: "3px solid #f4c842",
        borderBottom: "3px solid #f4c842",
        fontFamily: '"Noto Sans Bengali", Arial, sans-serif',
      }}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
          background: "#f4c842",
          color: "#0a4d1e",
          fontWeight: 700,
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          whiteSpace: "nowrap",
        }}
      >
        🥭 আমের খবর
      </div>

      <div
        style={{
          position: "absolute",
          left: 110,
          top: 0,
          bottom: 0,
          width: 40,
          zIndex: 9,
          background: "linear-gradient(to right, #1a8c3c, transparent)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 40,
          zIndex: 9,
          background: "linear-gradient(to left, #0f7a34, transparent)",
          pointerEvents: "none",
        }}
      />

      <div style={{ marginLeft: 118, overflow: "hidden" }}>
        <div
          ref={trackRef}
          style={{ display: "flex", willChange: "transform" }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
                padding: "0 28px",
                whiteSpace: "nowrap",
                borderRight:
                  i < items.length - 1
                    ? "1px solid rgba(244,200,66,0.3)"
                    : "none",
                flexShrink: 0,
              }}
            >
              {item.icon} {item.text}
              {item.phone && (
                <span
                  style={{
                    background: "#f4c842",
                    color: "#0a4d1e",
                    fontWeight: 700,
                    borderRadius: 4,
                    padding: "1px 9px",
                    fontSize: 13,
                    marginLeft: 3,
                  }}
                >
                  {item.phone}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopMarque;
