import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(150).optional(),
  message: z.string().trim().min(1).max(5000),
});

const RECIPIENTS = [
  "oussamaabdel889@gmail.com",
  "abdeljebbaroussama51@gmail.com",
];

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildHtml(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  sentAt: string;
}) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const subject = escapeHtml(data.subject ?? "New Portfolio Contact");
  const messageHtml = escapeHtml(data.message).replace(/\n/g, "<br />");
  const sentAt = escapeHtml(data.sentAt);

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f6fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.08);">
            <tr>
              <td style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);padding:28px 32px;color:#ffffff;">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:0.85;">Portfolio Contact</div>
                <div style="font-size:22px;font-weight:700;margin-top:6px;">New message from ${name}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6;">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;color:#64748b;width:120px;">Name</td>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;font-weight:600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;color:#64748b;">Email</td>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;">
                      <a href="mailto:${email}" style="color:#4f46e5;text-decoration:none;font-weight:600;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;color:#64748b;">Subject</td>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;">${subject}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#64748b;">Date &amp; Time</td>
                    <td style="padding:10px 0;">${sentAt}</td>
                  </tr>
                </table>

                <div style="margin-top:24px;padding:20px;background:#f8fafc;border:1px solid #eef2f7;border-radius:12px;">
                  <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:#64748b;margin-bottom:10px;">Message</div>
                  <div style="font-size:15px;line-height:1.7;color:#0f172a;white-space:pre-wrap;">${messageHtml}</div>
                </div>

                <div style="margin-top:28px;text-align:center;">
                  <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(
                    data.subject ?? "New Portfolio Contact",
                  )}" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:10px;">
                    Reply to ${name}
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background:#0f172a;color:#94a3b8;font-size:12px;text-align:center;">
                Sent from your portfolio contact form
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const raw = await request.json().catch(() => null);
          const parsed = contactSchema.safeParse(raw);
          if (!parsed.success) {
            return Response.json(
              { success: false, error: "Please check the form and try again." },
              { status: 400 },
            );
          }

          const apiKey = process.env.RESEND_API_KEY;
          if (!apiKey) {
            console.error("[contact] RESEND_API_KEY missing");
            return Response.json(
              { success: false, error: "Email service is not configured." },
              { status: 500 },
            );
          }

          const { Resend } = await import("resend");
          const resend = new Resend(apiKey);

          const sentAt = new Date().toLocaleString("en-US", {
            dateStyle: "full",
            timeStyle: "short",
          });

          const html = buildHtml({ ...parsed.data, sentAt });
          const subjectLine = "New Portfolio Contact";

          const { error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: RECIPIENTS,
            replyTo: parsed.data.email,
            subject: subjectLine,
            html,
          });

          if (error) {
            console.error("[contact] resend error", error);
            return Response.json(
              { success: false, error: "Could not deliver your message." },
              { status: 502 },
            );
          }

          return Response.json({ success: true });
        } catch (err) {
          console.error("[contact] handler error", err);
          return Response.json(
            { success: false, error: "Unexpected server error." },
            { status: 500 },
          );
        }
      },
    },
  },
});
