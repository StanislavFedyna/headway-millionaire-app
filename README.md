<div align="center">
  <img src="https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_WhoWantsToBeAMillionaire_UK_image1600w.jpg" alt="Who Wants to Be a Millionaire Logo" width="50%" height="50%"/>

# Who Wants to Be a Millionaire 🎮

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Storybook](https://img.shields.io/badge/Storybook-7.0-ff69b4?style=for-the-badge&logo=storybook)](https://storybook.js.org/)
[![Vitest](https://img.shields.io/badge/vitest-3.0-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-8.0-4b32c3?style=for-the-badge&logo=eslint)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-2.4-f7b93e?style=for-the-badge&logo=prettier)](https://prettier.io/)
[![Husky](https://img.shields.io/badge/Husky-7.0-ff69b4?style=for-the-badge&logo=husky)](https://typicode.github.io/husky/#/)
[![Commitlint](https://img.shields.io/badge/Commitlint-13.1-ff69b4?style=for-the-badge&logo=commitlint)](https://commitlint.js.org/)
[![Tanstack Query](https://img.shields.io/badge/Tanstack%20Query-5.0-ff69b4?style=for-the-badge&logo=tanstack)](https://tanstack.com/query/)
[![Zod](https://img.shields.io/badge/Zod-3.0-ff69b4?style=for-the-badge&logo=zod)](https://zod.dev/)

An interactive quiz game built with modern web technologies

[Demo on Versel](headway-millionaire-app.vercel.app)

  ---
</div>

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or later
- npm 9.0 or later

### Installation

1. Clone the repository
```shellscript
git clone https://github.com/your-username/how-to-become-a-millionaire.git
cd how-to-become-a-millionaire
```

2. Install dependencies
```shellscript
npm install
```

### Running the Application
#### Development Mode

```shellscript
npm run dev
```

The application will be available at `http://localhost:3000`

#### Production Build

```shellscript
npm run build
npm start
```

#### Storybook
To run the component library:

```shellscript
npm run storybook
```
Storybook will be available at `http://localhost:6006`

## 🎮 Game Features

- 12 increasingly difficult questions
- Multiple choice answers
- Progressive money rewards
- Responsive design for all devices
- Beautiful animations and transitions
- Accessibility support

## 🏗️ Project Structure

```plaintext
src/
├── app/              # Next.js app directory
├── assets/              # Static assets
├── components/       # Reusable components
├── config/       # Configuration files
├── constants/       # Constants
├── contexts/         # React contexts
├── hooks/           # Custom hooks
├── lib/             # Utilities and configurations
├── schemas/          # Zod schemas
└── types/           # TypeScript types
└── utils/           # Utility functions
```

## 🧪 Testing
Run the test suite:

```shellscript
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🔧 Available Scripts
| Command             | Description                   |
|---------------------|-------------------------------|
| `npm run dev`       | Starts the development server |
| `npm run build`     | Creates a production build    |
| `npm start`         | Runs the production server    |
| `npm run lint`      | Runs ESLint                   |
| `npm run storybook` | Starts Storybook              |
| `npm test`          | Runs tests                    |
| `npm run test:watch`| Runs tests in watch mode      |
| `npm run test:coverage`| Runs tests with coverage    |

## 📚 Documentation

### Component Library

Our components are documented using Storybook. Each component includes:

- Usage examples
- Props documentation
- Interactive playground
- Accessibility information

### 👷‍Architecture

The application follows these key principles:

- Component-based architecture
- State management with React Context
- Type safety with TypeScript
- Server-side rendering with Next.js
- Responsive design with CSS Modules

## 📝 Code Style

We use:

- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks
- Commitlint for commit message linting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
