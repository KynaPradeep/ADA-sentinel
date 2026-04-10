"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deliveries, authHelpers } from "../../../lib/mockData";

export default function Deliveries() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof deliveries[0] | null>(null);
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
  const textMuted = dark ? "rgba(255,255,255,0.3)" : "#9ca3af";

  const riskColor = (s: number) => s > 75 ? "#f87171" : s > 50 ? "#fbbf24" : "#4ade80";
  const statusLabel = (s: string) => s === "in_transit" ? "in transit" : s === "delivered" ? "delivered" : s === "failed" ? "failed" : s;

  const filtered = deliveries.filter(d => {
    const matchFilter = filter === "all" ? true : filter === "high_risk" ? d.riskScore > 75 : filter === "resolved" ? d.whatsappLog.length > 0 : filter === "failed" ? d.status === "failed" : true;
    const matchSearch = search === "" ? true : d.customer.name.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <main style={{ background: bg, minHeight: "100vh", fontFamily: "'Inter', sans-serif", transition: "background .3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
        *{box-sizing:border-box;margin:0;padding:0}
        .del-row:hover{background:rgba(34,197,94,0.04) !important;border-color:rgba(34,197,94,0.3) !important}
        .filter-btn:hover{border-color:rgba(34,197,94,0.4) !important}
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
            <div key={item.label} onClick={() => router.push(item.href)} style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: item.label === "Deliveries" ? "#4ade80" : textSecondary, background: item.label === "Deliveries" ? (dark ? "rgba(34,197,94,0.1)" : "#f0fdf4") : "transparent", cursor: "pointer" }}>
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
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: textPrimary, letterSpacing: "-0.5px" }}>Deliveries</h1>
          <p style={{ fontSize: "13px", color: textSecondary, marginTop: "4px" }}>All deliveries — filter, search and manage</p>
        </div>

        <div style={{ display: "flex", gap: "12px", marginBottom: "20px", alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <svg style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={textSecondary} strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or ID" style={{ width: "100%", padding: "10px 12px 10px 34px", background: dark ? "rgba(255,255,255,0.05)" : "#fff", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#e5e7eb"}`, borderRadius: "10px", color: textPrimary, fontSize: "13px", fontFamily: "'Inter',sans-serif", outline: "none" }}/>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            {[
              { value: "all", label: "All" },
              { value: "high_risk", label: "High Risk" },
              { value: "resolved", label: "Resolved" },
              { value: "failed", label: "Failed" },
            ].map((f) => (
              <button key={f.value} onClick={() => setFilter(f.value)} className="filter-btn" style={{ padding: "8px 14px", border: `1px solid ${filter === f.value ? "rgba(34,197,94,0.5)" : dark ? "rgba(255,255,255,0.08)" : "#e5e7eb"}`, borderRadius: "8px", background: filter === f.value ? (dark ? "rgba(34,197,94,0.1)" : "#f0fdf4") : "transparent", color: filter === f.value ? "#4ade80" : textSecondary, fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all .15s" }}>{f.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 360px" : "1fr", gap: "16px" }}>
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 80px 100px", gap: "16px", padding: "12px 20px", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "#f3f4f6"}` }}>
              {["Customer", "Driver", "Address", "Risk", "Status"].map((h) => (
                <p key={h} style={{ fontSize: "11px", fontWeight: 600, color: textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</p>
              ))}
            </div>
            {filtered.length === 0 ? (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <p style={{ fontSize: "14px", color: textSecondary }}>No deliveries found</p>
              </div>
            ) : (
              filtered.map((d, i) => (
                <div key={d.id} onClick={() => setSelected(selected?.id === d.id ? null : d)} className="del-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 80px 100px", gap: "16px", padding: "14px 20px", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "#f3f4f6"}`, cursor: "pointer", transition: "all .15s", background: selected?.id === d.id ? (dark ? "rgba(34,197,94,0.06)" : "#f0fdf4") : "transparent", borderLeft: `3px solid ${selected?.id === d.id ? "#4ade80" : "transparent"}`, animation: `fadeUp ${.1 + i * .05}s ease both` }}>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: textPrimary }}>{d.customer.name}</p>
                    <p style={{ fontSize: "11px", color: textMuted, marginTop: "2px" }}>{d.id}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", color: textSecondary }}>{d.driver.name}</p>
                    <p style={{ fontSize: "11px", color: textMuted, marginTop: "2px" }}>{d.driver.vehicle}</p>
                  </div>
                  <p style={{ fontSize: "12px", color: textSecondary, alignSelf: "center" }}>{d.customer.address}</p>
                  <div style={{ alignSelf: "center" }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: riskColor(d.riskScore) }}>{d.riskScore}%</span>
                    <div style={{ height: "3px", background: dark ? "rgba(255,255,255,0.06)" : "#e5e7eb", borderRadius: "2px", marginTop: "4px", width: "48px" }}>
                      <div style={{ height: "3px", width: `${d.riskScore}%`, background: riskColor(d.riskScore), borderRadius: "2px" }}/>
                    </div>
                  </div>
                  <div style={{ alignSelf: "center" }}>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: d.status === "delivered" ? "#4ade80" : d.status === "failed" ? "#f87171" : "#fbbf24", background: `${d.status === "delivered" ? "#4ade80" : d.status === "failed" ? "#f87171" : "#fbbf24"}18`, borderRadius: "6px", padding: "3px 8px" }}>
                      {statusLabel(d.status)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {selected && (
            <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "16px", padding: "20px", animation: "slideIn .25s ease both", overflowY: "auto", maxHeight: "600px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: textPrimary }}>{selected.id}</h3>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: textSecondary, fontSize: "20px", cursor: "pointer", lineHeight: 1 }}>×</button>
              </div>
              <div style={{ background: dark ? "rgba(255,255,255,0.03)" : "#f8faf9", borderRadius: "10px", padding: "12px", marginBottom: "12px" }}>
                <p style={{ fontSize: "11px", color: textSecondary, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.4px" }}>Customer</p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: textPrimary }}>{selected.customer.name}</p>
                <p style={{ fontSize: "12px", color: textSecondary, marginTop: "2px" }}>{selected.customer.phone}</p>
                <p style={{ fontSize: "12px", color: textSecondary, marginTop: "2px" }}>{selected.customer.address}</p>
              </div>
              <div style={{ background: dark ? "rgba(255,255,255,0.03)" : "#f8faf9", borderRadius: "10px", padding: "12px", marginBottom: "12px" }}>
                <p style={{ fontSize: "11px", color: textSecondary, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.4px" }}>Risk breakdown</p>
                {[
                  { label: "Weather", value: selected.signals.weather },
                  { label: "Traffic", value: selected.signals.traffic },
                  { label: "History", value: selected.signals.customerHistory },
                ].map((sig) => (
                  <div key={sig.label} style={{ marginBottom: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                      <span style={{ fontSize: "12px", color: textSecondary }}>{sig.label}</span>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: riskColor(sig.value) }}>{sig.value}%</span>
                    </div>
                    <div style={{ height: "3px", background: dark ? "rgba(255,255,255,0.08)" : "#e5e7eb", borderRadius: "2px" }}>
                      <div style={{ height: "3px", width: `${sig.value}%`, background: riskColor(sig.value), borderRadius: "2px" }}/>
                    </div>
                  </div>
                ))}
              </div>
              {selected.whatsappLog.length > 0 && (
                <div style={{ background: dark ? "rgba(255,255,255,0.03)" : "#f8faf9", borderRadius: "10px", padding: "12px", marginBottom: "12px" }}>
                  <p style={{ fontSize: "11px", color: textSecondary, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.4px" }}>WhatsApp log</p>
                  {selected.whatsappLog.map((msg, i) => (
                    <div key={i} style={{ marginBottom: "8px", display: "flex", flexDirection: "column", alignItems: msg.from === "bot" ? "flex-start" : "flex-end" }}>
                      <div style={{ background: msg.from === "bot" ? (dark ? "rgba(34,197,94,0.1)" : "#f0fdf4") : (dark ? "rgba(255,255,255,0.06)" : "#fff"), border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#e5e7eb"}`, borderRadius: "10px", padding: "8px 10px", maxWidth: "85%" }}>
                        <p style={{ fontSize: "12px", color: textPrimary, lineHeight: 1.5 }}>{msg.message}</p>
                      </div>
                      <span style={{ fontSize: "10px", color: textMuted, marginTop: "2px" }}>{msg.from === "bot" ? "SwiftLane AI" : selected.customer.name} · {msg.time}</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <div style={{ background: dark ? "rgba(34,197,94,0.08)" : "#f0fdf4", borderRadius: "10px", padding: "10px 12px" }}>
                  <p style={{ fontSize: "10px", color: textSecondary, marginBottom: "3px" }}>ETA</p>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#4ade80" }}>{selected.eta}</p>
                </div>
                <div style={{ background: dark ? "rgba(255,255,255,0.03)" : "#f8faf9", borderRadius: "10px", padding: "10px 12px" }}>
                  <p style={{ fontSize: "10px", color: textSecondary, marginBottom: "3px" }}>Driver</p>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: textPrimary }}>{selected.driver.name}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}