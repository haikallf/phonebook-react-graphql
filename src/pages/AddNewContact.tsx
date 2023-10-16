import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { ADD_CONTACT } from "../graphql/queries/create/addContact";
import { Phone } from "../interfaces/Phone";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const AddNewContact: React.FC = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [phones, setPhones] = useState<Phone[]>([]);

  const [addContact, { loading, error }] = useMutation(ADD_CONTACT);

  const addToContact = () => {
    // setPhones([...phones, { number: phone }]);
    addContact({
      variables: {
        first_name,
        last_name,
        phones,
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
      <h1>Add New Contact</h1>

      <Form>
        <p>First Name:</p>
        <input
          type="text"
          name="first_name"
          id="first_name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <p>Last Name:</p>
        <input
          type="text"
          name="last_name"
          id="last_name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
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

        <button onClick={addToContact}>Submit</button>
      </Form>
    </div>
  );
};

export default AddNewContact;
