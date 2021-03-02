import React, { Fragment, useCallback, useState } from 'react'
import { auth } from '../../config/fireBase'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(null)
    const [registro, setRegistro] = useState(true)

    
    

    const procesarDatos = e => {
        e.preventDefault()
        if( !email.trim() ){
            setError('ingrese email')
            return
        }
        if( !pass.trim() ){
            setError('ingrese Contraseña')

            return
        }

        if( pass.length < 6){
            setError('Debe ser mayor a 6 caracteres')

            return
        }

        setError( null )

        if( registro ){
            registrarUs()
        }

        console.log( 'pasando validaciones' )
    }

    const registrarUs = useCallback( async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email , pass)
            console.log( res.user );
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/invalid-email'){
            setError('Email no valido');
            }
            if (error.code === 'auth/email-already-in-use') {
            setError('Email ya existe');           
            
            }
        }
    } , [ email , pass ]) 



    return (
        <Fragment>
            <div className="mt-5"/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4 mt-5">
                    <h5>Formulario de Usuario</h5>
                    <form onSubmit={ procesarDatos }>
                        {
                            error && (
                                <div className="alert alert-danger" role="alert">
                                    { error }
                                </div>
                            )
                        }
                        <input 
                            className="form-control mb-2" 
                            type="email"
                            placeholder="ingrese un email"
                            onChange={ e => setEmail(e.target.value) }
                            value={ email }
                            />
                        <input 
                            className="form-control mb-2"
                            type="password" 
                            placeholder="Ingrese un pasword"
                            onChange={ e => setPass(e.target.value) }
                            value={ pass }
                            />
                        <button 
                            type="submit"
                            className="btn btn-dark btn-lg btn-block">
                                {
                                    registro ? 'Registrarse' : 'Acceder'
                                }
                        </button>
                        <button className="btn btn-info btn-sm btn-block"
                                type="button"
                                onClick={ () => setRegistro(!registro) }>
                            {
                                registro ? ' Ya estas registrado ?' : '¿No tienes cuenta?'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
