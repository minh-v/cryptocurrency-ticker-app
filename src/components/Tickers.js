import React, { Component } from "react";
import "../styles/Tickers.css";
import Cryptocurrency from "./Cryptocurrency";
import axios from "axios";

class Tickers extends Component {
  state = {
    data: [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        price_usd: "1",
        percent_change_1h: "0",
        percent_change_24h: "0",
        percent_change_7d: "0"
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        price_usd: "1",
        percent_change_1h: "0",
        percent_change_24h: "0",
        percent_change_7d: "0"
      },
      {
        id: "litecoin",
        name: "Litecoin",
        symbol: "LTC",
        price_usd: "1",
        percent_change_1h: "0",
        percent_change_24h: "0",
        percent_change_7d: "0"
      }
    ]
  };

  //get currency data, and update the state
  fetchCryptocurrencyData() {
    axios
      .get("https://api.coinmarketcap.com/v1/ticker/?limit=10") // make GET request to API
      .then(response => {
        var wanted = ["bitcoin", "ethereum", "litecoin"];
        //filter out the currencies that we don't need
        var result = response.data.filter(currency =>
          wanted.includes(currency.id)
        );
        this.setState({ data: result });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchCryptocurrencyData();
    this.interval = setInterval(() => this.fetchCryptocurrencyData(), 60000); //60 * 1000 milsec
  }

  render() {
    //creates a Cryptocurrency component for each item in data array
    var tickers = this.state.data.map(currency => (
      <Cryptocurrency data={currency} key={currency.id} />
    ));
    return (
      <div className="tickers-container">
        <ul className="tickers">{tickers}</ul>
        <p>Information updated every minute courtesy of coinmarketcap.com</p>
      </div>
    );
  }
}

export default Tickers;
