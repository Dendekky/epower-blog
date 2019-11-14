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
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        if (isLoading) {
            return <p>loading...</p>;
          }

        return (
            <div>
              <div className='header'>
                <h1>{details[0].title.rendered}</h1>
                <span>Published on {month[new Date(details[0].date).getMonth()]} {new Date(details[0].date).getDate()}, {new Date(details[0].date).getFullYear()}</span>
              </div>
              <div className='singlepage'>
                    <img alt="post" src={details[0].featured_image}/>
                    <div dangerouslySetInnerHTML={{ __html: details[0].content.rendered }} />
              </div>
              <div className='header'>
                <h1>Copyright 2019</h1>
              </div>;
            </div>
        );
      }
}