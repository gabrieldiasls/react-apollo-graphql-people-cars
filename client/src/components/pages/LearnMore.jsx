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

  if (personLoading) return "Loading";
  if (carLoading) return "Loading";
  if (personError) return `Error! ${personError.message}`;
  if (carError) return `Error! ${carError.message}`;

  const person = personData.person;
  const filteredCars = carData.cars.filter((car) => car.personId === id);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/">← GO BACK HOME</Link>
      </div>
      <Card title={[`${person.firstName} ${person.lastName}`]}>
        <List
          grid={{ column: 1 }}
          style={{ justifyContent: "center" }}
        >
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
      </Card>
    </div>
  );
};

export default LearnMore;
