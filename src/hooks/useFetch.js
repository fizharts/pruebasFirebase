import React, { useEffect, useState } from 'react'
import { db } from '../config/fireBase'
// seleccionamos la conexion a cual documento
const tarea = db.collection('tareas')
export const useFetch = async () => {
        const [datos, setDatos] = useState([])
        const [error, setError] = useState(null)
        useEffect(() => {
                const obtenerLosDatos = async () => {
                        try {
                                const res = await tarea.get()
                                const arrayREs = res.map( item => ({
                                id : item.id,
                                ...res.data()
                                }))
                                setDatos( arrayREs )

                        } catch (e) {
                                setError( e )
                        }
                }

                obtenerLosDatos()


        }, [])

        return[
                datos ,
                error
        ]
}
