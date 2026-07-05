# Portfolio — Joakin Mac-Auliffe

Portafolio web profesional de **Joakin Mac-Auliffe**, estudiante de Ingeniería Civil en Informática y Telecomunicaciones (UDP).

## Tech Stack

- **Astro 7** — SSG framework
- **React 19** — Islands para componentes interactivos
- **Tailwind CSS 4** — Estilos con config en CSS
- **Framer Motion 12** — Animaciones fluidas
- **Vercel** — Hosting gratuito

## Estructura del Proyecto

```
src/
├── components/
│   ├── Hero.astro              # Sección hero con canvas interactivo
│   ├── NodeCanvas.tsx          # Canvas de red mesh animada
│   ├── Back2Home.astro         # Caso de estudio back2home
│   ├── Back2HomeTabs.tsx       # Pestañas topología/hardware
│   ├── Experience.astro        # Práctica profesional Sercom
│   ├── ExperienceTimeline.tsx  # Timeline acordeón animado
│   ├── Skills.astro            # Stack tecnológico
│   ├── SkillCards.tsx          # Tarjetas con barras animadas
│   ├── Navbar.astro            # Navbar sticky glassmorphism
│   └── Footer.astro            # Footer con links
├── layouts/
│   └── Layout.astro            # Layout base + SEO
├── pages/
│   └── index.astro             # Single page
└── styles/
    └── global.css              # Tailwind v4 + tema ciber-industrial
```

## Comandos

```bash
npm run dev      # Servidor de desarrollo en localhost:4321
npm run build    # Build de producción
npm run preview  # Previsualizar el build
```

## Despliegue en Vercel

1. Push al repositorio de GitHub
2. Importar el repositorio en [vercel.com](https://vercel.com)
3. Framework: **Astro** (se detecta automáticamente)
4. Build command: `npm run build`
5. Output directory: `dist`

El archivo `vercel.json` ya tiene toda la configuración necesaria.
