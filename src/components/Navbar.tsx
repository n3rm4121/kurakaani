import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import { supabase } from '@/supabase/supabaseClient'
import { UserAvatar } from './UserAvatar'
import { LogoutButton } from './LogoutButton'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    const [user, setUser] = useState<User | null>(null)

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
        <nav className="border-b sticky top-0 bg-emerald-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to='/'>
                        SocialApp
                    </Link>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <UserAvatar user={user} />
                                <LogoutButton />
                            </>
                        ) : (
                            <Link to='/login'>
                                <Button>Login</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

