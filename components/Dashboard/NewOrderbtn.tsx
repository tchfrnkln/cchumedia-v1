import Link from 'next/link'
import React from 'react'

const NewOrderbtn = ({ctn}:{ctn:string}) => {
  return (
    <div className="w-full flex justify-center items-center p-6 md:pt-24">
        <Link href="/dashboard" className="btn btn-primary mt-4 sm:mt-0 sm:ml-auto w-[60%] md:w-[35%] md:p-6">
            {ctn}
        </Link>
    </div>
  )
}

export default NewOrderbtn