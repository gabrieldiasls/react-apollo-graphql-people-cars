// React imports
import React, { useState, useEffect } from "react";

// Apollo imports
import { useQuery, useMutation } from "@apollo/client";

// UUID imports
import { v4 as uuidv4 } from "uuid";

// Antd imports
import { Button, Divider, Form, Input, Select } from "antd";

// Queries imports
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries";

// Getting option from Select
const { Option } = Select;

const AddCar = () => {
  const [id] = useState(uuidv4);
  const [addCar] = useMutation(ADD_CAR);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const { loading, error, data } = useQuery(GET_PEOPLE);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            contacts: [...data.contacts, addCar],
          },
        });
      },
    });
  };

  useEffect(() => {
    forceUpdate([]);
  }, []);

  return (
    <div className="add-car-form">
      <Divider>Add Car</Divider>
      <Form
        name="add-car-form"
        form={form}
        layout="inline"
        onFinish={onFinish}
        size="large"
        style={{
          marginBottom: "40px",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center"
        }}
      >
        <Form.Item
          label="Year"
          name="year"
          rules={[
            {
              required: true,
              message: "Please input the year of the car!",
            },
          ]}
        >
          <Input placeholder="Year" />
        </Form.Item>

        <Form.Item
          label="Make"
          name="make"
          rules={[
            {
              required: true,
              message: "Please input the car maker!",
            },
          ]}
        >
          <Input placeholder="Make" />
        </Form.Item>

        <Form.Item
          label="Model"
          name="model"
          rules={[
            {
              required: true,
              message: "Please input the model of the car!",
            },
          ]}
        >
          <Input placeholder="Model" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input the price of the car!",
            },
          ]}
        >
          <Input placeholder="Price" />
        </Form.Item>

        <Form.Item name="personId" label="Person" rules={[{ required: true }]}>
          <Select placeholder="Select the car owner...">
            {loading ? (
              <Option value="" disabled>
                Loading
              </Option>
            ) : error ? (
              <Option value="" disabled>
                Error
              </Option>
            ) : (
              data.people.map((person) => (
                <Option key={person.id} value={person.id}>
                  {`${person.firstName} ${person.lastName}`}
                </Option>
              ))
            )}
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCar;
