import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import PostListItem from './PostListItem';
export default function PostList() {
  const { posts, setPosts } = useContext(AppContext);
  const limitedPosts = posts?.slice(posts.length - 5, posts.length);

  //const limitedPosts = posts.slice(0, 10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/posts');
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        throw new Error('Error fetching data');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {limitedPosts.reverse().map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
