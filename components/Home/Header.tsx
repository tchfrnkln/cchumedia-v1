import Fab from './Fab'
import Hero from './Hero'
import Socials from './Socials'

function Header() {
  return (
    <div className='w-full'>
      <div className='w-full absolute top-0 left-0 bg-[#DCD8EF] p-4 z-10'>
        <Socials/>
      </div>
      <Hero/>
      <Fab/>
    </div>
  )
}

export default Header