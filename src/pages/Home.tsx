import { PostList } from '@/components/PostList'
import { useAuth } from '../hooks/useAuth'

import { User } from '@supabase/supabase-js'
import { CreatePostForm } from '@/components/CreatePostForm'

export default function Home() {
    const { user } = useAuth()

    return (
        <>
            <div className=" mt-8 max-w-xl min-h-screen">
                <CreatePostForm user={user as User} />
                <PostList />
            </div>
        </>
    )
}