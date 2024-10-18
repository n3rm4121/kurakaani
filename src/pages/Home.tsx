// import { CreatePostButton } from '../components/posts/CreatePostButton'
import { PostList } from '@/components/PostList'
import { useAuth } from '../hooks/useAuth'
import { Button } from '@/components/ui/button'
import CreatePost from '@/components/CreatePost'
import { User } from '@supabase/supabase-js'

export default function Home() {
    const { user } = useAuth()

    return (
        <>
            {/* {user && <CreatePostButton userId={user.id} />} */}
            <div className=" mt-8 max-w-xl min-h-screen">
                <CreatePost user={user as User} />
                <PostList />
            </div>
        </>
    )
}