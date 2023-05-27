import React, { useState, useEffect } from 'react'
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
    IconButton
} from '@mui/material'
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSalesOutlined,
    TodayOutlined,

    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined
} from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import profile from '../Image/profile.jpg'

const navItems = [
    {
        text: 'Dashboard',
        icon: <HomeOutlined />,
    },
    {
        text: 'Main',
        icon: null,
    },
    {
        text: 'Products',
        icon: <ShoppingCartOutlined />,
    },
    {
        text: 'Creators',
        icon: <Groups2Outlined />,
    },
    {
        text: 'Revenue',
        icon: <ReceiptLongOutlined />,
    },
    {
        text: 'Geography',
        icon: <PublicOutlined />,
    },
    {
        text: 'Sales',
        icon: null,
    },
    {
        text: 'Overview',
        icon: <LocalOfferIcon />,
    },
    {
        text: 'Daily',
        icon: <TodayOutlined />,
    },
    {
        text: 'Monthly',
        icon: <CalendarMonthIcon />,
    },
    {
        text: 'BreakDown',
        icon: <PieChartOutlined />,
    },
    {
        text: 'Management',
        icon: null,
    },
    {
        text: 'Admin',
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: 'Performance',
        icon: <TrendingUpOutlined />,
    },
]

const Sidebar = ({ user, drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname])


    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth
                        }
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant="h4" fontWeight="bold">
                                        The Updates Admin Panel
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                            {text}
                                        </Typography>
                                    )
                                }

                                const lowercaseText = text.toLowerCase();

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lowercaseText}`);
                                                setActive(lowercaseText)
                                            }}
                                            sx={{
                                                backgroundColor: active === lowercaseText ? theme.palette.secondary[300] : "transparent",
                                                color: active === lowercaseText ? theme.palette.primary[600] : theme.palette.secondary[100],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color: active === lowercaseText ? theme.palette.primary[600] : theme.palette.secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lowercaseText && (
                                                <ChevronRightOutlined sx={{ ml: "auto" }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>

                    <Box position="absolute" bottom="-20rem" left="0rem" right="0rem" sx={{ mb: '1rem' }}>
                        <Divider />
                        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                            <Box
                                component="img"
                                alt="profile"
                                src={profile}
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.9rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    fontSize="0.8rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    {user.occupation}
                                </Typography>
                            </Box>
                            <SettingsOutlined
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: "25px ",
                                    cursor: "pointer"
                                }}
                            />
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export default Sidebar