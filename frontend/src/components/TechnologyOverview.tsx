import React from 'react';
import { Box, Card, CardContent, Typography, Grid, useTheme, Link } from '@mui/material';
import { Icon } from '@iconify/react';
import nasaLogo from '../../public/nasa-logo-web-rgb.webp';
import renderLogo from '../../public/render.svg';

const technologies = [
  {
    name: 'React',
    description: 'Frontend library used to build UI components with efficiency and reusability.',
    icon: <Icon icon="logos:react" />,
    docsUrl: 'https://react.dev/learn',
  },
  {
    name: 'Vite',
    description: 'Development build tool providing fast builds and optimized output.',
    icon: <Icon icon="logos:vitejs" />,
    docsUrl: 'https://vitejs.dev/guide/',
  },
  {
    name: 'Node.js',
    description: 'Backend runtime for handling API requests and server logic.',
    icon: <Icon icon="logos:nodejs" />,
    docsUrl: 'https://nodejs.org/docs/latest/api/',
  },
  {
    name: 'TypeScript',
    description: 'JavaScript superset that provides static typing for easier code maintenance.',
    icon: <Icon icon="logos:typescript-icon" />,
    docsUrl: 'https://www.typescriptlang.org/docs/',
  },
  {
    name: 'PostgreSQL',
    description: 'Database used for storing Mars Rover data and APOD details.',
    icon: <Icon icon="logos:postgresql" />,
    docsUrl: 'https://www.postgresql.org/docs/current/',
  },
  {
    name: 'Vercel',
    description: 'Deployment platform for frontend, providing easy scalability.',
    icon: <Icon icon="logos:vercel-icon" />,
    docsUrl: 'https://vercel.com/docs',
  },
  {
    name: 'Render',
    description: 'Backend hosting platform that ensures server reliability and scalability.',
    icon: <img src={renderLogo} alt="Render Logo" style={{ width: 'auto', height: '54px' }} />,
    docsUrl: 'https://render.com/docs',
  },
  {
    name: 'NASA API',
    description: 'External API providing Astronomy Picture of the Day and Mars Rover Photos.',
    icon: <img src={nasaLogo} alt="NASA Logo" style={{ width: 'auto', height: '54px' }} />,
    docsUrl: 'https://api.nasa.gov/',
  },
  {
    name: 'Jest',
    description: 'Testing framework used for unit and integration testing to ensure code quality.',
    icon: <Icon icon="logos:jest" />,
    docsUrl: 'https://jestjs.io/docs/getting-started',
  },
];

const appDescription = `The Space Exploration Dashboard is a modern web application that allows users to explore data from NASA's Mars Rover missions and the Astronomy Picture of the Day (APOD). Built using cutting-edge technologies, it provides an immersive and interactive experience for users to engage with space exploration data. The frontend, developed with React and Vite, ensures fast and responsive interactions, while the backend, hosted on Render, utilizes Node.js to serve data from NASA's APIs. PostgreSQL is used to store and cache the data for efficient access, and the entire application is deployed on Vercel for easy scalability. The UI is designed with Material UI and adheres to best UX practices to ensure a seamless and enjoyable user experience.`;

const TechnologyOverview: React.FC = () => {
  const theme = useTheme();

  const handleDocsClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 8, sm: 10, md: 12 },
      }}
      id={'technologies'}
    >
      <Typography variant="h3" gutterBottom sx={{ color: theme.palette.text.secondary, marginBottom: theme.spacing(2), fontWeight: theme.typography.fontWeightBold }}>
        Technologies Used
      </Typography>
      <Typography variant="body1" sx={{
        marginBottom: theme.spacing(4),
        color: theme.palette.text.secondary,
        textAlign: 'justify',
      }}>
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
              <Link
                href={tech.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
                onClick={() => handleDocsClick(tech.docsUrl)}
              >
                <Box sx={{ 
                  fontSize: '3rem', 
                  color: theme.palette.primary.main, 
                  marginBottom: theme.spacing(1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {tech.icon}
                </Box>
              </Link>
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
