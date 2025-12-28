// assets/js/supabase-config.js

// 1. YOUR SUPABASE KEYS
const SUPABASE_URL = 'https://fgzlekquexmtnzrhjswd.supabase.co';

// 🔴 IMPORTANT: Copy the full key from your dashboard and paste it inside the quotes below
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnemxla3F1ZXhtdG56cmhqc3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5NDgxNTQsImV4cCI6MjA4MjUyNDE1NH0.hEDqZzidfJJTE5n0KF2Jd1XNMSbDyZcut4MP-PCi1NY'; 

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
