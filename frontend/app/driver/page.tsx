"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deliveries, authHelpers } from "../../lib/mockData";

export default function Driver() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>("DEL-001");
  const [marked, setMarked] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const role = authHelpers.getRole();
    if (!role) { router.push("/login"); return; }
    if (role !== "driver") {
      if (role === "dispatcher") router.push("/dashboard");
      else router.push("/track");
      return;
    }
    setChecked(true);
  }, []);

  if (!checked) return null;

  const riskColor = (s: number) => s > 75 ? "#f87171" : s > 50 ? "#fbbf24" : "#4ade80";

  return (
    <main style={{ background: "#0a1a0f", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        *{box-sizing:border-box;margin:0;padding:0}
        .del-row:hover{border-color:rgba(34,197,94,0.3) !important}
        .mark-btn:hover{background:#16a34a !important;transform:translateY(-1px)}
      `}</style>

      <nav style={{ padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,26,15,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(34,197,94,0.1)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => router.push("/")}>
          <div style={{ width: "28px", height: "28px", background: "#15803d", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: "16px" }}><span style={{ color: "#fff" }}>Swift</span><span style={{ color: "#4ade80" }}>Lane</span></span>
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {[
            { label: "Overview", href: "/driver", active: true },
            { label: "Settings", href: "/dashboard/settings", active: false },
          ].map((item) => (
            <div key={item.label} onClick={() => router.push(item.href)} style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: item.active ? "#4ade80" : "rgba(255,255,255,0.4)", background: item.active ? "rgba(34,197,94,0.1)" : "transparent", cursor: "pointer" }}>
              {item.label}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "20px", padding: "4px 12px" }}>
            <div style={{ width: "6px", height: "6px", background: "#4ade80", borderRadius: "50%", animation: "pulse 1.5s infinite" }}/>
            <span style={{ fontSize: "11px", color: "#4ade80", fontWeight: 600 }}>Live</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "34px", height: "34px", background: "#15803d", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>AR</span>
            </div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>anwitarajendra</p>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>Driver</p>
            </div>
          </div>
        </div>
      </nav>

      <div style={{ padding: "28px 32px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "24px", animation: "fadeUp .4s ease both" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>My Route</h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>Your assigned deliveries and optimized route</p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: "16px", overflow: "hidden", marginBottom: "20px" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(34,197,94,0.1)", display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>Optimized Route</p>
            </div>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.05)", borderRadius: "6px", padding: "3px 8px" }}>Mapbox — pending</span>
          </div>
          <svg width="100%" height="160" viewBox="0 0 800 160" style={{ display: "block" }}>
            <rect width="800" height="160" fill="rgba(0,0,0,0.2)"/>
            <path d="M80 120 Q200 40 320 80 Q440 120 560 60 Q680 20 760 80" fill="none" stroke="rgba(34,197,94,0.3)" strokeWidth="2" strokeDasharray="8 6"/>
            {[{ cx: 80, cy: 120 }, { cx: 320, cy: 80 }, { cx: 560, cy: 60 }, { cx: 760, cy: 80 }].map((p, i) => (
              <g key={i}>
                <circle cx={p.cx} cy={p.cy} r="10" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.4)" strokeWidth="1"/>
                <circle cx={p.cx} cy={p.cy} r="5" fill="#4ade80"/>
                <text x={p.cx} y={p.cy - 16} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.5)" fontFamily="Inter,sans-serif">{`Stop ${i + 1}`}</text>
              </g>
            ))}
            <circle cx="200" cy="95" r="8" fill="none" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5"/>
            <text x="200" y="99" textAnchor="middle" fontSize="8" fill="#4ade80" fontFamily="Inter,sans-serif">You</text>
            <text x="400" y="90" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.15)" fontFamily="Inter,sans-serif">Route visualization pending</text>
          </svg>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: "16px", padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <div style={{ width: "28px", height: "28px", background: "rgba(34,197,94,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            </div>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>Active Deliveries ({deliveries.length})</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {deliveries.map((d, i) => (
              <div key={d.id} className="del-row" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${expanded === d.id ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.06)"}`, borderLeft: `3px solid ${riskColor(d.riskScore)}`, borderRadius: "0 12px 12px 0", overflow: "hidden", transition: "all .15s", animation: `fadeUp ${.2 + i * .06}s ease both` }}>
                <div onClick={() => setExpanded(expanded === d.id ? null : d.id)} style={{ padding: "14px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                      {d.riskScore > 75 && <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>}
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>{d.customer.name}</p>
                      <span style={{ fontSize: "10px", color: riskColor(d.riskScore), background: `${riskColor(d.riskScore)}15`, borderRadius: "6px", padding: "2px 7px", fontWeight: 600 }}>{d.riskScore > 75 ? "at risk" : "in transit"}</span>
                    </div>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{d.customer.address}</p>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>ETA: {d.eta}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" style={{ transform: expanded === d.id ? "rotate(180deg)" : "none", transition: "transform .2s" }}><path d="M6 9l6 6 6-6"/></svg>
                </div>
                {expanded === d.id && (
                  <div style={{ padding: "0 16px 16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    {d.whatsappLog.length > 0 && (
                      <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: "8px", padding: "10px 12px", margin: "12px 0" }}>
                        <p style={{ fontSize: "11px", color: "#4ade80", fontWeight: 600, marginBottom: "4px" }}>Customer instruction:</p>
                        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>{d.whatsappLog[d.whatsappLog.length - 1].message}</p>
                      </div>
                    )}
                    <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                      <button style={{ padding: "8px 16px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 500, cursor: "pointer" }}>Details</button>
                      {!marked.includes(d.id) ? (
                        <button onClick={() => setMarked([...marked, d.id])} className="mark-btn" style={{ padding: "8px 16px", background: "#15803d", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", transition: "all .2s", boxShadow: "0 2px 8px rgba(21,128,61,0.3)" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          Mark Delivered
                        </button>
                      ) : (
                        <div style={{ padding: "8px 16px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "8px", color: "#4ade80", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                          <svg width="12" height="12" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          Delivered
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}