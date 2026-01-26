# Charlie Brown's Portfolio

Welcome to my portfolio website! This is a modern, interactive portfolio site built with Next.js and React that showcases my work as a Programmer, Designer, and Developer.

## Features

- **Dynamic Typing Animation** - Watch as different roles (Programmer, Designer, Developer) are typed out, paused, and deleted in sequence
- **Responsive Design** - Built with Tailwind CSS for a beautiful, responsive layout
- **Dark Mode Support** - Theme toggling between light and dark modes
- **Navigation Menu** - Interactive navigation with smooth hover effects
- **Modern UI Components** - Custom components including buttons, dropdowns, and navigation menus

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: Custom React components with Radix UI primitives
- **Font**: [Geist](https://vercel.com/font) from Vercel
- **Language**: TypeScript

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn/bun)

### Installation

Clone the repository and install dependencies:

```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site in action.

The site will auto-refresh as you make changes to the files.

## Project Structure

```
├── app/
│   ├── page.tsx          # Home page with typing animation
│   ├── layout.tsx        # Root layout with theme provider
│   └── globals.css       # Global styles
├── components/
│   ├── typed.tsx         # Typing animation logic
│   ├── theme-provider.tsx
│   ├── mode-toggle.tsx   # Dark mode toggle
│   └── ui/               # Reusable UI components
├── lib/
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## Customization

### Update the Typing Sequence

Edit the `typedSequence` array in `app/page.tsx` to change the words that are typed out.

### Adjust Animation Speeds

Modify these constants in `app/page.tsx`:
- `typingSpeed` - How fast characters appear (milliseconds)
- `deleteSpeed` - How fast characters are deleted (milliseconds)
- `pauseTime` - Pause duration before deleting (milliseconds)

### Change Theme

The site uses a custom theme provider. Modify theme colors in the components as needed.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## Deployment

This project is ready to be deployed on [Vercel](https://vercel.com), the platform created by the makers of Next.js.

For deployment instructions, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

Made with ❤️ by Charlie Brown
