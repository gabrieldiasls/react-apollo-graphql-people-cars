// React imports
import { useEffect, useState } from "react";

// Apollo imports
import { useMutation, useQuery } from "@apollo/client";

// Antd imports
import { Button, Input, Select, Form } from "antd";

// Queries imports
import { UPDATE_CAR, GET_PEOPLE } from "../../queries";

// Getting option from Select
const { Option } = Select;

const UpdateCar = (props) => {
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setMake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);
  const [personId, setPersonId] = useState(props.personId);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [updateCar] = useMutation(UPDATE_CAR);

  useEffect(() => {
    forceUpdate();
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
    });
    props.onButtonClick();
  };

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value);
    if (variable === "year") {
      setYear(value);
    } else if (variable === "make") {
      setMake(value);
    } else if (variable === "model") {
      setModel(value);
    } else if (variable === "price") {
      setPrice(value);
    } else if (variable === "personId") {
      setPersonId(value);
    }
  };

  if (loading) return <p>Loading page</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Form
      form={form}
      name="update-car-form"
      layout="inline"
      onFinish={onFinish}
      size="medium"
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId,
      }}
    >
      <Form.Item
        name="year"
        rules={[
          {
            required: true,
            message: "Please input the year of the car!",
          },
        ]}
      >
        <Input
          placeholder="Year"
          onChange={(e) => updateStateVariable("year", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="make"
        rules={[
          {
            required: true,
            message: "Please input the car maker!",
          },
        ]}
      >
        <Input
          placeholder="Make"
          onChange={(e) => updateStateVariable("make", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="model"
        rules={[
          {
            required: true,
            message: "Please input the model of the car!",
          },
        ]}
      >
        <Input
          placeholder="Model"
          onChange={(e) => updateStateVariable("model", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="price"
        rules={[
          {
            required: true,
            message: "Please input the price of the car!",
          },
        ]}
      >
        <Input
          placeholder="Price"
          onChange={(e) => updateStateVariable("price", e.target.value)}
        />
      </Form.Item>
      <Form.Item name="personId" label="Person" rules={[{ required: false }]}>
        <Select
          placeholder="Select a person"
          onChange={(value) => updateStateVariable("personId", value)}
          value={personId}
        >
          {loading ? (
            <Option value="" disabled>
              Loading...
            </Option>
          ) : error ? (
            <Option value="" disabled>
              Error loading data
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
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("personId")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
