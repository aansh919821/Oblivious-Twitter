import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { UserAvatar } from './UserAvatar';
import avatar from '../../img/tiger-avatar-example.jpg';
// import { tweetsData } from './dummydata';

const Board = ({ tweets }) => (
  <div className="profile-board-container">
    <div className="profile-board">
      <div className="profile-board-header">
        <h3>Tweets</h3>
      </div>
      <div className="profile-board-content">
        <ul className="profile-board-list">
          {tweets.length > 0 ? (
            tweets.map(tweet => (
              <li key={tweet.id} className="profile-board-list-item">
                <UserAvatar small src={avatar} alt="User Avatar" />
                <div className="profile-board-list-item-content">
                  <div className="tweet-user-group">
                    <span className="tweet-user-name-group">
                      <strong className="tweet-user-name">
                        {tweet.user.name}
                      </strong>
                    </span>
                    <span className="tweet-user-username-group">
                      @<b>{tweet.user.username}</b>
                    </span>
                    <span className="tweet-user-created-group">
                      <Moment format="MMMM YYYY" withTitle>
                        {tweet.created}
                      </Moment>
                    </span>
                  </div>
                  <div className="tweet-content-group">
                    <p className="tweet-text">{tweet.text}</p>
                  </div>
                  <div className="tweet-bottom-group">
                    <span className="tweet-comments-info">
                      <i className="far fa-comment" /> {tweet.comments.length}
                    </span>
                    <span className="tweet-retweets-info">
                      <i className="fas fa-retweet" /> {tweet.retweets.length}
                    </span>
                    <span className="tweet-likes-info">
                      <i className="far fa-heart" /> {tweet.likes.length}
                    </span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="no-tweets-info">None</p>
          )}
        </ul>
      </div>
    </div>
  </div>
);

Board.propTypes = {
  tweets: PropTypes.array.isRequired
};

export default Board;