import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import PostListItem from './PostListItem';
import { UserContext } from '../../context/UserContext';

export default function PostList() {
  const { posts } = useContext(AppContext);
  const { getAuthToken, getUserFromToken} = useContext(UserContext);
  const limitedPosts = posts.slice(0, 10);

  if (!getAuthToken()) {
    return <h1>Sign in to see posts</h1>;
  }
  return (
    <div>
      <button onClick={() => console.log(getUserFromToken(getAuthToken()))}>Get token</button>
      <h1 style={{color: 'white'}} >Posts</h1>
      {limitedPosts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
