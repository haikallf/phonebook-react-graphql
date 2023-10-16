import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { ADD_CONTACT } from "../graphql/queries/create/addContact";
import { Phone } from "../interfaces/Phone";
import { ContactList } from "../interfaces/ContactList";
import { useHistory } from "react-router-dom";
import { EDIT_CONTACT } from "../graphql/queries/edit/editContact";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

interface LocationState {
  data?: ContactList; // You may need to adjust this based on your actual structure
}

const EditContact: React.FC = () => {
  const history = useHistory();
  const { data: selectedContact }: LocationState = history.location.state || {};
  const [first_name, setFirstName] = useState(selectedContact?.first_name);
  const [last_name, setLastName] = useState(selectedContact?.last_name);
  const [phone, setPhone] = useState("");
  const [phones, setPhones] = useState<Phone[]>(selectedContact?.phones ?? []);

  console.log(selectedContact);

  const [editContact, { loading, error }] = useMutation(EDIT_CONTACT);

  const editSelectedContact = () => {
    editContact({
      variables: {
        id: selectedContact?.id,
        _set: {
          first_name,
          last_name,
        },
      },
    });
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error);
    return <h1>Error loading contacts</h1>;
  }

  const isPhoneNumberExists = () => {
    return phones.some((el) => el.number === phone);
  };

  return (
    <div>
      <h1>Edit Contact Name</h1>

      <Form>
        <p>First Name:</p>
        <input
          type="text"
          name="first_name"
          id="first_name"
          value={first_name}
          onChange={(e) => {
            const newValue = e.target.value.replace(/[^A-Za-z0-9]/gi, "");
            setFirstName(newValue);
          }}
        />

        <p>Last Name:</p>
        <input
          type="text"
          name="last_name"
          id="last_name"
          value={last_name}
          onChange={(e) => {
            const newValue = e.target.value.replace(/[^A-Za-z0-9]/gi, "");
            setLastName(newValue);
          }}
        />

        <p>Phone Number</p>
        <div className="" style={{ display: "flex" }}>
          <input
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^0-9+]/gi, "");
              setPhone(newValue);
            }}
          />
          <button
            onClick={() => {
              if (!isPhoneNumberExists()) {
                setPhones([...phones, { number: phone }]);
                setPhone("");
              }
            }}
          >
            +
          </button>
        </div>

        <ol>
          {phones.map((elmt, idx) => {
            return (
              <div key={idx} style={{ display: "flex" }}>
                <li>{elmt.number}</li>
                <button
                  onClick={() => {
                    let temp = [...phones];
                    temp.splice(idx, 1);
                    setPhones(temp);
                  }}
                >
                  x
                </button>
              </div>
            );
          })}
        </ol>

        <button onClick={editSelectedContact}>Submit</button>
      </Form>
    </div>
  );
};

export default EditContact;
