import { signOut } from "@/supabase/supabaseClient"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"

export const LogoutButton = () => {
    return (
        <Button
            onClick={signOut}
            variant="ghost"
            className="flex items-center gap-2"
        >
            <LogOut className="h-5 w-5" />
            Sign Out
        </Button>
    )
}
