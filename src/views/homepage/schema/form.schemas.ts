import { z } from 'zod'

export const homePageSchema = z
    .object({
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

    .transform(data => {
        const newData: any = { ...data }

        if (data.transportation_class_id) {
            newData.transportation_class_id = data.transportation_class_id.id
        }

        return newData
    })

export type HomePageForm = z.infer<typeof homePageSchema>
