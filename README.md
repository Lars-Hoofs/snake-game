# Snake Game

Een moderne implementatie van het klassieke Snake spel gebouwd met Next.js, TypeScript, en Tailwind CSS. Het project bevat automatische testing en CI/CD deployment naar Vercel.

## Features

- 🐍 Klassiek Snake gameplay
- ⌨️ Keyboard controls (arrow keys)
- 🎯 Score tracking
- 🎮 Game over detection en restart functionaliteit
- 🧪 Unit tests met Jest en React Testing Library
- 🚀 Automatische deployment naar Vercel
- 📱 Responsive design met Tailwind CSS
- ⚡ TypeScript voor type safety

## Lokale Development

### Prerequisites

- Node.js 18.x of hoger
- npm of yarn

### Installatie

```bash
# Clone de repository
git clone https://github.com/jouw-username/snake-game.git
cd snake-game

# Installeer dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) om het spel te spelen.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build productie versie
- `npm run start` - Start productie server
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ci` - Run tests met coverage voor CI
- `npm run lint` - Run ESLint

## Game Controls

- **Arrow Keys**: Beweeg de snake
- **Spacebar**: Start/restart het spel (wanneer game over)

## Testing

Het project gebruikt Jest en React Testing Library voor unit testing:

```bash
# Run all tests
npm test

# Run tests met coverage
npm run test:ci

# Run tests in watch mode tijdens development
npm run test:watch
```

## CI/CD Pipeline

Het project gebruikt GitHub Actions voor automatische testing en deployment:

1. **Testing**: Automatische tests op elke push/PR
2. **Linting**: Code quality checks
3. **Build verification**: Controleert of de app correct build
4. **Deployment**: Automatische deployment naar Vercel bij push naar master

## Vercel Deployment Setup

Om automatische deployment naar Vercel in te stellen:

1. Maak een account op [Vercel](https://vercel.com)
2. Import je GitHub repository
3. Voeg de volgende secrets toe aan je GitHub repository:
   - `VERCEL_TOKEN`: Je Vercel API token
   - `VERCEL_ORG_ID`: Je Vercel organization ID
   - `VERCEL_PROJECT_ID`: Je Vercel project ID

### Vercel Secrets ophalen

```bash
# Install Vercel CLI
npm install -g vercel

# Login en link project
vercel login
vercel link

# Haal project info op
vercel env ls
```

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── SnakeGame.tsx
│   └── __tests__/
│       └── SnakeGame.test.tsx
.github/
└── workflows/
    └── ci-cd.yml
```

## Technologies Used

- **Next.js 15**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Jest**: Testing framework
- **React Testing Library**: Component testing
- **GitHub Actions**: CI/CD
- **Vercel**: Hosting platform

## Contributing

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/amazing-feature`)
3. Commit je changes (`git commit -m 'Add some amazing feature'`)
4. Push naar de branch (`git push origin feature/amazing-feature`)
5. Open een Pull Request

## License

Dit project is open source en beschikbaar onder de [MIT License](LICENSE).
