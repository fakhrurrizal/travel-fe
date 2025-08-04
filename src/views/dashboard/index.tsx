'use client'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts'
import { FileText, Users, Package } from 'lucide-react'

const DashboardView = () => {
    // Data dummy untuk chart
    const pesananPerAgenData = [
        { nama: 'Nusa Penida', 'Agen A': 55, 'Agen B': 40, 'Agen C': 45 },
        { nama: 'Bromo', 'Agen A': 45, 'Agen B': 35, 'Agen C': 40 },
        { nama: 'Raja Ampat', 'Agen A': 25, 'Agen B': 32, 'Agen C': 28 },
        { nama: 'Pantai Sanur', 'Agen A': 28, 'Agen B': 30, 'Agen C': 25 },
        { nama: 'Labuan Bajo', 'Agen A': 48, 'Agen B': 35, 'Agen C': 42 }
    ]

    const totalPesananData = [
        { name: 'Nusa Penida', value: 37.24, color: '#4F82C4' },
        { name: 'Bromo', value: 26.19, color: '#E67E42' },
        { name: 'Pantai Sanur', value: 13.10, color: '#F4D03F' },
        { name: 'Raja Ampat', value: 13.10, color: '#85C1E9' },
        { name: 'Labuan Bajo', value: 10.37, color: '#A569BD' }
    ]

    const totalPengunjungData = [
        { name: 'Laki-laki', value: 85, color: '#4F82C4' },
        { name: 'Perempuan', value: 35, color: '#E67E42' },
    ]

    const transportasiData = [
        { bulan: 'Pesawat', 'Agen A': 40, 'Agen B': 30, 'Agen C': 35 },
        { bulan: 'Kereta', 'Agen A': 75, 'Agen B': 55, 'Agen C': 45 },
        { bulan: 'Kapal', 'Agen A': 35, 'Agen B': 20, 'Agen C': 40 },
        { bulan: 'Bus', 'Agen A': 60, 'Agen B': 65, 'Agen C': 50 }
    ]


    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
                    <div className="bg-blue-50 p-3 rounded-lg mr-4">
                        <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Pengunjung</p>
                        <p className="text-2xl font-bold text-gray-900">1298</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
                    <div className="bg-orange-50 p-3 rounded-lg mr-4">
                        <Users className="h-8 w-8 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Agen</p>
                        <p className="text-2xl font-bold text-gray-900">3</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
                    <div className="bg-blue-50 p-3 rounded-lg mr-4">
                        <Package className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Paket Wisata</p>
                        <p className="text-2xl font-bold text-gray-900">5</p>
                    </div>
                </div>
            </div>

            {/* Filter Button */}
            <div className="flex justify-end mb-6">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Filter
                </button>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pesanan Paket per Agen */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Pesanan Paket per Agen</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={pesananPerAgenData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nama" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Agen A" fill="#4F82C4" />
                            <Bar dataKey="Agen B" fill="#E67E42" />
                            <Bar dataKey="Agen C" fill="#8E8E93" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Total Pesanan */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Total Pesanan</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={totalPesananData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={120}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {totalPesananData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Total Pengunjung */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Total Pengunjung</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={totalPengunjungData}
                                cx="50%"
                                cy="50%"
                                innerRadius={0}
                                outerRadius={120}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {totalPengunjungData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Total Pesanan Transportasi per Agen */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Total Pesanan Transportasi</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={transportasiData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="bulan" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Agen A" stroke="#4F82C4" strokeWidth={2} />
                            <Line type="monotone" dataKey="Agen B" stroke="#E67E42" strokeWidth={2} />
                            <Line type="monotone" dataKey="Agen C" stroke="#8E8E93" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default DashboardView