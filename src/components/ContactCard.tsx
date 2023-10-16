import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { DELETE_CONTACT } from "../graphql/queries/delete/deleteContact";
import { useMutation } from "@apollo/client";
import { ContactList } from "../interfaces/ContactList";
import { useHistory } from "react-router-dom";

interface ContactCardProps {
  contact: ContactList;
  isFavorite: boolean;
  onDelete: (id: number) => void;
  favoriteAction: (id: number) => void;
}

interface Phone {
  number: string;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  padding: 8px;
  border-radius: 8;
  border-color: black;
  border: 1px solid;
`;

const Label = styled.p``;
const Bold = styled.span`
  font-weight: 800;
`;

const ListItem = styled.li``;

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  isFavorite = false,
  onDelete,
  favoriteAction,
}) => {
  const history = useHistory();
  return (
    <Container>
      <Label>
        <Bold>First Name: </Bold>
        {contact.first_name}
      </Label>
      <Label>
        <Bold>Last Name: </Bold> {contact.last_name}
      </Label>

      <Label>
        <Bold>Phones</Bold>
      </Label>

      <ol>
        {contact.phones.map((phone, idx) => {
          return <li key={idx}>{phone.number}</li>;
        })}
      </ol>

      <button
        style={{ position: "absolute", top: 10, right: 20, zIndex: 2 }}
        onClick={() => onDelete(contact.id)}
      >
        x
      </button>

      <button
        style={{ position: "absolute", top: 35, right: 20, zIndex: 2 }}
        onClick={() => favoriteAction(contact.id)}
      >
        {isFavorite ? "</3" : "<3"}
      </button>

      <button
        style={{ position: "absolute", top: 55, right: 20, zIndex: 2 }}
        onClick={() =>
          history.push({
            pathname: "/edit",
            state: {
              data: contact,
            },
          })
        }
      >
        edit
      </button>
    </Container>
  );
};

export default ContactCard;
