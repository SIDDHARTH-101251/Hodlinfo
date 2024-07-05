import { Component } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import "./index.css";
import HodlinfoTable from "../HodlinfoTable";
import logo from "../../assets/logo.png";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

class HodlinfoMain extends Component {
  state = { timer: 0 };

  resetTimer = () => {
    this.setState((prevState) => ({
      timer: prevState.timer + 1,
    }));
  };
  render() {
    const { timer } = this.state;
    return (
      <div>
        <nav className="navbar">
          <div className="logo-image-container">
            <img src={logo} alt="logo" className="logo-image" />
          </div>
          <form className="form-style">
            <select className="select-1">
              <option>INR</option>
            </select>
            <select className="select-2">
              <option>BTC</option>
              <option>ETH</option>
              <option>USDT</option>
              <option>XRP</option>
              <option>TRX</option>
              <option>DASH</option>
              <option>ZEC</option>
              <option>XEM</option>
              <option>IOST</option>
              <option>WIN</option>
              <option>BTT</option>
              <option>WRX</option>
            </select>
            <button type="submit" className="buy-btc-button">
              BUY BTC
            </button>
          </form>
          <div className="counter-telegram-button-container">
            <CountdownCircleTimer
              key={timer}
              isPlaying
              duration={60}
              colors="#6bcacb"
              onComplete={this.resetTimer}
              size={40}
              strokeWidth={3}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
            <button className="connect-telegram-button">
              <FaTelegramPlane className="telegram-icon" />
              Connect Telegram
            </button>
            <input type="checkbox" id="switch" />
            <label for="switch">Toggle</label>
          </div>
        </nav>
        <HodlinfoTable />
      </div>
    );
  }
}

export default HodlinfoMain;
