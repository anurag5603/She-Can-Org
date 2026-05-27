# She Can Foundation | High-Fidelity Web Portal & Form submissions

A state-of-the-art, interactive full-stack web application designed for the **She Can! Foundation** to empower young women and girls globally. This portal acts as an involvement portal featuring custom layouts, interactive visual grids, and a persistent, secure Admin Dashboard to manage entries.

---

## 🌟 Premium Features

### 1. Modern & High-End Aesthetics
* **Vibrant Brand Colors**: Fully themed in the foundation's official vibrant orange (`#fe521e`) and dark navy (`#070f26`) palette.
* **Gooey Fluid Backdrop**: morphs glowing fluid blobs in the background using a customized CSS gooey SVG filter.
* **WebGL-style Canvas Shader**: Interactive, mouse-reactive plasma waves overlaying section backgrounds smoothly downscaled for maximum performance.
* **Signature Typography**: Modern sans-serif (**Plus Jakarta Sans**) blended with elegant cursive scripts (**Satisfy** font) matching their official branding.

### 2. Floating Glassmorphism Navbar
* Re-engineered as a **floating capsule header** featuring semi-transparent backdrop blur (`bg-white/75 backdrop-blur-lg`) and pulsing orange gradient heart emblems.
* Features a persistent, glowing **"Join Us"** primary CTA button next to a secondary, high-contrast dark navy **"Admin Panel"** login button.

### 3. Fail-Safe Zero-Setup Architecture
* **Self-Healing Supabase Client**: Instantiates a mock fallback client if environment variables (`VITE_SUPABASE_URL`) are unconfigured, preventing React runtime errors and blank loading pages.
* **One-Click Demo Authentication**: Supports local admin session injection (`signInDemo`) via a prominent *"Try Demo Admin Login"* button for immediate evaluation.
* **Node Express Server**: Features automated CORS proxy endpoints, console warnings for unconfigured environment keys (e.g., GROQ key warnings), and accepts mock fallback tokens to authorize local dashboard calls.

### 4. Standalone Multi-Page Webpage
* A standalone, fully branded webpage (`/contact.html`) served as a separate route.
* Implements the exact same high-fidelity spring scaling checkout modal (`AnimatePresence` and `motion.div` transitions) and persistent submission capabilities.
* Fully registered inside Vite configuration builds for multi-page production pipelines.

### 5. Persistent Admin Submissions Dashboard
* Comprehensive inbox to read, search, filter, and delete entries.
* Includes statistics cards for registered admins, total submissions, and unread counts.
* Writes contact requests persistently to a local database mock (`messages.json` and `users.json`).

---

## 🛠️ Technology Stack

* **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React Icons
* **Animations**: Framer Motion
* **Backend API**: Node.js, Express.js, Cors, Dotenv
* **Database**: Local JSON persistence (`messages.json`, `users.json`)
* **Build System**: Vite (configured for multi-page build options)

---

## 🚀 Setup & Installation Instructions

Follow these simple steps to run the complete full-stack portal locally:

### 1. Install Dependencies
In the root directory, run:
```bash
npm install
```

### 2. Launch Concurrently
Run both the Express API backend proxy (port 3001) and the Vite development server (port 5173) in a single shell command:
```bash
npm run dev:all
```

### 3. Preview & Test
* **Main Landing Page**: Visit `http://localhost:5173` in your browser. Scroll to the bottom to fill out the form, or click **Join Us** in the Navbar to open the standalone form webpage (`/contact.html`).
* **Admin Dashboard**: Click **Admin Panel** in the Navbar, select **"Try Demo Admin Login"**, and instantly review, filter, or delete submitted inbox requests!

---

## 📂 Project Structure

```
├── contact.html           # Multi-page standalone HTML template
├── index.html             # Main portal HTML template
├── server.js              # Express API server (port 3001)
├── messages.json          # Persistent contact submissions database
├── users.json             # Persistent registered administrators database
├── src/
│   ├── main.tsx           # React index mount script
│   ├── contact.tsx        # React standalone contact mount script
│   ├── App.tsx            # Main application shell (Landing Page)
│   ├── components/        # Fully styled components
│   │   ├── Navbar.tsx     # Floating capsule header with CTA
│   │   ├── Footer.tsx     # Rebranded contact footer
│   │   ├── LoginPage.tsx  # Demo-enabled login page
│   │   ├── ContactPage.tsx# Standalone involvement form
│   │   └── AdminDashboard.tsx # Submissions inbox dashboard
│   ├── contexts/
│   │   └── AuthContext.tsx# Demo auth management context
│   └── lib/
│       └── supabase.ts    # Self-healing mock Supabase loader
```

---

## 📝 Medical & Legal Disclaimer
*All portal assets, cursive scripts, and visual components are optimized specifically for the She Can Foundation Internship Task evaluations.*