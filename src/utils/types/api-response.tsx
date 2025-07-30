export interface UserProfileResponse {
    app_id: number
    message: string
    status: number
    user_id: number
}

export interface RegisterPayload {
    email: string
    fullname: string
    phone: string
    confirm_password: string
    password: string
    role_id: number
}

export interface ResponseUploadFileMultiple {
    data: {
        id: string
        created_at: string
        updated_at: string
        token: string
        user_id: number
        filename: string
        full_url: string
    }[]
    message: string
    status: number
}
