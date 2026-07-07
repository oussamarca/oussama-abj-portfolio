import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(10).max(2000),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const GENERIC_ERROR = "Service temporarily unavailable. Please try again later.";
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("contact_messages").insert({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });

      if (error) {
        console.error("[contact] insert failed", error);
        throw new Error(GENERIC_ERROR);
      }

      return { ok: true };
    } catch (err) {
      console.error("[contact] handler error", err);
      throw new Error(GENERIC_ERROR);
    }
  });
