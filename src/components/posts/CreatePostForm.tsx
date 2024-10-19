import React, { useContext, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { supabase } from '@/lib/supabase/supabaseClient'
import { User } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import Loader from '../Loader'
import { toast } from '@/hooks/use-toast'
import { PostContext } from '@/contexts/postContext'

const formSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
    content: z.string().min(5, { message: "Content must be at least 5 characters long" }),
    image: z.union([z.null(), z.instanceof(File)]).optional()
})

export const CreatePostForm = ({ user }: { user: User }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState<File | null>(null)
    const postContext = useContext(PostContext);

    if (!postContext) {
        throw new Error('PostContext is undefined. Ensure PostForm is wrapped in PostProvider.');
    }

    const { addPost } = postContext;

    async function uploadImageAndGetPublicURL(file: File) {

        const { data, error } = await supabase.storage
            .from('media')
            .upload(user.id + "/" + uuidv4(), file);

        if (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem while creating your post.",
            })
            // console.error('Error uploading image:', error.message);
            return null;
        }
        const { data: publicImageURl } = await supabase.storage.from('media').getPublicUrl(data.path)

        return publicImageURl;
    }
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // e.preventDefault()
        console.log("values: ", values)
        const { title, content, image } = values;
        setIsLoading(true)
        try {
            let publicURL = null;

            if (image) {
                publicURL = await uploadImageAndGetPublicURL(image as File);
                if (!publicURL) {
                    setIsLoading(false)
                    return;
                }
            }

            //console.log("publicURL", publicURL)

            const { data: newPost } = await supabase.from('posts').insert([
                {
                    title: title,
                    content: content,
                    image_url: publicURL?.publicUrl,
                    owner: { id: user.id, avatar_url: user.user_metadata.avatar_url, name: user.user_metadata.full_name }
                }
            ]).select();

            if (!newPost) {
                setIsLoading(false);
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem while creating your post.",
                })
                return;
            }

            // console.log("newPost", newPost)
            addPost(newPost[0])
            setIsLoading(false);
            form.reset();
            setPreviewImage(null)
            toast({
                title: "Post created successfully",
                description: "Your post has been successfully created.",
            })


        } catch (error) {
            setIsLoading(false);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem while creating your post.",
            })
            console.error('Error creating post:', (error as Error).message)

        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            image: null
        }
    })

    return (

        <div className="p-4">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title*</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Post title" required={true} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content*</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="Share your thoughts..." required={true} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image (Optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        placeholder="Image (optional)"
                                        onChange={(e) => {
                                            field.onChange(e.target.files?.[0] as File)
                                            setPreviewImage(e.target.files?.[0] as File)
                                        }}
                                        className="file:mr-4 h-12 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {previewImage && (

                        <div>
                            <img src={URL.createObjectURL(previewImage)} alt="Post" className="mb-4 h-48 w-96 object-scale-down" />
                        </div>
                    )}
                    <Button type="submit" disabled={isLoading || !(form.getValues().content && form.getValues().title)} className='mt-4 w-full'>
                        {isLoading ? (
                            <>
                                <Loader size="sm" variant='secondary' />
                                Posting...
                            </>
                        ) : (
                            "Post"
                        )}
                    </Button>


                </form>
            </Form>
        </div>

    )
}