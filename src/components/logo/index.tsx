import Box from '@mui/material/Box'
import Image from 'next/image'
import { useRouter } from 'next/router'

// interface LogoForAppBarProps {
//   trigger?: boolean
// }

export const LogoForAppBar = () => {
    const { push } = useRouter()

    return (
        <Box
            sx={{
                display: 'flex',
                cursor: 'pointer',
                gap: 1,
                alignItems: 'center',
            }}
            onClick={() => push('/')}
        >
            <Box>
                <Image src='/Logo.png' width={70} alt='Tanya Dokter' height={70} />
            </Box>
        </Box>
    )
}
