import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import PostListItem from './PostListItem';
import { UserContext } from '../../context/UserContext';

export default function PostList() {
  const { posts } = useContext(AppContext);
  const { getAuthToken } = useContext(UserContext);
  const limitedPosts = posts.slice(0, 15);

  if (!getAuthToken()) {
    return <h1>Sign in to see posts</h1>;
  }



  return (
    <div>
      {limitedPosts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
