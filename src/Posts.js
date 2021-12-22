import React from 'react';
import './styles/styles.css'

const COLORS = ['#F6D7A7', '#F6EABE', '#C8E3D4', '#87AAAA'];

const postStyle = (colorIdx) => {
  return {
    backgroundColor: COLORS[colorIdx],
    borderRadius: "5px",
    marginBottom: "10px",
    padding: "20px",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
  }
}

function Posts({ posts, author }) {
  return (
    <div className="posts">
      {posts.map((post, idx) => {
        return (
          <div key={idx} style={postStyle(idx)}>{idx + 1}. {post.title}</div>
        )
      })}
    </div>
  )
}

export default Posts;