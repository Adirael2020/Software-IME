import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const response = await axios.post('http://localhost:3000/api/loginUser', credentials);
                const user = response.data;

                
                return user;
            }
        })
    ],
    session: {
        maxAge: 60 * 60 * 24,
        strategy: "jwt",
    },
    pages:{
        signIn: "/login",
    },
    callbacks: {
        async session({session,user,token}) {            
            session.user = token.sub as any;
            return session;
        },
        async jwt({token, account}){          
            return token
        }
    },
    secret: "IME5878",
})

export { handler as GET, handler as POST }