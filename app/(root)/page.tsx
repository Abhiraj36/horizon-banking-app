import HeaderBox from '@/components/ui/HeaderBox'
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import React from 'react'

const Home = () => {
  const loggedIn = { firstName: "Abhiraj", lastName:"Aryan", email: "abhiraj@email.com" };

  return (
    <section className='home'>
      <div className = "home-content">
        <header className = "home-header">
         <HeaderBox 
         type = "greeting"
         title = "Welcome"
         user = {loggedIn?.firstName || 'Guest'}
         subtext = "Access and manage your account and transactions efficiently."
         />
         <TotalBalanceBox 
         accounts = { [] }
         totalBanks={1}
         totalCurrentBalance={1345.89}
         />
        </header>
      </div>
      <RightSidebar 
      user = { loggedIn }
      transactions = { [] }
      banks = {[{currentBalance:123.45},{currentBalance : 500}]}
      
      /> 

      
    </section>
  )
}

export default Home