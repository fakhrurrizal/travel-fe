import dayjs from 'dayjs'
import { z } from 'zod'

export const tripScheduleSchema = z
    .object({
        departure_at: z.any(),
        trip_id: z
            .object({ label: z.string(), id: z.number() })
            .nullable()
            .superRefine((data, context) => {
                if (!data) {
                    context.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Trip tidak boleh kosong',
                    })
                }
            }),
        available_seat: z.string().min(1, { message: 'Kuota tidak boleh kosong' }),
        duration_days: z.string().min(1, { message: 'Durasi tidak boleh kosong' }),
    })
    .superRefine((data, context) => {
        if (!data.trip_id) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Trip tidak boleh kosong',
            })
        }
    })
    .transform(data => {
        const newData: any = { ...data }

        if (data.trip_id) {
            newData.trip_id = data.trip_id.id
        }

        newData.available_seat = Number(data?.available_seat?.replace(/[,.]/g, ''))

        newData.duration_days = Number(data?.duration_days?.replace(/[,.]/g, ''))

        newData.departure_at = dayjs(data?.departure_at).format('YYYY-MM-DD')

        return newData
    })

export type TripScheduleForm = z.infer<typeof tripScheduleSchema>
