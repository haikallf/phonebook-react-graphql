import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { ADD_CONTACT } from "../graphql/queries/create/addContact";
import { Phone } from "../interfaces/Phone";
import { AiOutlinePlus } from "react-icons/ai";

const Heading = styled.h1`
  font-size: 24px;
  margin-left: 16px;
  padding-top: 10px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
`;

const TextField = styled.input`
  width: 60vw;
  border: 1px solid black;
  border-radius: 12px;
  padding: 16px;
`;

const PlusButton = styled.button`
  height: 32px;
  width: 32px;
  background: white;
  color: black;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TrashButton = styled.button`
  height: 32px;
  width: 32px;
  background: white;
  color: black;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmitButton = styled.button`
  height: 48px;
  width: 112px;
  background: black;
  color: white;
  border: 1px solid black;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

const PhoneList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
  gap: 10px;
`;

const PhoneListCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
`;

const AddNewContact: React.FC = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [phones, setPhones] = useState<Phone[]>([]);

  const [addContact, { loading, error }] = useMutation(ADD_CONTACT);

  const addToContact = () => {
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
    <React.Fragment>
      <Heading>Add New Contact</Heading>

      <Form>
        <p>First Name:</p>
        <TextField
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
        <TextField
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
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <TextField
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^0-9+]/gi, "");
              setPhone(newValue);
            }}
          />
          <PlusButton
            onClick={() => {
              if (!isPhoneNumberExists() && phone !== "") {
                setPhones([...phones, { number: phone }]);
                setPhone("");
              }
            }}
          >
            <AiOutlinePlus />
          </PlusButton>
        </div>

        <p>Phone Number List:</p>
        <PhoneList>
          {phones.map((elmt, idx) => {
            return (
              <PhoneListCard key={idx} style={{ display: "flex" }}>
                <li>{elmt.number}</li>
                <TrashButton
                  onClick={() => {
                    let temp = [...phones];
                    temp.splice(idx, 1);
                    setPhones(temp);
                  }}
                >
                  x
                </TrashButton>
              </PhoneListCard>
            );
          })}
        </PhoneList>

        <SubmitButton onClick={addToContact}>Add Contact</SubmitButton>
      </Form>
    </React.Fragment>
  );
};

export default AddNewContact;
