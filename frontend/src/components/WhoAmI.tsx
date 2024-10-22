import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import theme from '../theme';
import {motion} from 'framer-motion';
import {Icon} from '@iconify/react';
import profilePictue from '../../public/omar-trkzi-profile-picture.webp'

const WhoAmI = () => {
    const handleLinkedInClick = () => {
        window.open('https://www.linkedin.com/in/trkzi-omar/', '_blank');
    };

    return (
        <Box
            id={"about"}
            sx={{
                textAlign: 'center',
                paddingTop: theme.spacing(12),
                paddingBottom: theme.spacing(10),
                paddingX: theme.spacing(2),
                maxWidth: '800px',
                margin: '0 auto',
            }}
        >
            <motion.div
                initial={{opacity: 0, y: 40}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, ease: 'easeOut'}}
            >
                <Box display={"flex"} justifyContent={"center"} marginBottom={2} alignItems={"center"} gap={"2em"}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                            transformStyle: 'preserve-3d',
                            opacity: 1,
                        }}
                    >
                        <span style={{fontWeight:500}}>Hello 👋, </span><br/> <span style={{fontWeight: 500}}>I'm </span>Omar Trkzi
                    </Typography>
                    <img width={"120px"} src={profilePictue} alt={"Omar Trkzi"}/>
                </Box>
            </motion.div>
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, delay: 0.5, ease: 'easeOut'}}
            >
                <Typography variant="body1" paragraph>
                    I'm a <b>software engineer</b> with expertise in <b>TypeScript</b>, <b>React</b>, and modern web
                    development
                    technologies.
                </Typography>
            </motion.div>
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, delay: 1, ease: 'easeOut'}}
            >
                <Typography variant="body2" paragraph>
                    I build efficient, high-quality applications that deliver seamless and engaging user experiences. By
                    focusing on both design and functionality, I create software that solves real problems and leaves
                    users satisfied, on projects of all sizes.
                </Typography>
            </motion.div>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1, delay: 1.3, ease: 'easeInOut'}}
            >
                <Button
                    variant="contained"
                    onClick={handleLinkedInClick}
                    sx={{
                        background: "#faf0f8",
                        color: "#0A66C2",
                        '&:hover': {
                            background: "#0A66C2",
                            color: "#faf0f8",
                            filter: "drop-shadow(0 0 0.5em #0A66C28a)"

                        },
                        fontWeight: 600,
                        marginTop: theme.spacing(2),
                        transition: 'all 0.3s ease',
                    }}
                >
                    Let's Connect&nbsp;<Icon icon="devicon:linkedin"/>
                </Button>
            </motion.div>
        </Box>
    );
};

export default WhoAmI;
