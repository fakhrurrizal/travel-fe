import { z } from 'zod'

export const tripSchema = z
    .object({
        name: z.string().min(1, { message: 'Nama tidak boleh kosong' }),
        description: z.string().min(1, { message: 'Keterangan tidak boleh kosong' }),
        status: z.boolean().optional().default(true),
        trip_category_id: z
            .object({ label: z.string(), id: z.number() })
            .nullable()
            .superRefine((data, context) => {
                if (!data) {
                    context.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Kategori Trip tidak boleh kosong',
                    })
                }
            }),
        destination_type_id: z
            .object({ label: z.string(), id: z.number() })
            .nullable()
            .superRefine((data, context) => {
                if (!data) {
                    context.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Tipe Destinasi tidak boleh kosong',
                    })
                }
            }),
        base_price: z.string().min(1, { message: 'Harga tidak boleh kosong' }),
        is_active: z.boolean(),
        image: z.array(z.string().optional()).optional(),
        location: z.string().min(1, { message: 'Lokasi tidak boleh kosong' }),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
    })
    .superRefine((data, context) => {
        if (!data.trip_category_id) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Kategori Trip tidak boleh kosong',
            })
        }

        if (!data.destination_type_id) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Tipe Destinasi tidak boleh kosong',
            })
        }
    })
    .transform(data => {
        const newData: any = { ...data }

        if (data.trip_category_id) {
            newData.trip_category_id = data.trip_category_id.id
        }

        if (data.destination_type_id) {
            newData.destination_type_id = data.destination_type_id.id
        }

        newData.base_price = Number(data?.base_price?.replace(/[,.]/g, ''))

        newData.longitude = Number(data?.longitude)

        newData.latitude = Number(data?.latitude)

        return newData
    })

export type TripForm = z.infer<typeof tripSchema>
