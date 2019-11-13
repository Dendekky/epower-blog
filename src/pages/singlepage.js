import React from 'react';

export default class SinglePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {}
        }
    }

    componentDidMount() {    
        const { match: { params } } = this.props;
        fetch(`https://epower.ng/wp-json/wp/v2/posts/${params.id}`)
          .then(response => response.json())
          .then(data => this.setState({ details: data }));
      }
    
      render() {
        const { details } = this.state;

        return (
            <div className='singlepage'>
                <p>{details.slug}</p>
                <p>{details.content.rendered}</p>
            </div>
        );
      }
}