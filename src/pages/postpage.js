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
                {/* <img src={process.env.PUBLIC_URL + '/user-photo.jpg'} alt="tutor"/> */}
                <Link to={`/${post.id}`}>{post.title.rendered}</Link>
                <p>{post.slug}</p>
                {/* <p>{post.address.city}</p> */}
              </div>)}
            </div>
        );
      }
}