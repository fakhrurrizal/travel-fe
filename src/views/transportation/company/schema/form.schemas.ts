import { z } from 'zod'

export const transportationCompanySchema = z
    .object({
        transportation_type_id: z
            .object({ label: z.string(), id: z.number() })
            .nullable()
            .superRefine((data, context) => {
                if (!data) {
                    context.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Jenis Transportasi tidak boleh kosong',
                    })
                }
            }),
        name: z.string().min(1, { message: 'Nama Perusahaan tidak boleh kosong' }),
        description: z.string().min(1, { message: 'Keterangan tidak boleh kosong' }),
        logo: z.string().min(1, { message: 'Logo tidak boleh kosong' }),
        code: z.string().min(1, { message: 'Kode tidak boleh kosong' }),
    })
    .superRefine((data, context) => {
        if (!data.transportation_type_id) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Jenis Transportasi tidak boleh kosong',
            })
        }
    })
    .transform(data => {
        const newData: any = { ...data }

        if (data.transportation_type_id) {
            newData.transportation_type_id = data.transportation_type_id.id
        }

        return newData
    })

export type TransportationCompanyForm = z.infer<typeof transportationCompanySchema>
