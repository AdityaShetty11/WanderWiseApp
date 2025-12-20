# WanderWise

A modern trip planning application built with React, TypeScript, Vite, Firebase, and Tailwind CSS.

## Features

- **User Authentication**: Secure Firebase Auth integration for user signup and login
- **Trip Management**: Create, view, and organize your travel trips
- **Smart Trip Planning**: AI-powered suggestions for activities and itineraries
- **Real-time Sync**: Firestore backend for seamless data synchronization
- **Beautiful UI**: Modern, responsive interface with Tailwind CSS
- **City Guides**: Pre-configured suggestions for major German cities

## Tech Stack

- **Frontend**: React 18.3.1 with TypeScript 5.5.3
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.11
- **Backend**: Firebase (Auth + Firestore)
- **Router**: React Router 6.26.1
- **Linting**: ESLint with TypeScript support

## Project Structure

```
src/
├── auth/              # Firebase config and auth utilities
├── components/        # React components
│   ├── ui/           # Reusable UI components
│   ├── trips/        # Trip management components
│   └── auth/         # Authentication components
├── context/          # React Context for state management
├── pages/            # Page components
├── services/         # Service layer (Firebase, AI)
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── data/             # Mock data and fixtures
└── hooks/            # Custom React hooks
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Firebase project with authentication enabled

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase credentials
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env.local` file in the project root:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Architecture Decisions

- **No Firebase Functions**: Client-side architecture with hardcoded mock data for AI suggestions
- **Mock AI Service**: City-based suggestions for German cities (Berlin, Munich, Hamburg, etc.)
- **Firestore-First**: Real-time database for all user data and trips

## Development Notes

- All console debug logs removed for production cleanliness
- Type-strict TypeScript configuration enabled
- Vite proxy removed (client-only architecture)
- Firebase Functions completely removed from the stack

## License

See LICENSE file for details
