// assets/js/supabase-config.js

// 1. YOUR SUPABASE KEYS
const SUPABASE_URL = 'https://fpwudmcrvgknsdtowrqb.supabase.co';

// 🔴 IMPORTANT: Copy the full key from your dashboard and paste it inside the quotes below
const SUPABASE_ANON_KEY = 'sb_publishable_I60QCfCHJVTtWEWvghs34g_Ce2aJ6d8'; 

// 2. Initialize Supabase
let supabaseClient;

// We check if the SDK is loaded to prevent errors
if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("✅ Supabase Connected");
} else {
    console.error("❌ Supabase SDK not found. Ensure the CDN script is in your HTML head.");
}

// 3. Export for use in other files
window.sb = supabaseClient;