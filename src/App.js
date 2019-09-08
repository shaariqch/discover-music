import React from "react";
import "./App.css";
import Tracks from "./Components/Tracks";
import { Container } from "@material-ui/core";
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container maxWidth="md" className="dark-bg">
        <Tracks />
      </Container>
    );
  }
}
