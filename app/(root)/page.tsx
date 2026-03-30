import HeaderBox from 'components/HeaderBox'
import RightSiderbar from 'components/RightSiderbar'
import TotalBalanceBox from 'components/TotalBalanceBox'
import React from 'react'

const page = () => {
    const Loggind = {
        $id: "",
        userId: "",
        dwollaCustomerUrl: "",
        dwollaCustomerId: "",
        firstName: "text",
        lastName: "jsm",
        email: "text@example.com",
        dwollaUserType: "",
        address1: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        dateOfBirth: "",
        ssn: ""
    }
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox 
                    type='greeting' 
                    title="Welcome" 
                    user={Loggind.firstName || "Guest"}
                    subtext="Access and manage your account and transaction efficiently"
                ></HeaderBox>


                <TotalBalanceBox
                    accounts={[]}
                    totalBanks={1}
                    totalCurrentBalance={1235.30}    
                >

                </TotalBalanceBox>
            </header>

            RECENT TRANSACTIONS
        </div>

        <RightSiderbar user={Loggind} transactions={[]} banks={[{currentBalance: 1234.56}, {currentBalance: 7890.12}]} />
    </section>
  )
}

export default page
