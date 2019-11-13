import React from 'react';
import { Link } from 'react-router-dom';

export default class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount () {
        fetch('https://epower.ng/wp-json/wp/v2/posts')
        .then(res => res.json())
        .then(data => this.setState({ posts: data }))
    }

    render() {
        const { posts } = this.state;

        return (
            <div>
              <div className='header'>
                <h1>Epower Blog</h1>
              </div>
              <div className='posts'>
              {posts.map(post => <div key={post.id}>
                <img alt="post" src={post.featured_image}/>
                <Link className="link" to={`/${post.slug}`}><p>{post.title.rendered}</p></Link>
                <p>{post.excerpt.rendered}</p>
              </div>)}
              </div>
            </div>
        );
      }
}