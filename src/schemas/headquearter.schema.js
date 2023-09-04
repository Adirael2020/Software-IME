import {z} from 'zod';

export const headquearterSchema = z.object({
    name: z.string({
        required_error: 'Name is required'
    }),
    direction: z.string({
        required_error: 'Direction is required'
    }),  
    abbreviation: z.string({
        required_error: 'Abbreviation is required'
    }).max(2)
});
