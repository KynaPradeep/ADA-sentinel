"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { user } from "../lib/mockData";

export default function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <nav style={{
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid #f0f0f0",
      padding: "0 48px",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
      fontFamily: "'Inter', sans-serif",
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="8" fill="#15803d"/>
          <path d="M7 14l4 4 10-10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontWeight: 700, fontSize: "17px", color: "#111827", letterSpacing: "-0.4px" }}>SwiftLane</span>
      </Link>

      {isDashboard ? (
        <div style={{ display: "flex", gap: "4px" }}>
          {[
            { label: "Overview", href: "/dashboard" },
            { label: "Deliveries", href: "/dashboard/deliveries" },
            { label: "Analytics", href: "/dashboard/analytics" },
            { label: "Settings", href: "/dashboard/settings" },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{
              padding: "6px 14px", borderRadius: "8px", fontSize: "14px", fontWeight: 500,
              color: pathname === item.href ? "#15803d" : "#6b7280",
              background: pathname === item.href ? "#f0fdf4" : "transparent",
              textDecoration: "none", transition: "all .15s",
            }}>{item.label}</Link>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", gap: "28px" }}>
          {[
            { label: "Product", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "About", href: "#about" },
          ].map((n) => (
            <Link key={n.label} href={n.href} style={{ fontSize: "14px", color: "#6b7280", fontWeight: 500, textDecoration: "none", transition: "color .15s" }}>{n.label}</Link>
          ))}
        </div>
      )}

      {isDashboard ? (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
      ) : (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link href="/login" style={{ fontSize: "14px", color: "#374151", fontWeight: 500, textDecoration: "none", padding: "8px 16px" }}>Login</Link>
          <Link href="/login" style={{ background: "#15803d", color: "#fff", borderRadius: "10px", padding: "9px 20px", fontSize: "14px", fontWeight: 600, textDecoration: "none", boxShadow: "0 2px 8px rgba(21,128,61,0.25)" }}>Sign up</Link>
        </div>
      )}
    </nav>
  );
}