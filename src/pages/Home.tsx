import { PostList } from '@/components/posts/PostList'
import { useAuth } from '../hooks/useAuth'

import { User } from '@supabase/supabase-js'
import { CreatePostForm } from '@/components/posts/CreatePostForm'
import { LeftSidebar } from '@/components/layout/LeftSidebar'
import { RightSidebar } from '@/components/layout/RightSidebar'

export default function Home() {
    const { user } = useAuth()

    return (
        <>

            <div className="mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left Sidebar - Hidden on mobile */}
                    <div className="hidden md:block md:col-span-3">
                        <LeftSidebar user={user} />
                    </div>

                    {/* Main Content - Full width on mobile */}
                    <div className="col-span-1 md:col-span-6">
                        <div className="max-w-3xl mx-auto">
                            {user && <CreatePostForm user={user} />}
                            <PostList />
                        </div>
                    </div>

                    {/* Right Sidebar - Hidden on mobile */}
                    <div className="hidden md:block md:col-span-3">
                        <RightSidebar user={user} />
                    </div>
                </div>
            </div>


        </>
    )
}