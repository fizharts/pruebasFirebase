import NavBar from './NavBar/NavBar';
import { obtenerDatos, setDatos, eliminarDato, actualizarTarea, agregarImagen } from './../helpers/funFireBase';
import React, { useEffect, useState, Fragment, useRef } from 'react'
import Swal from 'sweetalert2'

export const Contenedor = () => {
    const [tareas, setTareas] = useState([])
    const [tareaNueva, setTareaNueva] = useState({
        edad: 0,
        estatus: false,
        imagen: "",
        nombre: ""
    })
    const [imagen, setImagen] = useState('')
    const [idT, setIdT] = useState('')
    const [modoEdicion, setmodoEdicion] = useState(false)
    const ref = useRef()
    const imagenFondo = useRef()

    const handleChange = ({ target: { name, value, type, files } }) => {
        if (type === 'file') {

            agregarImagen(files[0], name, setImagen)
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
        console.log(tareaNueva)
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

    const activarEdicion = ({ id, edad, nombre, estatus, imagen }) => {
        setmodoEdicion(true)
        // setTareas( item.name )
        setIdT(id)
        tareaNueva.edad = edad
        tareaNueva.nombre = nombre
        ref.current.value = estatus
        imagenFondo.current.src = imagen || 'https://firebasestorage.googleapis.com/v0/b/pruebas-25635.appspot.com/o/imagenes%2Fimagendbc5d50ac819a53e75a73d5a90942130.png?alt=media&token=91736f24-846b-41f5-816d-ad24d35ed0f9'

    }

    const editar = async (e) => {
        e.preventDefault()
        if (Object.entries(tareaNueva).length === 0) {
            console.log('esta vacio')
            return
        }
        actualizarTarea(tareaNueva, idT)

        let nuevoArray = tareas.map(({ nombre, id, imagen, edad, estatus }) => {
            if (id === idT) {

                return {
                    id,
                    nombre: tareaNueva.nombre, imagen, edad, estatus
                }
            } else {
                return {
                    nombre, id, imagen, edad, estatus
                }
            }

        })

        Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
        )
        setTareas(nuevoArray)


    }
    return (
        <Fragment>
            <NavBar tareas={tareas} setTareas={setTareas} />

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
                                                () => activarEdicion(tarea)
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
                            modoEdicion ? 'Editar Tarea' : 'Agregar tarea'
                        }</h3>
                        <form onSubmit={modoEdicion ? editar : agregar}>
                            <div className="form-group">
                                <label className="control-label">Nombre</label>
                                <input
                                    className="form-control"
                                    name="nombre" type="text"
                                    value={tareaNueva.nombre}
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
                                    ref={ref}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value={true} >Activo</option>
                                    <option value={false}>Inactivo</option>
                                </select>
                            </div>
                            <div className="form-group">
                                {
                                    modoEdicion ? (
                                        <img
                                            ref={imagenFondo}
                                            className="img-fluid"
                                            alt="Responsive " />

                                    ) : (
                                        <img
                                            ref={imagenFondo}
                                            className="img-fluid"
                                            alt="Responsive " />
                                    )
                                }

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
                                    modoEdicion ? 'Editar' : ' Agregar'
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}
