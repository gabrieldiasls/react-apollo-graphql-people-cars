// React imports
import { useState } from "react";

// Antd imports
import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";

// Components imports
import UpdateCar from "../forms/UpdateCar";
import RemoveCar from "../buttons/RemoveCar";

const CarCard = (props) => {
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setMake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);
  const [personId, setPersonId] = useState(props.personId);
  const [editMode, setEditMode] = useState(false);

  const onClick = () => setEditMode(!editMode);

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "year":
        setYear(value);
        break;
      case "make":
        setMake(value);
        break;
      case "model":
        setModel(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "personId":
        setPersonId(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {editMode ? (
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Update Car"
          actions={[
            <EditOutlined key="edit" onClick={onClick} />,
            <RemoveCar id={id} />,
          ]}
        >
          <UpdateCar
            id={props.id}
            year={props.year}
            make={props.make}
            model={props.model}
            price={props.price}
            personId={props.personId}
            onButtonClick={onClick}
            updateStateVariable={updateStateVariable}
          />
        </Card>
      ) : (
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={[
            year +
              " " +
              make +
              " " +
              model +
              " → $" +
              Number(price).toLocaleString(),
          ]}
          actions={[
            <EditOutlined key="edit" onClick={onClick} />,
            <RemoveCar id={id} />,
          ]}
        >
        </Card>
      )}
    </div>
  );
};

export default CarCard;
