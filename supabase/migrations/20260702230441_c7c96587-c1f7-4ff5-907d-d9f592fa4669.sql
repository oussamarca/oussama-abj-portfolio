REVOKE SELECT ON public.contact_messages FROM anon, authenticated;
CREATE POLICY "No client reads on contact messages" ON public.contact_messages FOR SELECT TO anon, authenticated USING (false);