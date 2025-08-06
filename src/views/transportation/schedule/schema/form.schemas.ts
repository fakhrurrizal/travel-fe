import dayjs, { Dayjs } from 'dayjs'
import { z } from 'zod'

export const transportationScheduleSchema = z
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
        transportation_route_id: z
            .object({ label: z.string(), id: z.number() })
            .nullable()
            .superRefine((data, context) => {
                if (!data) {
                    context.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Rute tidak boleh kosong',
                    })
                }
            }),
        vehicle_name: z.string().min(1, { message: 'Nama kendaraan tidak boleh kosong' }),
        total_seat: z.string().min(1, { message: 'Estimasi perjalanan tidak boleh kosong' }),
        base_price: z.string().min(1, { message: 'Harga tidak boleh kosong' }),
        image: z.string().min(1, { message: 'Gambar kendaraan tidak boleh kosong' }),
        departure_at: z.custom<Dayjs>(val => dayjs.isDayjs(val) && val.isValid(), {
            message: 'Waktu keberangkatan tidak valid',
        }),

        arrival_at: z.custom<Dayjs>(val => dayjs.isDayjs(val) && val.isValid(), {
            message: 'Waktu kedatangan tidak valid',
        }),

        valid_from: z.string().refine(val => dayjs(val, 'YYYY-MM-DD', true).isValid(), {
            message: 'Tanggal mulai tidak valid',
        }),

        valid_until: z.string().refine(val => dayjs(val, 'YYYY-MM-DD', true).isValid(), {
            message: 'Tanggal akhir tidak valid',
        }),
    })

    .transform(data => {
        const newData: any = { ...data }

        if (data.transportation_class_id) {
            newData.transportation_class_id = data.transportation_class_id.id
        }

        if (data.transportation_route_id) {
            newData.transportation_route_id = data.transportation_route_id.id
        }

        newData.total_seat = Number(data?.total_seat?.replace(/[,.]/g, ''))

        newData.base_price = Number(data?.base_price?.replace(/[,.]/g, ''))

        newData.valid_from = dayjs(data?.valid_from).format('YYYY-MM-DD')

        newData.valid_until = dayjs(data?.valid_until).format('YYYY-MM-DD')

        return newData
    })

export type TransportationScheduleForm = z.infer<typeof transportationScheduleSchema>
