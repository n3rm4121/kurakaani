import { PostList } from '@/components/posts/PostList'
import { useAuth } from '../hooks/useAuth'
import { CreatePostForm } from '@/components/posts/CreatePostForm'
import { LeftSidebar } from '@/components/layout/LeftSidebar'
import { RightSidebar } from '@/components/layout/RightSidebar'
import MobileNavigation from '@/components/layout/MobileNavigation'

export default function Home() {
    const { user } = useAuth()

    return (
        <div className="mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                <div className="hidden md:block md:col-span-2">
                    <LeftSidebar user={user} />
                </div>

                <div className="col-span-1 md:col-span-7">
                    <div className="max-w-3xl mx-auto">
                        {user && <CreatePostForm user={user} />}
                        <PostList />
                    </div>
                </div>

                <div className="hidden md:block md:col-span-3">
                    <RightSidebar user={user} />
                </div>

                {user &&
                    <div className='sticky bottom-0 left-1/2'>

                        <MobileNavigation />
                    </div>
                }

            </div>
        </div>
    )
}