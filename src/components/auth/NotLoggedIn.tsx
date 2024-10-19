import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { LoginButtons } from "@/components/auth/LoginButtons";

interface NotLoggedInDialogProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const NotLoggedInDialog = ({ isOpen, setIsOpen }: NotLoggedInDialogProps) => {
    console.log("NotLoggedInDialog")
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