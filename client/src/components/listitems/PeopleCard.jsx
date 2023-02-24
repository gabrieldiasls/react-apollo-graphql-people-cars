// React imports
import { Link } from "react-router-dom";
import { useState } from "react";

// Antd imports
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";

// Components imports
import Cars from "../lists/Cars";
import RemovePeople from "../buttons/RemovePeople";
import UpdatePerson from "../forms/UpdatePerson";

const PeopleCard = (props) => {
  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);

  const onButtonClick = () => setEditMode(!editMode);

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Card
        title={[`${firstName} ${lastName}`]}
        actions={[
          <EditOutlined key="edit" onClick={onButtonClick} />,
          <RemovePeople id={id} />,
        ]}
      >
        <Cars id={id} />

        <Card>
          <Link to={`/LearnMore/${id}`} id={`learn-more-${id}`}>
            Learn More
          </Link>
        </Card>

        {editMode && (
          <UpdatePerson
            id={props.id}
            firstName={props.firstName}
            lastName={props.lastName}
            onButtonClick={onButtonClick}
            updateStateVariable={updateStateVariable}
          />
        )}
        
      </Card>
    </div>
  );
};

export default PeopleCard;
