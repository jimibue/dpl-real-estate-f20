import Axios from "axios";
import React from "react";
import { Form } from "semantic-ui-react";

export default class FindHomes extends React.Component {
  state = { agents: [], buyers: [], properties: [] };
  componentDidMount() {
    //axios call to get agents
    Axios.get("/api/agents").then((res) => {
      this.setState({
        agents: res.data,
      });
    });
  }

  getBuyers = async (e, { value }) => {
    console.log(value);
    // do another axios call here agents buyers by agent id
    let res = await Axios.get(`/api/agents/${value}`);
    this.setState({
      buyers: res.data,
    });
  };

  agentList = () => {
    return this.state.agents.map((agent) => {
      return {
        key: agent.id,
        text: `${agent.first_name} ${agent.last_name}`,
        value: agent.id,
      };
    });
  };
  buyerList = () => {
    return this.state.buyers.map((buyer) => {
      return {
        key: buyer.id,
        text: `${buyer.first_name} ${buyer.last_name}`,
        value: buyer.id,
      };
    });
  };

  getProperties = (e, { value }) => {
    Axios.get(`/api/buyers/${value}`).then((res) => {
      this.setState({
        properties: res.data,
      });
    });
  };

  renderProperties = () => {
    return this.state.properties.map((p) => {
      return (
        <div>
          <h1>Price: {p.price}</h1>
          <p>address {p.street}</p>
        </div>
      );
    });
  };
  render() {
    const { buyers } = this.state;
    return (
      <div>
        <h1>Find Homes</h1>
        <Form.Select
          label="agents"
          onChange={this.getBuyers}
          options={this.agentList()}
        />
        {buyers.length > 0 && (
          <Form.Select
            label="buyers"
            onChange={this.getProperties}
            options={this.buyerList()}
          />
        )}
        {this.renderProperties()}
      </div>
    );
  }
}
