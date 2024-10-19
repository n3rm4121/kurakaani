import { signOut } from "@/lib/supabase/supabaseClient"
import { LogOut } from "lucide-react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"

export const LogoutButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full hover:text-red-500">Log Out</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Log Out of Kurakaani?</DialogTitle>
                    <DialogDescription>
                        You can always access your content by signing back in.
                    </DialogDescription>
                </DialogHeader>

                <Button
                    onClick={signOut}
                    variant="destructive"
                    className="w-full flex items-center justify-center space-x-2"
                >
                    <LogOut className="h-5 w-5" />
                    Log Out
                </Button>

                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Cancel
                    </Button>
                </DialogClose>

            </DialogContent>
        </Dialog>
    )
}


