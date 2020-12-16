import React, { Component } from 'react';
import Ratings from './ratings//Ratings.jsx';
import ProductReviewBtn from './ratings/ProductReviewBtn.jsx';
import CustomerImages from './customer_images/CustomerImages.jsx';
import DomesticReviews from './reviews/DomesticReviews.jsx';
import IntlReviews from './reviews/IntlReviews.jsx';
import GlobalFonts from './styles/fonts.js';
import s from './styles/App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      pageLoaded: false,
      sortByStars: false
    };

    this.handleRatingBarClick = this.handleRatingBarClick.bind(this);
  }

  handleRatingBarClick(numStars) {
    const setStars = this.state.sortByStars !== numStars ? numStars : false;
    this.setState({
      sortByStars: setStars
    });
  }

  componentDidMount() { // test from 900,000 to 999,999
    const randomProductId = Math.floor(Math.random() * (1000000)) + 6000000;
    const url = window.location.href.split('/');
    const last = url[url.length - 1];
    const id = (isNaN(last) || last === '') ? randomProductId : last;
    axios.get(`/api/reviews/${id}`)
      .then(results => {
        this.setState({
          reviews: results.data,
          pageLoaded: true
        });
      })
      .catch(err => console.log('There was an error in making the API request for product reviews:', err));
  }

  render() {
    let reviews = this.state.reviews.slice(0, 21);

    const unitedStates = [];
    const international = [];
    for (let review of reviews) {
      if (review.country === 'the United States') {
        unitedStates.push(review);
      } else {
        international.push(review);
      }
    }

    const ratings = reviews.map(review => review.overall_rating);
    const imageUrls = [];
    reviews.forEach(review => {
      if (review.product_photo !== 'null') {
        imageUrls.push(review.product_photo);
      }
    });

    return (
      <div>
        {!this.state.pageLoaded ? <div className={s.loading}>Loading reviews...</div> :
        <div className={s.wrapper}>
          <GlobalFonts />
          <div style={{display: 'block'}}>
            <Ratings ratings={ratings} handleRatingBarClick={this.handleRatingBarClick}/>
            <ProductReviewBtn />
          </div>
          {reviews.length ?
          <div style={{display: 'block'}}>
            <CustomerImages imageUrls={imageUrls}/>
            <DomesticReviews domesticReviews={unitedStates} sortByStars={this.state.sortByStars}/>
            <IntlReviews intlReviews={international}/>
          </div>
          :
          <div>
            <div className={s.leaveReview}>Share your thoughts with other customers</div>
            <button className={s.reviewBtn}>Write a customer review</button>
          </div>}
        </div>
        }
      </div>
    );
  }
}

export default App;
