// React imports
import React from "react";

// Apollo imports
import { useQuery } from "@apollo/client";

// Component imports
import AddCar from "../forms/AddCar";
import AddPerson from "../forms/AddPerson";
import Title from "../layout/Title";
import People from "../lists/People";

// Querries imports
import { GET_PEOPLE } from "../../queries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);
  const checkPeople = !loading && !error && data.people.length > 0;

  return (
    <div>
      <Title />
      <AddPerson />
      {checkPeople && <AddCar />}
      <People />
    </div>
  );
};

export default Home;
