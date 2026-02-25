import { MessageCircle, MessageCircleCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Fab = () => {

    const whatapp = "https://wa.me/2348052929523?text=Hello%20C-CHU%20Media%2C%20My%20name%20is"

  return (
    <div className="fab">
        <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-info bg-[#DCD8EF] border-none">
            <MessageCircle />
        </div>
        <div className="fab-close">
            Close <span className="btn btn-circle btn-lg bg-[#D8261C] border-none">✕</span>
        </div>
        <div className='font-bold'>Send a Whatapp
            <Link href={whatapp} className="btn btn-lg btn-circle bg-green-500 border-none">
                <MessageCircleCheck />
            </Link>
        </div>
    </div>
    )
}

export default Fab