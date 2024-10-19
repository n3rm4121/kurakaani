import { Navbar } from '@/components/layout/Navbar'
import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper'


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