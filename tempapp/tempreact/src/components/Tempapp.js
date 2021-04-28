import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../App.css";

class Tempapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: [],
      search: "delhi",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const search = this.state.search;
    console.log(search);
    this.fetchApi(search);
  };

  fetchApi = async (search) => {
    console.log("promise");
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.search}&units=metric&appid=92b72bcd23e55ec6716715e2c72fa069`
    );
    console.log(response);
    const resJson = await response.json();
    console.log(resJson.main);

    this.setState({
      city: resJson.main,
    });
  };

  render() {
    console.log(this.state.city);
    console.log("this is first console");

    return (
      <div className="box">
        <input
          type="search"
          value={this.state.search}
          onChange={(event) => {
            this.setState({
              search: event.target.value,
            });
          }}
        />
        <button type="submit" onClick={this.handleSubmit}>
          +
        </button>

        {!this.state.city ? (
          <p> no data found </p>
        ) : (
          <div>
            <h2 className="heading">
              <i class="fas fa-street-view">{this.state.search}</i>
            </h2>
            {this.state.city ? (
              <div>
                <h3>{this.state.city.temp}deg celcius</h3>
              </div>
            ) : (
              <p>no</p>
            )}
            <div>
              <h5>
                {this.state.city.temp_min}|{this.state.city.temp_max}
              </h5>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Tempapp;
