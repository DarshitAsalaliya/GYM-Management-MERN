import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import SupplementList from './Supplement/SupplementList';
// Grid
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function HomePage() {
    return (
        <>
            <Box sx={{ flexGrow: 1 }} p={4}>
                <SupplementList />
            </Box>

        </>
    );
}
