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
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { groupBy } from '../utils/arrayUtils';
import { Theme as MuiTheme } from '@mui/material/styles';

interface NavItem {
    label: string;
    href: string;
    group: string;
}

const navItems: NavItem[] = [
    { label: 'Home', href: '#home', group: 'main' },
    { label: 'About', href: '#about', group: 'main' },
    { label: 'Daily Picture', href: '#apod', group: 'features' },
    { label: 'Mars Gallery', href: '#mars', group: 'features' },
    { label: 'Technologies', href: '#technologies', group: 'info' },
];

interface Theme extends MuiTheme {
    // Add any custom theme properties here if needed
}

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const theme = useTheme<Theme>();

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
    const StyledAppBar = styled(AppBar)<{ transparent: boolean }>(({ transparent }) => ({
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
            <Toolbar 
                sx={{ 
                    maxWidth: '1200px',
                    width: '100%',
                    margin: '0 auto',
                    padding: {
                        xs: '0 24px',
                        sm: '0 32px',
                        md: '0 48px',
                    },
                    alignItems: 'center',
                    justifyContent: 'center',
                    // Following Law of Common Region
                    '& .MuiButton-root': {
                        mx: 0.5,
                        transition: 'all 0.2s ease-in-out',
                        // Following Fitts's Law - increase clickable area
                        padding: '8px 16px',
                    }
                }}
            >
                {/* Mobile menu */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ 
                        position: 'absolute',
                        left: { xs: '24px', sm: '32px', md: '48px' },
                        display: { xs: 'flex', md: 'none' },
                        // Following Fitts's Law
                        padding: '12px',
                    }}
                    onClick={() => toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>

                {/* Desktop navigation */}
                <Box sx={{ 
                    display: { xs: 'none', md: 'flex' }, 
                    gap: theme.spacing(3),
                    justifyContent: 'center',
                    // Following Law of Proximity
                    '& .nav-group': {
                        display: 'flex',
                        gap: theme.spacing(4),
                    },
                    '& .MuiButton-root': {
                        color: theme.palette.text.primary,
                        '&:hover': {
                            backgroundColor: 'transparent',
                            color: theme.palette.primary.light,
                        },
                    }
                }}>
                    {Object.entries(groupBy(navItems, 'group')).map(([group, items]) => (
                        <Box key={group} className="nav-group" sx={{ mx: theme.spacing(4) }}>
                            {items.map((item) => (
                                <Button
                                    key={item.href}
                                    color="inherit"
                                    href={item.href}
                                    sx={{ 
                                        fontWeight: 700,
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '50%',
                                            width: 0,
                                            height: 2,
                                            bgcolor: theme.palette.primary.light,
                                            transition: 'all 0.3s ease',
                                            transform: 'translateX(-50%)',
                                        },
                                        '&:hover::after': {
                                            width: '80%',
                                        },
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                        }
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    ))}
                </Box>
            </Toolbar>
            <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
                <Box
                    sx={{ width: 250, padding: theme.spacing(2), backgroundColor: theme.palette.background.default }}
                    role="presentation"
                    onClick={() => toggleDrawer(false)}
                    onKeyDown={() => toggleDrawer(false)}
                >
                    <List sx={{
                        fontWeight: 700,
                        '& .MuiListItem-root': {
                            '&:hover': {
                                backgroundColor: 'transparent',
                                color: theme.palette.primary.light,
                            },
                            '& .MuiListItemText-root': {
                                transition: 'color 0.3s ease',
                            },
                            '&:hover .MuiListItemText-root': {
                                color: theme.palette.primary.light,
                            },
                        }
                    }}>
                        {navItems.map((item) => (
                            <ListItem 
                                key={item.href} 
                                button 
                                component="a" 
                                href={item.href}
                                sx={{
                                    py: 2,
                                    px: 3,
                                }}
                            >
                                <ListItemText 
                                    primary={item.label} 
                                    sx={{ 
                                        color: theme.palette.text.primary,
                                        fontWeight: 700,
                                    }} 
                                />
                            </ListItem>
                        ))}
                        <ListItem 
                            button 
                            onClick={handleLinkedInClick}
                            sx={{
                                py: 2,
                                px: 3,
                            }}
                        >
                            <ListItemText 
                                primary="LinkedIn" 
                                sx={{ 
                                    color: theme.palette.text.primary,
                                    fontWeight: 700,
                                }} 
                            />
                        </ListItem>
                    </List>
                    <IconButton 
                        onClick={() => toggleDrawer(false)}
                        sx={{ position: 'absolute', top: theme.spacing(1), right: theme.spacing(1) }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Drawer>
        </StyledAppBar>
    );
};

export default Navbar;
