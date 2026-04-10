"use client";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(2487);

  useEffect(() => {
    const t = setInterval(() => {
      setCount((p) => p + Math.floor(Math.random() * 2));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <main style={{ background: "#0a1a0f", minHeight: "100vh", fontFamily: "'Inter', sans-serif", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes pulse{0%,100%{opacity:0.4}50%{opacity:1}}
        @keyframes rotateSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes roadMove{from{stroke-dashoffset:0}to{stroke-dashoffset:-40}}
        @keyframes scooterBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes pingRing{0%{transform:scale(1);opacity:0.8}100%{transform:scale(2.2);opacity:0}}
        *{box-sizing:border-box;margin:0;padding:0}
        .cta-primary:hover{background:#16a34a !important;transform:translateY(-2px) !important;box-shadow:0 12px 32px rgba(34,197,94,0.4) !important}
        .cta-outline:hover{background:rgba(255,255,255,0.1) !important;border-color:#4ade80 !important}
        .feature-card:hover{transform:translateY(-5px) !important;border-color:#22c55e !important}
        a{text-decoration:none}
      `}</style>

      {/* Background decorative shapes */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {/* Large circle top right */}
        <div style={{ position: "absolute", top: "-120px", right: "-120px", width: "500px", height: "500px", borderRadius: "50%", border: "1px solid rgba(34,197,94,0.1)", background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)" }}/>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(34,197,94,0.08)" }}/>
        {/* Road lines diagonal */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="900" x2="600" y2="200" stroke="rgba(34,197,94,0.04)" strokeWidth="80"/>
          <line x1="0" y1="900" x2="600" y2="200" stroke="rgba(34,197,94,0.06)" strokeWidth="2" strokeDasharray="20 15" style={{ animation: "roadMove 3s linear infinite" }}/>
          <line x1="200" y1="900" x2="800" y2="200" stroke="rgba(34,197,94,0.03)" strokeWidth="60"/>
          {/* Hexagon grid subtle */}
          <polygon points="100,50 130,67 130,100 100,117 70,100 70,67" fill="none" stroke="rgba(34,197,94,0.06)" strokeWidth="1"/>
          <polygon points="160,50 190,67 190,100 160,117 130,100 130,67" fill="none" stroke="rgba(34,197,94,0.04)" strokeWidth="1"/>
          <polygon points="220,50 250,67 250,100 220,117 190,100 190,67" fill="none" stroke="rgba(34,197,94,0.03)" strokeWidth="1"/>
          <polygon points="1200,600 1230,617 1230,650 1200,667 1170,650 1170,617" fill="none" stroke="rgba(34,197,94,0.06)" strokeWidth="1"/>
          <polygon points="1260,600 1290,617 1290,650 1260,667 1230,650 1230,617" fill="none" stroke="rgba(34,197,94,0.04)" strokeWidth="1"/>
          {/* Dotted grid */}
          {[...Array(8)].map((_, i) => [...Array(5)].map((_, j) => (
            <circle key={`${i}-${j}`} cx={100 + i * 180} cy={150 + j * 160} r="1.5" fill="rgba(34,197,94,0.15)"/>
          )))}
        </svg>
        {/* Bottom left glow */}
        <div style={{ position: "absolute", bottom: "-100px", left: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)" }}/>
      </div>

      {/* Navbar */}
      <nav style={{ padding: "0 64px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, background: "rgba(10,26,15,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(34,197,94,0.1)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ width: "34px", height: "34px", background: "#15803d", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(21,128,61,0.4)" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: "18px", letterSpacing: "-0.4px" }}>
            <span style={{ color: "#fff" }}>Swift</span><span style={{ color: "#4ade80" }}>Lane</span>
          </span>
        </Link>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link href="/login" style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", fontWeight: 500, padding: "8px 18px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", transition: "all .2s" }}>Login</Link>
          <Link href="/login" style={{ background: "#15803d", color: "#fff", borderRadius: "10px", padding: "9px 20px", fontSize: "14px", fontWeight: 600, boxShadow: "0 4px 14px rgba(21,128,61,0.4)" }}>Sign Up</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "100px 64px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
        <div style={{ animation: "fadeUp .7s ease both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "20px", padding: "5px 14px", marginBottom: "28px" }}>
            <div style={{ width: "6px", height: "6px", background: "#4ade80", borderRadius: "50%", animation: "pulse 2s infinite" }}/>
            <span style={{ fontSize: "11px", color: "#4ade80", fontWeight: 600, letterSpacing: "1px" }}>LIVE DELIVERY INTELLIGENCE</span>
          </div>
          <h1 style={{ fontSize: "72px", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-3px", marginBottom: "24px" }}>
            <span style={{ color: "#fff" }}>Swift</span><span style={{ color: "#4ade80" }}>Lane</span>
          </h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "40px", maxWidth: "420px", fontWeight: 400 }}>
            AI that predicts delivery failures before they happen and resolves them automatically. Real-time risk scoring, WhatsApp triage, and GPS-verified proof of delivery.
          </p>
          <div style={{ display: "flex", gap: "12px", marginBottom: "52px" }}>
            <Link href="/login" className="cta-primary" style={{ background: "#15803d", color: "#fff", borderRadius: "12px", padding: "15px 32px", fontSize: "15px", fontWeight: 600, boxShadow: "0 4px 20px rgba(21,128,61,0.4)", display: "inline-block", transition: "all .2s" }}>
              Get started free
            </Link>
            <Link href="/dashboard" className="cta-outline" style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", padding: "15px 28px", fontSize: "15px", fontWeight: 500, display: "inline-block", transition: "all .2s" }}>
              See live demo →
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {[
              { val: count.toLocaleString(), label: "deliveries today", color: "#fff" },
              { val: "98.6%", label: "on-time rate", color: "#fff" },
              { val: "-32%", label: "failures reduced", color: "#f87171" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                {i > 0 && <div style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.1)" }}/>}
                <div>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: s.color, letterSpacing: "-0.5px" }}>{s.val}</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — scooter illustration */}
        <div style={{ position: "relative", animation: "fadeUp .9s ease both", height: "500px" }}>
          <svg width="100%" height="500" viewBox="0 0 560 500" style={{ display: "block" }}>
            {/* Dark card background */}
            <rect width="560" height="500" fill="rgba(255,255,255,0.03)" rx="24" stroke="rgba(34,197,94,0.15)" strokeWidth="1"/>

            {/* City skyline silhouette */}
            <rect x="20" y="280" width="30" height="120" fill="rgba(34,197,94,0.06)" rx="3"/>
            <rect x="55" y="250" width="25" height="150" fill="rgba(34,197,94,0.08)" rx="3"/>
            <rect x="85" y="270" width="35" height="130" fill="rgba(34,197,94,0.06)" rx="3"/>
            <rect x="125" y="240" width="20" height="160" fill="rgba(34,197,94,0.05)" rx="3"/>
            <rect x="420" y="260" width="28" height="140" fill="rgba(34,197,94,0.07)" rx="3"/>
            <rect x="455" y="240" width="35" height="160" fill="rgba(34,197,94,0.05)" rx="3"/>
            <rect x="496" y="255" width="24" height="145" fill="rgba(34,197,94,0.06)" rx="3"/>
            <rect x="526" y="270" width="18" height="130" fill="rgba(34,197,94,0.04)" rx="3"/>

            {/* Road */}
            <rect x="0" y="380" width="560" height="80" fill="rgba(0,0,0,0.3)" rx="0"/>
            <rect x="0" y="380" width="560" height="4" fill="rgba(34,197,94,0.15)"/>
            <rect x="0" y="454" width="560" height="4" fill="rgba(34,197,94,0.1)"/>
            {/* Road dashes */}
            <line x1="0" y1="420" x2="560" y2="420" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="28 18" style={{ animation: "roadMove 1s linear infinite" }}/>

            {/* Street light */}
            <rect x="460" y="300" width="4" height="80" fill="rgba(34,197,94,0.3)" rx="2"/>
            <rect x="450" y="298" width="24" height="4" fill="rgba(34,197,94,0.3)" rx="2"/>
            <ellipse cx="462" cy="302" rx="8" ry="4" fill="rgba(255,255,200,0.15)"/>

            {/* Scooter */}
            <g style={{ animation: "scooterBob 2s ease-in-out infinite" }}>
              {/* Body */}
              <rect x="195" y="360" width="130" height="38" rx="14" fill="#15803d"/>
              <rect x="210" y="348" width="65" height="28" rx="8" fill="#166534"/>
              {/* Windshield */}
              <rect x="222" y="342" width="40" height="20" rx="6" fill="rgba(187,247,208,0.4)" stroke="rgba(187,247,208,0.3)" strokeWidth="1"/>
              {/* Delivery box */}
              <rect x="298" y="342" width="42" height="36" rx="8" fill="#166534" stroke="rgba(34,197,94,0.3)" strokeWidth="1"/>
              <rect x="303" y="347" width="32" height="26" rx="5" fill="#15803d"/>
              <text x="319" y="363" textAnchor="middle" fontSize="9" fill="#4ade80" fontFamily="Inter,sans-serif" fontWeight="700">PKG</text>
              {/* Rider */}
              <ellipse cx="250" cy="334" rx="15" ry="14" fill="#0f5132"/>
              <rect x="236" y="344" width="28" height="18" rx="5" fill="#166534"/>
              {/* Helmet visor */}
              <rect x="241" y="337" width="18" height="7" rx="3" fill="rgba(187,247,208,0.5)"/>
              {/* Front wheel */}
              <circle cx="218" cy="398" r="19" fill="#111827" stroke="rgba(34,197,94,0.4)" strokeWidth="2"/>
              <circle cx="218" cy="398" r="8" fill="#1f2937"/>
              <line x1="218" y1="388" x2="218" y2="408" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5"/>
              <line x1="208" y1="398" x2="228" y2="398" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5"/>
              {/* Rear wheel */}
              <circle cx="306" cy="398" r="19" fill="#111827" stroke="rgba(34,197,94,0.4)" strokeWidth="2"/>
              <circle cx="306" cy="398" r="8" fill="#1f2937"/>
              <line x1="306" y1="388" x2="306" y2="408" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5"/>
              <line x1="296" y1="398" x2="316" y2="398" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5"/>
              {/* Headlight glow */}
              <ellipse cx="200" cy="375" rx="7" ry="5" fill="rgba(255,255,200,0.6)"/>
              <ellipse cx="200" cy="375" rx="14" ry="8" fill="rgba(255,255,200,0.1)"/>
              {/* Speed lines */}
              <line x1="148" y1="368" x2="185" y2="368" stroke="rgba(34,197,94,0.4)" strokeWidth="2" strokeLinecap="round"/>
              <line x1="155" y1="377" x2="187" y2="377" stroke="rgba(34,197,94,0.25)" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="162" y1="386" x2="188" y2="386" stroke="rgba(34,197,94,0.15)" strokeWidth="1" strokeLinecap="round"/>
            </g>

            {/* Floating risk card */}
            <g style={{ animation: "float 3.5s ease-in-out infinite" }}>
              <rect x="320" y="40" width="200" height="88" rx="14" fill="rgba(15,30,18,0.95)" stroke="rgba(220,38,38,0.3)" strokeWidth="1"/>
              <circle cx="346" cy="68" r="8" fill="rgba(220,38,38,0.15)" stroke="rgba(220,38,38,0.4)" strokeWidth="1"/>
              <circle cx="346" cy="68" r="4" fill="#dc2626"/>
              <text x="362" y="63" fontSize="9" fontWeight="700" fill="#f87171" fontFamily="Inter,sans-serif">HIGH RISK</text>
              <text x="362" y="75" fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.8)" fontFamily="Inter,sans-serif">#DL-2981</text>
              <rect x="334" y="86" width="168" height="5" rx="2.5" fill="rgba(255,255,255,0.1)"/>
              <rect x="334" y="86" width="153" height="5" rx="2.5" fill="#dc2626"/>
              <text x="334" y="110" fontSize="9" fill="rgba(255,255,255,0.4)" fontFamily="Inter,sans-serif">Risk score 91% · WhatsApp sent</text>
            </g>

            {/* WhatsApp card */}
            <g style={{ animation: "float 4s ease-in-out infinite" }}>
              <rect x="28" y="60" width="180" height="72" rx="14" fill="rgba(15,30,18,0.95)" stroke="rgba(34,197,94,0.2)" strokeWidth="1"/>
              <rect x="44" y="76" width="30" height="30" rx="8" fill="rgba(34,197,94,0.15)"/>
              <text x="59" y="95" textAnchor="middle" fontSize="14" fill="#4ade80" fontFamily="Inter,sans-serif">💬</text>
              <text x="84" y="83" fontSize="10" fontWeight="700" fill="#4ade80" fontFamily="Inter,sans-serif">WhatsApp AI</text>
              <text x="84" y="96" fontSize="9" fill="rgba(255,255,255,0.5)" fontFamily="Inter,sans-serif">Customer notified</text>
              <text x="84" y="108" fontSize="9" fill="rgba(255,255,255,0.5)" fontFamily="Inter,sans-serif">Instructions updated</text>
            </g>

            {/* GPS ping */}
            <g style={{ animation: "float 3s ease-in-out infinite" }}>
              <circle cx="420" cy="330" r="20" fill="rgba(34,197,94,0.05)" style={{ animation: "pingRing 2s ease-out infinite" }}/>
              <circle cx="420" cy="330" r="14" fill="rgba(15,30,18,0.95)" stroke="rgba(34,197,94,0.3)" strokeWidth="1"/>
              <circle cx="420" cy="330" r="6" fill="#22c55e"/>
            </g>
          </svg>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ padding: "40px 64px", borderTop: "1px solid rgba(34,197,94,0.1)", borderBottom: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.2)", position: "relative" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px" }}>
          {[
            { icon: "⚡", val: count.toLocaleString(), label: "Deliveries Tracked" },
            { icon: "⏱", val: "98.6%", label: "On-Time Rate" },
            { icon: "↘", val: "-32%", label: "Risk Reduction" },
            { icon: "✓", val: "100%", label: "Verified Deliveries" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "13px", color: "#4ade80", marginBottom: "8px" }}>{s.icon}</p>
              <p style={{ fontSize: "32px", fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>{s.val}</p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "100px 64px", position: "relative" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{ fontSize: "48px", fontWeight: 900, color: "#fff", letterSpacing: "-2px", marginBottom: "16px" }}>Three systems. Zero failures.</h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)", maxWidth: "480px", margin: "0 auto" }}>Every delivery is monitored, triaged, and verified automatically.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
            {[
              {
                num: "01", title: "AI Risk Brain",
                desc: "ML model scores every delivery 0–100% using weather, traffic and customer history. Catches problems before they happen.",
                color: "#4ade80", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              },
              {
                num: "02", title: "WhatsApp Triage",
                desc: "Auto-sends WhatsApp when risk exceeds 75%. AI parses replies and updates driver instructions. Zero dispatcher needed.",
                color: "#60a5fa", bg: "rgba(96,165,250,0.08)", border: "rgba(96,165,250,0.2)",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="#60a5fa"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
              },
              {
                num: "03", title: "Live Map + Proof",
                desc: "Real-time delivery tracking with GPS geofencing. Drivers verify delivery with location match and timestamped photo.",
                color: "#c084fc", bg: "rgba(192,132,252,0.08)", border: "rgba(192,132,252,0.2)",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              },
            ].map((f, i) => (
              <div key={i} className="feature-card" style={{ background: f.bg, border: `1px solid ${f.border}`, borderRadius: "20px", padding: "32px", transition: "all .25s", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                  <div style={{ width: "44px", height: "44px", background: "rgba(255,255,255,0.05)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {f.icon}
                  </div>
                  <span style={{ fontSize: "32px", fontWeight: 800, color: "rgba(255,255,255,0.06)", letterSpacing: "-1px" }}>{f.num}</span>
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>{f.title}</h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 64px", textAlign: "center", borderTop: "1px solid rgba(34,197,94,0.1)" }}>
        <div style={{ width: "56px", height: "56px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h2 style={{ fontSize: "40px", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", marginBottom: "16px" }}>Ready to eliminate delivery failures?</h2>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)", marginBottom: "32px" }}>Start monitoring your deliveries today.</p>
        <Link href="/login" style={{ background: "#15803d", color: "#fff", borderRadius: "12px", padding: "16px 40px", fontSize: "16px", fontWeight: 700, display: "inline-block", boxShadow: "0 4px 20px rgba(21,128,61,0.5)", transition: "all .2s" }}>
          Start Free →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(34,197,94,0.1)", padding: "28px 64px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "26px", height: "26px", background: "#15803d", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: "15px" }}><span style={{ color: "#fff" }}>Swift</span><span style={{ color: "#4ade80" }}>Lane</span></span>
        </div>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>© 2026 SwiftLane. AI-powered delivery risk prevention.</p>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy", "Terms", "Contact"].map((t) => (
            <span key={t} style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>{t}</span>
          ))}
        </div>
      </footer>
    </main>
  );
}