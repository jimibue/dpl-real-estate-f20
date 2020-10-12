import Axios from "axios";
import React, { useState, useEffect } from "react";
import { List, Table } from "semantic-ui-react";

const Available = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    Axios.get("/api/properties")
      .then((res) => {
        setAgents(res.data);
      })
      .catch((err) => {
        alert("error occured getting agents properties");
      });
  }, []); // componentDIDMount[]
  return (
    <List>
      <List.Item>
        <List.Header>agent name</List.Header>
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
            <Table.Row>
              <Table.Cell>price</Table.Cell>
              <Table.Cell>beds</Table.Cell>
              <Table.Cell>baths</Table.Cell>
              <Table.Cell>sq_ft</Table.Cell>
              <Table.Cell>street</Table.Cell>
              <Table.Cell>city</Table.Cell>
              <Table.Cell>zip</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>price</Table.Cell>
              <Table.Cell>beds</Table.Cell>
              <Table.Cell>baths</Table.Cell>
              <Table.Cell>sq_ft</Table.Cell>
              <Table.Cell>street</Table.Cell>
              <Table.Cell>city</Table.Cell>
              <Table.Cell>zip</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </List.Item>
      <List.Item>
        <List.Header>agent name</List.Header>
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
            <Table.Row>
              <Table.Cell>price</Table.Cell>
              <Table.Cell>beds</Table.Cell>
              <Table.Cell>baths</Table.Cell>
              <Table.Cell>sq_ft</Table.Cell>
              <Table.Cell>street</Table.Cell>
              <Table.Cell>city</Table.Cell>
              <Table.Cell>zip</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>price</Table.Cell>
              <Table.Cell>beds</Table.Cell>
              <Table.Cell>baths</Table.Cell>
              <Table.Cell>sq_ft</Table.Cell>
              <Table.Cell>street</Table.Cell>
              <Table.Cell>city</Table.Cell>
              <Table.Cell>zip</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </List.Item>
    </List>
  );
};

export default Available;
