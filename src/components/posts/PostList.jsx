import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import PostListItem from './PostListItem';

export default function PostList() {
  const { posts } = useContext(AppContext);
  
  const limitedPosts = posts.slice(0, 10);

  return (
    <div>
      <h1>Posts</h1>
      {limitedPosts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
