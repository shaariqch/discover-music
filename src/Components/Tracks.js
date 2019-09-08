import React from "react";
import { getGlobalTracks } from "../utils/api";
import PropTypes from "prop-types";
import { Box, Typography, Grid } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Loading from '../Components/Loading'
const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      trackName,
      artistNames,
      albumName,
      albumImage,
      chartPosition
    } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Box display="flex" flexDirection="row" className="track">
          <Box
            display="flex"
            flexDirection="col"
            justifyContent="start"
            alignItems="center"
            marginRight="20px"
          >
            <img src={albumImage} className="albumImage" />
          </Box>
          <Box
            display="flex"
            flexDirection="col"
            justifyContent="center"
            alignItems="center"
            className="chartPosition"
          >
            <Typography variant="subtitle1">{chartPosition}</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="col"
            justifyContent="center"
            alignItems="center"
            className="trackDetails"
          >
            <Typography component={"span"} color="textPrimary" variant="body1">
              {`${trackName}`}
              <Typography
                color="textSecondary"
                variant="body2"
              >{`${artistNames.join(", ")}`}</Typography>
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}

Track.propTypes = {
  trackName: PropTypes.string.isRequired,
  artistNames: PropTypes.array.isRequired,
  albumName: PropTypes.string.isRequired,
  albumImage: PropTypes.string.isRequired,
  chartPosition: PropTypes.number.isRequired
};

export default class Tracks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: null
    };
    this.isLoading = this.isLoading.bind(this);
  }

  async componentDidMount() {
    const data = await getGlobalTracks();
    this.setState({
      tracks: data.tracks.items.map(item => item.track)
    });
  }

  isLoading() {
    const { tracks } = this.state;

    return !tracks;
  }

  render() {
    const { tracks } = this.state;
    console.log(tracks);
    return (
      <React.Fragment>
        {this.isLoading() &&<Loading/>}

        {tracks && (
          <ul>
            {tracks.map((track, index) => (
              <Track
                key={index}
                trackName={track.name}
                albumName={track.album.name}
                artistNames={track.artists.map(artist => artist.name)}
                albumImage={track.album.images[0].url}
                chartPosition={index + 1}
              ></Track>
            ))}
          </ul>
        )}
      </React.Fragment>
    );
  }
}
