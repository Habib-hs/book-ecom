import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'

function AdminRoute() {
  const user =   JSON.parse(localStorage.getItem("user")) 
  let auth = user.role;

  return ( 
   auth === true ? <Outlet/> : <Navigate to='/signin'/>
  )
}

export default AdminRoute

