# CineVerse - Frontend

This is the React frontend for the CineVerse movie streaming platform. It is built with Vite, React, Tailwind CSS v4, and Lucide React icons.

## Features
- Fully responsive, cinematic UI (glassmorphism, skeleton loaders, custom animations)
- Complete authentication flow (Login/Register)
- TMDB API integration for real-time movie data and trailers
- User Watchlist, Favorites, and Search functionality
- Protected routes based on JWT authentication

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- TMDB API Key and Read Access Token

### Configuration

Create a `.env` file in the root of the `client` directory (same level as this README) and add your TMDB credentials:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_READ_TOKEN=your_tmdb_read_access_token
```

To get these keys:
1. Create an account at [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Go to your Account Settings -> API
3. Register for a Developer API Key
4. Copy the "API Key (v3 auth)" and "API Read Access Token (v4 auth)"

### Connecting to the Backend
By default, the frontend connects to the backend server at `http://localhost:5000/api`. This is configured via the `axios` base URLs in `src/api/` and component files. Ensure your backend server is running on port 5000.

### Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173`
