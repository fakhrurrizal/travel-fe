// pages/booking/history/index.tsx
import { getHomeNavbarLayout } from '@/components'
import BookingHistoryPage from '@/views/booking/history/index'

export default function BookingHistoryPageRoute() {
    return <BookingHistoryPage />
}

BookingHistoryPageRoute.getLayout = getHomeNavbarLayout
