import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Login } from '@/pages/Login'

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
                    <Login />
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginForm