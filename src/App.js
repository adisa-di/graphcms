import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { request } from 'graphql-request';
import Posts from './Posts';
import './styles/styles.css';

function App() {
  const [authors, setAuthors] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [posts, setPosts] = useState([]);

  // tells react to do something after it renders the dom
  // imperative code
  // data fetching
  useEffect(() => {
    const fetchAuthors = async () => {
      const { authors } = await request(
        'https://api-ap-south-1.graphcms.com/v2/ckww2dmcp75s701xm9owo36vm/master',
        `
        {
          authors {
            id
            name
            title
          }
        }
        `
      );
      setAuthors(authors);
    };
    
    // fetch author then set loading to false
    fetchAuthors();
  }, []); // [] - runs on mount and unmount 

  useEffect(() => {
    const fetchPosts = async () => {
      const { author } = await request(
        'https://api-ap-south-1.graphcms.com/v2/ckww2dmcp75s701xm9owo36vm/master',
        `
        {
          author(where: {id: "${authorId}"}) {
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
          }
        }
        `
      )
      setPosts(author.posts);
    }
    
    if (authorId !== null) {
      fetchPosts()
        .catch((err) => console.error(err));
    }
  }, [authorId]);

  return (
    <div className="App">
      <Router>
        {!authors ? (
          'Loading...'
        ) : (
          <>
            {authors.map(({ id, name, title }) => (
              <div key={id} className="author">
                  <div className="info">
                    <h4>
                      <Link to={`/author/${id}`} onClick={() => setAuthorId(id)}>
                        {name}
                      </Link>
                    </h4>
                    <h6>
                      {title}
                    </h6>
                  </div>
              </div>
            ))}
            <Switch>
              <Route path={`/author/${authorId}`}>
                <Posts posts={posts} />
              </Route>
            </Switch>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
