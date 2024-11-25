import React from 'react'
import MainLayout from '../layouts/MainLayout'

const Home = () => {
    const { username, role , accounts} = JSON.parse(sessionStorage.getItem('user'))
    console.log(username, role, accounts)   
  return (
    <MainLayout>
      <div className='bg-red-500'>Home</div>
    </MainLayout>
  )
}

export default Home