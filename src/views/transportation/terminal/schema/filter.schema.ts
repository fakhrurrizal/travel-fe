import { generalOptionSchema } from '@/components/schemas/generalOptionSchema'
import { z } from 'zod'

export const TransportationCompanySchemas = z
    .object({
        transportation_type: generalOptionSchema.optional(),
        sort: z
            .object({
                id: z.string(),
                label: z.string(),
            })
            .nullable(),
    })
    .transform(data => {
        const newData: any = data

        if (data.transportation_type) {
            newData.transportation_type = data.transportation_type.id
        }

        if (data.sort) {
            newData.sort = data.sort.id
        }

        return data
    })

export type TransportationCompanyFilter = z.infer<typeof TransportationCompanySchemas>
