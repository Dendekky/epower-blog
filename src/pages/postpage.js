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
            <div className='posts'>
              {posts.map(post => <div key={post.id}>
                <img alt="post" src={post.featured_image_thumbnail}/>
                <Link to={`/${post.id}`}><p>{post.title.rendered}</p></Link>
                <p>{post.slug}</p>
              </div>)}
            </div>
        );
      }
}