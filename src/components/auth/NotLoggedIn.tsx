import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LoginButtons } from "@/pages/LoginButtons";
import { Github, Mail } from "lucide-react"


interface NotLoggedInDialogProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const NotLoggedInDialog = ({ isOpen, setIsOpen }: NotLoggedInDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center mb-2 text-2xl">Login to interact</DialogTitle>
                </DialogHeader>
                <LoginButtons />
            </DialogContent>
        </Dialog>
    )
}