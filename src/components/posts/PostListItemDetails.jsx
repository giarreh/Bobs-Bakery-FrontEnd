import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AppContext } from '../../context/AppContext';

export default function PostListItemDetails() {

  const [post, setPost] = useState({});

  const { id } = useParams();
  const { posts, users } = useContext(AppContext);

  useEffect(() => {
    fetch(`http://localhost:4000/posts/${id}`)
    .then(response => response.json())
    .then(data => {setPost(data.data); console.log(post);})
  }, [id])


  return (
    <div>
      INSIDE POST DETAILS
      <button onClick={() => console.log(post)}>Get post</button>
    </div>
  )
}
