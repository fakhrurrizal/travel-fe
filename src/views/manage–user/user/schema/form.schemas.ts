import { z } from 'zod'

export const userSchema = z
    .object({
        user_type_id: z
            .object({ label: z.string(), id: z.number() })
            .nullable()
            .superRefine((data, context) => {
                if (!data) {
                    context.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Jenis User tidak boleh kosong',
                    })
                }
            }),
        name: z.string().min(1, { message: 'Nama User tidak boleh kosong' }),
        description: z.string().min(1, { message: 'Keterangan tidak boleh kosong' }),
        code: z.string().min(1, { message: 'Kode tidak boleh kosong' }),
    })
    .superRefine((data, context) => {
        if (!data.user_type_id) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Jenis User tidak boleh kosong',
            })
        }
    })
    .transform(data => {
        const newData: any = { ...data }

        if (data.user_type_id) {
            newData.user_type_id = data.user_type_id.id
        }

        return newData
    })

export type UserForm = z.infer<typeof userSchema>
