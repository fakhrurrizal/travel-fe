import { z } from 'zod'

export const transportationTerminalSchema = z
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
        name: z.string().min(1, { message: 'Nama Terminal tidak boleh kosong' }),
        code: z.string().min(1, { message: 'Kode tidak boleh kosong' }),
        city: z.string().min(1, { message: 'Kota tidak boleh kosong' }),
        province: z.string().min(1, { message: 'Provinsi tidak boleh kosong' }),
        address: z.string().min(1, { message: 'Address tidak boleh kosong' }),
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

export type TransportationTerminalForm = z.infer<typeof transportationTerminalSchema>
