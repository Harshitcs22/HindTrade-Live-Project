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
    document.getElementById('selected-role').value = role;
    
    // Reset buttons
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('border-blue-500', 'bg-blue-500/20', 'text-white');
        btn.classList.add('border-white/10', 'bg-white/5', 'text-gray-400');
    });
    
    // Highlight active button
    const activeBtn = document.querySelector(`button[data-role="${role}"]`);
    activeBtn.classList.remove('border-white/10', 'bg-white/5', 'text-gray-400');
    activeBtn.classList.add('border-blue-500', 'bg-blue-500/20', 'text-white');

    // Show/Hide fields
    const gstField = document.getElementById('gst-field');
    const udinField = document.getElementById('udin-field');

    if (role === 'ca') {
        gstField.classList.add('hidden');
        udinField.classList.remove('hidden');
    } else if (role === 'buyer') {
        gstField.classList.add('hidden');
        udinField.classList.add('hidden');
    } else {
        gstField.classList.remove('hidden');
        udinField.classList.add('hidden');
    }
}

// 3. Handle SIGN UP
async function handleSignup(e) {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('selected-role').value;
    const company = document.getElementById('company-name').value;
    const gst = document.getElementById('gst-number').value;
    const udin = document.getElementById('udin-number').value;

    const errorMsg = document.getElementById('error-msg');
    const successMsg = document.getElementById('success-msg');
    
    errorMsg.classList.add('hidden');
    successMsg.classList.add('hidden');

    try {
        // A. Create User in Supabase Auth
        const { data, error } = await window.sb.auth.signUp({
            email: email,
            password: password
        });

        if (error) throw error;

        // B. Insert Extra Details into 'profiles' table
        const { error: profileError } = await window.sb
            .from('profiles')
            .insert([
                { 
                    id: data.user.id, 
                    email: email,
                    role: role,
                    company_name: company,
                    gst_number: role === 'seller' ? gst : null,
                    udin_number: role === 'ca' ? udin : null
                }
            ]);

        if (profileError) throw profileError;

        successMsg.innerText = "Account created! Redirecting...";
        successMsg.classList.remove('hidden');
        
        // C. Redirect to Dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);

    } catch (err) {
        errorMsg.innerText = err.message;
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
        window.location.href = 'dashboard.html';

    } catch (err) {
        errorMsg.innerText = err.message;
        errorMsg.classList.remove('hidden');
    }
}