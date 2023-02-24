// React imports
import React from "react";

// Apollo imports
import { useQuery } from "@apollo/client";

// Antd imports
import { Divider, List } from "antd";

// Queries imports
import { GET_PEOPLE } from "../../queries";

// Components imports
import PeopleCard from "../listitems/PeopleCard";

const People = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Divider>Records</Divider>
      <List grid={{ column: 1 }}>
        {data.people.map(({ id, firstName, lastName }) => (
          <List.Item key={id}>
            <PeopleCard
              key={id}
              id={id}
              firstName={firstName}
              lastName={lastName}
            />
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default People;
