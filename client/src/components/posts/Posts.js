import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PostForm from './PostForm';
import Loader from '../common/Loader';

class Posts extends Component {
  render() {
    return (
      <div className="feed">
        <div className="constainer">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Posts);
