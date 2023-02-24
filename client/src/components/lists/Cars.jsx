// React imports
import React from "react";

// Apollo imports
import { useQuery } from "@apollo/client";

// Antd imports
import { List } from "antd";

// Components imports
import CarCard from "../listitems/CarCard";

// Queries imports
import { GET_CARS } from "../../queries";

const Cars = (props) => {
  const { loading, error, data } = useQuery(GET_CARS);
  
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const filteredCars = data.cars.filter((car) => car.personId === props.id);

  return (
    <List grid={{ gutter: 20, column: 1 }} style={{ justifyContent: "center" }}>
      {filteredCars.map(({ id, year, make, model, price, personId }) => (
        <List.Item key={id}>
          <CarCard
            key={id}
            id={id}
            year={year}
            make={make}
            model={model}
            price={price}
            personId={personId}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default Cars;
