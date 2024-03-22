import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../context/AppContext';
import './PostListItemDetails.css';
import { Rating } from 'react-simple-star-rating'
import { UserContext } from '../../context/UserContext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SpeedIcon from '@mui/icons-material/Speed';
import ProfilePicture from '../profiles/ProfilePictureID';

export default function PostListItemDetails() {

  const [post, setPost] = useState({});
  const [reviews, setReviews] = useState([]);
  const [allowedReview, setAllowedReview] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    message: '',
    rating: 0,
  });

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { posts, setPosts } = useContext(AppContext);
  const { getAuthToken, user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`http://localhost:4000/posts/${id}`).then(response => response.json()),
      fetch(`http://localhost:4000/posts/${id}/reviews`).then(response => response.json())
    ])
    .then(([postData, reviewData]) => {
      setPost(postData.data);
      setReviews(reviewData.data);
      console.log(postData.data);
      console.log("REVIEWS: ", reviewData.data);
      const userReview = reviews.find(review => review.user.id == user.id);
      console.log("USER REVIEW: ", userReview)

      if(userReview){
        console.log("USER HAS REVIEWED THIS POST");
        setAllowedReview(false);
      }
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, [id, posts]);

  const handleMessageChange = (e) => {
    setReviewForm({
      ...reviewForm,
      message: e.target.value,
    });
  };

  const handleDelete = (review) => async () => {
    try {
      const response = await fetch(`http://localhost:4000/posts/${id}/reviews/${review.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      if (!response.ok) {
        return console.error('Unable to delete review:', response);
      }

      setReviews(reviews.filter(r => r.id !== review.id));
      setAllowedReview(true);
    } catch (error) {
      console.error('Unable to delete review:', error);
    }
  };

  const handleDeletePost = (post) => async () => {
    await fetch(`http://localhost:4000/posts/${post.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
    .then(() => {
      setPosts(posts.filter(p => p.id !== post.id));
      setAllowedReview(true);
    }).then(
      () => navigate('/posts'));
  };


  const handleSubmit = async () => {

      // check if user is in review array, ifit is, dont
      // allow them to add another review
      const userReview = reviews.find(review => review.user.id == user.id);
      console.log("USER REVIEW: ", userReview)

      if(userReview){
        throw new Error('User has already reviewed this post');
      }


    try {
      const response = await fetch(`http://localhost:4000/posts/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(reviewForm),
      });

      if (!response.ok) {
        return console.error('Unable to add review:', response);
      }

      const data = await response.json();
      console.log(data);
      setReviews([...reviews, data.data]);
      setReviewForm({
        message: '',
        rating: 0,
      });
      setAllowedReview(false);
    } catch (error) {
      console.error('Unable to add review:', error);
    }
  }

  return (
    <div className='container'>
      {loading ? (
        <div>Loading data...</div>
      ) : (
        <>
        <div className='postHeader'>
          <div className='postImageContainer'>
            <img className='postImage' src={post?.imageUrl} alt="No image found" />
          </div>         
          <div className='postContentContainer'>
            <div>
              <h1 className='postTitle'>{post?.title}</h1>
              <p>{post?.description}</p>
            </div>
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
          <div className='postItemContainer'>
            <div className='ingredients2'>
              {post?.ingredients.map((ingredient, index) => (
                <div key={index}>
                  <p>{ingredient}</p>
                </div>
              ))}
            </div>
            <div className='instructions2'>
              {post?.instructions.map((instruction, index) => (
                <div key={index}>
                  <h3>Step {index + 1}</h3>
                  <p>{instruction}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='reviews'>
            <h2 style={{color: 'black'}}>Reviews</h2>
            {reviews.map((review, index) => (
              <div key={index} className='review'>
                <div className='reviewHeader'>
                  <div className='reviewHeaderDiv1'>
                  <ProfilePicture initials={review.user?.firstName[0] + review.user?.lastName[0]} color={review.user?.favoriteColor}/>
                  <p>{review.user?.firstName} {review.user?.lastName}</p>
                  </div>
                  <div>
                    <p>{review.createdAt}</p>
                  </div>
                </div>
                <div className='reviewHeader2'>
                  <p>{review.message}</p>
                  <div className='reviewStars'>
                    <div>
                      <p>Rating: </p>
                    </div>
                    <div className='reviewRatingBottom'>          
                      <Rating initialValue={review.rating} 
                      readonly={true}
                      allowFraction={true}
                      size={20}
                      />
                      {/* if the user.id is the same as review.user.id, render a delete button */}
                      {user.id == review.user.id && (
                        <div className='deleteReview' onClick={handleDelete(review)}>
                          <p>Delete</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Add a review form */}
            {allowedReview ? (
              <div className='createReviewContainer'>
                <div className='createReviewTextAndStar'>
                <p>Rate this recipe!</p>
                <textarea type='text' placeholder='Add a review' value={reviewForm.message} onChange={handleMessageChange} className='reviewText' />
                <Rating initialValue={reviewForm.rating} 
                  onClick={(rate) => setReviewForm({...reviewForm, rating: rate})}
                  size={30}
                  />
                </div>
              <div className='sidebarButton' onClick={handleSubmit} >
                <p>Add a review</p>
              </div>
            </div>
            ) : (
              <div className='alreadyVoted'>
                {/* User has already voted */}
              </div>
            )}
          </div>
        </>
      )}
        {/*if post.user.id == user.id, add div with delete text */}
        {post.user?.id == user.id && (
          <div className='sidebarButton' onClick={handleDeletePost(post)}>
            <p>Delete post</p>
          </div>
        )}
    </div>
  );
}
