import { db } from "../config/fireBase";

const tareas = db.collection('tareas')


export const obtenerDatos = async ( setTareas ) => {
    try {
        const todos = await tareas.get()
        const arrayDate = todos.docs.map(doc => ({
            id : doc.id,
            ...doc.data()                
        }))

        setTareas( arrayDate )
        return arrayDate
    } catch (e) {
        console.log( e )
    }
}


export const setDatos = async ( tarea , setTareaNueva ) => {
    try {
        await tareas.add( tarea ).then(res => console.log( res.id ))

        setTareaNueva({})

    } catch (e) {
        console.log( e )
    }
}