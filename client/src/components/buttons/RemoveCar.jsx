// React imports
import React from 'react'

// Antd imports
import { DeleteOutlined } from "@ant-design/icons";

// Apollo imports
import { useMutation } from "@apollo/client";

// Loadsh imports
import filter from "lodash.filter";

// Queries imports
import { GET_CARS, REMOVE_CAR } from "../../queries";

const RemoveCar = ({ id }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, (c) => {
            return c.id !== removeCar.id;
          }),
        },
      });
    },
  });

  const onClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");
    if (result) {
      removeCar({ variables: { id } });
    }
  };

  return (
    <DeleteOutlined key="delete" style={{ color: "red" }} onClick={onClick} />
  );
};

export default RemoveCar;
