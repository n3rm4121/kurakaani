import React, { useState } from 'react';
import { supabase } from '@/lib/supabase/supabaseClient';
import { Alert } from '../ui/alert';
import { Button } from '../ui/button';
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import Loader from '../Loader';
import { toast } from '@/hooks/use-toast';

export const LoginButtons = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',

        });

        if (error) {
            setLoading(false);
            setError(error.message);
        } else {
            setLoading(false);
            setError(null);
        }
    };

    const handleGithubLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
        });

        if (error) {
            setLoading(false);
            console.log(error);
            setError(error.message);
        } else {
            setLoading(false);
            setError(null);
        }
    };

    return (

        <>
            {error && <Alert variant='destructive'>{error}</Alert>}

            <Button
                disabled={loading}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
                onClick={handleGoogleLogin}
            >
                {loading && <Loader size='sm' />}
                <FaGoogle size={20} />
                <span>Login with Google</span>
            </Button>

            <div className="flex items-center justify-center">
                <div className="h-px bg-gray-300 w-1/2"></div>
                <span className="text-gray-400">OR</span>
                <div className="h-px bg-gray-300 w-1/2"></div>
            </div>

            <Button
                disabled={loading}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
                onClick={handleGithubLogin}
            >{loading && <Loader size='sm' />}
                <FaGithub size={20} />
                <span>Login with GitHub</span>
            </Button>
        </>
    );
};

