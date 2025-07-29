import { generalOptionSchema } from '@/components/schemas/generalOptionSchema'
import { z } from 'zod'

export const TransportationCompanySchemas = z
    .object({
        transportation_type: generalOptionSchema.optional(),
        transportation_company: generalOptionSchema.optional(),
        departure_terminal: generalOptionSchema.optional(),
        arrival_terminal: generalOptionSchema.optional(),
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

        if (data.transportation_company) {
            newData.transportation_company = data.transportation_company.id
        }

        if (data.departure_terminal) {
            newData.departure_terminal = data.departure_terminal.id
        }

        if (data.arrival_terminal) {
            newData.arrival_terminal = data.arrival_terminal.id
        }

        if (data.sort) {
            newData.sort = data.sort.id
        }

        return data
    })

export type TransportationCompanyFilter = z.infer<typeof TransportationCompanySchemas>
