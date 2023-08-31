import {z} from 'zod';

export const registerUserSchema = z.object({
    username: z.string({
        required_error: 'Username is required'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6,{
        message: 'Password must be at least 6 characters'
    }),
    fullname: z.string({
        required_error: 'Fullname is required'
    }),
    email: z.string({
        required_error: 'Email is required'
    }).email({
        required_error: 'Ivalid email'
    }),
    hierarchy: z.string({
        required_error: 'hierarchy is required'
    }),
    specialty: z.string().array(),
    birthday: z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
      }),
    headqueartersFromUser: z.string().array()
});