import { Component } from "react";
import HodlinfoTableRow from "../HodlinfoTableRow";
import "./index.css";

class HodlinfoTable extends Component {
  state = { data: [] };

  componentDidMount() {
    this.getData();
    this.interval = setInterval(this.getData, 60000); // Fetch data every 1 minute
  }

  componentWillUnmount() {
    clearInterval(this.interval); // Clear interval when component unmounts
  }

  getData = async () => {
    try {
      const response = await fetch("http://localhost:1300/data");
      const tickers = await response.json();
      this.setState({
        data: tickers,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { data } = this.state;
    return (
      <div className="table-container">
        <table className="table-style" border={0}>
          <thead>
            <tr className="top-row">
              <th>#</th>
              <th>Coin Name</th>
              <th>Last Traded Price</th>
              <th>Buy Price</th>
              <th>Sell Price</th>
              <th>Volume</th>
              <th>Base Unit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((eachItem) => (
              <HodlinfoTableRow key={eachItem.id} data={eachItem} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default HodlinfoTable;
