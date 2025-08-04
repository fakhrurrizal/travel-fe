import { generalOptionSchema } from '@/components/schemas/generalOptionSchema'
import { z } from 'zod'

export const UserSchemas = z
    .object({
        user_type: generalOptionSchema.optional(),
        sort: z
            .object({
                id: z.string(),
                label: z.string(),
            })
            .nullable(),
    })
    .transform(data => {
        const newData: any = data

        if (data.user_type) {
            newData.user_type = data.user_type.id
        }

        if (data.sort) {
            newData.sort = data.sort.id
        }

        return data
    })

export type UserFilter = z.infer<typeof UserSchemas>
