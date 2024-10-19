// components/RightSidebar.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User } from '@supabase/supabase-js'
import { TrendingUp, Hash } from "lucide-react"

interface RightSidebarProps {
    user: User | null
}

const trendingTopics = [
    { tag: 'Dashain', posts: 1234 },
    { tag: 'Tihar', posts: 892 },
    { tag: 'Elon Musk', posts: 753 },
    { tag: 'Space', posts: 521 },
    { tag: 'Cooper', posts: 489 }
]

const suggestedUsers = [
    {
        id: 1,
        name: 'Sarah Chen',
        username: '@sarahchen',
        role: 'Full Stack Developer',
        avatar: '/api/placeholder/32/32'
    },
    {
        id: 2,
        name: 'Alex Kim',
        username: '@alexk',
        role: 'UI/UX Designer',
        avatar: '/api/placeholder/32/32'
    },
    {
        id: 3,
        name: 'Maria Garcia',
        username: '@mgarcia',
        role: 'DevOps Engineer',
        avatar: '/api/placeholder/32/32'
    }
]

export function RightSidebar({ user }: RightSidebarProps) {
    if (!user) {
        return (
            <Card className="sticky top-20">
                <CardHeader>
                    <CardTitle className="text-lg">Trending Topics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {trendingTopics.slice(0, 3).map((topic) => (
                        <div key={topic.tag} className="flex hover:underline hover:cursor-pointer text-blue-500 items-center gap-2">
                            <Hash className="h-4 w-4 text-blue-500" />
                            <span className="text-md">{topic.tag}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4 sticky top-20">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Trending</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {trendingTopics.map((topic) => (
                            <div key={topic.tag} className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-blue-500" />
                                    <span className="font-medium text-sm">{topic.tag}</span>
                                </div>
                                <p className="text-xs text-muted-foreground pl-6">
                                    {topic.posts.toLocaleString()} posts
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Who to follow</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {suggestedUsers.map((suggestedUser) => (
                            <div
                                key={suggestedUser.id}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <img
                                        src={suggestedUser.avatar}
                                        alt={suggestedUser.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">{suggestedUser.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {suggestedUser.role}
                                        </p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline">
                                    Follow
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}