// components/HomepageViews.tsx
import React from 'react'
import { Box } from '@mui/material'
import ToursSection from '@/views/tour-scetion'
import Navbar from './navbar'
import HeroSection from './hero-section'

const HomepageViews: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Navbar />
            <HeroSection />
            <ToursSection />
        </Box>
    )
}

export default HomepageViews
