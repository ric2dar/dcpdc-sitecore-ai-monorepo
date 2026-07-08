# DCPDC Sitecore AI Website

<p>
  <img src="https://img.shields.io/badge/Sitecore-FF2B2B?logo=sitecore&logoColor=white&style=flat-square" alt="Sitecore" />
  <img src="https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white&style=flat-square" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white&style=flat-square" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-4F8EF7?logo=typescript&logoColor=white&style=flat-square" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Turborepo-000000?logo=turborepo&logoColor=white&style=flat-square" alt="Turborepo" />
  <img src="https://img.shields.io/badge/node.js-22.x-brightgreen?logo=node.js&logoColor=white&style=flat-square" alt="Node.js 22" />
  <img src="https://img.shields.io/badge/shadcn--ui-18181b?logo=vercel&logoColor=white&style=flat-square" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38bdf8?logo=tailwindcss&logoColor=white&style=flat-square" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white&style=flat-square" alt="Storybook" />
</p>

Frontend monorepo containing the following applications:
- **Sitecore Rendering Host**: http://localhost:3000
- **Storybook**: http://localhost:6006

## 🚀 Quick Start

Create a `.env.local` file in `apps/sitecore-rendering`:

```bash
cd apps/sitecore-rendering
cp sitecore.config.ts.example sitecore.config.ts
# Create .env.local with your Sitecore credentials
```

```bash
# Install dependencies (from root)
npm install

# Start all applications in development mode
npm run dev
```

> For the best development experience, install all the recommended VS Code extensions listed in [`.vscode/settings.json`](./.vscode/settings.json).

## 📁 Project Structure

```
dcpdc-sitecore-ai-monorepo/
├── apps/
│   ├── sitecore-rendering/         # Sitecore rendering host (Next.js)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── content-sdk/    # Sitecore component adapters
│   │   │   ├── pages/              # Next.js pages
│   │   │   │   └── api/            # API routes
│   │   │   ├── lib/
│   │   │   ├── byoc/               # Bring Your Own Components
│   │   │   └── middleware.ts
│   │   └── public/
│   └── storybook/                  # Storybook documentation
│       └── stories/
│           └── ui/                 # UI component stories
├── packages/
│   ├── ui/                         # Shared component library (@repo/ui)
│   │   └── src/
│   │       ├── components/         # shadcn/ui components
│   │       │   └── icons/          # DCPDC Illustrated Icons (41 SVGs)
│   │       ├── styles/
│   │       │   └── globals.css     # DCPDC Design Tokens (Tailwind v4)
│   │       ├── hooks/
│   │       └── lib/
│   ├── eslint-config/              # Shared ESLint configuration
│   └── typescript-config/          # Shared TypeScript configuration
├── .nvmrc                          # Node.js version (22)
├── turbo.json                      # Turborepo configuration
└── vercel.json                     # Vercel deployment configuration
```

## 🎨 Design System

### DCPDC Signature X Design Tokens

Design tokens are implemented in [`packages/ui/src/styles/globals.css`](packages/ui/src/styles/globals.css) using **Tailwind CSS v4** syntax:

| Category | Examples |
|----------|----------|
| **Colors** | `--color-primary-blue-500` (#006AF5), `--color-grey-*`, `--color-green-*`, `--color-orange-*` |
| **Typography** | Source Sans 3 font family, sizes from `text-xs` to `text-heading-3xl` |
| **Spacing** | `--spacing-*` (4px grid system) |
| **Border Radius** | `--radius-none` through `--radius-full` (pill shapes) |
| **Shadows** | `--shadow-xs`, `--shadow-md`, `--shadow-lg` |

### Illustrated Icons

41 custom SVG icons in [`packages/ui/src/components/icons/`](packages/ui/src/components/icons/):

- **People**: worker, employer, accessibility, healthcare-provider, first-nations, etc.
- **Technology**: laptop, browser, cyber-security, settings, etc.
- **Other**: flame, globe, trophy, target, lightbulb, etc.

```tsx
import { IllustratedIcon } from "@repo/ui/components/icons";

<IllustratedIcon name="worker" size="lg" />
```

### Key Technologies

| Category | Technology |
|----------|------------|
| **CMS** | Sitecore Content SDK (XM Cloud) |
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | Tailwind CSS v4, shadcn/ui, Radix UI |
| **Build Tool** | Turborepo for monorepo management |
| **Documentation** | Storybook 10 |

### Shared Packages

- **`@repo/ui`**: Shared component library built with shadcn/ui
- **`@repo/eslint-config`**: Shared ESLint configuration
- **`@repo/typescript-config`**: Shared TypeScript configuration

## 🛠️ Development

### Commands

```bash
# Install dependencies
npm install

# Start all apps (Sitecore + Storybook)
npm run dev

# Start only Storybook
npm run dev --workspace=apps/storybook

# Build all applications
npm run build

# Lint all applications
npm run lint

# Format code
npm run format
```

### Environment Variables

Create `apps/sitecore-rendering/.env.local`:

```env
# Disable SSL verification (corporate proxy workaround)
NODE_TLS_REJECT_UNAUTHORIZED=0

# Sitecore Configuration
NEXT_PUBLIC_DEFAULT_SITE_NAME=dev
NEXT_PUBLIC_SITECORE_API_KEY=your-api-key
NEXT_PUBLIC_SITECORE_API_HOST=https://your-instance.sitecorecloud.io
```

### Node.js Version

This project requires **Node.js 22+**. Use nvm:

```bash
nvm use  # Uses .nvmrc
```

## 📱 Applications

### Sitecore Rendering (`apps/sitecore-rendering`)

- Sitecore rendering host using Content SDK
- Integrates with Sitecore XM Cloud / Experience Edge
- Built with Next.js 15 and TypeScript
- SSG (Static Site Generation) method

### Storybook (`apps/storybook`)

- Component documentation and testing
- Interactive component playground
- Design system documentation

## 🚀 Deployment

### Vercel

The project includes [`vercel.json`](vercel.json) for monorepo deployment:

```json
{
  "installCommand": "npm install",
  "buildCommand": "turbo run build --filter=content-sdk-nextjs",
  "outputDirectory": "apps/sitecore-rendering/.next"
}
```

## ✍️ Git Commit Signing

All commits should be signed. You can sign commits regardless of whether your Git remote uses HTTPS or SSH.

### Option A: SSH commit signing (recommended if you already use SSH keys)

1. Generate a dedicated SSH signing key:
   ```bash
   ssh-keygen -t ed25519 -C "your-email@example.com" -f ~/.ssh/id_ed25519_signing
   ```
2. Add the public key to GitHub — **Settings → SSH and GPG keys → New SSH key → Key type: Signing Key**

3. Configure Git to use SSH signing:
   ```bash
   git config --global gpg.format ssh
   git config --global user.signingkey ~/.ssh/id_ed25519_signing.pub
   ```
### Option B: GPG commit signing (works with HTTPS or SSH remotes)

1. Generate or find an existing GPG key:
   ```bash
   gpg --full-generate-key
   gpg --list-secret-keys --keyid-format=long
   ```
2. Copy your key ID (e.g. `ABCDEF1234567890`) and configure Git:
   ```bash
   git config --global user.signingkey ABCDEF1234567890
   ```
3. Export and add your public key to GitHub — **Settings → SSH and GPG keys → New GPG key**:
   ```bash
   gpg --armor --export ABCDEF1234567890
   ```

### Enable auto-signing

Apply globally (all repos):
```bash
git config --global commit.gpgsign true
git config --global tag.gpgSign true
```

Or apply only to this repo (omit `--global`):
```bash
git config commit.gpgsign true
git config tag.gpgSign true
```

Commits pushed to GitHub should display the **Verified** badge.

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Test in Storybook
4. Submit a pull request to `develop`

## 📚 Copilot Context

When working with this codebase:

- **Design tokens** are in `packages/ui/src/styles/globals.css` using Tailwind v4 `@theme inline` syntax
- **Components** use `@repo/ui/*` imports (not `@workspace`)
- **Icons** are in `packages/ui/src/components/icons/` as SVG files with React wrapper
- **Sitecore components** go in `apps/sitecore-rendering/src/components/`
- **Storybook stories** go in `apps/storybook/stories/ui/`






