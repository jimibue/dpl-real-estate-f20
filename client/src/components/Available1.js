// import Axios from "axios";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { List, Table } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";

const Available = () => {
  const [agents, setAgents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);

  // async await demo
  // const getAgents = async () => {
  //   try {
  //     let res = await Axios.get("/api/properties");
  //     setAgents(res.data);
  //   } catch (err) {
  //     alert("error occured getting agents properties");
  //   }
  // };

  // useEffect(() => {
  //   getAgents();
  // }, []);

  const normalizeData = (data) => {
    let agents = [];

    //create an array of unique agent_ids
    let ids = [...new Set(data.map((d) => d.agent_id))];

    // loop over ids grab all the properties where agent = id
    ids.forEach((id) => {
      // grab all properties that belong to the agent (ie id)
      let properties = data.filter((d) => d.agent_id == id);

      let { agent_id, first_name, last_name } = properties[0];

      // just create property object that don't have agent_id, first_name, last_name
      let agentProperties = properties.map((p) => {
        let { price, beds, baths, sq_ft, city, street, zip, id } = p;
        return { price, beds, baths, sq_ft, city, street, zip, id };
      });

      let detail = {
        agent_id,
        first_name,
        last_name,
        properties: agentProperties,
      };

      agents.push(detail);
    });
    return agents;
  };

  // useEffect(() => {
  //   console.log("useEffect called here");
  //   Axios.get("/api/properties")
  //     .then((res) => {
  //       let normalizedData = normalizeData(res.data);
  //       console.log(normalizedData);
  //       setAgents(normalizedData);
  //     })
  //     .catch((err) => {
  //       alert("error occured getting agents properties");
  //     });gits 
  // }, []); // componentDIDMount[]

  const loadMore = async () => {
    // do axios call to get more data
    console.log("loadMore called here");
    try {
      let res = await Axios.get(`/api/properties?page=${page + 1}`);
      let normalizedData = normalizeData(res.data);
      setAgents([...agents, normalizedData]);
      setPage(page + 1);
    } catch (err) {
      alert("error in loadmore");
    }
  };
  return (
    <List style={{ height: "110px", overflow: "auto" }}>
      {page}
      <InfiniteScroll
        pageStart={page}
        loadMore={loadMore}
        hasMore={page < totalPages}
        hasMore={true}
        // useWindow={false}
      >
        {agents.map((agent) => (
          <List.Item key={agent.id + "a"}>
            <List.Header>{agent.first_name}</List.Header>

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
                {agent.properties &&
                  agent.properties.map((p) => (
                    <Table.Row key={p.id + "p"}>
                      <Table.Cell>{p.price}</Table.Cell>
                      <Table.Cell>{p.beds}</Table.Cell>
                      <Table.Cell>{p.baths}</Table.Cell>
                      <Table.Cell>{p.sq_ft}</Table.Cell>
                      <Table.Cell>{p.street}</Table.Cell>
                      <Table.Cell>{p.city}</Table.Cell>
                      <Table.Cell>{p.zip}</Table.Cell>
                    </Table.Row>
                  ))}
                {/*end of agent.agentProperties.map*/}
              </Table.Body>
            </Table>
          </List.Item>
        ))}
      </InfiniteScroll>
    </List>
  );
};

export default Available;

export default function Available() {
  const [agents, setAgents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [load, setLoad] = useState(false);

  function formatData(data) {
    const agents = [];
    const agentsEmails = data.map((d) => d.email);

    const agentsUniqueEmails = [...new Set(agentsEmails)];
    agentsUniqueEmails.forEach((agentEmail) => {
      const properties = data.filter((d) => d.email == agentEmail);
      const { first_name, last_name, email } = properties[0];

      const aProperties = properties.map((p) => {
        const { id, price, sold, beds, baths, sq_ft, city, zip, street } = p;
        return { id, price, sold, beds, baths, sq_ft, city, zip, street };
      });

      agents.push({ first_name, last_name, email, properties: aProperties });
      // properties is one array with many properties but, the agent info is the same
    });

    return agents;
  }

  async function loadMore() {
    console.log("caledd");

    // // if (!load) {
    // getAgentData();
    // // }

    try{
    let res = await axios.get(`/api/properties?page=${page}`);
    debugger;
    const agents = formatData(res.data);
    setAgents(agents);
    }catch
    // setLoad(true);
  }

  async function getAgentData() {
    let res = await axios.get(`/api/properties?page=${page}`);

    setTotalPages(res.data.total_pages);
    const agents = formatData(res.data);
    setAgents(agents);
  }

  useEffect(() => {
    //TODO: setup axios call
    console.log("here");
    getAgentData();
  }, []);

  return (
    <List style={styles.scroller}>
      <InfiniteScroll
        pageStart={page}
        loadMore={loadMore}
        hasMore={page < totalPages}
        hasMore={true}
        useWindow={false}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {agents.map((agent) => (
          <div>
            <h1>
              {agent.first_name} {agent.last_name}
            </h1>
            <p>{agent.email}</p>
            {agents.map((agent) => (
              <List.Item key={agent.id + "a"}>
                <List.Header>{agent.first_name}</List.Header>

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
                    {agent.properties &&
                      agent.properties.map((p) => (
                        <Table.Row key={p.id + "p"}>
                          <Table.Cell>{p.price}</Table.Cell>
                          <Table.Cell>{p.beds}</Table.Cell>
                          <Table.Cell>{p.baths}</Table.Cell>
                          <Table.Cell>{p.sq_ft}</Table.Cell>
                          <Table.Cell>{p.street}</Table.Cell>
                          <Table.Cell>{p.city}</Table.Cell>
                          <Table.Cell>{p.zip}</Table.Cell>
                        </Table.Row>
                      ))}
                    {/*end of agent.agentProperties.map*/}
                  </Table.Body>
                </Table>
              </List.Item>
            ))}
            <hr />
          </div>
        ))}
      </InfiniteScroll>
    </List>
  );
}

const styles = {
  scroller: {
    height: "80vh",
    overflow: "auto",
  },
};
