// components/HomepageViews.tsx
'use client'

import React from 'react'
import { Box } from '@mui/material'
import ToursSection from '@/views/tour-scetion'
import HeroSection from './hero-section'
import FaqSection from './faq-section'
import Footer from './footer'

const HomepageViews: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <HeroSection />
            <ToursSection />
            <FaqSection />
            <Footer />
        </Box>
    )
}

export default HomepageViews
