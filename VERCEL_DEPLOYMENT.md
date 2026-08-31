# 🚀 1-Server Unified Vercel Deployment & Environment Variables

**Piyush Travels** is now converted into a **Single Unified Full-Stack Server (Next.js 16 + React 19 + Serverless API Routes + MongoDB + Razorpay)**. You only need to deploy **one single project on Vercel**!

---

## 📋 Exact Environment Variables to Upload on Vercel

In your **Vercel Dashboard** ➡️ Go to **Project** ➡️ **Settings** ➡️ **Environment Variables** and add:

| Variable Key | Example Value | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.piyush-travels.com` | Official website domain |
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/piyush_travels` | MongoDB Atlas Connection String |
| `JWT_SECRET` | `your_super_secret_jwt_random_key_32_chars` | Secret key to sign & verify JWT auth tokens |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | `rzp_live_xxxxxxxxxxxx` | Razorpay public key ID for checkout UI |
| `RAZORPAY_KEY_ID` | `rzp_live_xxxxxxxxxxxx` | Razorpay key ID for server order generation |
| `RAZORPAY_KEY_SECRET` | `your_razorpay_secret_key` | Razorpay secret key for payment verification |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | `xxxx.apps.googleusercontent.com` | Google OAuth Client ID for 1-click Google Sign-In |
| `SMTP_HOST` *(Optional)* | `smtp.gmail.com` | Email SMTP host for invoice & booking alerts |
| `SMTP_PORT` *(Optional)* | `587` | Email SMTP port |
| `SMTP_USER` *(Optional)* | `bookings@piyush-travels.com` | SMTP email address |
| `SMTP_PASS` *(Optional)* | `your_gmail_app_password` | SMTP App password |

---

## ⚡ Quick Paste Format for Vercel

Click **"Paste .env"** in the Vercel Environment Variables UI and paste:

```env
NEXT_PUBLIC_SITE_URL=https://www.piyush-travels.com
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxxxx.mongodb.net/piyush_travels?retryWrites=true&w=majority
JWT_SECRET=super_secure_random_jwt_secret_key_32_characters_long
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_live_razorpay_secret_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
```

---

## 🌐 Custom Domain Setup on Vercel

1. In Vercel Project Settings, go to **Domains**.
2. Add **`www.piyush-travels.com`** and **`piyush-travels.com`** (Redirect to `www.piyush-travels.com`).
3. Set up the following DNS records in your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):

| Type | Name | Value / Target |
| :--- | :--- | :--- |
| **CNAME** | `www` | `cname.vercel-dns.com.` |
| **A** | `@` | `76.76.21.21` |

---

## 🛠️ Vercel Project Build Settings

- **Framework Preset**: `Next.js`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
