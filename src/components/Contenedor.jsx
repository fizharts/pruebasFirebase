import { obtenerDatos, setDatos } from './../helpers/funFireBase';
import React, { useEffect, useState } from 'react'

export const Contenedor = () => {
    const [ tareas, setTareas ] = useState([])
    const [ tareaNueva, setTareaNueva ] = useState({})
    const [ imagen , setImagen ] = useState('')
    const handleChange = ( { target : { name , value , type , files } } ) => {
        console.log( type )
        // console.log( files )
        if ( type == 'file' ){
            // setImagen( files[0] )
            console.log( files[0] )
            setImagen(
                files[0]
            )

            

            return
        }

        setTareaNueva(
            {
                ...tareaNueva,
                [ name ] : value
            }
        )

    }

    const agregar = async  ( e )=> {
        e.preventDefault()
        if( Object.entries( tareaNueva ).length === 0 ){
            console.log( 'esta vacio' )
            return
        }
        console.log( tareaNueva )
        setDatos( tareaNueva )




        
    }

useEffect(() => {
        obtenerDatos(setTareas)

    }, [])

    console.log(tareas)
    console.log(imagen)


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
                                    {tarea.Nombre}
                                </li>
                            )
                            )

                        }
                    </ul>

                </div>
                <div className="col-lg-6">
                    <h3>Formulario</h3>
                    <form onSubmit={ agregar }>
                        <div className="form-group">
                            <label className="control-label">Nombre</label>
                            <input
                                className="form-control"
                                name="nombre" type="text"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Edad</label>
                            <input
                                className="form-control"
                                name="edad"
                                type="number"
                                onChange={(e) => handleChange(e)}

                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label"></label>
                            <select
                                className="form-control"
                                name="estatus"
                                onChange={ ( e ) => handleChange( e ) }
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
                                onChange={ ( e ) => handleChange( e ) }
                                />
                        </div>
                        <input className="btn btn-info "
                            type="submit"


                        />

                    </form>

                </div>
            </div>
        </div>
    )
}
