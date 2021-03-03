import { buscar } from './../../helpers/fun';
import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../../config/fireBase';
// { tareas , setTareas  }
const NavBar = ( { firebaseUser , history } ) => {

    // const handleChange = ({ target: { value } }) => {
    //     const res = buscar( tareas  , value)

    //     if( res.length !== 0 ){
    //         setTareas( res )
    //     }
    //     console.log(res)
    // }

    const cerrarSesion = (  )=>{
        auth.signOut()
            .then(()=> {
                history.push('/login')
            })
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            {/*tips: to change the nav placement use .fixed-top,.fixed-bottom,.sticky-top*/}
            <Link className="navbar-brand" to="/">My Brand</Link>
        
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to={'/'}>Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/'}>Link</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to={'/'} id="navbarDropdown" data-toggle="dropdown" >
                            Dropdown
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to={'/'}>Action</Link>
                            <Link className="dropdown-item" to={'/'}>Another action</Link>
                            <div className="dropdown-divider" />
                            <Link className="dropdown-item" to={'/'}>Something else here</Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link disabled" to={'/'} tabIndex={-1} >Disabled</Link>
                    </li>
                </ul>
                <span className="navbar-text">
                            {
                                firebaseUser !== null ? (
                                    <button className="btn btn-outline-light btn-sm">Admin</button>

                                ): null
                            }
                            {
                                firebaseUser !== null ?(
                                    <button className="btn-outline-danger btn-sm btn"
                                            onClick={ (e) => cerrarSesion() }>Logout</button>


                                ):( 
                                    <button className="btn btn-outline-info btn-sm">Login</button>

                                )

                            }
                </span>
                {/* <form className="form-inline my-2 my-lg-0">
                    
                    <div>
                        <input list="browsers" name="myBrowser"
                        className="form-control mr-sm-2"
                        type="search"
                        onChange={ ( e ) => handleChange(e)}
                        placeholder="Search"
                        aria-label="Search" />
                        <datalist id="browsers">
                            {
                                tareas.map(tarea => (
                                    <option key={ tarea.id } value={ tarea.nombre }></option>
                                ))
                            }
                        </datalist>
                        </div>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> */}
            </div>
        </nav>

    )
}

export default withRouter( NavBar )
