import { createClient } from "@supabase/supabase-js";

const supabseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabseURL || !supabaseKey) {
    throw new Error("Please provide SUPABASE_URL and SUPABASE_KEY in the environment variables");
}

export const supabase = createClient(supabseURL, supabaseKey);

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
}