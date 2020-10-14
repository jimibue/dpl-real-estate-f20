import React from "react";
import axios from "axios";
import { AuthConsumer } from "../providers/AuthProvider";
import InfiniteScroll from "react-infinite-scroller";

export default class Cities extends React.Component {
  state = {
    properties: [],
    total_pages: 0,
    page: 1,
  };
  async componentDidMount() {
    let res = await axios.get(`/api/cities/sandy?page=1`);
    console.log(res.data.properties);
    this.setState({
      properties: res.data.properties,
      total_pages: res.data.total_pages,
    });
  }
  renderProperties() {
    return this.state.properties.map((p) => {
      return (
        <div style={styles.card}>
          <p>price: {p.price}</p>
          <p>sf: {p.sq_ft}</p>
          <p>beds: {p.beds}</p>
          <p>baths: {p.baths}</p>
        </div>
      );
    });
  }
  loadMore = async () => {
    let res = await axios.get(`/api/cities/sandy?page=${this.state.page + 1}`);
    console.log(res.data.properties);
    this.setState({
      properties: [...this.state.properties, ...res.data.properties],
      page: this.state.page + 1,
    });
  };

  render() {
    const { properties, page, total_pages } = this.state;
    return (
      <div>
        <h1>cities here {total_pages}</h1>
        <div>
          <InfiniteScroll
            // threshold={20}
            style={styles.gridContainer}
            pageStart={page}
            loadMore={this.loadMore}
            hasMore={page < total_pages}
            // useWindow={false}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
            {this.renderProperties()}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

{
  /* <InfiniteScroll
    pageStart={0}
    loadMore={loadFunc}
    hasMore={true || false}
    loader={<div className="loader" key={0}>Loading ...</div>}
>
    {items} // <-- This is the content you want to load
</InfiniteScroll> */
}

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridRowGap: "12px",
    gridColumnGap: "12px",
  },
  card: {
    boxShadow: "2px 2px 3px #ccc",
    backgroundColor: "white",
    // minHeight: "100px",
  },
};
