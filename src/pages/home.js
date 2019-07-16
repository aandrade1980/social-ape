import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import Scream from "../components/Scream";
import Profile from "../components/Profile";

// Redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

// MUI
import Grid from "@material-ui/core/Grid";

class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <p>...Loading</p>
    );
    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getScreams }
)(home);
