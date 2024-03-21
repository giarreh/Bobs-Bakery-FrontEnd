import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AppContext } from '../../context/AppContext';
import './PostListItemDetails.css';
import { Rating } from 'react-simple-star-rating'
import { UserContext } from '../../context/UserContext';

export default function PostListItemDetails() {

  const [post, setPost] = useState({});
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    message: '',
    rating: 0,
  });

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { posts } = useContext(AppContext);
  const { getAuthToken, user } = useContext(UserContext);


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

  const handleSubmit = async () => {
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
          <h1 className='postTitle'>{post?.title}</h1>
          <p>{post?.description}</p>
          
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
                  <p>{review.user.firstName} {review.user.lastName}</p>
                  <p>{review.createdAt}</p>
                </div>
                <div className='reviewHeader2'>
                  <p>{review.message}</p>
                  <div className='reviewStars'>
                    <div>
                      <p>Rating: </p>
                    </div>
                    <div>          
                      <Rating initialValue={review.rating} 
                      readonly={true}
                      allowFraction={true}
                      size={20}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Add a review form */}
            <div className='createReviewContainer'>
              <div>
                <textarea type='text' placeholder='Add a review' value={reviewForm.message} onChange={handleMessageChange} className='reviewText' />
                <Rating initialValue={reviewForm.rating} 
                  onClick={(rate) => setReviewForm({...reviewForm, rating: rate})}
                  size={20}
                  />
              </div>
              <div className='sidebarButton' onClick={handleSubmit} >
                <p>Add a review</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
