import ForgotPassword from '@/components/Auth/Forgot'
import Footer from '@/components/Home/Footer'
import { Header2 } from '@/components/Home/Header'

const page = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
        <div className='w-full fixed top-0 left-0 z-10 border-b-2 border-(--cchu-red)'>
          <Header2/>
        </div>
        <ForgotPassword />
        <Footer/>
    </div>
  )
}

export default page