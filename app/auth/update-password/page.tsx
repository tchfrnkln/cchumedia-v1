import UpdatePassword from '@/components/Auth/Update'
import Footer from '@/components/Home/Footer'
import Socials from '@/components/Home/Header/Socials'

const page = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
        <div className='w-full fixed top-0 left-0 bg-[#DCD8EF] p-4 z-10'>
            <Socials withMail/>
        </div>
        <UpdatePassword />
        <Footer/>
    </div>
  )
}

export default page