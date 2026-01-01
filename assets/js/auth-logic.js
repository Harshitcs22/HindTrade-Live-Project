// assets/js/auth-logic.js

// 1. Tab Switching (Login vs Signup)
function toggleTab(tab) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginTab = document.getElementById('tab-login');
    const signupTab = document.getElementById('tab-signup');

    if(tab === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginTab.classList.add('text-blue-400', 'border-b-2', 'border-blue-400');
        loginTab.classList.remove('text-gray-400');
        signupTab.classList.remove('text-blue-400', 'border-b-2', 'border-blue-400');
        signupTab.classList.add('text-gray-400');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        signupTab.classList.add('text-blue-400', 'border-b-2', 'border-blue-400');
        signupTab.classList.remove('text-gray-400');
        loginTab.classList.remove('text-blue-400', 'border-b-2', 'border-blue-400');
        loginTab.classList.add('text-gray-400');
    }
}

// 2. Role Selection Logic
function selectRole(role) {
    document.getElementById('role').value = role;
    
    // Reset buttons
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('border-blue-500', 'bg-blue-500/20', 'text-white');
        btn.classList.add('border-white/10', 'bg-white/5', 'text-gray-400');
    });
    
    // Highlight active button
    const activeBtn = document.querySelector(`button[data-role="${role}"]`);
    activeBtn.classList.remove('border-white/10', 'bg-white/5', 'text-gray-400');
    activeBtn.classList.add('border-blue-500', 'bg-blue-500/20', 'text-white');
}

// 3. Handle SIGN UP (FIXED: Removed duplicate insert)
async function handleSignup(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const fullName = document.getElementById('fullName').value;
    const companyName = document.getElementById('companyName').value;
    const phone = document.getElementById('phone').value;
    const role = document.getElementById('role').value; // 'exporter', 'ca', 'cha'
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const businessCategory = document.getElementById('businessCategory').value;

    const errorMsg = document.getElementById('error-msg');
    const successMsg = document.getElementById('success-msg');
    
    errorMsg.classList.add('hidden');
    successMsg.classList.add('hidden');

    try {
        // Step 1: Sign up with Supabase Auth (Trigger will handle profile creation)
        const { data: authData, error: authError } = await window.sb.auth.signUp({
            email,
            password,
            options: {
                // Hum sara data yahan bhej rahe hain taaki SQL Trigger isey use karle
                data: {
                    full_name: fullName,
                    company_name: companyName,
                    phone: phone,
                    role: role,
                    city: city,
                    state: state,
                    business_category: businessCategory
                }
            }
        });

        if (authError) throw authError;

        // Note: Humne yahan se Manual Insert hata diya hai kyunki Trigger automatic kaam karega.

        successMsg.innerText = '✅ Signup successful! Redirecting...';
        successMsg.classList.remove('hidden');
        
        setTimeout(() => {
            window.location.href = 'index.html'; // Ya dashboard.html
        }, 2000);

    } catch (error) {
        console.error('Signup error:', error);
        errorMsg.innerText = '❌ Error: ' + error.message;
        errorMsg.classList.remove('hidden');
    }
}

// 4. Handle LOGIN
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorMsg = document.getElementById('error-msg');

    try {
        const { data, error } = await window.sb.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        // Redirect on success
        window.location.href = 'index.html'; // Ya dashboard.html

    } catch (err) {
        errorMsg.innerText = err.message;
        errorMsg.classList.remove('hidden');
    }
}
