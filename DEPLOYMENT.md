# 🚀 Deployment Guide - Netflix Clone

## Előfeltételek
- MongoDB Atlas account és adatbázis
- GitHub/Google OAuth credentials (opcionális)
- Vercel/Railway account

---

## 📝 1. lépés: Környezeti változók beállítása

A deployment platformon (Vercel/Railway) add hozzá az alábbi környezeti változókat:

### Kötelező változók:

```bash
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database
NEXTAUTH_JWT_SECRET=your-random-secret-key-here
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=https://your-app-domain.vercel.app
```

### Opcionális OAuth változók:

```bash
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 🔐 2. lépés: OAuth Callback URL-ek frissítése

### GitHub OAuth beállítása:

1. Menj ide: https://github.com/settings/developers
2. Válaszd ki az OAuth App-odat
3. Frissítsd az **Authorization callback URL**-t:
   ```
   https://your-app-domain.vercel.app/api/auth/callback/github
   ```

### Google OAuth beállítása:

1. Menj ide: https://console.cloud.google.com/apis/credentials
2. Válaszd ki az OAuth 2.0 Client ID-t
3. Add hozzá az **Authorized redirect URIs**-hez:
   ```
   https://your-app-domain.vercel.app/api/auth/callback/google
   ```

---

## 🌐 3. lépés: Deployment Vercel-en

### Vercel Dashboard-on keresztül:

1. Menj ide: https://vercel.com
2. Jelentkezz be GitHub fiókkal
3. Kattints: **Add New... → Project**
4. Import a `netflix` repository-t
5. Configure Project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (vagy hagyd üresen)
   - **Output Directory**: `.next` (vagy hagyd üresen)
   - **Install Command**: `npm install` (vagy hagyd üresen)

6. **Environment Variables**: Add hozzá az összes változót (lásd fent)
7. Kattints a **Deploy** gombra!

### Vercel CLI-vel (opcionális):

```bash
# Telepítsd a Vercel CLI-t
npm i -g vercel

# Jelentkezz be
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

---

## 🚂 4. lépés: Deployment Railway-en (alternatíva)

1. Menj ide: https://railway.app
2. Jelentkezz be GitHub fiókkal
3. **New Project → Deploy from GitHub repo**
4. Válaszd ki a `netflix` repository-t
5. Add hozzá a környezeti változókat a **Variables** tab alatt
6. Railway automatikusan buildelni és deployolni fogja az alkalmazást

---

## 🗄️ 5. lépés: Adatbázis feltöltése (seed)

Ha még nem töltötted fel a filmeket az adatbázisba:

```bash
npm run seed
```

**FONTOS**: Ezt csak egyszer kell lefuttatni!

---

## ✅ 6. lépés: Ellenőrzés

1. Nyisd meg a deployment URL-t: `https://your-app-domain.vercel.app`
2. Próbálj meg regisztrálni/bejelentkezni
3. Ellenőrizd, hogy a filmek betöltődnek-e
4. Teszteld az OAuth bejelentkezést (GitHub/Google)

---

## 🐛 Troubleshooting

### 500 Internal Server Error:
- Ellenőrizd, hogy az összes környezeti változó be van-e állítva
- Ellenőrizd, hogy a `NEXTAUTH_URL` helyesen van-e beállítva (production URL)
- Nézd meg a deployment logs-ot a platformon

### OAuth nem működik:
- Ellenőrizd, hogy a callback URL-ek helyesen vannak-e beállítva
- Ellenőrizd, hogy az OAuth credentials helyesek-e

### Nincs film az oldalon:
- Futtasd le a seed scriptet: `npm run seed`
- Ellenőrizd, hogy a MongoDB connection string helyes-e

### Build hiba:
- Ellenőrizd, hogy a `package.json` tartalmazza az összes szükséges függőséget
- Próbálj meg lokálisan buildeni: `npm run build`

---

## 📚 Hasznos linkek

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🔒 Biztonsági megjegyzések

- **SOHA** ne commitolj `.env` fájlokat a repository-ba!
- Használj erős, random secret key-eket production környezetben
- Rendszeresen frissítsd az OAuth credentials-t
- Korlátozd az OAuth callback URL-eket csak a saját domainedre

---

**Sikeres deployment-et! 🎉**
