# Zapys24 — B2B landing

Marketing / business-facing website for **Zapys24** — a multi-vertical booking & CRM SaaS
(beauty, equestrian, auto, fitness, medical…).

Built with [Astro](https://astro.build/). Art direction: bold-modern + liquid glass,
Unbounded (display) + Manrope (body), brand violet `#7C3AED`. Ukrainian UI.

## Develop

```bash
npm install
npm run dev      # http://localhost:4599
npm run build    # static output → dist/
npm run preview
```

## Structure

```
src/
  layouts/Layout.astro      # <head>, fonts, mesh/grain, global.css
  styles/global.css         # all styles
  pages/index.astro         # composes the sections
  components/                # one component per section
    Nav · Hero · Result · Showcase · BeforeAfter · Industries ·
    Stories · HowItWorks · Integrations · Pricing · Faq · FinalCta · Footer
public/
  img/                      # photos, logos, decor
  main.js                   # vanilla JS (slideshow, pricing, reveal, …)
```
