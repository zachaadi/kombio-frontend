# Kombio Frontend

A real-time multiplayer card game built with React and Socket.IO. Play Kombio online with friends — create or join a room, manage your hand, and chat with other players live.

## Live URLs

| Environment    | URL                                          |
| -------------- | -------------------------------------------- |
| Production     | https://kombio-frontend.onrender.com         |
| Non-production | https://kombio-frontend-nonprod.onrender.com |

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite
- **UI library:** MUI (Material UI v7)
- **State management:** Redux Toolkit
- **Routing:** React Router v7
- **Real-time communication:** Socket.IO client
- **Forms & validation:** React Hook Form + Zod

## Features

- Create or join a game room via shareable room ID
- Lobby room with game setup configuration
- Real-time gameplay with a shared game board and player hands
- In-game chat
- Player session persistence (auto-rejoin on reconnect)
- User accounts — register, log in, log out
- Profile page and stats page
- Rules reference page

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the kombio backend server

### Install dependencies

```
npm install
```

### Start the development server

```
npm run dev
```

### Other scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run build`   | Production build                     |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## Project Structure

```
src/
├── app/                  # App entry, Redux store, Socket.IO client
├── components/
│   ├── chat/             # In-game chat
│   ├── game-room/        # Game board, actions, and game state
│   ├── header/           # Nav bar, login, create account, profile, rules, stats
│   ├── landing-page/     # Create/join room
│   ├── lobby-room/       # Pre-game lobby and setup
│   └── player/           # Player hand, player list, turn indicator
└── css/                  # Module and global styles
```
