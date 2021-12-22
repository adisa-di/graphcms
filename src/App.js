import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useRequest } from './hooks';
import Posts from './Posts';
import './styles/styles.css';

const authorStyle = (selected) => {

  const bgColor = selected ? "#e2c2b9" : "#fef5ed"; 

  return {
    backgroundColor: bgColor
  }
}

function App() {
  const [authors, setAuthors] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currAuthor, setAuthor] = useState({
    name: '',
    id: null
  });

  useRequest([],
    ` authors {
        id
        name
        title
    }`,
    (response) => {
      const { authors } = response;
      setAuthors(authors);
    }
  );

  useRequest([currAuthor],
    `author(where: {id: "${currAuthor.id}"}) {
      posts {
        id
        title
        tags
        slug
        excerpt
        date
        content {
          text
        }
      }
    }`,
    (response) => {
      const { author } = response;
      if (author?.posts) {
          setPosts(author.posts);
        }
      }
    )

  return (
    <div className="App">
      <Router>
        {authors && (
          <>
            <div className="author-wrapper">
              {authors.map(({ id, name, title }) => (
                <div key={id} className="author" style={authorStyle(id === currAuthor.id)}>
                    <div className="info">
                      <h4>
                        <Link to={`/author/${id}`} onClick={() => setAuthor({ id, name })}>
                          {name}
                        </Link>
                      </h4>
                      <h6>
                        {title}
                      </h6>
                    </div>
                </div>
              ))}
            </div>
            <Switch>
              <Route path={`/author/${currAuthor.id}`}>
                <Posts posts={posts} author={currAuthor.name}/>
              </Route>
            </Switch>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
