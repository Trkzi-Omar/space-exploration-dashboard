import React from 'react';
import { Box, Card, CardContent, Typography, Grid, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';
import nasaLogo from '../../public/nasa-logo-web-rgb.webp';
import renderLogo from '../../public/render.svg';

const technologies = [
  {
    name: 'React',
    description: 'Frontend library used to build UI components with efficiency and reusability.',
    icon: <Icon icon="logos:react" />,
  },
  {
    name: 'Vite',
    description: 'Development build tool providing fast builds and optimized output.',
    icon: <Icon icon="logos:vitejs" />,
  },
  {
    name: 'Node.js',
    description: 'Backend runtime for handling API requests and server logic.',
    icon: <Icon icon="logos:nodejs" />,
  },
  {
    name: 'TypeScript',
    description: 'JavaScript superset that provides static typing for easier code maintenance.',
    icon: <Icon icon="logos:typescript-icon" />,
  },
  {
    name: 'PostgreSQL',
    description: 'Database used for storing Mars Rover data and APOD details.',
    icon: <Icon icon="logos:postgresql" />,
  },
  {
    name: 'Vercel',
    description: 'Deployment platform for frontend, providing easy scalability.',
    icon: <Icon icon="logos:vercel-icon" />,
  },
  {
    name: 'Render',
    description: 'Backend hosting platform that ensures server reliability and scalability.',
    icon: <img src={renderLogo} alt="Render Logo" style={{ width: 'auto', height: '54px' }} />,
  },
  {
    name: 'NASA API',
    description: 'External API providing Astronomy Picture of the Day and Mars Rover Photos.',
    icon: <img src={nasaLogo} alt="NASA Logo" style={{ width: 'auto', height: '54px' }} />,
  },
  {
    name: 'Jest',
    description: 'Testing framework used for unit and integration testing to ensure code quality.',
    icon: <Icon icon="logos:jest" />,
  },
];

const appDescription = `The Space Exploration Dashboard is a modern web application that allows users to explore data from NASA's Mars Rover missions and the Astronomy Picture of the Day (APOD). Built using cutting-edge technologies, it provides an immersive and interactive experience for users to engage with space exploration data. The frontend, developed with React and Vite, ensures fast and responsive interactions, while the backend, hosted on Render, utilizes Node.js to serve data from NASA's APIs. PostgreSQL is used to store and cache the data for efficient access, and the entire application is deployed on Vercel for easy scalability. The UI is designed with Material UI and adheres to best UX practices to ensure a seamless and enjoyable user experience.`;

const TechnologyOverview: React.FC = () => {
  const theme = useTheme();

  return (
      <Box
          sx={{
            textAlign: 'center',
            padding: theme.spacing(4),
            backgroundColor: theme.palette.background.default,
            maxWidth: '1200px',
            margin: 'auto',
            color: theme.palette.text.primary,
          }}
      >
        <Typography variant="h4" gutterBottom sx={{color:theme.palette.text.secondary, marginBottom: theme.spacing(2), fontWeight: theme.typography.h4.fontWeight }}>
          Technologies Used
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: theme.spacing(4), color: theme.palette.text.secondary }}>
          {appDescription}
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {technologies.map((tech) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={tech.name}>
                <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: theme.spacing(2),
                      boxShadow: theme.shadows[2],
                      backgroundColor: theme.palette.background.paper,
                    }}
                >
                  <Box sx={{ fontSize: '3rem', color: theme.palette.primary.main, marginBottom: theme.spacing(1) }}>{tech.icon}</Box>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {tech.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {tech.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
          ))}
        </Grid>
      </Box>
  );
};

export default TechnologyOverview;
