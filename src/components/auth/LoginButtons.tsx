import React, { useState } from 'react';
import { supabase } from '@/lib/supabase/supabaseClient';
import { Alert } from '../ui/alert';
import { Button } from '../ui/button';
import { FaGithub, FaGoogle } from 'react-icons/fa6';

export const LoginButtons = () => {
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

        <>
            {error && <Alert variant='destructive'>{error}</Alert>}

            <Button
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
                onClick={handleGoogleLogin}
            >
                <FaGoogle size={20} />
                <span>Login with Google</span>
            </Button>

            <div className="flex items-center justify-center">
                <div className="h-px bg-gray-300 w-1/2"></div>
                <span className="text-gray-400">OR</span>
                <div className="h-px bg-gray-300 w-1/2"></div>
            </div>

            <Button
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
                onClick={handleGithubLogin}
            >
                <FaGithub size={20} />
                <span>Login with GitHub</span>
            </Button>
        </>
    );
};

