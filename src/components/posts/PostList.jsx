import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import PostListItem from './PostListItem';
import { UserContext } from '../../context/UserContext';

export default function PostList() {
  const { posts } = useContext(AppContext);
  const limitedPosts = posts.slice(0, 15);

  

  return (
    <div>
      {limitedPosts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
