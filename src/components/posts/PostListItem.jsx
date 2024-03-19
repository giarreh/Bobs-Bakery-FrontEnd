import React from 'react';
import './PostList.css';
import { useNavigate } from 'react-router';

export default function PostListItem({ post }) {

  const navigate = useNavigate();

  return (
    <div className='postContainer' onClick={() => navigate(`/posts/${post.id}`)} >
      <h3 className='postTitle'>{post.title}</h3>
      <p>{post.description}</p>
    </div>
  );
}
