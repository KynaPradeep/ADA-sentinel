"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleSubmit() {
    if (role === "dispatcher") router.push("/dashboard");
    else if (role === "driver") router.push("/driver");
    else router.push("/track");
  }

  return (
    <main style={{ background: "#0a1a0f", minHeight: "100vh", fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;margin:0;padding:0}
        input{background:rgba(255,255,255,0.05) !important;border:1px solid rgba(255,255,255,0.1) !important;color:#fff !important;border-radius:10px;padding:12px 14px;font-size:14px;width:100%;font-family:'Inter',sans-serif;transition:all .2s}
        input::placeholder{color:rgba(255,255,255,0.3) !important}
        input:focus{outline:none;border-color:rgba(34,197,94,0.5) !important;background:rgba(34,197,94,0.05) !important}
        .role-btn:hover{border-color:rgba(34,197,94,0.5) !important;background:rgba(34,197,94,0.08) !important}
        .submit-btn:hover{background:#16a34a !important;transform:translateY(-1px);box-shadow:0 8px 24px rgba(21,128,61,0.4) !important}
      `}</style>

      {/* Navbar */}
      <nav style={{ padding: "0 48px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(34,197,94,0.1)", background: "rgba(10,26,15,0.85)", backdropFilter: "blur(16px)" }}>
        <div onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <div style={{ width: "32px", height: "32px", background: "#15803d", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: "17px" }}>
            <span style={{ color: "#fff" }}>Swift</span><span style={{ color: "#4ade80" }}>Lane</span>
          </span>
        </div>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: "24px", padding: "40px", width: "100%", maxWidth: "440px", animation: "fadeUp .5s ease both", backdropFilter: "blur(12px)" }}>

          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ width: "52px", height: "52px", background: "#15803d", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 0 24px rgba(21,128,61,0.4)" }}>
              <svg width="24" height="24" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
              {isLogin ? "Sign in to your SwiftLane account" : "Start monitoring deliveries today"}
            </p>
          </div>

          {/* Toggle */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "4px", marginBottom: "28px" }}>
            {["Login", "Sign Up"].map((t) => (
              <button key={t} onClick={() => setIsLogin(t === "Login")} style={{
                flex: 1, padding: "9px", border: "none", borderRadius: "9px", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "all .2s",
                background: (isLogin && t === "Login") || (!isLogin && t === "Sign Up") ? "#15803d" : "transparent",
                color: (isLogin && t === "Login") || (!isLogin && t === "Sign Up") ? "#fff" : "rgba(255,255,255,0.4)",
                boxShadow: (isLogin && t === "Login") || (!isLogin && t === "Sign Up") ? "0 2px 8px rgba(21,128,61,0.3)" : "none",
              }}>{t}</button>
            ))}
          </div>

          {/* Role */}
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontWeight: 500, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>I am a</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginBottom: "24px" }}>
            {[
              { value: "customer", label: "Customer", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
              { value: "driver", label: "Driver", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
              { value: "dispatcher", label: "Dispatcher", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
            ].map((r) => (
              <button key={r.value} onClick={() => setRole(r.value)} className="role-btn" style={{
                padding: "12px 8px",
                border: `1px solid ${role === r.value ? "rgba(34,197,94,0.6)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "12px",
                background: role === r.value ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.03)",
                color: role === r.value ? "#4ade80" : "rgba(255,255,255,0.4)",
                cursor: "pointer", fontSize: "12px", fontWeight: 600, transition: "all .15s",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
              }}>
                {r.icon}{r.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            {!isLogin && (
              <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            )}
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button onClick={handleSubmit} className="submit-btn" style={{
            width: "100%", padding: "14px", background: "#15803d", color: "#fff",
            border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 700,
            cursor: "pointer", transition: "all .2s", boxShadow: "0 4px 16px rgba(21,128,61,0.3)",
            letterSpacing: "-0.2px",
          }}>
            {isLogin ? "Login" : "Create Account"}
          </button>

          <p style={{ textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.3)", marginTop: "16px" }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => setIsLogin(!isLogin)} style={{ color: "#4ade80", fontWeight: 600, cursor: "pointer" }}>
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}