import { createClient } from "@supabase/supabase-js";

const supabseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabseURL, supabaseKey);

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
}