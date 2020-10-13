import React from "react";
import axios from "axios";
import { List, Header, Table } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";

class MyPag extends React.Component {
  // state = { agents: [], };
  state = { agents: [], page: 1, total_pages: 0, current_page: 1 };

  componentDidMount() {
    axios.get("/api/properties").then((res) => {
      // let agents = [];
      let agents = this.normalizeData(res.data.properties);

      this.setState({
        agents: [...this.state.agents, ...agents],
        total_pages: res.data.total_pages,
      });
    });
  }
  // here we get data... array of...
  // id, price, beds, baths, sq_ft, agent_id, city, zip
  // street, first_name, last_name, email:

  // return agent_id
  // first_name, last_name, email, phone: undefined properties:[]

  normalizeData = (data) => {
    console.log("data", data);
    let agents = [];
    // get all unique set of in data ids ie
    // get agent_ids
    let ids = [...new Set(data.map((d) => d.agent_id))];
    console.log("ids", ids);
    // should be for_each
    ids.map((id) => {
      let properties = data.filter((d) => d.agent_id === id);
      let { agent_id, first_name, last_name, email, phone } = properties[0];
      let agentProperties = properties.map((p) => {
        let { price, beds, baths, sq_ft, city, street, zip, id } = p;
        return { price, beds, baths, sq_ft, city, street, zip, id };
      });

      let detail = {
        agent_id,
        first_name,
        last_name,
        email,
        phone,
        properties: agentProperties,
      };

      agents.push(detail);
      console.log("agents", agents);
    });
    return agents;
  };

  loadMore = () => {
    const page = this.state.page + 1;
    axios.get(`/api/properties?page=${page}`).then(({ data }) => {
      console.log("data:", data);
      let agents = this.normalizeData(data.properties);
      this.setState({ agents: [...this.state.agents, ...agents] });
    });
  };

  load = (index) => {
    axios.get(`/api/properties?page=${index}`).then(({ data }) => {
      console.log("data:", data);
      let agents = this.normalizeData(data.properties);
      this.setState({ agents, current_page: index });
    });
  };

  getPages() {
    let pages = [];
    for (let i = 1; i <= this.state.total_pages; i++) {
      if (i % 30 == 0) {
        pages.push(<br />);
      }
      pages.push(
        <span
          // style={{ color: this.state.current_page === i ? "red" : "black" }}
          onClick={() => this.load(i)}
          style={{
            marginRight: "5px",
            color: this.state.current_page === i ? "red" : "black",
          }}
        >
          {i}
        </span>
      );
    }
    return pages;
  }
  goBack = () => {
    const { current_page } = this.state;
    if (current_page === 1) {
      return;
    }
    this.load(current_page - 1);
  };
  goForward = () => {
    const { current_page, total_pages } = this.state;
    if (current_page === total_pages) {
      return;
    }
    this.load(current_page + 1);
  };

  render() {
    // const { agents, } = this.state;
    const { agents, page, total_pages } = this.state;
    return (
      <List>
        <div>
          <span onClick={this.goBack}>{`<<<`}</span>
          {this.getPages()}
          <span onClick={this.goForward}>{`>>>`}</span>
        </div>
        {agents.map((agent) => {
          let {
            agent_id,
            first_name,
            last_name,
            email,
            phone,
            properties,
          } = agent;
          return (
            <List.Item key={agent_id}>
              <List.Header>
                {first_name} {last_name} - {email}
              </List.Header>
              <List.Item>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Price</Table.HeaderCell>
                      <Table.HeaderCell>Beds</Table.HeaderCell>
                      <Table.HeaderCell>Baths</Table.HeaderCell>
                      <Table.HeaderCell>Sq. Ft.</Table.HeaderCell>
                      <Table.HeaderCell>Street</Table.HeaderCell>
                      <Table.HeaderCell>City</Table.HeaderCell>
                      <Table.HeaderCell>ZIP</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {properties.map((p) => (
                      <Table.Row key={p.id}>
                        <Table.Cell>${p.price}</Table.Cell>
                        <Table.Cell>{p.beds}</Table.Cell>
                        <Table.Cell>{p.baths}</Table.Cell>
                        <Table.Cell>{p.sq_ft}</Table.Cell>
                        <Table.Cell>{p.street}</Table.Cell>
                        <Table.Cell>{p.city}</Table.Cell>
                        <Table.Cell>{p.zip}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </List.Item>
            </List.Item>
          );
        })}
      </List>
    );
  }
}

export default MyPag;
