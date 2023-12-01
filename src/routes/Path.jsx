import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'
import RouteGuard from '../components/RouteGuard'
import CreateContact from '../components/CreateContact'
import UserInfo from '../components/UserInfo'

const Path = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<RouteGuard>
              <Dashboard/>
            </RouteGuard>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/create' element={<RouteGuard>
              <CreateContact/>
            </RouteGuard>}/>
            <Route path='/userinfo/:id' element={<UserInfo/>}/>

        </Routes>
    </div>
  )
}

export default Path