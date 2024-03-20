import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Sidebar() {
  const navigate = useNavigate();
  const { posts } = useContext(AppContext);

  function randomPost() {
    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    return navigate(`/posts/${randomPost.id}`);
  }


  return (
    <div className="sidebar">
      <div className='sidebarButton' >
        <h3>Top Posts</h3>
      </div>
      <div className='sidebarButton' onClick={randomPost} >
        <h3>Feeling Brave?</h3>
      </div>
      <div className='sidebarButton' >
        <h3>+</h3>
      </div>
    </div>
  );
}

export default Sidebar;
