# 🚀 Deployment Guide - Netflix Clone

## Prerequisites
- MongoDB Atlas account and database
- GitHub/Google OAuth credentials (optional)
- Vercel/Railway account

---

## 📝 Step 1: Environment Variables Setup

On your deployment platform (Vercel/Railway), add the following environment variables:

### Required variables:

```bash
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database
NEXTAUTH_JWT_SECRET=your-random-secret-key-here
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=https://your-app-domain.vercel.app
```

### Optional OAuth variables:

```bash
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 🔐 Step 2: Update OAuth Callback URLs

### GitHub OAuth Setup:

1. Go to: https://github.com/settings/developers
2. Select your OAuth App
3. Update the **Authorization callback URL**:
   ```
   https://your-app-domain.vercel.app/api/auth/callback/github
   ```

### Google OAuth Setup:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Select your OAuth 2.0 Client ID
3. Add to **Authorized redirect URIs**:
   ```
   https://your-app-domain.vercel.app/api/auth/callback/google
   ```

---

## 🌐 Step 3: Deployment on Vercel

### Via Vercel Dashboard:

1. Go to: https://vercel.com
2. Sign in with GitHub account
3. Click: **Add New... → Project**
4. Import the `netflix` repository
5. Configure Project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (or leave empty)
   - **Output Directory**: `.next` (or leave empty)
   - **Install Command**: `npm install` (or leave empty)

6. **Environment Variables**: Add all variables (see above)
7. Click the **Deploy** button!

### Via Vercel CLI (optional):

```bash
# Install Vercel CLI
npm i -g vercel

# Sign in
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

---

## 🚂 Step 4: Deployment on Railway (alternative)

1. Go to: https://railway.app
2. Sign in with GitHub account
3. **New Project → Deploy from GitHub repo**
4. Select the `netflix` repository
5. Add environment variables under the **Variables** tab
6. Railway will automatically build and deploy your application

---

## 🗄️ Step 5: Database Seeding

If you haven't populated the database with movies yet:

```bash
npm run seed
```

**IMPORTANT**: Only run this once!

---

## ✅ Step 6: Verification

1. Open your deployment URL: `https://your-app-domain.vercel.app`
2. Try to register/login
3. Check if movies are loading
4. Test OAuth login (GitHub/Google)

---

## 🐛 Troubleshooting

### 500 Internal Server Error:
- Check if all environment variables are set
- Verify that `NEXTAUTH_URL` is set correctly (production URL)
- Check deployment logs on the platform

### OAuth not working:
- Verify callback URLs are set correctly
- Check if OAuth credentials are correct

### No movies on the page:
- Run the seed script: `npm run seed`
- Verify MongoDB connection string is correct

### Build error:
- Check that `package.json` contains all necessary dependencies
- Try building locally: `npm run build`

### Prisma errors:
- Make sure `prisma generate` runs during build
- Check the build logs for Prisma-related errors

---

## 📚 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Prisma Documentation](https://www.prisma.io/docs)

---

## 🔒 Security Notes

- **NEVER** commit `.env` files to the repository!
- Use strong, random secret keys in production
- Regularly update OAuth credentials
- Restrict OAuth callback URLs to your own domain only

---

**Happy deployment! 🎉**

