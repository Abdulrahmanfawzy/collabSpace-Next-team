import React from 'react'
import  MainNav  from './MainNav'

const Navbar = () => {
  return (
    <header className='w-full py-5  '>
        <nav className=' app-container mx-auto flex items-center gap-6'>
            <h1 className="text-xl leading-4 font-normal">Collabspace</h1>
            <MainNav/>
        </nav>
    </header>
  )
}

export default Navbar