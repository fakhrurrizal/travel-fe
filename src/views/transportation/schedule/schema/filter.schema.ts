import { generalOptionSchema } from '@/components/schemas/generalOptionSchema'
import { z } from 'zod'

export const TransportationCompanySchemas = z
    .object({
        transportation_class: generalOptionSchema.optional(),
        transportation_route: generalOptionSchema.optional(),
        sort: z
            .object({
                id: z.string(),
                label: z.string(),
            })
            .nullable(),
    })
    .transform(data => {
        const newData: any = data

        if (data.transportation_class) {
            newData.transportation_class = data.transportation_class.id
        }

        if (data.transportation_route) {
            newData.transportation_route = data.transportation_route.id
        }

        if (data.sort) {
            newData.sort = data.sort.id
        }

        return data
    })

export type TransportationCompanyFilter = z.infer<typeof TransportationCompanySchemas>
