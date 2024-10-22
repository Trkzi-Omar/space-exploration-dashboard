// src/components/Navbar.tsx
import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const theme = useTheme();

    // Handle drawer open/close
    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    // Add scroll event listener to adjust transparency
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Custom styled components for better control over the AppBar style
    const StyledAppBar = styled(AppBar)(({ transparent }: { transparent: boolean }) => ({
        background: alpha(theme.palette.background.paper, transparent ? 0.3 : 0.9),
        color: transparent ? theme.palette.text.secondary : theme.palette.text.primary,
        boxShadow: theme.shadows[4],
        backdropFilter: 'blur(10px)',
        transition: 'background 0.3s ease-in-out',
    }));

    const handleLinkedInClick = () => {
        window.open('https://www.linkedin.com/in/trkzi-omar/', '_blank');
    };

    return (
        <StyledAppBar position="sticky" transparent={isScrolled}>
            <Toolbar sx={{ alignItems: 'center', padding: theme.spacing(2, 2) }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: theme.spacing(2), display: { xs: 'flex', md: 'none' } }}
                    onClick={() => toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: theme.typography.fontWeightBold }}>
                    Space Exploration Dashboard
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: theme.spacing(3) }}>
                    <Button color="inherit" sx={{ fontWeight: 700 }} href="#home">
                        Home
                    </Button>
                    <Button color="inherit" sx={{ fontWeight: 700 }} href="#about">
                        About
                    </Button>
                    <Button color="inherit" sx={{ fontWeight: 700 }} href="#apod">
                        Daily Picture
                    </Button>
                    <Button color="inherit" sx={{ fontWeight: 700 }} href="#mars">
                        Mars Gallery
                    </Button>
                    <Button color="inherit" sx={{ fontWeight: 700 }} href="#technologies">
                        Technologies
                    </Button>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3, ease: 'easeInOut' }}
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
                                    filter: "drop-shadow(0 0 0.6em #0A66C2aa)"
                                },
                                fontWeight: 600,
                                transition: 'all 0.3s ease',
                            }}
                        >
                            LinkedIn&nbsp;<Icon icon="devicon:linkedin" />
                        </Button>
                    </motion.div>
                </Box>
            </Toolbar>
            <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
                <Box
                    sx={{ width: 250, padding: theme.spacing(2), backgroundColor: theme.palette.background.default }}
                    role="presentation"
                    onClick={() => toggleDrawer(false)}
                    onKeyDown={() => toggleDrawer(false)}
                >
                    <List sx={{fontWeight: 700}}>
                        <ListItem  button component="a" href="#home">
                            <ListItemText  primary="Home" sx={{ color: theme.palette.text.primary, fontWeight: 700}} />
                        </ListItem>
                        <ListItem  button component="a" href="#about">
                            <ListItemText  primary="About" sx={{ color: theme.palette.text.primary, fontWeight: 700}} />
                        </ListItem>
                        <ListItem  button component="a" href="#apod">
                            <ListItemText  primary="Daily Picture" sx={{ color: theme.palette.text.primary, fontWeight: 700}} />
                        </ListItem>
                        <ListItem  button component="a" href="#mars">
                            <ListItemText  primary="Mars Gallery" sx={{ color: theme.palette.text.primary, fontWeight: 700}} />
                        </ListItem>
                        <ListItem  button component="a" href="#technologies">
                            <ListItemText  primary="Technologies" sx={{ color: theme.palette.text.primary, fontWeight: 700}} />
                        </ListItem>
                        <ListItem  button onClick={handleLinkedInClick}>
                            <ListItemText  primary="LinkedIn" sx={{ color: theme.palette.text.primary, fontWeight: 700}} />
                        </ListItem>
                    </List>
                    <IconButton onClick={() => toggleDrawer(false)}
                                sx={{ position: 'absolute', top: theme.spacing(1), right: theme.spacing(1) }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Drawer>
        </StyledAppBar>
    );
};

export default Navbar;
