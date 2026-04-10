"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deliveries, authHelpers } from "../../../lib/mockData";

export default function Analytics() {
  const router = useRouter();
  const [animated, setAnimated] = useState(false);
  const [checked, setChecked] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const role = authHelpers.getRole();
    if (!role) { router.push("/login"); return; }
    if (role !== "dispatcher") {
      if (role === "driver") router.push("/driver");
      else router.push("/track");
      return;
    }
    setDarkMode(authHelpers.getDarkMode());
    setChecked(true);
    setTimeout(() => setAnimated(true), 100);
  }, []);

  if (!checked) return null;

  const dark = darkMode;
  const bg = dark ? "#0a1a0f" : "#f8faf9";
  const navBg = dark ? "rgba(10,26,15,0.9)" : "#fff";
  const navBorder = dark ? "rgba(34,197,94,0.1)" : "#e5e7eb";
  const cardBg = dark ? "rgba(255,255,255,0.03)" : "#fff";
  const cardBorder = dark ? "rgba(34,197,94,0.15)" : "#e5e7eb";
  const textPrimary = dark ? "#fff" : "#111827";
  const textSecondary = dark ? "rgba(255,255,255,0.4)" : "#6b7280";

  const riskBuckets = [
    { label: "0-25%", count: deliveries.filter(d => d.riskScore <= 25).length, color: "#4ade80" },
    { label: "26-50%", count: deliveries.filter(d => d.riskScore > 25 && d.riskScore <= 50).length, color: "#a3e635" },
    { label: "51-75%", count: deliveries.filter(d => d.riskScore > 50 && d.riskScore <= 75).length, color: "#fbbf24" },
    { label: "76-100%", count: deliveries.filter(d => d.riskScore > 75).length, color: "#f87171" },
  ];
  const maxCount = Math.max(...riskBuckets.map(b => b.count), 1);

  const timeline = [
    { time: "6AM", risk: 20 }, { time: "8AM", risk: 35 },
    { time: "10AM", risk: 55 }, { time: "12PM", risk: 72 },
    { time: "2PM", risk: 65 }, { time: "4PM", risk: 45 },
  ];

  const statusData = [
    { label: "Delivered", count: deliveries.filter(d => d.status === "delivered").length, color: "#4ade80" },
    { label: "At Risk", count: deliveries.filter(d => d.riskScore > 75).length, color: "#f87171" },
    { label: "Failed", count: deliveries.filter(d => d.status === "failed").length, color: "#fb923c" },
    { label: "In Transit", count: deliveries.filter(d => d.status === "in_transit").length, color: "#60a5fa" },
    { label: "Pending", count: 1, color: "#a78bfa" },
  ];
  const totalStatus = statusData.reduce((a, b) => a + b.count, 0);

  return (
    <main style={{ background: bg, minHeight: "100vh", fontFamily: "'Inter', sans-serif", transition: "background .3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;margin:0;padding:0}
      `}</style>

      <nav style={{ padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", background: navBg, backdropFilter: "blur(12px)", borderBottom: `1px solid ${navBorder}`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => router.push("/")}>
          <div style={{ width: "28px", height: "28px", background: "#15803d", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: "16px" }}><span style={{ color: textPrimary }}>Swift</span><span style={{ color: "#4ade80" }}>Lane</span></span>
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {[
            { label: "Overview", href: "/dashboard" },
            { label: "Deliveries", href: "/dashboard/deliveries" },
            { label: "Analytics", href: "/dashboard/analytics" },
            { label: "Settings", href: "/dashboard/settings" },
          ].map((item) => (
            <div key={item.label} onClick={() => router.push(item.href)} style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: item.label === "Analytics" ? "#4ade80" : textSecondary, background: item.label === "Analytics" ? (dark ? "rgba(34,197,94,0.1)" : "#f0fdf4") : "transparent", cursor: "pointer" }}>
              {item.label}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: dark ? "rgba(34,197,94,0.1)" : "#f0fdf4", border: `1px solid ${dark ? "rgba(34,197,94,0.2)" : "#bbf7d0"}`, borderRadius: "20px", padding: "4px 12px" }}>
            <div style={{ width: "6px", height: "6px", background: "#4ade80", borderRadius: "50%" }}/>
            <span style={{ fontSize: "11px", color: "#4ade80", fontWeight: 600 }}>Live</span>
          </div>
          <div onClick={() => router.push("/dashboard/profile")} style={{ width: "34px", height: "34px", background: "#15803d", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <span style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>AR</span>
          </div>
        </div>
      </nav>

      <div style={{ padding: "28px 32px", animation: "fadeUp .4s ease both" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: textPrimary, letterSpacing: "-0.5px" }}>Analytics</h1>
          <p style={{ fontSize: "13px", color: textSecondary, marginTop: "4px" }}>Today's delivery performance overview</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          {/* Donut */}
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "16px", padding: "24px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: textPrimary, marginBottom: "20px" }}>Delivery Status</p>
            <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
              <svg width="140" height="140" viewBox="0 0 140 140">
                {statusData.map((s, i) => {
                  const pct = s.count / totalStatus;
                  const offset = statusData.slice(0, i).reduce((a, b) => a + b.count / totalStatus, 0);
                  const r = 52;
                  const circ = 2 * Math.PI * r;
                  const dash = pct * circ;
                  const gap = circ - dash;
                  const rotation = offset * 360 - 90;
                  return (
                    <circle key={i} cx="70" cy="70" r={r} fill="none" stroke={s.color} strokeWidth="20"
                      strokeDasharray={`${animated ? dash : 0} ${gap}`}
                      strokeDashoffset="0"
                      transform={`rotate(${rotation} 70 70)`}
                      style={{ transition: `stroke-dasharray ${0.5 + i * 0.1}s ease` }}
                    />
                  );
                })}
                <circle cx="70" cy="70" r="38" fill={dark ? "#0a1a0f" : "#fff"}/>
                <text x="70" y="66" textAnchor="middle" fontSize="18" fontWeight="800" fill={textPrimary} fontFamily="Inter,sans-serif">{totalStatus}</text>
                <text x="70" y="82" textAnchor="middle" fontSize="10" fill={textSecondary} fontFamily="Inter,sans-serif">total</text>
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {statusData.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.color, flexShrink: 0 }}/>
                    <span style={{ fontSize: "12px", color: textSecondary }}>{s.label}: {s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bar chart */}
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "16px", padding: "24px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: textPrimary, marginBottom: "20px" }}>Risk Distribution</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", height: "120px", paddingBottom: "4px" }}>
              {riskBuckets.map((b, i) => {
                const h = (b.count / maxCount) * 100;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%", justifyContent: "flex-end" }}>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: b.color }}>{b.count}</span>
                    <div style={{ width: "100%", height: `${animated ? h : 0}%`, background: b.color, borderRadius: "6px 6px 0 0", transition: `height ${0.4 + i * 0.1}s ease`, opacity: 0.85 }}/>
                    <span style={{ fontSize: "10px", color: textSecondary }}>{b.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "16px", padding: "24px" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: textPrimary, marginBottom: "20px" }}>Risk Timeline (Today)</p>
          <div style={{ position: "relative", height: "180px" }}>
            <svg width="100%" height="160" viewBox="0 0 800 160" preserveAspectRatio="none">
              {[0, 40, 80, 120].map((y, i) => (
                <line key={i} x1="0" y1={y} x2="800" y2={y} stroke={dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} strokeWidth="1"/>
              ))}
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02"/>
                </linearGradient>
              </defs>
              <path d={`M0,${160 - timeline[0].risk * 1.6} ${timeline.map((p, i) => `L${i * 160},${160 - p.risk * 1.6}`).join(" ")} L800,160 L0,160 Z`} fill="url(#areaGrad)"/>
              <path d={`M0,${160 - timeline[0].risk * 1.6} ${timeline.map((p, i) => `L${i * 160},${160 - p.risk * 1.6}`).join(" ")}`} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              {timeline.map((p, i) => (
                <circle key={i} cx={i * 160} cy={160 - p.risk * 1.6} r="4" fill="#22c55e"/>
              ))}
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
              {timeline.map((p, i) => (
                <span key={i} style={{ fontSize: "11px", color: textSecondary }}>{p.time}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}