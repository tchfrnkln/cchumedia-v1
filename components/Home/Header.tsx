import Fab from './Header/Fab'
import Hero from './Header/Hero'
import Socials from './Header/Socials'

function Header() {
  return (
    <div className='w-full'>
      <div className='w-full fixed top-0 left-0 bg-[#DCD8EF] p-4 z-10'>
        <Socials withMail/>
      </div>
      <Hero/>
      <Fab/>
    </div>
  )
}

export default Header