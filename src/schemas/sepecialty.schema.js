import {z} from 'zod';

export const specialtySchema = z.object({
    name: z.string({
        required_error: "name is required"
    }).min(5,{
        message: 'name must be at least 6 characters'
    }),
})