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
            <a className="navbar-brand" href="#">My Brand</a>
            {/*<a class="navbar-brand" href="#">
<img src="..." class="d-inline-block align-top" width="30" height="30" alt="...">My Brand
</a>*/}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
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
