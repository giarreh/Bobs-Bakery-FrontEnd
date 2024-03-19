import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AppContext } from '../../context/AppContext';
import './PostListItemDetails.css';

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
            <div className='ingredients'>
              {post?.ingredients.map((ingredient, index) => (
                <div key={index}>
                  <p>g {ingredient}</p>
                </div>
              ))}
            </div>
            <div className='instructions'>
              {post?.instructions.map((instruction, index) => (
                <div key={index}>
                  <h3>Step {index + 1}</h3>
                  <p>{instruction}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='reviews'>
            <h2>Reviews</h2>
            {reviews.map((review, index) => (
              <div key={index} className='review'>
                <h3>{review.message}</h3>
                <p>Rating: {review.rating}</p>
              </div>
            ))}

          </div>
        </>
      )}
    </div>
  );
}
