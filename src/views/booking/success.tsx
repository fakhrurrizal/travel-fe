'use client'

import { Calendar, CheckCircle, CreditCard, Package } from 'lucide-react'

const PaymentSuccessPage = () => {
    // Data dummy untuk detail pesanan
    const orderDetails = {
        orderNumber: 'TRV-2025-001298',
        paymentMethod: 'Transfer Bank BCA',
        amount: 'Rp 2.450.000',
        date: '04 Agustus 2025',
        package: 'Nusa Penida Adventure',
        duration: '3 Hari 2 Malam',
        travelers: '2 Dewasa, 1 Anak',
        departureDate: '15 Agustus 2025',
        agent: 'Agen A - Bali Wisata Tours',
    }

    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            <div className='max-w-4xl mx-auto'>
                {/* Success Header */}
                <div className='bg-white rounded-lg shadow-sm p-8 mb-6 text-center'>
                    <div className='bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <CheckCircle className='h-12 w-12 text-green-600' />
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>Pembayaran Berhasil!</h1>
                    <p className='text-gray-500 text-lg'>Terima kasih telah mempercayai kami untuk perjalanan Anda</p>
                </div>

                {/* Order Summary Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                    <div className='bg-white rounded-lg shadow-sm p-6 flex items-center'>
                        <div className='bg-blue-50 p-3 rounded-lg mr-4'>
                            <Package className='h-8 w-8 text-blue-600' />
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>Nomor Pesanan</p>
                            <p className='text-xl font-bold text-gray-900'>{orderDetails.orderNumber}</p>
                        </div>
                    </div>

                    <div className='bg-white rounded-lg shadow-sm p-6 flex items-center'>
                        <div className='bg-orange-50 p-3 rounded-lg mr-4'>
                            <CreditCard className='h-8 w-8 text-orange-600' />
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>Total Pembayaran</p>
                            <p className='text-xl font-bold text-gray-900'>{orderDetails.amount}</p>
                        </div>
                    </div>

                    <div className='bg-white rounded-lg shadow-sm p-6 flex items-center'>
                        <div className='bg-blue-50 p-3 rounded-lg mr-4'>
                            <Calendar className='h-8 w-8 text-blue-600' />
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>Tanggal Keberangkatan</p>
                            <p className='text-xl font-bold text-gray-900'>{orderDetails.departureDate}</p>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {/* Detail Pesanan */}

                    {/* Informasi Pembayaran */}
                    <div className='bg-white rounded-lg shadow-sm p-6'>
                        <h3 className='text-lg font-semibold mb-4 text-gray-800 flex items-center'>
                            <CreditCard className='h-5 w-5 mr-2 text-orange-600' />
                            Informasi Pembayaran
                        </h3>
                        <div className='space-y-4'>
                            <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                                <span className='text-gray-500'>Metode Pembayaran</span>
                                <span className='font-medium text-gray-900'>{orderDetails.paymentMethod}</span>
                            </div>
                            <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                                <span className='text-gray-500'>Status</span>
                                <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium'>
                                    Berhasil
                                </span>
                            </div>
                            <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                                <span className='text-gray-500'>Tanggal Pembayaran</span>
                                <span className='font-medium text-gray-900'>{orderDetails.date}</span>
                            </div>
                            <div className='flex justify-between items-center py-2 text-lg'>
                                <span className='text-gray-900 font-semibold'>Total Dibayar</span>
                                <span className='font-bold text-blue-600'>{orderDetails.amount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Important Notes */}
                <div className='bg-blue-50 rounded-lg p-6 mt-6'>
                    <h4 className='font-semibold text-blue-900 mb-3'>Catatan Penting:</h4>
                    <ul className='text-blue-800 space-y-2 text-sm'>
                        <li>• E-tiket telah dikirim ke email Anda dan dapat diunduh kapan saja</li>
                        <li>• Harap tiba di titik keberangkatan 30 menit sebelum jadwal</li>
                        <li>• Bawa dokumen identitas yang valid saat perjalanan</li>
                        <li>• Untuk pertanyaan lebih lanjut, hubungi agen travel Anda</li>
                    </ul>
                </div>

                {/* Footer */}
                <div className='text-center mt-8 text-gray-500'>
                    <p>Terima kasih telah memilih layanan kami. Selamat berlibur!</p>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccessPage
