import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase/supabaseClient';
import { useContext, useEffect, useState } from 'react';
import { PostCard } from './PostCard';
import { toast } from '@/hooks/use-toast';
import Loader from '../Loader';
import { PostContext } from '@/contexts/postContext';

export interface GetPostsResponse {
    id: string
    owner: {
        id: string
        avatar_url: string
        name: string
    }
    title: string
    content: string
    like_count: number
    image_url?: string
    liked_by: string[]
    reposted_by: string[]
    repost_count: number
    created_at: string
}

export const PostList = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const postContext = useContext(PostContext);

    if (!postContext) {
        throw new Error('PostContext is undefined. Ensure PostList is wrapped in PostProvider.');
    }

    const { posts, setPosts } = postContext;

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select(`
          id, 
          title, 
          content, 
          like_count,
          repost_count,
          image_url, 
          created_at, 
          liked_by,
          reposted_by,
          owner
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // update the global posts state using setPosts
            setPosts(data.map((post: GetPostsResponse) => ({
                ...post,
                likedBy: post.liked_by,
            })));
        } catch (error) {
            toast({ title: 'Error fetching posts', description: (error as Error).message, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader size="md" centered={true} />;
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} ownerId={user?.id as string} />
            ))}
        </div>
    );
};
