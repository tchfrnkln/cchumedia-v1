import OrderSuccessPage from '@/components/Dashboard/Success/OrderSuccess'
import Footer from '@/components/Home/Footer'
import Socials from '@/components/Home/Header/Socials'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='w-full fixed top-0 left-0 bg-[#DCD8EF] p-4 z-10'>
        <Socials withMail/>
      </div>
      <Suspense fallback={
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }>
          <OrderSuccessPage />
      </Suspense>
      <Footer/>
    </div>
  )
}

export default page