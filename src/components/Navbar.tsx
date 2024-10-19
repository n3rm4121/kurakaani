import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import { supabase } from '@/lib/supabase/supabaseClient'
import { UserAvatar } from './UserAvatar'
import { LogoutButton } from './LogoutButton'
import { Link } from 'react-router-dom'
import { CreatePostBtn } from './CreatePostBtn'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import LoginForm from './LoginForm'
import { Login } from '@/pages/Login'
export const Navbar = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <nav className="border-b z-50 sticky top-0 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to='/' className='text-2xl text-primary cursor-pointer font-extrabold'>
                        KuraKaani
                    </Link>

                    <div className="flex items-center gap-4">

                        {user ? (
                            <div
                                className="relative cursor-pointer"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}

                            >
                                <UserAvatar user={user} />
                                <div className={`
                                    absolute right-0 mt-2 py-2 bg-white rounded-md shadow-lg
                                    transform transition-all duration-200 ease-in-out
                                    ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
                                    border border-gray-100
                                `}>
                                    {/* User Info Section */}
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">{user.email}</p>
                                    </div>

                                    {/* Menu Items */}
                                    <Link to="/#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Profile
                                    </Link>
                                    <Link to="/#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Settings
                                    </Link>

                                    {/* Logout Button */}
                                    <div className="border-t border-gray-100 mt-2">
                                        <LogoutButton />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='md:hidden'>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>Login</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                        <h2 className="text-2xl font-bold mb-4">Welcome to KuraKaani</h2>
                                        <DialogDescription>
                                            Join KuraKaani to share your thoughts and stay connected with the world.
                                        </DialogDescription>
                                        <Login />
                                        <DialogFooter className="sm:justify-start">
                                            <DialogClose asChild>
                                                <Button type="button" variant="secondary">
                                                    Close
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}