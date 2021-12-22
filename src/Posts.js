import React from 'react';
import './styles/styles.css'

function Posts({ posts, author }) {
  return (
    <>
      <h4>Posts By: {author} </h4>
      <div className="posts">
        {posts.map((post, idx) => {
          return (
            <div key={idx} className="post">{idx + 1}. {post.title}</div>
          )
        })}
      </div>
    </>
  )
}

export default Posts;