import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AppContext } from '../../context/AppContext';
import './PostListItemDetails.css';
import { Rating } from 'react-simple-star-rating'

export default function PostListItemDetails() {

  const [post, setPost] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const { posts, users } = useContext(AppContext);


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
  }, [id]);


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

          </div>
        </>
      )}
    </div>
  );
}
