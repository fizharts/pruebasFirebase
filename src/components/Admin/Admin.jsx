import { firebase } from 'firebase/app';
import { withRouter } from 'react-router-dom';

import React, { useEffect, useState } from 'react'
import { auth } from '../../config/fireBase'
import FireStore from '../fireStore/FireStore';

const Admin = ({history}) => {

    const [user, setUser] = useState(null)
    useEffect(() => {
        if (auth.currentUser) {
            console.log( ' existe usuario ' )
            setUser(auth.currentUser)
            
        }else{
            console.log( 'no existe usuario' )
            history.push( '/login' )
        }

    }, [ history ])
    return (
        
        <div className="row justify-content-center">
            <h4 className="mt-5"> ruta protegida </h4>
            <FireStore/>
        </div>
    )
}

export default withRouter( Admin )
