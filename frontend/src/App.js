import React from 'react'
import Header from './component/Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setProductData } from './redux/productSlice'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    ( 
      async ()=>{
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}product`);
        const response = await fetchData.json();
        // console.log(response);
        dispatch(setProductData(response));
      }
    )()
  }, [])
  
  return (
    <>
    <Toaster/>
    <div>
      <Header/>
      <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
        <Outlet/>
      </main>
    </div>
    </>
  )
}

export default App;
