import { z } from 'zod'

export const homeSchema = z
    .object({
        trip_id: z.object({ label: z.string(), id: z.number() }).nullable(),
        transportation_class_id: z
            .object({
                label: z.string(),
                id: z.number(),
                transportation_type_name: z.string().optional(),
                transportation_type_id: z.number().optional(),
            })
            .nullable()
            .superRefine((data, context) => {
                if (!data) {
                    context.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Kelas Transportasi tidak boleh kosong',
                    })
                }
            }),
    })
    .superRefine((data, context) => {
        if (!data.trip_id) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Kategori Trip tidak boleh kosong',
            })
        }
    })
    .transform(data => {
        const newData: any = { ...data }

        if (data.trip_id) {
            newData.trip_id = data.trip_id.id
        }

        if (data.transportation_class_id) {
            newData.transportation_class_id = data.transportation_class_id.id
        }

        return newData
    })

export type HomeForm = z.infer<typeof homeSchema>
