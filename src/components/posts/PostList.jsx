import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import './PostList.css'

export default function PostList() {
  const { posts } = useContext(AppContext)

  const limitedPosts = posts.slice(0, 10);

  return (
    <div>
      <h1>Posts</h1>
      {limitedPosts.map((post) => (
        <div key={post.id} className='postContainer' >
          <h3 className='postTitle' >{post.title}</h3>
          <p className='postBody' >{post.body}</p>
        </div>
      ))}
    </div>
  )
}
