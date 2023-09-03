"use client"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { logUser } from "@/redux/features/userSlice"
import { useLoadUserQuery } from "@/redux/services/userApi"
import { useRouter, usePathname } from 'next/navigation';


const RefreshToken = ({ children }) => {
    const navigate = useRouter();
    const pathname = usePathname()
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { data, error, isLoading } = useLoadUserQuery();

    useEffect(() => {
        const loadUserFromBackend = async () => {
            try {
                if (pathname !== '/login' || pathname !== '/login/registerStudent') {
                    if (!isLoading) {
                        if (data.notLogued) navigate.push('/login');
                        if (!isLoading && !error && data) {
                            dispatch(logUser(data));
                            setLoading(false);
                        }
                    }
                };
                if(pathname === '/login' || pathname === '/login/registerStudent'){
                    if (!data.notLogued) navigate.push('/homePage');
                }
            } catch (error) {
                console.error('Error al cargar el usuario:', error);
            }
        };
        loadUserFromBackend();
    }, [dispatch, isLoading, error]);


    return (
        <div>
            {
                loading ?
                    <div>Cargando</div>
                    :
                    children
            }
        </div>
    )
}

export default RefreshToken