import React from 'react'
import { Maybe, Post, PostsQuery, PostsQueryResult } from '../graphql'
import PostComponent from './Post'

interface PostsArgs {
  posts: Partial<Post>[] | undefined // PostsQuery['posts']['items'] | undefined
}

export default function Posts({ posts = [] }: PostsArgs) {
  return (
    <div>
      {posts?.map((post) => (
        <PostComponent />
      ))}
    </div>
  )
}
