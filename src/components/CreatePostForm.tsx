import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { supabase } from '@/lib/supabase/supabaseClient'
import { User } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast"
import { Circle } from 'lucide-react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
interface post {
    title: string,
    content: string,
    image?: File | null
}

const formSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
    content: z.string().min(5, { message: "Content must be at least 5 characters long" }),
    image: z.union([z.null(), z.instanceof(File)]).optional()
})

export const CreatePostForm = ({ user }: { user: User }) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState<File | null>(null)

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

            await supabase.from('posts').insert([
                {
                    title: title,
                    content: content,
                    image_url: publicURL?.publicUrl,
                    user_id: user.id
                }
            ])

            setIsLoading(false);
            form.reset();
            setPreviewImage(null)
            toast({
                title: "Post created successfully",
                description: "Your post has been created successfully",
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
        <div className="bg-white shadow rounded-lg mb-8">

            <div className="p-4">
                {/* <form onSubmit={handlePostSubmit}>
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

                    <Input
                        type="file"
                        placeholder="Image (optional)"
                        onChange={(e) => setNewPost({ ...newPost, image: e.target.files?.[0] as File })}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        required={false}
                    />

                    {newPost.image && (
                        <div>

                            <img src={URL.createObjectURL(newPost.image)} alt="Post" className="mb-4 h-48 w-96 object-scale-down" />
                        </div>
                    )}

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

                </form> */}

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
                                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
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
                        <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700 mt-4">
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
                </Form>
            </div>
        </div>

    )
}