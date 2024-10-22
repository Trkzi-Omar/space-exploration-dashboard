# Space Exploration Dashboard

## Overview
The **Space Exploration Dashboard** is an interactive, visually immersive web application providing detailed insights into space and Mars exploration. This application features NASA's Mars Rover photo gallery and Astronomy Picture of the Day (APOD), leveraging NASA's open APIs to make space data accessible and exciting.

This project is organized as a monorepo, containing both frontend and backend services that work together to create a seamless experience. It is crafted using modern web technologies to impress both developers and end users alike.

## Features
- **Astronomy Picture of the Day**: Displays the picture of the day fetched from NASA's APOD API, with detailed explanations of the celestial events and observations.
- **Mars Rover Photo Gallery**: A gallery that showcases Mars Rover images from Curiosity, Spirit, and Opportunity. Users can browse high-resolution images captured on Mars, with intuitive navigation.
- **Responsive Design**: The application has a responsive user interface, ensuring a great experience on desktops, tablets, and mobile devices.
- **Interactive Navbar and Carousel**: The user-friendly navbar provides navigation to different sections of the app, while the gallery slider showcases photos in an intuitive format.

## Technology Stack
- **Frontend**: React with TypeScript, MUI (Material-UI), Vite, Swiper/React-Slick for image sliders.
- **Backend**: Node.js, Express, PostgreSQL for data storage, and Axios for API calls.
- **Styling**: Tailwind CSS, Emotion for advanced styling, custom MUI theme with adherence to UI/UX rules inspired by [Laws of UX](https://lawsofux.com/).
- **Deployment**: Hosted on Vercel for quick iteration and scalability.

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- pnpm (Package manager)

### Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/space-exploration-dashboard.git
   cd space-exploration-dashboard
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   pnpm install
   ``

3. Set up environment variables:
    - Create `.env` files in both the `frontend` and `backend` folders.
    - Backend should include:
      ```
      NASA_API_KEY=YOUR_NASA_API_KEY
      DATABASE_URL=YOUR_DATABASE_CONNECTION_STRING
      NODE_ENV=development
      ```
    - Frontend should include:
      ```
      VITE_BACKEND_URL=http://localhost:5000
      ```

4. Run the backend server:
   ```bash
   pnpm run start:backend
   ```

5. Run the frontend:
   ```bash
   pnpm run dev
   ```

### Project Structure
- **frontend/**: Contains the client-side code written in React and TypeScript.
    - **public/**: Contains images such as the NASA logo and general public assets.
    - **src/**: The main source folder with components, including `MarsRoverGallery`, `WhoAmI`, `TechnologyOverview`, `theme.ts`, etc.
- **backend/**: Contains the Express.js server code.
    - **src/index.ts**: Main server entry point that handles API requests and serves the Mars Rover and APOD data.

## Components
### Mars Rover Photo Gallery
The gallery is displayed using a carousel to enhance user experience. Photos are fetched from NASA's Mars Rover Photos API and displayed with details like Earth date and Rover name.

### Who Am I Component
The `WhoAmI` component introduces the creator, Omar Trkzi, and highlights his skills and interests, linking to LinkedIn for more personal interaction.

### Technologies Overview
The `TechnologyOverview` component lists the technologies used in the project with engaging descriptions and icons.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## Deployment
The project can be easily deployed using **Vercel**. The frontend and backend must be hosted separately, but Vercel will automatically detect the frontend setup. The backend, however, needs to be set up as a Node.js server with Express and requires environment variables to be configured appropriately.

## How It Works
- **APIs and Backend**: The backend connects to NASA's APIs, caches data, and serves it to the frontend. This minimizes API rate limits and enhances response times.
- **Frontend Design**: The frontend includes visually appealing sections that adapt to user scroll, leveraging advanced MUI styling and React for interactive content.

## Contact
If you find this project interesting or would like to collaborate, you can reach out to me on [LinkedIn](https://www.linkedin.com/in/trkzi-omar/).

## License
[MIT License](LICENSE)
