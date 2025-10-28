import { NextResponse } from "next/server";

const API_BASE = "https://accept.paymob.com/api";

export async function POST(req: Request) {
  try {
    const { amountCents, fullAmountCents, items, billing } = await req.json();

    const api_key = process.env.PAYMOB_API_KEY;
    const integration_id = process.env.PAYMOB_CARD_INTEGRATION_ID;
    const iframe_id = process.env.PAYMOB_IFRAME_ID;

    if (!api_key || !integration_id || !iframe_id) {
      return NextResponse.json(
        { error: "Missing Paymob environment variables" },
        { status: 500 }
      );
    }

    // 1️⃣ Authenticate
    const tokenRes = await fetch(`${API_BASE}/auth/tokens`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) {
      throw new Error("Paymob token error: " + JSON.stringify(tokenData));
    }
    const auth_token = tokenData.token;

    // 2️⃣ Create order (the deposit only)
    const orderRes = await fetch(`${API_BASE}/ecommerce/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token,
        delivery_needed: false,
        amount_cents: amountCents, // deposit
        currency: "EGP",
        items: items || [],
      }),
    });
    const orderData = await orderRes.json();
    if (!orderRes.ok) {
      throw new Error("Paymob order error: " + JSON.stringify(orderData));
    }
    const order_id = orderData.id;

    // 3️⃣ Create payment key
    const billing_data = {
      apartment: "NA",
      email: billing?.email || "customer@example.com",
      floor: "NA",
      first_name: billing?.first_name || "Guest",
      street: "NA",
      building: "NA",
      phone_number: billing?.phone_number || "+201000000000",
      shipping_method: "PKG",
      postal_code: "00000",
      city: "Cairo",
      country: "EG",
      last_name: billing?.last_name || "",
      state: "NA",
    };

    const keyRes = await fetch(`${API_BASE}/acceptance/payment_keys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token,
        amount_cents: amountCents,
        expiration: 3600,
        order_id,
        billing_data,
        currency: "EGP",
        integration_id: Number(integration_id),
        // You can attach metadata for Airtable later:
        metadata: {
          full_total: fullAmountCents,
          deposit: amountCents,
        },
      }),
    });
    const keyData = await keyRes.json();
    if (!keyRes.ok || !keyData.token) {
      throw new Error("Paymob payment key error: " + JSON.stringify(keyData));
    }

    const payment_token = keyData.token;
    const url = `https://accept.paymob.com/api/acceptance/iframes/${iframe_id}?payment_token=${payment_token}`;

    return NextResponse.json({ url });
  } catch (err: any) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message || err },
      { status: 500 }
    );
  }
}