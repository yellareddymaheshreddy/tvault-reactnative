# 📦 TVault Native App
### Secure, Fast, 24-Hour Text Vault & URL Shortener — No Login Required

TVault Native is the official React Native (Expo) mobile client for the TVault platform — a fast and privacy-friendly service for temporary text storage and URL shortening, powered by a full-stack Next.js web app and Redis.

The Next.js app provides both:

🌐 Web interface (live UI)

🔌 API backend (via Next.js API Routes)

This repo contains the mobile version, built with:

React Native

Expo

NativeWind

AsyncStorage

No login required — all stored content automatically expires in 24 hours.

---

## 🚀 Features
- 🔐 Anonymous text storage (no signup)
- ⏱️ 24-hour automatic expiry (Redis TTL)
- 🔑 Unique key-based sharing
- 🔗 URL shortener support
- 📱 Built using React Native + Expo
- 🎨 Styled with NativeWind
- ⚡ Fast backend using Redis
- 🌐 Works with terminal, web, and mobile

---

## 🗂 Related Projects
| Component | Description | Repository |
|----------|-------------|------------|
| Backend API | Next.js API routes + Redis storage | https://github.com/yellareddymaheshreddy/tvault |
| Native App | React Native client built with Expo | Current repo |

---

## 📱 Tech Stack
- **Expo (SDK 54)**
- **React Native 0.74**
- **React 18**
- **NativeWind**
- **AsyncStorage**
- **TypeScript (optional)**

---

## 🛠 Installation
```bash
git clone https://github.com/yellareddymaheshreddy/tvault-native.git
cd tvault-native

npm install
npx expo start
```

Scan the QR code using **Expo Go**.

---

## 🔌 API Usage (Backend)
Backend + Web UI repo:
👉 https://github.com/yellareddymaheshreddy/tvault

- The web version supports:
- Text save/retrieve
- URL shortening
- Curl/terminal support
- 24 hr TTL
- Auto-generated keys


---

## 🤝 Contributing
We welcome all contributions!

You can help with:
- UI improvements  
- New features  
- Bug fixes  
- Backend API updates  
- Performance optimization  
- Documentation  

### Workflow
```bash
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push
```

Then open a Pull Request.

---

## 📄 License
MIT License.

---

## ❤️ Acknowledgements
Built by **Mahesh Yellareddy**.  
Community contributions appreciated!
