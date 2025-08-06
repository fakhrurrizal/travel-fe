import { z } from 'zod'

export const UserSchemas = z
    .object({
        sort: z
            .object({
                id: z.string(),
                label: z.string(),
            })
            .nullable(),
    })
    .transform(data => {
        const newData: any = data

        if (data.sort) {
            newData.sort = data.sort.id
        }

        return data
    })

export type UserFilter = z.infer<typeof UserSchemas>
