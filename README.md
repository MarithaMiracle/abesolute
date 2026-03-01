# Feyisayo & Temitayo — Wedding Website

A Next.js 14 wedding invitation website built with TypeScript and Tailwind CSS.

## Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Google Fonts** — Great Vibes (script), Cormorant Garamond (serif), Jost (sans-serif)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout + metadata
│   ├── page.tsx           # Homepage
│   ├── rsvp/page.tsx      # RSVP page (multi-step form + message)
│   ├── ceremony/page.tsx  # Ceremony details + wedding party
│   └── gifting/page.tsx   # Gifting / bank details
├── components/
│   ├── Navbar.tsx         # Fixed navigation with active pill
│   ├── PatternBand.tsx    # African geometric pattern divider
│   ├── FloralDecor.tsx    # SVG botanical decorations
│   └── Footer.tsx         # Footer with script names
└── styles/
    └── globals.css        # Global CSS, custom classes, animations
```

## Adding Images

Place images in `/public/images/` with these filenames:

| File | Used in |
|------|---------|
| `hero-couple.jpg` | Homepage hero background |
| `couple-1.jpg` | Homepage hero right photo |
| `story-1.jpg` | Love Story section top photo |
| `story-2.jpg` | Love Story section bottom photo |
| `gallery-1.jpg` | Homepage gallery |
| `gallery-2.jpg` | Homepage gallery |
| `gallery-3.jpg` | Homepage gallery |
| `attend-1.jpg` | Attend CTA strip (reused across pages) |
| `attend-2.jpg` | Attend CTA strip |
| `attend-3.jpg` | Attend CTA strip |
| `attend-4.jpg` | Attend CTA strip |
| `rsvp-hero.jpg` | RSVP page hero |
| `ceremony-hero.jpg` | Ceremony hero background |
| `gifting-hero.jpg` | Gifting page hero (greyscale toned) |
| `gifting-couple.jpg` | Gifting page couple photo |
| `bm-1.jpg` ... `bm-15.jpg` | Bridesmaids avatars |
| `gm-1.jpg` ... `gm-12.jpg` | Groomsmen avatars |

## Customization

### Bridesmaid / Groomsman Names
Edit the `bridesmaids` and `groomsmen` arrays in `src/app/ceremony/page.tsx`

### Colors (Tailwind)
Edit `tailwind.config.ts` — key colors:
- `navy`: `#2D4F6B`
- `cream`: `#E8DCC8`
- `blue-pale`: `#B8CDD9`
- `sand`: `#D4B896`

### RSVP Form
Currently a frontend-only multi-step form. To connect to a backend, add a `fetch` call in the `handleSubmit` function in `src/app/rsvp/page.tsx`.

## Build for Production

```bash
npm run build
npm run start
```
