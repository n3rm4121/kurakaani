import { Button } from './ui/button'
import { Repeat2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { supabase } from '@/lib/supabase/supabaseClient'
import { GetPostsResponse } from './PostList'
import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { HeartFilledIcon } from '@radix-ui/react-icons'
import { useAuth } from '@/hooks/useAuth'

const MAX_CONTENT_LENGTH_TO_SHOW = 100

interface PostCardProps {
    post: GetPostsResponse;
    ownerId: string;
}


const NotLoggedIn = () => {
    return (
        <div className="flex items-center justify-center h-32">
            <p className="text-gray-600">Please log in to like and repost</p>
        </div>
    )
}

const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
export const PostCard = ({ post, ownerId }: PostCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [likeCount, setLikeCount] = useState<number>(post.like_count);
    const [isLiked, setIsLiked] = useState(post.liked_by?.includes(ownerId));
    const [isReposted, setIsReposted] = useState(post.reposted_by?.includes(ownerId));
    const [repostCount, setRepostCount] = useState<number>(post.repost_count);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const isOwner: boolean = post.owner.id === ownerId;

    const likedByArray = post.liked_by ?? [];
    const repostedByArray = post.reposted_by ?? [];

    const handleLike = async (postId: string) => {
        try {

            const newLikedBy = isLiked
                ? likedByArray.filter((id) => id !== ownerId)
                : [...likedByArray, ownerId];

            const { data: updatedData, error } = await supabase
                .from('posts')
                .update({
                    like_count: isLiked ? likeCount - 1 : likeCount + 1,
                    liked_by: newLikedBy,
                })
                .eq('id', postId)
                .select();

            if (error) throw error;

            if (updatedData && updatedData.length > 0) {
                setLikeCount(updatedData[0].like_count);
                setIsLiked(!isLiked);
            }
        } catch (error) {
            console.error('Error liking post:', (error as Error).message);
            setError('Failed to update like. Please try again.');
        }
    };

    const handleRepost = async (postId: string) => {
        try {
            if (!user) {
                return <NotLoggedIn />
            }
            const newRepostedBy = isReposted
                ? repostedByArray.filter((id) => id !== ownerId)
                : [...repostedByArray, ownerId];

            const { data: updatedData, error } = await supabase
                .from('posts')
                .update({
                    repost_count: isReposted ? repostCount - 1 : repostCount + 1,
                    reposted_by: newRepostedBy,
                })
                .eq('id', postId)
                .select();

            if (error) throw error;

            if (updatedData && updatedData.length > 0) {
                // Use the actual data from the response to update state
                setRepostCount(updatedData[0].repost_count);
                setIsReposted(!isReposted); // Toggle reposted state
            }
        } catch (error) {
            console.error('Error reposting post:', (error as Error).message);
            setError('Failed to repost. Please try again.');
        }
    };


    return (
        <div className="space-y-6">

            <Card key={post.id}>
                <CardHeader>
                    <div className="flex items-center mb-4">
                        <Avatar className="h-12 w-12 cursor-pointer bg-emerald-200">
                            <AvatarImage src={post.owner.avatar_url} alt={post.owner.name} />
                            <AvatarFallback>{post.owner.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <h2 className="font-semibold text-lg cursor-pointer hover:underline">{post.owner.name}</h2>
                            <p className="text-gray-600 text-sm">{timeSince(new Date(post.created_at))} ago</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <h4 className="font-semibold mb-2">{post.title}</h4>
                    <p className="text-gray-600 mb-4">
                        {isExpanded ? post.content : post.content.slice(0, MAX_CONTENT_LENGTH_TO_SHOW)}
                        {post.content.length > MAX_CONTENT_LENGTH_TO_SHOW && (
                            <span


                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-emerald-600 ml-2 hover:text-emerald-700 hover:underline cursor-pointer"
                                aria-expanded={isExpanded}
                            >
                                {isExpanded ? 'Show less' : 'Show more'}
                            </span>
                        )}
                    </p>
                    {post.image_url && (
                        <img
                            src={post.image_url}
                            alt="Post content"
                            className="rounded-lg w-full"
                        />
                    )}
                </CardContent>
                <CardFooter className="border-t">
                    <div className="flex justify-between w-full text-gray-500">
                        <button className='rounded-full cursor-pointer' disabled={!user} onClick={() => handleLike(post.id)} >
                            <HeartFilledIcon className={`${isLiked && 'text-red-600'} h-6 w-6 mr-1 inline ${user && 'hover:text-red-600'}`} />
                            {likeCount}
                        </button>
                        <button className='rounded-full cursor-pointer' onClick={() => handleRepost(post.id)} >
                            <Repeat2 className={`${isReposted && 'text-blue-400'} h-6 w-6 mr-1 inline hover:text-blue-400`} />
                            {repostCount}
                        </button>
                    </div>
                </CardFooter>
            </Card>

        </div>
    )
}