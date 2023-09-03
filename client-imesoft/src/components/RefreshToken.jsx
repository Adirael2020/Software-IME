"use client"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { logUser } from "@/redux/features/userSlice"
import { useLoadUserQuery } from "@/redux/services/userApi"
import { useRouter } from 'next/navigation';

const RefreshToken = ({ children }) => {
    const navigate = useRouter();
    const dispatch = useDispatch();
    const { data, error, isLoading } = useLoadUserQuery();
    useEffect(() => {
        const loadUserFromBackend = async () => {
            try {
                if (error.data.message === 'Unauthorized') navigate.push('/login');
                    if (!isLoading && !error && data) {
                        dispatch(logUser(data));
                        console.log(data);
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
                isLoading ?
                    <div>Cargando</div>
                    :
                    children
            }
        </div>
    )
}

export default RefreshToken