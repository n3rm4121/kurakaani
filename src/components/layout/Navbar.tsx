import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import { supabase } from '@/lib/supabase/supabaseClient'
import { UserAvatar } from '../user/UserAvatar'
import { LogoutButton } from '../auth/LogoutButton'
import { Link } from 'react-router-dom'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LoginButtons } from '@/components/auth/LoginButtons'
import { CreatePostForm } from '../posts/CreatePostForm'
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
        <nav className="border-b z-50 sticky top-0 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    <Link to='/' className='text-2xl text-primary cursor-pointer font-extrabold'>
                        KuraKaani
                    </Link>


                    <div className="flex items-center gap-4">
                        <Link to='/docs' className='text-lg text-primary cursor-pointer'>
                            Docs
                        </Link>
                        {user ? (
                            <>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>Create Post</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md rounded-md">
                                        <h2 className="text-2xl font-bold text-center">Create a Post</h2>
                                        <CreatePostForm user={user} />
                                    </DialogContent>
                                </Dialog>
                                <div
                                    className="relative cursor-pointer"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}

                                >
                                    <UserAvatar user={user} />
                                    <div className={`
                                    absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg
                                    transform transition-all duration-200 ease-in-out
                                    ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
                                    border border-gray-100
                                `}>

                                        <Link to="/#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Profile
                                        </Link>
                                        <Link to="/#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Settings
                                        </Link>

                                        <div className="border border-gray-100 mt-2">
                                            <LogoutButton />
                                        </div>
                                    </div>

                                </div>

                            </>
                        ) : (
                            <div className='md:hidden'>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>Login</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md rounded-md">
                                        <h2 className="text-2xl font-bold mb-4">Welcome to KuraKaani</h2>
                                        <DialogDescription>
                                            Join KuraKaani to share your thoughts and stay connected with the world.
                                        </DialogDescription>
                                        <LoginButtons />
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