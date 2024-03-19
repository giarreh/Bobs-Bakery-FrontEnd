import React from 'react';
import './PostList.css';

export default function PostListItem({ post }) {
  return (
    <div className='postContainer'>
      <h3 className='postTitle'>{post.title}</h3>
      <p className='postBody'>{post.body}</p>
    </div>
  );
}
