import { z } from 'zod'

export const transportationRouteSchema = z
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
        transportation_company_id: z
            .object({ label: z.string(), id: z.number() })
            .nullable()
            .superRefine((data, context) => {
                if (!data) {
                    context.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Perusahaan tidak boleh kosong',
                    })
                }
            }),
        departure_terminal_id: z
            .object({ label: z.string(), id: z.number(), code: z.string().optional() })
            .nullable()
            .superRefine((data, context) => {
                if (!data) {
                    context.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Terminal keberangkatan tidak boleh kosong',
                    })
                }
            }),
        arrival_terminal_id: z
            .object({ label: z.string(), id: z.number(), code: z.string().optional() })
            .nullable()
            .superRefine((data, context) => {
                if (!data) {
                    context.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Terminal tiba tidak boleh kosong',
                    })
                }
            }),
        name: z.string().min(1, { message: 'Nama rute Terminal tidak boleh kosong' }),
        distance_km: z.string().min(1, { message: 'Jarak tidak boleh kosong' }),
        estimated_duration: z.string().min(1, { message: 'Estimasi perjalanan tidak boleh kosong' }),
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

        if (data.transportation_company_id) {
            newData.transportation_company_id = data.transportation_company_id.id
        }

        if (data.departure_terminal_id) {
            newData.departure_terminal_id = data.departure_terminal_id.id
        }

        if (data.arrival_terminal_id) {
            newData.arrival_terminal_id = data.arrival_terminal_id.id
        }

        newData.estimated_duration = Number(data?.estimated_duration)

        newData.distance_km = Number(data?.distance_km)

        return newData
    })

export type TransportationRouteForm = z.infer<typeof transportationRouteSchema>
