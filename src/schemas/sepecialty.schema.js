import {z} from 'zod';

export const specialtySchema = z.object({
    name: z.string({
        required_error: "name is required"
    }).min(2,{
        message: 'name must be at least 2 characters'
    }),
})