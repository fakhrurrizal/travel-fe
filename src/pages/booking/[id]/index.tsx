import { getHomeNavbarLayout } from '@/components'
import BookingDetail from '@/views/booking/booking-detail'

export default function BookingPage() {
    return <BookingDetail />
}

BookingPage.getLayout = getHomeNavbarLayout
