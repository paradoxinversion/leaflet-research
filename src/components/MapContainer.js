import React, { createRef, Component } from "react";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { Map as LeafletMap, Popup, TileLayer } from "react-leaflet";
import { render } from "react-dom";
export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialCoordinates: [51.505, -0.09],
      initialZoom: 13,
      maxZoom: 18,
      latlng: null,
      popupOpen: false
    };
    this.mapRef = createRef();
  }

  onMapClicked(e) {
    this.setState({
      latlng: e.latlng,
      popupOpen: true
    });
  }

  renderPopup() {
    return this.state.popupOpen ? (
      <Popup
        position={this.state.latlng}
        onClose={() => {
          this.setState({
            popupOpen: false
          });
        }}
      >
        <span>
          Map clicked at {this.state.latlng.lat}, {this.state.latlng.lng}
        </span>
      </Popup>
    ) : null;
  }

  render() {
    return (
      <LeafletMap
        id="my-map"
        center={this.state.initialCoordinates}
        zoom={this.state.initialZoom}
        ref={this.mapRef}
        onClick={this.onMapClicked.bind(this)}
      >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
          id="mapbox.streets"
          accessToken={process.env.MAPBOX_ACCESS_TOKEN}
          maxZoom={this.state.maxZoom}
        />
        {this.renderPopup()}
      </LeafletMap>
    );
  }
}
