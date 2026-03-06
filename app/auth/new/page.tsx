import SignupPage from '@/components/Auth/Signup'
import Footer from '@/components/Home/Footer'
import Socials from '@/components/Home/Header/Socials'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='w-full fixed top-0 left-0 bg-[#DCD8EF] p-4 z-10'>
        <Socials withMail/>
      </div>
      <SignupPage/>
      <Footer/>
    </div>
  )
}

export default page