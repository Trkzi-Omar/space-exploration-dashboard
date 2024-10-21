import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import theme from '../theme';

const WhoAmI = () => {
    const handleLinkedInClick = () => {
        window.open('https://www.linkedin.com/in/trkzi-omar/', '_blank');
    };

    return (
        <Box sx={{textAlign: 'center', padding: theme.spacing(4), maxWidth: '800px', margin: '0 auto'}}>
            <Typography variant="h4" gutterBottom>
                Hi, I'm Omar Trkzi
            </Typography>
            <Typography variant="body1" paragraph>
                I'm a passionate front-end engineer with a focus on crafting seamless and engaging user experiences.
                With expertise in TypeScript, React, and modern web development technologies, I thrive on solving
                complex challenges and building products that delight users. My work combines thoughtful design with
                efficient code, leveraging tools like Tailwind CSS, MUI, and Vercel for powerful and scalable
                solutions.
            </Typography>
            <Typography variant="body1" paragraph>
                I've worked on various projects ranging from interactive web applications to data-driven dashboards.
                Through these projects, I continuously challenge myself to think critically about both user needs
                and technical implementations. My passion for space and technology is evident in this Space
                Exploration Dashboard, where I bring together informative data and a visually immersive experience.
            </Typography>
            <Button
                variant="contained"
                onClick={handleLinkedInClick}
                sx={{
                    background: "#0A66C2",
                    color: '#faf0f8',
                    '&:hover': {background: "#023e8a", color: "white"},
                    fontWeight: 600,
                    marginTop: theme.spacing(2)
                }}
            >
                Let's talk on LinkedIn
            </Button>
        </Box>
    );
};

export default WhoAmI;
