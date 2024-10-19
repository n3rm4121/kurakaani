import { Navbar } from '@/components/Navbar'
import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'


export default function RootLayout() {
    return (
        <MaxWidthWrapper>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className=" py-8">
                    <div className=" mx-auto">
                        <Outlet />
                    </div>
                </main>
                <Footer />
            </div>
        </MaxWidthWrapper>
    )
}