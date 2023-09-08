import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Form from './Form'
import ViewProducts from './ViewProducts'
const Main = () => {
  return (
    <div>
         <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Form />} />
                    <Route path='view' element={<ViewProducts />} />
                </Routes>
            </BrowserRouter>
    </div>
  )
}

export default Main