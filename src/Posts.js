import React from 'react';

function Posts({ posts }) {
  return (
    <div>{posts.map((post, idx) => {
      return (
        <div key={idx}>{post.title}</div>
      )
    })}</div>
  )
}

export default Posts;