import React, { useState } from 'react';
import './PostList.css';
import { useNavigate } from 'react-router';
import { Rating } from 'react-simple-star-rating'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SpeedIcon from '@mui/icons-material/Speed';

export default function PostListItem({ post }) {
  const navigate = useNavigate();

  const calculateAverageRating = () => {
    if(post?.reviews?.length === 0) {
      return 0;
    }
    if (post?.reviews && post?.reviews?.length > 0) {
      // Calculate sum of ratings
      const sum = post?.reviews?.reduce((acc, review) => acc + review?.rating, 0);
      // Calculate average rating
      const average = sum / post?.reviews?.length;
      return average.toFixed(1); // Return average rating rounded to 1 decimal place
    } else {
      return 'No reviews yet';
    }
  };

  const handleNavigate = () => {
    console.log(post);
    navigate(`/posts/${post?.id}`)
  }

  return (
    <div className='postContainer' onClick={handleNavigate} >
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
        <div className='postTagsContainer'>
          <div className='postTimeContainer'>
            <AccessTimeIcon style={{color: 'green', fontSize: '20px', marginRight: '5px'}}/>
            <p>Time: {post?.bakingTime}</p>
          </div>
          <div className='postTimeContainer'>
          <SpeedIcon style={{color: 'green', fontSize: '20px', marginRight: '5px'}}/>
            <p>Difficulty: {post?.difficulty}</p>
          </div>
          <div className='postTimeContainer'>
          <RestaurantIcon style={{color: 'green', fontSize: '20px', marginRight: '5px'}}/>
            <p>Calories: {post?.calories}</p>
          </div>
        </div>
      </div>
  </div>
  );
}
