import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { DELETE_CONTACT } from "../graphql/queries/delete/deleteContact";
import { useMutation } from "@apollo/client";

interface ContactCardProps {
  id: number;
  first_name: string;
  last_name: string;
  phones: Phone[];
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
  id,
  first_name,
  last_name,
  phones,
  isFavorite = false,
  onDelete,
  favoriteAction,
}) => {
  return (
    <Container>
      <Label>
        <Bold>First Name: </Bold>
        {first_name}
      </Label>
      <Label>
        <Bold>Last Name: </Bold> {last_name}
      </Label>

      <Label>
        <Bold>Phones</Bold>
      </Label>

      <ol>
        {phones.map((phone, idx) => {
          return <li key={idx}>{phone.number}</li>;
        })}
      </ol>

      <button
        style={{ position: "absolute", top: 10, right: 20, zIndex: 2 }}
        onClick={() => onDelete(id)}
      >
        x
      </button>

      <button
        style={{ position: "absolute", top: 35, right: 20, zIndex: 2 }}
        onClick={() => favoriteAction(id)}
      >
        {isFavorite ? "</3" : "<3"}
      </button>
    </Container>
  );
};

export default ContactCard;
