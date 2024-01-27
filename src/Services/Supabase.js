import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ttundbeovimgoopfiueq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0dW5kYmVvdmltZ29vcGZpdWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwNDk4ODgsImV4cCI6MjAxOTYyNTg4OH0.fWqyUdX8jxkxWVdPPxcI4IhkhvRZ2eIhFYlyWRkpYqM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
