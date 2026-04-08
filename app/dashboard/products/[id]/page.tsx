import LogoutButton from '@/components/Auth/LogOut'
import ProductDetailPage from '@/components/Dashboard/Products/ProductDetail'
import Footer from '@/components/Home/Footer'
import { Header2 } from '@/components/Home/Header'
import Socials from '@/components/Home/Header/Socials'
import React from 'react'

const page = () => {
  return (
    <div className='w-full min-h-screen'>
      <div className='w-full fixed top-0 left-0 z-10 border-b-2 border-(--cchu-red)'>
        <Header2/>
      </div>
      <ProductDetailPage/>
      <div className="fixed bottom-4 right-4">
          <LogoutButton/>
      </div>
      <Footer/>
    </div>
  )
}

export default page