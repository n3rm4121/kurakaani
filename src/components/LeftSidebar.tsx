import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User } from '@supabase/supabase-js'
import {
    Home,
    Bookmark,
    User as UserIcon,
    Settings,
    LineChart,
    ScrollText
} from "lucide-react"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Login } from "@/pages/Login"
import LoginForm from "./LoginForm"

interface LeftSidebarProps {
    user: User | null
}

const navigationItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: ScrollText, label: 'My Posts', href: '/my-posts' },
    { icon: Bookmark, label: 'Bookmarks', href: '/bookmarks' },
    { icon: LineChart, label: 'Analytics', href: '/analytics' },
    { icon: UserIcon, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
]

export function LeftSidebar({ user }: LeftSidebarProps) {
    if (!user) {
        return (
            <LoginForm />
        )
    }

    return (
        <div className="space-y-4 sticky top-20">
            <Card>
                <CardContent className="p-6">
                    <nav className="space-y-2">
                        {navigationItems.map((item) => (
                            <Button
                                key={item.label}
                                variant="ghost"
                                className="w-full justify-start"
                            >
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.label}
                            </Button>
                        ))}
                    </nav>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Your Stats</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Posts</span>
                            <span className="font-medium">28</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Post Likes</span>
                            <span className="font-medium">1,234</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Reposts</span>
                            <span className="font-medium">15</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}



