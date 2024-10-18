import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { supabase } from '@/supabase/supabaseClient'
import { User } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast"
import { Circle } from 'lucide-react'


interface post {
    title: string,
    content: string,
    image: File | null
}
function CreatePost({ user }: { user: User }) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false)
    const [newPost, setNewPost] = useState<post>({
        title: '',
        content: '',
        image: null
    })
    async function uploadImageAndGetPublicURL(file: File) {

        const { data, error } = await supabase.storage
            .from('media')
            .upload(user.id + "/" + uuidv4(), file);

        if (error) {
            console.error('Error uploading image:', error.message);
            return null;
        }
        const { data: publicImageURl } = await supabase.storage.from('media').getPublicUrl(data.path)

        return publicImageURl;
    }
    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            let publicURL = null;
            if (newPost.image) {
                publicURL = await uploadImageAndGetPublicURL(newPost.image);
            }


            const res = await supabase.from('posts').insert([
                {
                    title: newPost.title,
                    content: newPost.content,
                    image_url: publicURL?.publicUrl,
                    user_id: user.id
                }
            ])
            setIsLoading(false)
            setNewPost({
                title: '',
                content: '',
                image: null
            })

            toast({
                title: "Post created successfully",
                description: "Your post has been created successfully",
            })


        } catch (error) {
            console.error('Error creating post:', (error as Error).message)

        }
    }
    return (
        <div className="bg-white shadow rounded-lg mb-8">

            <div className="p-4">
                <form onSubmit={handlePostSubmit}>
                    <Input
                        placeholder="Post title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        className="mb-4"
                        required={true}
                        accept='image/*'
                    />
                    <Textarea
                        placeholder="Share your thoughts..."
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        className="mb-4"
                        required={true}
                    />
                    {newPost.image && (
                        <div>

                            <img src={URL.createObjectURL(newPost.image)} alt="Post" className="mb-4 h-48 w-96 object-scale-down" />
                        </div>
                    )}

                    <Input
                        type="file"
                        placeholder="Image (optional)"
                        onChange={(e) => setNewPost({ ...newPost, image: e.target.files?.[0] as File })}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        required={false}
                    />
                    <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
                        {isLoading ? (
                            <>
                                <Circle className="animate-spin h-5 w-5" />
                                Posting...
                            </>
                        ) : (
                            "Post"
                        )}
                    </Button>

                </form>
            </div>
        </div>

    )
}

export default CreatePost