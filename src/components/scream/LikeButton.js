import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { likeScream, unLikeScream } from "../../redux/actions/dataActions";

// Components
import MyButton from "../../util/MyButton";

// Icons
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

export class LikeButton extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.screamId === this.props.screamId)
    ) {
      return true;
    } else return false;
  };

  likeScream = () => this.props.likeScream(this.props.screamId);

  unLikeScream = () => this.props.unLikeScream(this.props.screamId);

  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedScream() ? (
      <MyButton tip="Undo like" onClick={this.unLikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeScream,
  unLikeScream
};

LikeButton.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unLikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
