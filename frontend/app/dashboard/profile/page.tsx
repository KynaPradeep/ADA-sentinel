"use client";
import { useRouter } from "next/navigation";
import { user, deliveries } from "../../../lib/mockData";

export default function Profile() {
  const router = useRouter();

  const delivered = deliveries.filter(d => d.status === "delivered").length;
  const failed = deliveries.filter(d => d.status === "failed").length;
  const inTransit = deliveries.filter(d => d.status === "in_transit").length;
  const highRisk = deliveries.filter(d => d.riskScore > 75).length;

  return (
    <main style={{ background: "#0a1a0f", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;margin:0;padding:0}
      `}</style>

      {/* Navbar */}
      <nav style={{ padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,26,15,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(34,197,94,0.1)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => router.push("/")}>
          <div style={{ width: "28px", height: "28px", background: "#15803d", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: "16px" }}><span style={{ color: "#fff" }}>Swift</span><span style={{ color: "#4ade80" }}>Lane</span></span>
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {[
            { label: "Overview", href: "/dashboard" },
            { label: "Deliveries", href: "/dashboard/deliveries" },
            { label: "Analytics", href: "/dashboard/analytics" },
            { label: "Settings", href: "/dashboard/settings" },
          ].map((item) => (
            <div key={item.label} onClick={() => router.push(item.href)} style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.4)", background: "transparent", cursor: "pointer" }}>
              {item.label}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", background: "#15803d", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>{user.avatar}</span>
          </div>
        </div>
      </nav>

      <div style={{ padding: "28px 32px", maxWidth: "800px", margin: "0 auto", animation: "fadeUp .4s ease both" }}>

        {/* Profile header */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: "20px", padding: "32px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ width: "72px", height: "72px", background: "#15803d", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 24px rgba(21,128,61,0.4)" }}>
            <span style={{ color: "#fff", fontSize: "24px", fontWeight: 800 }}>{user.avatar}</span>
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>{user.name}</h1>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>{user.role} · {user.company}</p>
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              <span style={{ fontSize: "11px", color: "#4ade80", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "6px", padding: "3px 10px", fontWeight: 600 }}>Dispatcher</span>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)", borderRadius: "6px", padding: "3px 10px" }}>Active</span>
            </div>
          </div>
          <button onClick={() => router.push("/dashboard/settings")} style={{ padding: "10px 20px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "10px", color: "#4ade80", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginBottom: "16px" }}>
          {[
            { label: "Delivered", value: delivered, color: "#4ade80" },
            { label: "In Transit", value: inTransit, color: "#60a5fa" },
            { label: "High Risk", value: highRisk, color: "#f87171" },
            { label: "Failed", value: failed, color: "#fb923c" },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "16px", textAlign: "center" }}>
              <p style={{ fontSize: "28px", fontWeight: 800, color: s.color, letterSpacing: "-1px" }}>{s.value}</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent deliveries */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: "16px", padding: "20px" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>Recent Activity</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {deliveries.map((d, i) => (
              <div key={d.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: d.status === "delivered" ? "#4ade80" : d.status === "failed" ? "#f87171" : "#fbbf24", flexShrink: 0 }}/>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>{d.customer.name}</p>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "1px" }}>{d.id} · {d.customer.address}</p>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: d.riskScore > 75 ? "#f87171" : d.riskScore > 50 ? "#fbbf24" : "#4ade80" }}>{d.riskScore}%</p>
                  <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "1px" }}>ETA {d.eta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}