import React, { Component } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import AddressModal from "./components/AddressModal";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "Add Address",
      showPopup: false,
      btnText: "Show PopUp",
    };
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };

  render() {
    return (
      <div>
        <Button size="large" variant="contained" onClick={this.togglePopup}>
          {this.state.showPopup ?  "Show Address PopUp":"Show Address PopUp"}
        </Button>
        {this.state.showPopup ? (
          <AddressModal
            title={this.state.title}
            closePopup={this.togglePopup}
          />
        ) : null}
      </div>
    );
  }
}
export default App;
