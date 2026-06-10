GRANT INSERT ON public.contact_messages TO anon, authenticated;

CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) BETWEEN 1 AND 100
    AND length(trim(email)) BETWEEN 3 AND 255
    AND length(trim(subject)) BETWEEN 1 AND 150
    AND length(trim(message)) BETWEEN 10 AND 2000
  );