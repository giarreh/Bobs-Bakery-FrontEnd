import React, { useContext } from 'react'
import { AppContext } from '../../Context/appContext'

export default function PostList() {
  const { posts } = useContext(AppContext)

  const limitedPosts = posts.slice(0, 10);

  return (
    <div>
      <h1>Posts</h1>
      {limitedPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}
