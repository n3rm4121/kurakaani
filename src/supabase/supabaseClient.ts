import { createClient } from "@supabase/supabase-js";

const supabseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabseURL || !supabaseKey) {
    throw new Error("Please provide SUPABASE_URL and SUPABASE_KEY in the environment variables");
}

export const supabase = createClient("https://cpcqjoamwpspnryfgpzz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwY3Fqb2Ftd3BzcG5yeWZncHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyMjgxNzksImV4cCI6MjA0NDgwNDE3OX0.DijT8bIL_77ATerj9ciguWxkL5PpIq2F40o6lxVUe9c");

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
}