import React, { useState } from 'react';
import './PostList.css';
import { useNavigate } from 'react-router';
import { Rating } from 'react-simple-star-rating'

export default function PostListItem({ post }) {
  const navigate = useNavigate();

  const calculateAverageRating = () => {
    if(post?.reviews.length === 0) {
      return 0;
    }
    if (post?.reviews && post?.reviews.length > 0) {
      // Calculate sum of ratings
      const sum = post?.reviews.reduce((acc, review) => acc + review.rating, 0);
      // Calculate average rating
      const average = sum / post?.reviews.length;
      return average.toFixed(1); // Return average rating rounded to 1 decimal place
    } else {
      return 'No reviews yet';
    }
  };

  return (
    <div className='postContainer' onClick={() => navigate(`/posts/${post?.id}`)} >
      <div>
        <img className='postImage' src={post?.imageUrl} alt="No image found" />
      </div>
      <div className='postContents'>
        <h3 className='postTitle'>{post?.title}</h3>
        <div className='postStarReview'>
          <Rating initialValue={calculateAverageRating()} 
          readonly={true}
          allowFraction={true}
          size={25}
          />
          <p>({post?.reviews?.length} ratings)</p>
        </div>
        <p>{post?.description}</p>
      </div>
  </div>
  );
}
