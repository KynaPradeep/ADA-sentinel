"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { deliveries, stats, user } from "../../lib/mockData";

export default function Dashboard() {
  const [selected, setSelected] = useState<null | typeof deliveries[0]>(null);
  const [liveStats, setLiveStats] = useState(stats);
  const [time, setTime] = useState("");

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setLiveStats((prev) => ({
        ...prev,
        total: prev.total + Math.floor(Math.random() * 2),
      }));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const riskColor = (s: number) => s > 75 ? "#dc2626" : s > 50 ? "#d97706" : "#16a34a";
  const riskBg = (s: number) => s > 75 ? "#fef2f2" : s > 50 ? "#fffbeb" : "#f0fdf4";

  return (
    <main style={{ background: "#f8faf9", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
        *{box-sizing:border-box;margin:0;padding:0}
        .stat-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.08) !important}
        .risk-card:hover{border-color:#15803d !important;transform:translateX(-2px)}
        .nav-link:hover{color:#15803d !important}
      `}</style>

      {/* Navbar */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <div style={{ width: "32px", height: "32px", background: "#15803d", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: "16px", fontWeight: 800 }}>S</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: "17px", color: "#111827", letterSpacing: "-0.3px" }}>SwiftLane</span>
        </Link>

        <div style={{ display: "flex", gap: "4px" }}>
          {[
            { label: "Overview", href: "/dashboard" },
            { label: "Deliveries", href: "/dashboard/deliveries" },
            { label: "Analytics", href: "/dashboard/analytics" },
            { label: "Settings", href: "/dashboard/settings" },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, color: item.href === "/dashboard" ? "#15803d" : "#6b7280", background: item.href === "/dashboard" ? "#f0fdf4" : "transparent", textDecoration: "none", transition: "all .15s" }}>
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>{time}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "20px", padding: "5px 12px" }}>
            <div style={{ width: "7px", height: "7px", background: "#16a34a", borderRadius: "50%", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontSize: "11px", color: "#15803d", fontWeight: 600 }}>Live</span>
          </div>
          <Link href="/dashboard/profile" style={{ textDecoration: "none" }}>
            <div style={{ width: "36px", height: "36px", background: "#15803d", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700 }}>{user.avatar}</span>
            </div>
          </Link>
        </div>
      </nav>

      <div style={{ padding: "24px 32px" }}>
        {/* Page header */}
        <div style={{ marginBottom: "24px", animation: "fadeUp .4s ease both" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", letterSpacing: "-0.5px" }}>Good morning, {user.name.split(" ")[0]}</h1>
          <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "3px" }}>{user.company} · {user.role}</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px", marginBottom: "24px" }}>
          {[
            { label: "Total deliveries", value: liveStats.total.toString(), sub: "today", color: "#111827" },
            { label: "High risk", value: liveStats.highRisk.toString(), sub: "score > 75%", color: "#dc2626" },
            { label: "Auto-resolved", value: liveStats.autoResolved.toString(), sub: "via WhatsApp", color: "#15803d" },
            { label: "Failed", value: liveStats.failed.toString(), sub: "re-attempting", color: "#d97706" },
          ].map((s, i) => (
            <div key={s.label} className="stat-card" style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "18px", transition: "transform .2s, box-shadow .2s", animation: `fadeUp ${.2 + i * .08}s ease both`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <p style={{ fontSize: "11px", color: "#6b7280", letterSpacing: "0.4px", textTransform: "uppercase", marginBottom: "8px" }}>{s.label}</p>
              <p style={{ fontSize: "30px", fontWeight: 700, letterSpacing: "-1px", color: s.color }}>{s.value}</p>
              <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 320px 360px" : "1fr 320px", gap: "16px", transition: "all .3s" }}>

          {/* Map */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>Live delivery map</span>
              <span style={{ fontSize: "10px", background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0", borderRadius: "6px", padding: "3px 8px", fontWeight: 500 }}>Mapbox integration pending</span>
            </div>
            <svg width="100%" height="380" viewBox="0 0 700 380" style={{ display: "block" }}>
              <rect width="700" height="380" fill="#f8faf9"/>
              <rect x="0" y="168" width="700" height="28" fill="#e5e7eb"/>
              <rect x="0" y="180" width="700" height="2" fill="#d1d5db"/>
              <rect x="336" y="0" width="24" height="380" fill="#e5e7eb"/>
              <rect x="150" y="0" width="18" height="380" fill="#f3f4f6"/>
              <rect x="520" y="0" width="18" height="380" fill="#f3f4f6"/>
              {deliveries.map((d, i) => (
                <g key={d.id} onClick={() => setSelected(d)} style={{ cursor: "pointer" }}>
                  <circle cx={d.coords.x} cy={d.coords.y} r="16" fill={riskColor(d.riskScore) + "22"} stroke={riskColor(d.riskScore)} strokeWidth="1.5" style={{ animation: `pulse ${1.5 + i * .2}s infinite` }}/>
                  <circle cx={d.coords.x} cy={d.coords.y} r="7" fill={riskColor(d.riskScore)}/>
                  <text x={d.coords.x + 18} y={d.coords.y + 4} fill={riskColor(d.riskScore)} fontSize="10" fontFamily="Inter,sans-serif" fontWeight="600">{d.riskScore}%</text>
                </g>
              ))}
              <g style={{ animation: "pulse 2s infinite" }}>
                <rect x="328" y="170" width="28" height="18" rx="4" fill="#15803d"/>
                <rect x="352" y="167" width="10" height="21" rx="2" fill="#166534"/>
                <circle cx="335" cy="189" r="4" fill="#dcfce7"/>
                <circle cx="348" cy="189" r="4" fill="#dcfce7"/>
              </g>
            </svg>
          </div>

          {/* Risk feed */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <p style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>Delivery risk feed</p>
            {deliveries.map((d, i) => (
              <div key={d.id} onClick={() => setSelected(selected?.id === d.id ? null : d)} className="risk-card" style={{
                background: selected?.id === d.id ? "#f0fdf4" : "#fff",
                border: `1px solid ${selected?.id === d.id ? "#15803d" : "#e5e7eb"}`,
                borderLeft: `3px solid ${riskColor(d.riskScore)}`,
                borderRadius: "0 14px 14px 0",
                padding: "12px 14px",
                transition: "all .15s",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                animation: `fadeUp ${.3 + i * .08}s ease both`
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{d.customer.name}</p>
                    <p style={{ fontSize: "10px", color: "#9ca3af", marginTop: "1px" }}>{d.id} · {d.driver.name}</p>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, background: riskBg(d.riskScore), color: riskColor(d.riskScore), borderRadius: "8px", padding: "3px 8px" }}>{d.riskScore}%</span>
                </div>
                <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "7px" }}>{d.riskReason}</p>
                <div style={{ height: "3px", background: "#f3f4f6", borderRadius: "2px" }}>
                  <div style={{ height: "3px", width: `${d.riskScore}%`, background: riskColor(d.riskScore), borderRadius: "2px", transition: "width .8s ease" }}/>
                </div>
                {d.status === "whatsapp_sent" && (
                  <span style={{ fontSize: "9px", background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0", borderRadius: "4px", padding: "2px 6px", marginTop: "6px", display: "inline-block", fontWeight: 500 }}>WhatsApp sent</span>
                )}
              </div>
            ))}
          </div>

          {/* Side panel */}
          {selected && (
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "20px", animation: "slideIn .25s ease both", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", overflowY: "auto", maxHeight: "520px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>{selected.id}</h3>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#9ca3af", lineHeight: 1 }}>×</button>
              </div>

              {/* Customer */}
              <div style={{ background: "#f8faf9", borderRadius: "10px", padding: "12px", marginBottom: "12px" }}>
                <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.4px" }}>Customer</p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{selected.customer.name}</p>
                <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>{selected.customer.phone}</p>
                <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>{selected.customer.address}</p>
              </div>

              {/* Risk breakdown */}
              <div style={{ background: "#f8faf9", borderRadius: "10px", padding: "12px", marginBottom: "12px" }}>
                <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.4px" }}>Risk breakdown</p>
                {[
                  { label: "Weather impact", value: selected.signals.weather },
                  { label: "Traffic delay", value: selected.signals.traffic },
                  { label: "Customer history", value: selected.signals.customerHistory },
                ].map((sig) => (
                  <div key={sig.label} style={{ marginBottom: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                      <span style={{ fontSize: "12px", color: "#374151" }}>{sig.label}</span>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: riskColor(sig.value) }}>{sig.value}%</span>
                    </div>
                    <div style={{ height: "4px", background: "#e5e7eb", borderRadius: "2px" }}>
                      <div style={{ height: "4px", width: `${sig.value}%`, background: riskColor(sig.value), borderRadius: "2px" }}/>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp log */}
              <div style={{ background: "#f8faf9", borderRadius: "10px", padding: "12px" }}>
                <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.4px" }}>WhatsApp log</p>
                {selected.whatsappLog.length === 0 ? (
                  <p style={{ fontSize: "12px", color: "#9ca3af" }}>No messages yet</p>
                ) : (
                  selected.whatsappLog.map((msg, i) => (
                    <div key={i} style={{ marginBottom: "8px", display: "flex", flexDirection: "column", alignItems: msg.from === "bot" ? "flex-start" : "flex-end" }}>
                      <div style={{ background: msg.from === "bot" ? "#fff" : "#dcfce7", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "8px 10px", maxWidth: "85%" }}>
                        <p style={{ fontSize: "12px", color: "#111827", lineHeight: 1.5 }}>{msg.message}</p>
                      </div>
                      <span style={{ fontSize: "10px", color: "#9ca3af", marginTop: "2px" }}>{msg.from === "bot" ? "SwiftLane AI" : selected.customer.name} · {msg.time}</span>
                    </div>
                  ))
                )}
              </div>

              {/* ETA + Driver */}
              <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <div style={{ background: "#f0fdf4", borderRadius: "10px", padding: "10px 12px" }}>
                  <p style={{ fontSize: "10px", color: "#6b7280", marginBottom: "3px" }}>ETA</p>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#15803d" }}>{selected.eta}</p>
                </div>
                <div style={{ background: "#f8faf9", borderRadius: "10px", padding: "10px 12px" }}>
                  <p style={{ fontSize: "10px", color: "#6b7280", marginBottom: "3px" }}>Driver</p>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{selected.driver.name}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}