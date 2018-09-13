import React, { Component } from "react";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myMap: null,
      popup: L.popup(),
      initialPosition: [51.505, -0.09],
      initialZoom: 13,
      maxZoom: 18
    };
    this.openDefaultPopup = this.openDefaultPopup.bind(this);
  }

  openDefaultPopup(e) {
    this.state.popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng)
      .openOn(this.state.myMap);
  }

  onMapClicked(e) {
    console.log("You clicked the map at " + e.latlng);
    console.log(e);

    this.openDefaultPopup(e);
  }

  async componentDidMount() {
    // ! accessToken needs to be pulled in a different way prior to deploy
    const myMap = await L.map("my-map").setView(
      this.state.initialPosition,
      this.state.initialZoom
    );
    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: this.state.maxZoom,
        id: "mapbox.streets",
        accessToken: process.env.MAPBOX_ACCESS_TOKEN
      }
    ).addTo(myMap);

    myMap.on("click", this.onMapClicked, this);
    this.setState({
      myMap
    });
  }

  render() {
    return (
      <div>
        <p>Below is a map</p>
        <div id="my-map" />
      </div>
    );
  }
}
