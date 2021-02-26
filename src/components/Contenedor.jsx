import { obtenerDatos, setDatos, eliminarDato } from './../helpers/funFireBase';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const Contenedor = () => {
    const [tareas, setTareas] = useState([])
    const [tareaNueva, setTareaNueva] = useState({
        edad: 0,
        estatus: false ,
        id: "0" ,
        imagen: "",
        nombre: ""
    })
    const [imagen, setImagen] = useState('')
    const [idT, setIdT] = useState('')
    const [modoEdicion, setmodoEdicion] = useState(false)

    const handleChange = ({ target: { name, value, type, files } }) => {
        console.log(type)
        // console.log( files )
        if (type == 'file') {
            // setImagen( files[0] )
            console.log(files[0])
            setImagen(
                files[0]
            )
            return
        }

        setTareaNueva(
            {
                ...tareaNueva,
                [name]: value
            }
        )

    }

    const agregar = async (e) => {
        e.preventDefault()
        if (Object.entries(tareaNueva).length === 0) {
            console.log('esta vacio')
            return
        }

        setDatos(tareaNueva, setIdT).then(res => {
            console.log(idT)
            setTareas([
                ...tareas,
                { ...tareaNueva, id: idT }
            ])
        })

        Swal.fire(
                    'Good job!',
                    'You clicked the button!',
                    'success'
                )




    }

    const eliminar = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                eliminarDato(id)
                const arrayFilstrado = tareas.filter(item => item.id !== id)
                setTareas(arrayFilstrado)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

    }
    

    useEffect(() => {
        obtenerDatos(setTareas)

    }, [])

    console.log(tareas)
    console.log(imagen)

    const activarEdicion = ( item )=> {
        setmodoEdicion( true )
        // setTareas( item.name )
        setIdT( item.id )
    }

    const editar = async ( e ) => {
        e.preventDefault()

    }
    return (
        <div className="container">
            <h1>Datos fireBase</h1>
            <div className="row">
                <div className="col-lg-6">
                    <ul className="list">
                        {
                            tareas.map(tarea =>
                            (
                                <li
                                    className="list-group-item"
                                    key={
                                        tarea.id
                                    }>
                                    {tarea.nombre}
                                    <button
                                        className="btn btn-danger float-right btn-sm"
                                        onClick={() => eliminar(tarea.id)}>
                                        Eliminar</button>
                                    <button
                                        className="btn btn-info btn-sm float-right mr-2"
                                        onClick={
                                            () => activarEdicion( tarea )
                                        }>
                                        Editar
                                        </button>
                                </li>
                            )
                            )
                        }
                    </ul>
                </div>
                <div className="col-lg-6">
                    <h3>{
                        modoEdicion ? 'Editar Tarea': 'Agregar tarea'
                    }</h3>
                    <form onSubmit={modoEdicion ? editar : agregar}>
                        <div className="form-group">
                            <label className="control-label">Nombre</label>
                            <input
                                className="form-control"
                                name="nombre" type="text"
                                value={ tareaNueva.nombre }
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Edad</label>
                            <input
                                className="form-control"
                                name="edad"
                                value={tareaNueva.edad}
                                type="number"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label"></label>
                            <select
                                className="form-control"
                                name="estatus"
                                onChange={(e) => handleChange(e)}
                            >
                                <option value={true} >Activo</option>
                                <option value={false}>Inactivo</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="file"
                                name="imagen"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <button className={
                            modoEdicion ? 'btn btn-info btn-block' :
                                        'btn btn-dark btn-block'
                        }
                            type="submit"
                            >
                                {
                                    modoEdicion ? 'Editar' :' Agregar'
                                }
                            </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
