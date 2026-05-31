# Classic Network Service Website

A premium, modern, mobile-first single-page broadband Internet Service Provider (ISP) website built for **Classic Network Service**. 

*Tagline: Access That Keeps Pace*

---

## 🚀 Key Features

* **High-Res Custom SVGs**: Features lightweight, pixel-perfect inline SVG vectors of the company logo (router + signal waves) and all page illustrations to guarantee crisp rendering on Retina/mobile screens and instant loading.
* **Sticky Glassmorphism Navigation**: Modern blurred header navigation (`backdrop-filter`) that shrinks dynamically on scroll and highlights the active page section using a JavaScript ScrollSpy observer.
* **Responsive Visual Grids**: Tailored layouts for homes, tablets, and mobile displays.
* **Interactive Speed CTAs**: Speed plans and promotional offers are fully integrated; clicking a package pre-selects the plan in the registration form and scrolls down smoothly.
* **Google Maps Integration**: Beautiful interactive coverage map embedded directly in the served areas section pointing to the office location (`D-36, Johri Farm, Jamia Nagar, Okhla, New Delhi`).
* **Direct WhatsApp Request Dispatcher**: The request connection form validates user inputs (Name, 10-digit Indian Mobile format, Address, Plan) and automatically routes details directly to your WhatsApp Business number (`+91 95404 95039`) with a pre-filled, neatly formatted Unicode emoji message:
  ```text
  Hi Classic Network Service,

  I would like to request a new high-speed broadband connection!

  👤 Name: [User Name]
  📞 Mobile Number: [User Phone]
  📍 Installation Address: [User Address]
  ⚡ Selected Speed Plan: [Chosen Plan]
  💬 Landmark / Message: [User Message]
  ```
* **Offline Fallback Overlay**: Displays a beautiful full-screen modal checkmark animation upon form dispatching to indicate the request was sent successfully.
* **Clean Action Triggers**: Bottom-fixed pulsing float buttons for WhatsApp Chat and direct Phone Call.

---

## 🎨 Visual Identity & Design Tokens

Designed strictly around the official brand colors to deliver a commanding telecom-grade presence:
* **Primary Color (Navy Blue)**: `#0B2240` (Extracted from the router logo icon)
* **Secondary Accent (Slate Blue/Lavender)**: `#8593C4` (Extracted from the tagline text)
* **Backgrounds**: Pure White (`#FFFFFF`), Metallic Light Grey (`#F8FAFC`), and Deep Navy Dark blocks (`#07152B`).
* **Typography**:
  * Headings: `'Outfit', sans-serif` (Geometric, premium telecom-style typeface)
  * Body Text: `'Inter', sans-serif` (Sleek and highly readable)

---

## 📂 Project Structure

```bash
classic-network-service/
├── index.html   # Main structural page (SEO tags, Metas, SVGs, Layout Grids)
├── style.css    # Unified stylesheet (Design tokens, Custom keyframes, Responsive breakpoints)
├── app.js       # Core javascript logic (Nav-spy, WhatsApp lead compiler, Hamburger drawer)
└── README.md    # Repository overview & startup guide
```

---

## 💻 Local Preview & Run Guide

No complex setups or installations are required:

### Option A: Double-Click opening
1. Open the project folder.
2. Double-click **`index.html`** to open and preview the fully responsive site directly in Google Chrome, Safari, Edge, or Firefox.

### Option B: Local HTTP server
To run the website in a local serving environment to test redirection parameters:
1. Open your terminal inside this folder.
2. Run any of the quick server utilities:
   * **Node.js**: `npx serve`
   * **Python**: `python -m http.server 8000`
3. Access the served site in your browser at `http://localhost:5000` or `http://localhost:8000`.
