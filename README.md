# Simple Cropper

A lightweight, client-side image cropping tool built with modern web technologies. Upload an image via drag-and-drop or file picker, visually select a crop region, and download the result — all processed in the browser with no server round-trips.

## Features

- **Drag & drop / click-to-upload** image selection via `react-dropzone`
- **Interactive crop UI** powered by `react-image-crop`
- **Client-side processing** — images are cropped on a `<canvas>` at full resolution, preserving the original format and quality
- **Responsive layout** with dark mode support (`prefers-color-scheme`)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript (strict mode) |
| Runtime | [Cloudflare Workers](https://workers.cloudflare.com/) (edge) |
| Package Manager | [Bun](https://bun.sh/) |
| Styling | CSS Modules + CSS custom properties |
| UI Components | [Kumo](https://github.com/cloudflare/kumo) |
| Linting & Formatting | [Biome](https://biomejs.dev/) |
| Deployment | [Cloudflare Workers](https://workers.cloudflare.com/) via [OpenNext](https://opennext.js.org/) |
| CI/CD | GitHub Actions |

## Best Practices

### Code Quality

- **TypeScript strict mode** — `strict: true` in `tsconfig.json` for maximum type safety
- **React Compiler** enabled (`reactCompiler: true`) for automatic memoization and optimized re-renders
- **Biome** for unified linting and formatting with zero-config recommended rules, including React and Next.js domain rules
- **CSS Modules** for scoped, collision-free styling with no runtime CSS-in-JS overhead
- **Clean component architecture** — small, focused components (`ImageUpload`, `CropperApp`) with clear separation of concerns; utility logic (`downloadCrop`) isolated from UI

### Deployment & CI/CD

- **Edge deployment** on Cloudflare Workers via OpenNext, delivering low-latency responses globally
- **Automated CI/CD pipeline** — every push triggers a GitHub Actions workflow that installs dependencies with Bun, builds with OpenNext, and deploys to Cloudflare in a single pass
- **Infrastructure as code** — `wrangler.toml` and `open-next.config.ts` version the full deployment configuration alongside the application code

## Getting Started

```bash
# Install dependencies
bun install

# Start the dev server
bun dev

# Build & preview the Cloudflare Workers build locally
bun run preview
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages & global styles
├── components/           # React components
├── types/                # TypeScript type declarations
└── utils/                # Pure utility functions
```
