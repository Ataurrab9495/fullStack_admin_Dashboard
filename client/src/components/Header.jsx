import React from 'react'
import { Typography, Box, useTheme } from '@mui/material'

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    return (
        <Box>
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mb: '5px' }}
                color={theme.palette.secondary[100]}
            >
                {title}
            </Typography>
            <Typography variant="subtitle" color={theme.palette.secondary[300]}>
                {subtitle}
            </Typography>
        </Box>
    )
}

export default Header