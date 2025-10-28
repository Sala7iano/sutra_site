import { NextResponse } from "next/server";
import crypto from "crypto";

const PAYMOB_HMAC = process.env.PAYMOB_HMAC!;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const obj = body.obj;

    // 🧾 Step 1 – verify HMAC signature
    const hmacString = [
      obj.amount_cents,
      obj.created_at,
      obj.currency,
      obj.error_occured,
      obj.has_parent_transaction,
      obj.id,
      obj.integration_id,
      obj.is_3d_secure,
      obj.is_auth,
      obj.is_capture,
      obj.is_refunded,
      obj.is_standalone_payment,
      obj.is_voided,
      obj.order.id,
      obj.owner,
      obj.pending,
      obj.source_data.pan,
      obj.source_data.sub_type,
      obj.source_data.type,
      obj.success,
    ].join("");

    const computedHash = crypto
      .createHmac("sha512", PAYMOB_HMAC)
      .update(hmacString)
      .digest("hex");

    if (computedHash !== body.hmac) {
      console.error("Invalid HMAC signature");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🛒 Step 2 – record successful deposits
    if (obj.success) {
      const order = obj.order;

      const record = {
        fields: {
          items: JSON.stringify(order.items || []),
          total_cents: Number(obj.amount_cents),
          deposit_cents: Number(obj.amount_cents),
          customer_name: order.billing_data.first_name || "Guest",
          customer_email: order.billing_data.email || "",
          customer_phone: order.billing_data.phone_number || "",
          paymob_order_id: order.id,
          status: "deposit_paid",
          paid_at: new Date().toISOString(),
        },
      };

      const airtableResp = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Orders`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ records: [record] }),
        },
      );

      if (!airtableResp.ok) {
        const txt = await airtableResp.text();
        console.error("Airtable insert failed:", txt);
        return NextResponse.json(
          { error: "Failed to insert Airtable record" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: err.message || "Webhook failed" },
      { status: 500 }
    );
  }
}