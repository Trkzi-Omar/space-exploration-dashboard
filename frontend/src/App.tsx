import {CssBaseline, ThemeProvider} from '@mui/material';
import theme from "./theme.ts";
import TechnologyOverview from "./components/TechnologyOverview.tsx";
import {Helmet} from 'react-helmet';
import WhoAmI from "./components/WhoAmI.tsx";
import MarsRoverGallery from "./components/MarsRoverGallery.tsx";
import Navbar from "./components/NavBar.tsx";
import './App.css'
import Apod from "./components/Apod.tsx";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Helmet>
                <title>Space Exploration Dashboard</title>
                <meta name="description"
                      content="Explore Mars rover photos and NASA's Astronomy Picture of the Day with this interactive dashboard."/>
            </Helmet>

            <Navbar/>
            <WhoAmI/>
            <Apod/>
            <MarsRoverGallery/>
            <TechnologyOverview/>
        </ThemeProvider>
    );
}

export default App;
