import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@supabase/supabase-js"

interface UserAvatarProps {
    user: User | null
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
    if (!user) return null

    return (
        <Avatar>
            <AvatarImage src={user.user_metadata.avatar_url} />
            <AvatarFallback>
                {user.email?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
        </Avatar>
    )
}