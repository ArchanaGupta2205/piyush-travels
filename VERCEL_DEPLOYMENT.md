# 🚀 Vercel Deployment & Environment Variables Guide

This guide details how to deploy **Piyush Travels** frontend to **Vercel** with custom domain configuration for **`https://www.piyush-travels.com`**.

---

## 1. ⚙️ Vercel Environment Variables

In your Vercel Dashboard, go to:  
**Project → Settings → Environment Variables** and add the following keys for **Production**, **Preview**, and **Development**:

| Variable Name | Production Value / Description |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.piyush-travels.com` |
| `NEXT_PUBLIC_API_URL` | `https://api.piyush-travels.com/api` *(or your deployed backend URL on Render/Railway)* |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | `rzp_live_xxxxxxxxxxxx` *(Razorpay Live Key)* |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | `your_google_oauth_client_id.apps.googleusercontent.com` |

---

## 2. 🌐 Custom Domain Setup on Vercel

1. In Vercel Project Settings, go to **Domains**.
2. Add **`www.piyush-travels.com`** and **`piyush-travels.com`** (Redirect to `www.piyush-travels.com`).
3. In your Domain DNS Manager (e.g. GoDaddy, Namecheap, Cloudflare), set up the DNS records:

| Type | Name | Value / Target |
| :--- | :--- | :--- |
| **CNAME** | `www` | `cname.vercel-dns.com.` |
| **A** | `@` | `76.76.21.21` |

---

## 3. 🛠️ Vercel Project Build Settings

- **Framework Preset**: `Next.js`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

---

## 4. 🗄️ Backend Deployment (Render / Railway / VPS)

Deploy the `backend` folder to Render or Railway with these environment variables:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxxxx.mongodb.net/piyush_travels?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
CLIENT_URL=https://www.piyush-travels.com
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_live_razorpay_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=bookings@piyush-travels.com
SMTP_PASS=your_app_password
FROM_EMAIL=bookings@piyush-travels.com
FROM_NAME="Piyush Travels"
```
