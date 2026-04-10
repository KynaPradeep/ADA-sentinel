"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [role, setRole] = useState("dispatcher");

  const bg = darkMode ? "#0a1a0f" : "#f8faf9";
  const cardBg = darkMode ? "rgba(255,255,255,0.03)" : "#fff";
  const cardBorder = darkMode ? "rgba(34,197,94,0.15)" : "#e5e7eb";
  const textPrimary = darkMode ? "#fff" : "#111827";
  const textSecondary = darkMode ? "rgba(255,255,255,0.4)" : "#6b7280";
  const navBg = darkMode ? "rgba(10,26,15,0.9)" : "#fff";
  const navBorder = darkMode ? "rgba(34,197,94,0.1)" : "#e5e7eb";

  function Toggle({ on, toggle }: { on: boolean; toggle: () => void }) {
    return (
      <div onClick={toggle} style={{ width: "44px", height: "24px", background: on ? "#15803d" : "rgba(255,255,255,0.1)", borderRadius: "12px", position: "relative", cursor: "pointer", transition: "background .2s", border: `1px solid ${on ? "#15803d" : "rgba(255,255,255,0.15)"}`, flexShrink: 0 }}>
        <div style={{ position: "absolute", top: "2px", left: on ? "22px" : "2px", width: "18px", height: "18px", background: "#fff", borderRadius: "50%", transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }}/>
      </div>
    );
  }

  return (
    <main style={{ background: bg, minHeight: "100vh", fontFamily: "'Inter', sans-serif", transition: "background .3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;margin:0;padding:0}
        .role-btn:hover{border-color:rgba(34,197,94,0.5) !important}
        .nav-link:hover{color:#15803d !important}
      `}</style>

      {/* Navbar */}
      <nav style={{ padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", background: navBg, backdropFilter: "blur(12px)", borderBottom: `1px solid ${navBorder}`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => router.push("/")}>
          <div style={{ width: "28px", height: "28px", background: "#15803d", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: "16px" }}>
            <span style={{ color: darkMode ? "#fff" : "#111827" }}>Swift</span>
            <span style={{ color: "#4ade80" }}>Lane</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {[
            { label: "Overview", href: role === "dispatcher" ? "/dashboard" : role === "driver" ? "/driver" : "/track" },
            { label: "Settings", href: "/dashboard/settings" },
          ].map((item) => (
            <div key={item.label} onClick={() => router.push(item.href)} style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: item.label === "Settings" ? "#4ade80" : textSecondary, background: item.label === "Settings" ? "rgba(34,197,94,0.1)" : "transparent", cursor: "pointer" }}>
              {item.label}
            </div>
          ))}
        </div>
        <div style={{ width: "34px", height: "34px", background: "#15803d", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>AR</span>
        </div>
      </nav>

      <div style={{ padding: "28px 32px", maxWidth: "600px", margin: "0 auto", animation: "fadeUp .4s ease both" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: textPrimary, letterSpacing: "-0.5px" }}>Settings</h1>
          <p style={{ fontSize: "13px", color: textSecondary, marginTop: "4px" }}>Manage your account and preferences</p>
        </div>

        {/* Appearance */}
        <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "16px", padding: "20px", marginBottom: "16px" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: textPrimary, marginBottom: "16px" }}>Appearance</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "32px", background: "rgba(34,197,94,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: textPrimary }}>Dark Mode</p>
                <p style={{ fontSize: "11px", color: textSecondary, marginTop: "1px" }}>Toggle between light and dark themes</p>
              </div>
            </div>
            <Toggle on={darkMode} toggle={() => setDarkMode(!darkMode)} />
          </div>
        </div>

        {/* Role switcher */}
        <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "16px", padding: "20px", marginBottom: "16px" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: textPrimary, marginBottom: "6px" }}>Switch Role</p>
          <p style={{ fontSize: "12px", color: textSecondary, marginBottom: "14px" }}>Change your role to access a different view</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px" }}>
            {[
              { value: "customer", label: "Customer", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
              { value: "driver", label: "Driver", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
              { value: "dispatcher", label: "Dispatcher", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
            ].map((r) => (
              <button key={r.value} onClick={() => { setRole(r.value); setTimeout(() => { if (r.value === "dispatcher") router.push("/dashboard"); else if (r.value === "driver") router.push("/driver"); else router.push("/track"); }, 300); }} className="role-btn" style={{
                padding: "12px 8px", border: `1px solid ${role === r.value ? "rgba(34,197,94,0.6)" : darkMode ? "rgba(255,255,255,0.08)" : "#e5e7eb"}`,
                borderRadius: "12px", background: role === r.value ? "rgba(34,197,94,0.12)" : darkMode ? "rgba(255,255,255,0.03)" : "#f8faf9",
                color: role === r.value ? "#4ade80" : textSecondary, cursor: "pointer",
                fontSize: "12px", fontWeight: 600, transition: "all .15s",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
              }}>
                {r.icon}{r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "16px", padding: "20px", marginBottom: "16px" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: textPrimary, marginBottom: "16px" }}>Notifications</p>
          {[
            { label: "Push Notifications", sub: "Receive alerts for high-risk deliveries", on: pushNotifs, toggle: () => setPushNotifs(!pushNotifs) },
            { label: "WhatsApp Alerts", sub: "Auto-send when risk > 75% (Twilio — pending)", on: whatsappAlerts, toggle: () => setWhatsappAlerts(!whatsappAlerts) },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: i === 0 ? "14px" : "0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", background: "rgba(34,197,94,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: textPrimary }}>{item.label}</p>
                  <p style={{ fontSize: "11px", color: textSecondary, marginTop: "1px" }}>{item.sub}</p>
                </div>
              </div>
              <Toggle on={item.on} toggle={item.toggle} />
            </div>
          ))}
        </div>

    
      </div>
    </main>
  );
}