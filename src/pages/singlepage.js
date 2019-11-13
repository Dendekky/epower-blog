import React from 'react';

export default class SinglePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {},
            isLoading: true
        }
    }

    componentDidMount() {

        const { match: { params } } = this.props;
        fetch(`https://epower.ng/wp-json/wp/v2/posts/${params.id}`)
          .then(response => response.json())
          .then(data => this.setState({ details: data, isLoading: false }));
      }
    
      render() {
        const { details, isLoading } = this.state;
        if (isLoading) {
            return <p>loading...</p>;
          }

        return (
            <div className='singlepage'>
                <p>{details.title.rendered}</p>
                <img alt="post" src={details.featured_image}/>
                <div dangerouslySetInnerHTML={{ __html: details.content.rendered }} />
            </div>
        );
      }
}