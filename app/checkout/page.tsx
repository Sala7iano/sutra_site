"use client";
import { useEffect, useState } from "react";

type CartItem = { name: string; price: string; img?: string };

export default function Checkout() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(c);
      const saved = JSON.parse(localStorage.getItem("checkout_form") || "null");
      if (saved) setForm(saved);
    } catch {}
  }, []);

  const setField = (k: string, v: string) => {
    const next = { ...form, [k]: v };
    setForm(next);
    localStorage.setItem("checkout_form", JSON.stringify(next));
  };

  const parseEGP = (s: string) => {
    const m = (s || "").match(/[\d.]+/);
    return m ? Math.round(parseFloat(m[0]) * 100) : 0;
  };

  // ─── Deposit logic ───────────────────────────────────────
  const fullAmountCents = cart.reduce((sum, p) => sum + parseEGP(p.price), 0);
  const depositEGP = 200;
  const depositCents = depositEGP * 100;

  const items = cart.map((p) => ({
    name: p.name,
    amount_cents: parseEGP(p.price),
    quantity: 1,
  }));

  const payNow = async () => {
    setErr("");
    if (!cart.length) {
      setErr("Your cart is empty.");
      return;
    }

    const nameReg = /^[A-Za-z\u0621-\u064A\s]{2,}$/;
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneReg = /^\+?\d{8,15}$/;

    if (!nameReg.test(form.first_name)) {
      setErr("Please enter a valid first name (letters or Arabic only).");
      return;
    }
    if (form.last_name && !nameReg.test(form.last_name)) {
      setErr("Please enter a valid last name (letters or Arabic only).");
      return;
    }
    if (!emailReg.test(form.email)) {
      setErr("Please enter a valid email address.");
      return;
    }
    if (!phoneReg.test(form.phone_number)) {
      setErr("Please enter a valid phone number including country code.");
      return;
    }

    try {
      setBusy(true);
      const res = await fetch("/api/paymob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountCents: depositCents,   // deposit only
          fullAmountCents,
          items,
          billing: form,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.url) {
        console.error("PAYMOB_ERROR", data);
        setErr(data?.error || "Payment initialization failed.");
        setBusy(false);
        return;
      }
      window.location.href = data.url;
    } catch (e: any) {
      console.error("NETWORK_ERROR", e);
      setErr(e?.message || "Network error.");
      setBusy(false);
    }
  };

  return (
    <section style={{ textAlign: "center", padding: "4em 1em" }}>
      {/* 🔴 TEMP DEBUG LINE */}

      <h2>Checkout</h2>

      {cart.length ? (
        <>
          <div style={{ maxWidth: 700, margin: "1.5em auto", textAlign: "left" }}>
            {cart.map((p, i) => (
              <p key={i} style={{ borderBottom: "1px solid #eee", padding: ".5em 0" }}>
                {p.name} — {p.price}
              </p>
            ))}
            <p style={{ fontWeight: 700, marginTop: "0.5em" }}>
              <span style={{ color: "#36454F" }}>Total Value:</span>{" "}
              {(fullAmountCents / 100).toFixed(0)} EGP
            </p>
            <p
              style={{
                color: "#C5A253",
                fontSize: "1.1rem",
                marginTop: ".4em",
              }}
            >
              Deposit required now: {depositEGP} EGP 
              <span style={{ color: "#36454F", fontSize: ".95rem" }}>
                (remaining due on delivery)
              </span>
            </p>
          </div>

          <div
            style={{
              maxWidth: 600,
              margin: "1.5em auto",
              display: "grid",
              gap: "0.8em",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <input
              placeholder="First name"
              value={form.first_name}
              onChange={(e) => setField("first_name", e.target.value)}
              style={{
                padding: "0.7em",
                border: "1px solid #ddd",
                borderRadius: 4,
              }}
            />
            <input
              placeholder="Last name"
              value={form.last_name}
              onChange={(e) => setField("last_name", e.target.value)}
              style={{
                padding: "0.7em",
                border: "1px solid #ddd",
                borderRadius: 4,
              }}
            />
            <input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              style={{
                gridColumn: "span 2",
                padding: "0.7em",
                border: "1px solid #ddd",
                borderRadius: 4,
              }}
            />
            <input
              placeholder="Phone (e.g. +201234567890)"
              value={form.phone_number}
              onChange={(e) => setField("phone_number", e.target.value)}
              style={{
                gridColumn: "span 2",
                padding: "0.7em",
                border: "1px solid #ddd",
                borderRadius: 4,
              }}
            />
          </div>

          {err && <p style={{ color: "#C00" }}>{err}</p>}

          <button
            onClick={payNow}
            disabled={busy}
            style={{
              marginTop: "1em",
              padding: "0.8em 1.6em",
              border: "1px solid #C5A253",
              borderRadius: 4,
              background: busy ? "#C5A25380" : "#C5A253",
              color: "#fff",
              cursor: busy ? "default" : "pointer",
              fontSize: "1rem",
            }}
          >
            {busy ? "Redirecting…" : `Pay Deposit (${depositEGP} EGP)`}
          </button>

          <p style={{ marginTop: "1em", fontSize: ".9rem", color: "#555" }}>
            After completing your {depositEGP} EGP deposit, our team will confirm
            your order and arrange delivery. The remaining balance is collected
            upon delivery.
          </p>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </section>
  );
}