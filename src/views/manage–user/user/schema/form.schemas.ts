import { z } from 'zod'

export const userSchema = z
    .object({
        status: z.object({ label: z.string(), id: z.number() }).nullable(),
        fullname: z.string().min(1, { message: 'Nama Lengkap tidak boleh kosong' }),
        email: z.string().min(1, 'Email wajib diisi').email('Silakan masukkan alamat email yang valid'),
        phone: z
            .string()
            .min(1, 'Nomor telepon wajib diisi')
            .regex(/^[8][\d-]+$/, 'Masukkan nomor diawali angka 8 dan hanya berisi angka atau tanda hubung')
            .refine(
                val => {
                    const cleaned = val.replace(/[^0-9]/g, '')

                    return cleaned.length >= 9 && cleaned.length <= 12
                },
                {
                    message: 'Nomor telepon harus terdiri dari 9–12 digit angka (tidak termasuk angka 0 di depan)',
                }
            ),
    })
   
    .transform(data => {
        const newData: any = { ...data }

        newData.status = data.status?.id

        return newData
    })

export type UserForm = z.infer<typeof userSchema>
