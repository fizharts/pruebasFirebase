import { buscar } from './../../helpers/fun';
import React from 'react'

export const NavBar = ( { tareas , setTareas  } ) => {

    const handleChange = ({ target: { value } }) => {
        const res = buscar( tareas  , value)

        if( res.length !== 0 ){
            setTareas( res )
        }
        console.log(res)
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            {/*tips: to change the nav placement use .fixed-top,.fixed-bottom,.sticky-top*/}
            <link className="navbar-brand" to={'/'}>My Brand</link>
            {/*<link class="navbar-brand" to={'/'}>
<img src="..." class="d-inline-block align-top" width="30" height="30" alt="...">My Brand
</link>*/}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <link className="nav-link" to={'/'}>Home <span className="sr-only">(current)</span></link>
                    </li>
                    <li className="nav-item">
                        <link className="nav-link" to={'/'}>Link</link>
                    </li>
                    <li className="nav-item dropdown">
                        <link className="nav-link dropdown-toggle" to={'/'} id="navbarDropdown" data-toggle="dropdown" >
                            Dropdown
                        </link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <link className="dropdown-item" to={'/'}>Action</link>
                            <link className="dropdown-item" to={'/'}>Another action</link>
                            <div className="dropdown-divider" />
                            <link className="dropdown-item" to={'/'}>Something else here</link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <link className="nav-link disabled" to={'/'} tabIndex={-1} >Disabled</link>
                    </li>
                </ul>
                <span className="navbar-text">
                    Some text
    </span>
                <form className="form-inline my-2 my-lg-0">
                    
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
                </form>
            </div>
        </nav>

    )
}
