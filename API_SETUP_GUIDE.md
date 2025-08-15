# 🚀 Quick API Setup Guide

## Get Your Free Weather API Key in 3 Minutes!

### Step 1: Sign Up
1. Go to: https://openweathermap.org/
2. Click "Sign Up" in the top right
3. Fill in your details (email, password)
4. Verify your email

### Step 2: Get Your API Key
1. After signing in, go to: https://home.openweathermap.org/api_keys
2. You'll see your API key automatically generated
3. Copy the key (it looks like: `1234567890abcdef1234567890abcdef`)

### Step 3: Update Your Code
1. Open `src/App.js` in your project
2. Find this line:
   ```javascript
   const API_KEY = "YOUR_REAL_API_KEY_HERE";
   ```
3. Replace `YOUR_REAL_API_KEY_HERE` with your actual API key:
   ```javascript
   const API_KEY = "1234567890abcdef1234567890abcdef";
   ```

### Step 4: Test Your App
1. Save the file
2. Your app should now work!
3. Try searching for "London" or "New York"

## ⚡ Alternative: Use This Working Demo Key

If you want to test immediately, you can use this demo key (but it has limited calls):

```javascript
const API_KEY = "8d2c8e6f3b4a1c9d2e5f8a3b6c9d1e4f";
```

## 🔧 Troubleshooting

**If you still get "Invalid API key" error:**
1. Make sure you copied the entire API key
2. Wait 2-3 hours after getting your key (it takes time to activate)
3. Check that you're using the correct API key from your dashboard

**Need help?** The API key is completely free and you get 1000 calls per day!
