import { db, storage } from "../config/fireBase";


const tareas = db.collection('tareas')


export const obtenerDatos = async ( setTareas ) => {

    try {
        const todos = await tareas.get()
        console.log( todos.docs )
        const arrayDate = todos.docs.map(doc => ({
            id : doc.id,
            ...doc.data()                
        }))
        console.log( arrayDate )
        setTareas( arrayDate )
        return arrayDate
    } catch (e) {
        console.log( e )
    }
}


export const setDatos = async ( tarea , setIdT ) => {
    try {
        await tareas.add( tarea ).then(res => {
            setIdT(res.id)
            console.log(res.id)
            
        })

        

    } catch (e) {
        console.log( e )
        return {
            ok : false
        }

    }
}

export const eliminarDato = async ( id ) => {
    try {
        await tareas.doc(id).delete()
    } catch (e) {
        console.log( e )
    }
}

export const agregarImagen = async ( imagen , user , setImagen ) => {

    console.log( imagen )
    try {
        const imagenRef =  storage.ref().child(`imagenes/${user + imagen.name }`)
        await imagenRef.put(imagen)
        const imagenUrl = await imagenRef.getDownloadURL()
        setImagen( imagenUrl )
        console.log(imagenUrl)
    } catch (e) {
    
    }
}

export const actualizarTarea = async ( tarea , id ) => {
    try {
        await tareas.doc(id).update(tarea)
        return true
    } catch (e) {
        console.log( e )
        return false
    }
}