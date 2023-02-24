// React imports
import React, { useState, useEffect } from "react";

// UUID imports
import { v4 as uuidv4 } from "uuid";

// Antd imports
import { Button, Divider, Form, Input } from "antd";

// Apollo imports
import { useMutation } from "@apollo/client";

// Queries imports
import { ADD_PERSON, GET_PEOPLE } from "../../queries";

const AddPerson = () => {
  const [id] = useState(uuidv4());
  const [addPerson] = useMutation(ADD_PERSON);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        });
      },
    });
    form.resetFields();
  };

  useEffect(() => {
    forceUpdate([]);
  }, []);

  return (
    <div className="add-person-form">
      <Divider>Add Person</Divider>
      <Form
        name="add-person-form"
        form={form}
        layout="inline"
        onFinish={onFinish}
        size="medium"
        style={{
          marginBottom: "40px",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center"
        }}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input placeholder="Last Name" />
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
              Add Person
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPerson;
