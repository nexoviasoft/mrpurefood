"use client";
import React, { useEffect, useRef } from "react";

const items = [
  { icon: "🥭", text: "গোপালভোগ আম — সরকারি ক্যালেন্ডার অনুযায়ী সংগ্রহ শুরু ০৫ মে" },
  { icon: "🥭", text: "হিমসাগর / খিরসাপাত আম — ২৫ মে থেকে পাওয়া যাচ্ছে" },
  { icon: "🥭", text: "ল্যাংড়া আম — ০৬ জুন থেকে সংগ্রহ শুরু" },
  { icon: "🥭", text: "আম্রপালি ও ফজলি আম — ১৫ জুন থেকে পাওয়া যাবে" },
  { icon: "🫙", text: "খাঁটি ঘাওয়া ঘি — সম্পূর্ণ প্রাকৃতিক, সুলভ মূল্যে পাওয়া যায়" },
  { icon: "🥭", text: "সকল ধরনের আম ও খাঁটি ঘি সুলভ দামে পাওয়া যাচ্ছে" },
  { icon: "📞", text: "যোগাযোগ করুন:", phone: "01637508889" },
];

const SPEED = 80;

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
      className="relative overflow-hidden border-t-[3px] border-b-[3px] border-[#f4c842] py-[9px]"
      style={{
        background: "linear-gradient(90deg, #0a6e2e 0%, #1a8c3c 60%, #0f7a34 100%)",
        fontFamily: '"Noto Sans Bengali", Arial, sans-serif',
      }}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      {/* Label */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center px-3 whitespace-nowrap bg-[#f4c842] text-[#0a4d1e] font-bold text-[13px]">
        🥭 আমের খবর
      </div>

      {/* Fade left */}
      <div
        className="absolute top-0 bottom-0 w-10 z-[9] pointer-events-none"
        style={{ left: 110, background: "linear-gradient(to right, #1a8c3c, transparent)" }}
      />

      {/* Fade right */}
      <div
        className="absolute right-0 top-0 bottom-0 w-10 z-[9] pointer-events-none"
        style={{ background: "linear-gradient(to left, #0f7a34, transparent)" }}
      />

      {/* Track */}
      <div className="overflow-hidden" style={{ marginLeft: 118 }}>
        <div ref={trackRef} className="flex" style={{ willChange: "transform" }}>
          {items.map((item, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-[7px] text-white text-[14px] font-medium whitespace-nowrap px-7 shrink-0"
              style={{
                borderRight: i < items.length - 1 ? "1px solid rgba(244,200,66,0.3)" : "none",
              }}
            >
              {item.icon} {item.text}
              {item.phone && (
                <span className="bg-[#f4c842] text-[#0a4d1e] font-bold rounded text-[13px] px-2 py-[1px] ml-1">
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