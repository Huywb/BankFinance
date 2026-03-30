import SiderBar from "components/SiderBar"
import Image from "next/image"
import logo from '../../public/icons/logo.svg'
import MobileNav from "components/MobileNav"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

    const LoggedIn = {
      $id: '',
      email: '',
      userId: '',
      dwollaCustomerUrl: '',
      firstName: 'Text',
      lastName: 'JSM',
      dwollaCustomerId: '',
      address1: '',
      city: '',
      state: '',
      postalCode: '',
      dateOfBirth: '',
      ssn: ''
    }
  return (
    <main className="bg-white h-screen text-gray-900 flex w-full font-inter">
        <SiderBar user={LoggedIn}></SiderBar>

        <div className="flex size-full flex-col">
            <div className="root-layout">
                <Image src={logo} width={30} height={30} alt="menu icon"></Image>
                <div>
                    <MobileNav user={LoggedIn}></MobileNav>
                </div>
            </div>
        {children}

        </div>
    </main>
  )
}
