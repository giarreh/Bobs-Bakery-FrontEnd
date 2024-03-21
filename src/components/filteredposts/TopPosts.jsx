import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import PostListItem from '../posts/PostListItem';

export default function TopPosts() {
  const { posts } = useContext(AppContext);

  // Function to calculate average rating for a post's reviews
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0; // Return 0 if there are no reviews
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  // Calculate average rating for each post and sort by highest rating
  const sortedPosts = posts.slice(0).sort((a, b) => {
    const averageRatingA = calculateAverageRating(a.reviews);
    const averageRatingB = calculateAverageRating(b.reviews);
    return averageRatingB - averageRatingA; // Sort in descending order
  });

  return (
    <>
      <div>
        {sortedPosts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
