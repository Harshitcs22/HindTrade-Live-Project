# Testing Guide - HindTrade AI Dashboard

This document outlines how to test the HindTrade AI dashboard implementation.

## Prerequisites

- Python 3.x installed
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Active internet connection (for CDN resources and Supabase)
- Supabase project configured with the provided credentials

## Running the Application

### 1. Start Local Server

```bash
cd HindTradeAI-live-project
python3 -m http.server 8000
```

You should see:
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

### 2. Open in Browser

Navigate to: http://localhost:8000/index.html

## Test Scenarios

### ✅ Test 1: Login Page Loads

**Steps:**
1. Open http://localhost:8000/index.html
2. Verify the page loads with:
   - HindTrade AI logo and title
   - Login/Sign Up tabs
   - Email and Password fields
   - "Forgot password?" link
   - "Login to Dashboard" button

**Expected Result:** Page loads with all elements visible and styled correctly.

### ✅ Test 2: Sign Up Flow

**Steps:**
1. Click "Sign Up" tab
2. Fill in the form:
   - Full Name: "Test User"
   - Company Name: "Test Exports Ltd"
   - Location: "Mumbai, India"
   - Email: "test@example.com"
   - Password: "test123456"
3. Check the terms checkbox
4. Click "Create Account"

**Expected Result:**
- Success message appears
- Auto-redirects to dashboard.html
- User is logged in

**Browser Console:** Should show:
```
✅ Supabase Client Initialized
✅ HindTrade API (htAPI) initialized and ready
📝 Attempting sign up: test@example.com
✅ Sign up successful: test@example.com
➕ Creating profile for user: [user-id]
✅ Profile created
```

### ✅ Test 3: Login Flow

**Steps:**
1. Open http://localhost:8000/index.html
2. Enter existing credentials:
   - Email: Your registered email
   - Password: Your password
3. Click "Login to Dashboard"

**Expected Result:**
- Success message appears
- Redirects to dashboard.html
- Dashboard loads with user profile

**Browser Console:** Should show:
```
🔐 Attempting sign in: [email]
✅ Sign in successful: [email]
```

### ✅ Test 4: Protected Route (No Session)

**Steps:**
1. Open http://localhost:8000/dashboard.html directly (without logging in)

**Expected Result:**
- Immediately redirects to index.html
- Shows login page

**Browser Console:** Should show:
```
🚀 Initializing HindTrade Dashboard...
📋 Session: null
❌ No session, redirecting to login...
```

### ✅ Test 5: Dashboard Data Loading

**Steps:**
1. Login successfully
2. Dashboard should load with:
   - User profile card with name and location
   - Company initials in sidebar
   - Credits display in header
   - Trust score in trade card
   - Navigation menu (Dashboard, Global Trades, Inventory, AI Agents, Experts)

**Expected Result:**
- All user data displays correctly
- No "undefined" or "null" shown
- Graceful fallbacks for missing data (e.g., "0" for credits)

**Browser Console:** Should show:
```
🚀 Initializing HindTrade Dashboard...
📋 Session: [session object]
✅ User authenticated: [email]
👤 Fetching profile for user: [user-id]
✅ Profile loaded: [name]
✅ Real-time listener setup complete
```

### ✅ Test 6: Navigation Between Pages

**Steps:**
1. From Dashboard, click each navigation item:
   - Dashboard
   - Global Trades
   - Inventory
   - AI Agents
   - Experts

**Expected Result:**
- Content area updates smoothly
- Page title changes in header
- Active navigation item is highlighted
- No page refresh

### ✅ Test 7: Profile Edit

**Steps:**
1. On Dashboard page, click "Edit" button in profile card
2. Modify name or location
3. Click "Save"

**Expected Result:**
- Changes save
- UI updates with new values
- Sidebar name updates

**Note:** Full save-to-database requires updateUserProfile implementation.

### ✅ Test 8: Logout

**Steps:**
1. While logged in, click "Log Out" button in sidebar
2. Verify redirect to login page

**Expected Result:**
- Logs out successfully
- Redirects to index.html
- Session cleared
- Attempting to access dashboard.html redirects to login

### ✅ Test 9: Forgot Password

**Steps:**
1. On login page, click "Forgot password?"
2. Enter email address in prompt
3. Click OK

**Expected Result:**
- Success message shows
- Password reset email sent to inbox
- Check email for reset link

**Browser Console:** Should show:
```
🔑 Requesting password reset for: [email]
✅ Password reset email sent
```

### ✅ Test 10: Real-time Updates (Advanced)

**Prerequisites:** Two browser windows open, both logged in as same user

**Steps:**
1. Window 1: Login to dashboard
2. Window 2: Login to dashboard (same user)
3. Window 1: Use Supabase dashboard to update user credits
4. Observe Window 2

**Expected Result:**
- Credits in Window 2 header update automatically
- No page refresh needed

**Browser Console:** Should show:
```
📡 Profile update received: [payload]
```

## Error Handling Tests

### ❌ Test 11: Invalid Login

**Steps:**
1. Try to login with wrong password

**Expected Result:**
- Error message displays
- Login button returns to normal state
- No redirect

### ❌ Test 12: Missing Profile Data

**Steps:**
1. Login with user that has minimal profile data (no credits, trust_score, etc.)

**Expected Result:**
- Dashboard loads without errors
- Missing fields show defaults:
  - Credits: 0
  - Trust Score: 0/100
  - Net Worth: N/A
  - Shipments: 0+

### ❌ Test 13: Network Error

**Steps:**
1. Disconnect internet
2. Try to login

**Expected Result:**
- Error message appears
- Graceful error handling
- No JavaScript exceptions

## Console Checks

### Successful Initialization

You should see these console logs on successful dashboard load:

```
✅ Supabase Client Initialized
✅ HindTrade API (htAPI) initialized and ready
🚀 Initializing HindTrade Dashboard...
📋 Session: [session object]
✅ User authenticated: user@email.com
👤 Fetching profile for user: [user-id]
✅ Profile loaded: [User Name]
📡 Setting up profile listener for: [user-id]
✅ Profile listener active
✅ Real-time listener setup complete
```

### No Errors

The console should NOT show:
- ❌ "Cannot read properties of undefined"
- ❌ "null is not an object"
- ❌ Failed API calls (500 errors)

## Known Limitations

1. **CDN Blocking in Sandboxed Environments**: In restricted environments, CDN resources may be blocked. The app will still function but styling may not load.

2. **Supabase RLS Policies**: Ensure Row Level Security policies are configured correctly in Supabase for all tables.

3. **Email Confirmation**: If Supabase has email confirmation enabled, new users must verify email before logging in.

4. **Data Display**: Some dashboard sections show static/sample data. To see real data:
   - Populate `trade_opportunities` table
   - Populate `agents` table
   - Populate `experts` table

## Troubleshooting

### Issue: "Supabase SDK not loaded"

**Solution:** Check internet connection and ensure CDN resources can load:
- https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2

### Issue: "getCurrentSession error: Cannot read properties of undefined"

**Solution:** 
- Supabase SDK failed to load
- Check CORS settings
- Verify Supabase URL and anon key in `supabase-config.js`

### Issue: Login succeeds but dashboard shows empty

**Solution:**
- Check if user_profiles table has data for the user
- Run `setup.sql` to ensure all columns exist
- Check browser console for specific errors

### Issue: Real-time updates not working

**Solution:**
- Enable Realtime in Supabase dashboard
- Check if table is added to `supabase_realtime` publication
- Verify RLS policies allow reading

## Performance Checks

- [ ] Login page loads in < 2 seconds
- [ ] Dashboard loads in < 3 seconds after login
- [ ] Navigation between pages is instant (< 100ms)
- [ ] No memory leaks (check browser Task Manager)
- [ ] Mobile responsive (test on phone or browser DevTools)

## Mobile Testing

1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device (iPhone, Pixel, etc.)
4. Test all scenarios above
5. Verify:
   - Login form is usable
   - Dashboard is readable
   - Navigation menu works
   - Buttons are tap-friendly

## Deployment Verification

After deploying to Vercel/Netlify:

1. Visit production URL
2. Verify all CDN resources load (check Network tab)
3. Test login flow
4. Test dashboard
5. Check that all assets load over HTTPS
6. Verify no CORS errors

## Success Criteria

✅ All tests pass
✅ No console errors
✅ Authentication works
✅ Dashboard loads with user data
✅ Navigation works
✅ Mobile responsive
✅ Production deployment successful

---

**Last Updated:** 2026-01-01
**Version:** 1.0.0
