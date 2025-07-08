// components/FaqSection.tsx
import React, { useState } from 'react'
import {
    Container,
    Typography,
    Box,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Grid,
    Chip,
} from '@mui/material'
import { Icon } from '@iconify/react'

const FaqSection: React.FC = () => {
    const [expanded, setExpanded] = useState<string | false>(false)

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
    }

    // Filter categories
    const categories = [
        { id: 'all', label: 'Semua', active: true },
        { id: 'booking', label: 'Pemesanan', active: false },
        { id: 'payment', label: 'Pembayaran', active: false },
        { id: 'trip', label: 'Perjalanan', active: false },
        { id: 'policy', label: 'Kebijakan', active: false },
    ]

    // FAQ data with colors
    const faqs = [
        {
            id: 'faq1',
            question: 'Bagaimana cara melakukan pemesanan paket tour?',
            answer: 'Anda dapat melakukan pemesanan paket tour melalui website kami dengan memilih destinasi yang diinginkan, mengisi data diri, dan melakukan pembayaran.',
            color: '#10b981', // green
        },
        {
            id: 'faq2',
            question: 'Apa saja metode pembayaran yang tersedia?',
            answer: 'Kami menerima pembayaran melalui transfer bank, kartu kredit, e-wallet (GoPay, OVO, Dana), dan cicilan 0%.',
            color: '#f97316', // orange
        },
        {
            id: 'faq3',
            question: 'Berapa lama sebelum keberangkatan saya harus melakukan pemesanan?',
            answer: 'Minimal 3 hari sebelum keberangkatan untuk paket domestik dan 7 hari untuk paket internasional.',
            color: '#10b981', // green
        },
        {
            id: 'faq4',
            question: 'Apakah harga sudah termasuk semua fasilitas yang disebutkan?',
            answer: 'Ya, harga paket sudah termasuk semua fasilitas yang tercantum dalam deskripsi paket tour.',
            color: '#f97316', // orange
        },
        {
            id: 'faq5',
            question: 'Bagaimana jika cuaca buruk saat perjalanan?',
            answer: 'Kami akan memberikan alternatif aktivitas indoor atau mengatur ulang jadwal sesuai kondisi cuaca.',
            color: '#8b5cf6', // purple
        },
        {
            id: 'faq6',
            question: 'Apakah ada kebijakan refund atau reschedule?',
            answer: 'Ya, kami memiliki kebijakan refund dan reschedule sesuai dengan syarat dan ketentuan yang berlaku.',
            color: '#ef4444', // red
        },
        {
            id: 'faq7',
            question: 'Apakah tersedia paket untuk solo traveler?',
            answer: 'Ya, kami menyediakan paket khusus untuk solo traveler dengan harga yang sudah disesuaikan.',
            color: '#8b5cf6', // purple
        },
        {
            id: 'faq8',
            question: 'Dokumen apa saja yang diperlukan untuk perjalanan?',
            answer: 'Untuk domestik: KTP/SIM. Untuk internasional: Paspor, visa (jika diperlukan), dan surat vaksinasi.',
            color: '#8b5cf6', // purple
        },
        {
            id: 'faq9',
            question: 'Bagaimana jika ada peserta yang berkebutuhan khusus?',
            answer: 'Silakan informasikan kepada kami saat pemesanan agar kami dapat menyiapkan fasilitas yang sesuai.',
            color: '#8b5cf6', // purple
        },
        {
            id: 'faq10',
            question: 'Bagaimana sistem pembayaran cicilan bekerja?',
            answer: 'Kami bekerja sama dengan berbagai penyedia cicilan 0% seperti Kredivo, Akulaku, dan kartu kredit.',
            color: '#f97316', // orange
        },
    ]

    return (
        <Box sx={{ py: 6, backgroundColor: '#f8fafc' }}>
            <Container maxWidth='xl'>
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant='h3'
                        component='h2'
                        sx={{
                            fontWeight: 'bold',
                            color: '#1e293b',
                            mb: 2,
                            fontSize: { xs: '1.8rem', md: '2.5rem' },
                        }}
                    >
                        Pertanyaan yang Sering Diajukan
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            color: '#64748b',
                            fontSize: '1.1rem',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Temukan jawaban untuk pertanyaan yang paling sering
                        <br />
                        ditanyakan tentang layanan kami
                    </Typography>
                </Box>

                {/* Filter Categories */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, flexWrap: 'wrap', gap: 1 }}>
                    {categories.map(category => (
                        <Chip
                            key={category.id}
                            label={category.label}
                            variant={category.active ? 'filled' : 'outlined'}
                            sx={{
                                backgroundColor: category.active ? '#f97316' : 'transparent',
                                color: category.active ? 'white' : '#64748b',
                                fontWeight: category.active ? 'bold' : 'normal',
                                '&:hover': {
                                    backgroundColor: category.active ? '#ea580c' : 'rgba(249, 115, 22, 0.1)',
                                },
                                px: 2,
                                py: 1,
                            }}
                        />
                    ))}
                </Box>

                <Grid container spacing={4}>
                    {/* FAQ List */}
                    <Grid item xs={12} md={8}>
                        <Typography
                            variant='h5'
                            sx={{
                                fontWeight: 'bold',
                                color: '#1e293b',
                                mb: 3,
                            }}
                        >
                            10 Pertanyaan
                        </Typography>

                        <Box sx={{ space: 2 }}>
                            {faqs.map(faq => (
                                <Accordion
                                    key={faq.id}
                                    expanded={expanded === faq.id}
                                    onChange={handleChange(faq.id)}
                                    sx={{
                                        mb: 1,
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '12px !important',
                                        '&:before': {
                                            display: 'none',
                                        },
                                        '&.Mui-expanded': {
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        },
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={
                                            <Icon
                                                icon='mdi:plus'
                                                width={20}
                                                height={20}
                                                color={faq.color}
                                                style={{
                                                    transform: expanded === faq.id ? 'rotate(45deg)' : 'rotate(0deg)',
                                                    transition: 'transform 0.3s ease',
                                                }}
                                            />
                                        }
                                        sx={{
                                            py: 2,
                                            '& .MuiAccordionSummary-content': {
                                                alignItems: 'center',
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 4,
                                                height: 20,
                                                backgroundColor: faq.color,
                                                borderRadius: 2,
                                                mr: 2,
                                            }}
                                        />
                                        <Typography
                                            variant='h6'
                                            sx={{
                                                fontWeight: 'bold',
                                                color: '#1e293b',
                                                fontSize: '1rem',
                                            }}
                                        >
                                            {faq.question}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ pt: 0, pb: 2 }}>
                                        <Typography
                                            variant='body1'
                                            sx={{
                                                color: '#64748b',
                                                lineHeight: 1.6,
                                                ml: 3,
                                            }}
                                        >
                                            {faq.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} md={4}>
                        {/* Customer Support Widget */}
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                                color: 'white',
                                textAlign: 'center',
                                mb: 3,
                                mt: 19,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 90,
                                    height: 90,
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 2,
                                }}
                            >
                                <Icon icon='mdi:headset' width={30} height={30} />
                            </Box>
                            <Typography
                                variant='h6'
                                sx={{
                                    fontWeight: 'bold',
                                    mb: 1,
                                }}
                            >
                                Masih ada Pertanyaan?
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    mb: 2,
                                    opacity: 0.9,
                                }}
                            >
                                Tim customer service kami siap membantu Anda 24/7
                            </Typography>
                            <Button
                                variant='contained'
                                startIcon={<Icon icon='mdi:whatsapp' width={20} height={20} />}
                                sx={{
                                    backgroundColor: 'white',
                                    color: '#3b82f6',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    },
                                    borderRadius: 2,
                                    px: 3,
                                }}
                            >
                                Hubungi Kami
                            </Button>
                        </Paper>

                        {/* Useful Links */}
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                border: '1px solid #e2e8f0',
                                mb: 3,
                            }}
                        >
                            <Typography
                                variant='h6'
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#1e293b',
                                    mb: 2,
                                }}
                            >
                                Link Berguna
                            </Typography>
                            <Box sx={{ space: 1 }}>
                                {[
                                    { icon: 'mdi:file-document-outline', text: 'Syarat & Ketentuan' },
                                    { icon: 'mdi:shield-check-outline', text: 'Kebijakan Privasi' },
                                    { icon: 'mdi:credit-card-outline', text: 'Cara Pemesanan' },
                                    { icon: 'mdi:map-marker-outline', text: 'Panduan Perjalanan' },
                                ].map((item, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            py: 1,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: '#3b82f6',
                                            },
                                        }}
                                    >
                                        <Icon icon={item.icon} width={16} height={16} style={{ marginRight: 8 }} />
                                        <Typography variant='body2'>{item.text}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>

                        {/* Statistics */}
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                border: '1px solid #e2e8f0',
                            }}
                        >
                            <Typography
                                variant='h6'
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#1e293b',
                                    mb: 2,
                                }}
                            >
                                Statistik Bantuan
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography
                                        variant='h4'
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#3b82f6',
                                            mb: 0.5,
                                        }}
                                    >
                                        98%
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        sx={{
                                            color: '#64748b',
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        Masalah Terselesaikan
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography
                                        variant='h4'
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#10b981',
                                            mb: 0.5,
                                        }}
                                    >
                                        &lt;5m
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        sx={{
                                            color: '#64748b',
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        Waktu Respon
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default FaqSection
