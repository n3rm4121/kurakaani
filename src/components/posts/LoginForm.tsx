import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginButtons } from '@/components/auth/LoginButtons'

function LoginForm() {
    return (
        <Card className="sticky top-20">
            <CardHeader>
                <CardTitle className="text-xl">Welcome to KuraKaani</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Join KuraKaani to share your thoughts and stay connected with the world.
                </p>
                <div className="space-y-2">
                    <LoginButtons />
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginForm