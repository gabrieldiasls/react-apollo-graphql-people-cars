// React imports
import React from "react";
import { Link, useParams } from "react-router-dom";

// Apollo imports
import { useQuery } from "@apollo/client";

// Antd imports
import { List, Card } from "antd";

// Component imports
import CarCard from "../listitems/CarCard";

// Queries imports
import { GET_CARS, GET_PERSON_BY_ID } from "../../queries";

const LearnMore = (props) => {
  const { id } = useParams();

  const {
    loading: personLoading,
    error: personError,
    data: personData,
  } = useQuery(GET_PERSON_BY_ID, {
    variables: { id },
  });

  const {
    loading: carLoading,
    error: carError,
    data: carData,
  } = useQuery(GET_CARS);

  if (personLoading) return "Loading people...";
  if (carLoading) return "Loading cars...";
  if (personError) return `Error! ${personError.message}`;
  if (carError) return `Error! ${carError.message}`;

  const person = personData.person;
  const listCars = carData.cars.filter((car) => car.personId === id);

  return (
    <div style={{width: '95%', margin: '1rem'}}>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/">HOME</Link>
      </div>
      <Card title={[`${person.firstName} ${person.lastName}`]}>
        <List
          grid={{ column: 1 }}
          style={{ justifyContent: "center" }}
        >
          {listCars.map(({ id, year, make, model, price, personId }) => (
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
      </Card>
    </div>
  );
};

export default LearnMore;
