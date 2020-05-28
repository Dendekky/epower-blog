import React from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

export default class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: true,
            currentPage: 1,
            postsPerPage: 6,
            upperPageBound: 6,
            lowerPageBound: 0,
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            pageBound: 6
        };
        this.handleClick = this.handleClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
    }

    handleClick(event) {
      let listid = Number(event.target.id);
      this.setState({
        currentPage: listid
      });
      this.setPrevAndNextBtnClass(listid);
    }
    setPrevAndNextBtnClass(listid) {
      let totalPage = Math.ceil(this.state.posts.length / this.state.postsPerPage);
      this.setState({isNextBtnActive: 'disabled'});
      this.setState({isPrevBtnActive: 'disabled'});
      if(totalPage === listid && totalPage > 1){
          this.setState({isPrevBtnActive: ''});
      }
      else if(listid === 1 && totalPage > 1){
          this.setState({isNextBtnActive: ''});
      }
      else if(totalPage > 1){
          this.setState({isNextBtnActive: ''});
          this.setState({isPrevBtnActive: ''});
      }
    }

    btnPrevClick() {
      if((this.state.currentPage -1)%this.state.pageBound === 0 ){
          this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
          this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
      }
      let listid = this.state.currentPage - 1;
      this.setState({ currentPage : listid});
      this.setPrevAndNextBtnClass(listid);
    }
    btnNextClick() {
      if((this.state.currentPage +1) > this.state.upperPageBound ){
          this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
          this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
      }
      let listid = this.state.currentPage + 1;
      this.setState({ currentPage : listid});
      this.setPrevAndNextBtnClass(listid);
    }

    componentDidMount () {
        fetch('https://epower.ng/wp-json/wp/v2/posts')
        .then(res => res.json())
        .then(data => this.setState({ posts: data, isLoading: false }))
    }

    render() {
        const { posts, isLoading, currentPage, postsPerPage, isPrevBtnActive, isNextBtnActive } = this.state;

        // Logic for displaying current posts
        const indexOfLastpost = currentPage * postsPerPage;
        const indexOfFirstpost = indexOfLastpost - postsPerPage;
        const currentposts = posts.slice(indexOfFirstpost, indexOfLastpost);

        const renderposts = currentposts.map(post => <div key={post.id}>
          <Link className="link" to={`/${post.slug}`}>
          <img alt="post" src={post.featured_image}/>
          <p>{post.title.rendered}</p>
          <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
          </Link>
        </div>)

        let renderPrevBtn = null;
        if(isPrevBtnActive === 'disabled') {
            renderPrevBtn = <div className={isPrevBtnActive}><span id="btnPrev"> Prev </span></div>
        }
        else{
            renderPrevBtn = <div className={isPrevBtnActive}><a href='#' id="btnPrev" onClick={this.btnPrevClick}> Prev </a></div>
        }
        let renderNextBtn = null;
        if(isNextBtnActive === 'disabled') {
            renderNextBtn = <div className={isNextBtnActive}><span id="btnNext"> Next </span></div>
        }
        else{
            renderNextBtn = <div className={isNextBtnActive}><a href='#' id="btnNext" onClick={this.btnNextClick}> Next </a></div>
        }

        if (isLoading) {
          return <Loader
          className='loader'
          type="Puff"
          color="#00BFFF"
          height={120}
          width={120}
          timeout={10000}
       />;
        }

        return (
            <div>
              <div className='header'>
                <h1>Epower Blog</h1>
              </div>
              <div className='posts'>
              {renderposts}
              </div>
              <div className="pagination">
              {renderPrevBtn}
              {renderNextBtn}
              </div>
              <div className='header'>
                <h1>Copyright 2019</h1>
              </div>;

            </div>
        );
      }
}
