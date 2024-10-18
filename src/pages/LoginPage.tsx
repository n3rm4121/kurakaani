import React, { useState } from 'react';
import { supabase } from '@/supabase/supabaseClient';
import { Alert } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { FaGithub, FaGoogle } from 'react-icons/fa6';

const LoginPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',

        });

        if (error) {
            setError(error.message);
        } else {
            setError(null);
        }
    };

    const handleGithubLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
        });

        if (error) {
            console.log(error);
            setError(error.message);
        } else {
            setError(null);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                {error && <Alert variant='destructive'>{error}</Alert>}

                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2 mb-4"
                    onClick={handleGoogleLogin}
                >
                    <FaGoogle size={20} />
                    <span>Login with Google</span>
                </Button>

                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2"
                    onClick={handleGithubLogin}
                >
                    <FaGithub size={20} />
                    <span>Login with GitHub</span>
                </Button>
            </div>
        </div>
    );
};

export default LoginPage;
