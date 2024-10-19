import { GetPostsResponse } from '@/components/posts/PostList';
import React, { createContext, useState, ReactNode } from 'react';


interface PostContextType {
  posts: GetPostsResponse[];
  addPost: (newPost: GetPostsResponse) => void;
  setPosts: (posts: GetPostsResponse[]) => void;
}


export const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<GetPostsResponse[]>([]);

  const addPost = (newPost: GetPostsResponse) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};
