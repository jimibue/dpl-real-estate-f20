// import React, { useState, useEffect } from "react";
// import AvailableTable from "./AvailableTable";
// import axios from "axios";
// import InfiniteScroll from "react-infinite-scroller";
// import { List } from "semantic-ui-react";

// export default function Available() {
//   const [agents, setAgents] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [load, setLoad] = useState(false);

//   function formatData(data) {
//     const agents = [];
//     const agentsEmails = data.map((d) => d.email);

//     const agentsUniqueEmails = [...new Set(agentsEmails)];
//     agentsUniqueEmails.forEach((agentEmail) => {
//       const properties = data.filter((d) => d.email == agentEmail);
//       const { first_name, last_name, email } = properties[0];

//       const aProperties = properties.map((p) => {
//         const { id, price, sold, beds, baths, sq_ft, city, zip, street } = p;
//         return { id, price, sold, beds, baths, sq_ft, city, zip, street };
//       });

//       agents.push({ first_name, last_name, email, properties: aProperties });
//       // properties is one array with many properties but, the agent info is the same
//     });

//     return agents;
//   }

//   async function loadMore() {
//     console.log("caledd");

//     // // if (!load) {
//     // getAgentData();
//     // // }

//     let res = await axios.get(`/api/properties?page=${page}`);
//     const agents = formatData(res.data.properties);
//     setAgents(agents);
//     // setLoad(true);
//   }

//   async function getAgentData() {
//     let res = await axios.get(`/api/properties?page=${page}`);
//     setTotalPages(res.data.total_pages);
//     const agents = formatData(res.data.properties);
//     setAgents(agents);
//   }

//   useEffect(() => {
//     //TODO: setup axios call
//     console.log("here");
//     getAgentData();
//   }, []);

//   return (
//     <List style={styles.scroller}>
//       <InfiniteScroll
//         pageStart={page}
//         loadMore={loadMore}
//         hasMore={page < totalPages}
//         useWindow={false}
//       >
//         {agents.map((agent) => (
//           <div>
//             <h1>
//               {agent.first_name} {agent.last_name}
//             </h1>
//             <p>{agent.email}</p>
//             <AvailableTable properties={agent.properties} />
//             <hr />
//           </div>
//         ))}
//       </InfiniteScroll>
//     </List>
//   );
// }

// const styles = {
//   scroller: {
//     height: "80vh",
//     overflow: "auto",
//   },
// };

import React from "react";
import axios from "axios";
import { List, Header, Table } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";

class Available extends React.Component {
  // state = { agents: [], };
  state = { agents: [], page: 1, total_pages: 0 };

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

  render() {
    // const { agents, } = this.state;
    const { agents, page, total_pages } = this.state;
    return (
      // <List>
      <List style={styles.scroller}>
        <InfiniteScroll
          pageStart={page}
          loadMore={this.loadMore}
          hasMore={page < total_pages}
          useWindow={false}
        >
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
        </InfiniteScroll>
      </List>
    );
  }
}

const styles = {
  scroller: {
    height: "80vh",
    overflow: "auto",
  },
};

export default Available;
