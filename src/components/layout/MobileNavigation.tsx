import {
    Home,
    Repeat2,
    ScrollText,
    MoreHorizontal,
    LineChart,
    UserIcon,
    Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MobileNavigation = () => {
    const moreMenuItems = [
        { icon: LineChart, label: 'Analytics' },
        { icon: UserIcon, label: 'Profile' },
        { icon: Settings, label: 'Settings' },
    ]

    const activeNavItem = 'text-primary'
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden">
            <div className="flex items-center justify-around p-3">
                <Button variant="ghost" size="lg" className={`h-full p-2 flex-col items-center ${activeNavItem} hover:text-blue-500`}>
                    <Home className="h-5 w-5" />
                    <span className="text-xs mt-1">Home</span>
                </Button>

                <Button variant="ghost" size="sm" className="h-full hover:text-blue-500 p-2 flex-col items-center">
                    <ScrollText className="h-5 w-5" />
                    <span className="text-xs mt-1">My Posts</span>
                </Button>

                <Button variant="ghost" size="sm" className="h-full hover:text-blue-500 p-2 flex-col items-center">
                    <Repeat2 className="h-5 w-5" />
                    <span className="text-xs mt-1">My Reposts</span>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-full hover:text-blue-500 p-2 flex-col items-center">
                            <MoreHorizontal className="h-5 w-5" />
                            <span className="text-xs mt-1">More</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="mb-4">
                        {moreMenuItems.map((item) => (
                            <DropdownMenuItem key={item.label} className="cursor-pointer">
                                <item.icon className="mr-2 h-4 w-4" />
                                <span>{item.label}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default MobileNavigation