import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import BreakDownChart from 'components/BreakDownChart';


const BreakDown = () => {
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="BreakDown" subtitle="BreakDown of sales by Category"/>
        <Box mt="40px" height="75vh">
            <BreakDownChart/>
        </Box>
    </Box>
  )
}

export default BreakDown