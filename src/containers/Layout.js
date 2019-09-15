import React, { Component } from "react";
import axios from "axios";
import RenderRows from "../components/RenderRows";
import debounce from "lodash.debounce";
var Loader = require("react-loaders").Loader;

class Layout extends Component {
  state = {
    imageData: [],
    loading: true,
    activeCardCount: 4,
    activePage: 1
  };
  componentDidMount() {
    this.fetchImageData();
    this.calculateWindowSize();
    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("scroll", this.handleScroll);
  }
  calculateWindowSize = () => {
    let { activeCardCount } = this.state;
    if (window.innerWidth >= 992 && activeCardCount !== 4) {
      this.setState({ activeCardCount: 4 });
      return true;
    }
    //For tablet screen
    if (
      window.innerWidth >= 768 &&
      window.innerWidth < 992 &&
      activeCardCount !== 3
    ) {
      this.setState({ activeCardCount: 3 });
      return true;
    }
    //For mobile screen
    if (window.innerWidth <= 576 && activeCardCount !== 2) {
      this.setState({ activeCardCount: 2 });
      return true;
    }
    return false;
  };
  handleWindowResize = () => {
    this.calculateWindowSize();
    //For desktop screen
  };
  loadMore = () => {
    this.setState(
      prevState => ({
        activePage: prevState.activePage + 1,
        loading: true
      }),
      () => {
        // console.log("active page", this.state.activePage)
        this.fetchImageData();
      }
    );
  };
  handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.loadMore();
    }
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("scroll", debounce(this.handleScroll, 500));
  }
  fetchImageData = async () => {
    let { activePage } = this.state;
    try {
      let result = await axios.get(
        `https://picsum.photos/v2/list?page=${activePage}&limit=12`
      );
      this.setState({
        loading: false,
        imageData: [...this.state.imageData, ...result.data]
      });
    } catch (e) {}
  };
  addMoreData = () => {};
  render() {
    let { activeCardCount, imageData, loading } = this.state;

    return (
      <div className="container-fluid">
        {loading ? (
          <div style={{ top: "50%" }} className="loader-wrapper">
            <Loader type="pacman" />
          </div>
        ) : null}
        <RenderRows images={imageData} activeCardCount={activeCardCount} />
      </div>
    );
  }
}
export default Layout;
