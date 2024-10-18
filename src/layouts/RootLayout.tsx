import { Navbar } from '@/components/Navbar'
import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/Footer'


export default function RootLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    )
}