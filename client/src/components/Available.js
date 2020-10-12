import Axios from "axios";
import React, { useState, useEffect } from "react";
import { List, Table } from "semantic-ui-react";

const Available = () => {
  const [agents, setAgents] = useState([]);

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

  // FROM THIS

  // [
  //   {
  //     "id": 5000,
  //     "price": 251528,
  //     "beds": 5,
  //     "baths": 5,
  //     "sq_ft": 5290,
  //     "agent_id": 100,
  //     "city": "Midvale",
  //     "street": "90147 Digna Oval",
  //     "zip": "82145-8842",
  //     "first_name": "Jamie",
  //     "last_name": "Weber"
  //   }
  // ]

  // TO THIS =>

  // [
  //   {
  //     agent_id,
  //     first_name,
  //     last_name,
  //     agentProperties: [
  //       {
  //         price,
  //         beds,
  //         baths,
  //         sq_ft,
  //         city,
  //         street,
  //         zip,
  //         id,
  //       },
  //     ],
  //   },
  // ];
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

  useEffect(() => {
    Axios.get("/api/properties").then((res) => {
      console.log("get worked");
      let normalizedData = normalizeData(res.data);
      console.log(normalizedData);
      setAgents(normalizedData);
    });
    // .catch((err) => {
    //   alert("error occured getting agents properties");
    // });
  }, []); // componentDIDMount[]
  return (
    <List>
      {agents.map((agent) => (
        <List.Item>
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
                  <Table.Row>
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
    </List>
  );
};

export default Available;
