import React from 'react';

export default class SinglePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            isLoading: true
        }
    }

    componentDidMount() {

        const { match: { params } } = this.props;
        fetch(`https://epower.ng/wp-json/wp/v2/posts?slug=${params.slug}`)
          .then(response => response.json())
          .then(data => this.setState({ details: data, isLoading: false }));
      }
    
      render() {
        const { details, isLoading } = this.state;
        console.log(details)
        if (isLoading) {
            return <p>loading...</p>;
          }

        return (
            <div>
              <div className='header'>
                <h1>{details[0].title.rendered}</h1>
              </div>
              <div className='singlepage'>
                    <img alt="post" src={details[0].featured_image}/>
                    <div dangerouslySetInnerHTML={{ __html: details[0].content.rendered }} />
              </div>
            </div>
        );
      }
}