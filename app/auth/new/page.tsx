import SignupPage from '@/components/Auth/Signup'
import Footer from '@/components/Home/Footer'
import { Header2 } from '@/components/Home/Header'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='w-full fixed top-0 left-0 z-10 border-b-2 border-(--cchu-red)'>
        <Header2/>
      </div>
      <Suspense fallback={
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }>
          <SignupPage />
      </Suspense>
      <Footer/>
    </div>
  )
}

export default page