export const menu_static = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'solar:home-outline',
        role: [1, 2],
        children: [],
    },
    {
        path: '#',
        name: 'Paket Wisata',
        role: [2],
        icon: 'mdi:package-variant-closed',
        children: [
            {
                path: '/manage-tour/paket',
                name: 'Paket Wisata',
                icon: 'mdi:package-variant',
            },
            {
                path: '/manage-tour/schedule',
                name: 'Jadwal',
                icon: 'mdi:calendar-month-outline',
            },
        ],
    },
    {
        path: '#',
        name: 'Transportasi',
        role: [1],
        icon: 'mdi:car-multiple',
        children: [
            {
                path: '/transportation/company',
                name: 'Perusahaan Transportasi',
                icon: 'mdi:domain',
            },
            {
                path: '/transportation/class',
                name: 'Kelas Transportasi',
                icon: 'mdi:seat-recline-normal',
            },
            {
                path: '/transportation/schedule',
                name: 'Jadwal',
                icon: 'mdi:calendar-clock',
            },
            {
                path: '/transportation/terminal',
                name: 'Terminal',
                icon: 'mdi:bus-stop',
            },
            {
                path: '/transportation/route',
                name: 'Rute',
                icon: 'mdi:map-marker-path',
            },
        ],
    },
    {
        path: '#',
        name: 'Kelola Akun',
        role: [1],
        icon: 'mdi:account-outline',
        children: [
            {
                path: '/manage-user/user',
                name: 'Akun User',
                icon: 'mdi:account',
            },
            {
                path: '/manage-user/agen',
                name: 'Akun Agen',
                icon: 'mdi:account-tie',
            },
        ],
    },
    // {
    //     path: '/laporan',
    //     name: 'Laporan',
    //     role: [1, 2],
    //     icon: 'mdi:flag-outline',
    //     children: [],
    // },
]

export interface MenuItem {
    path: string
    name: string
    icon: string
    role?: number[]
    children?: MenuItem[]
}
