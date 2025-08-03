export const endpoints = {
    // auth
    get_me: 'auth/user',
    logout: 'auth/logout',
    login: 'auth/signin',
    register: 'auth/signup',
    trip: 'trip',
    file: 'file',
    email_verification: 'auth/email-verification',

    // user
    user: 'user',

    // blog
    destination: 'destination',
    destination_type: 'destination-type',

    trip_schedule: 'trip-schedule',

    // transportation
    transportation_company: 'transportation-company',
    transportation_type: 'transportation-type',
    transportation_class: 'transportation-class',
    transportation_terminal: 'transportation-terminal',
    transportation_route: 'transportation-route',
    transportation_schedule: 'transportation-schedule',

    // files
    category: 'category',
} as const
