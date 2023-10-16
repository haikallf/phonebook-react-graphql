import styled from "@emotion/styled";
import React from "react";
import { ContactList } from "../interfaces/ContactList";
import { useHistory } from "react-router-dom";
import {
  AiOutlineClose,
  AiOutlineStar,
  AiFillStar,
  AiOutlineEdit,
} from "react-icons/ai";

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
  width: 85vw;
  padding: 16px;
  border-radius: 12px;
  border-color: black;
  border: 1px solid;
  border-radius: 12px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);

  @media only screen and (min-width: 767px) {
    width: 42vw;
  }

  @media only screen and (min-width: 601px) and (max-width: 767px) {
    width: 250px;
  }

  @media only screen and (min-width: 481px) and (max-width: 600px) {
    width: 85vw;
  }
`;

const ActionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: absolute;
  top: 16px;
  right: 16px;
`;

const Label = styled.p``;
const Bold = styled.span`
  font-weight: 700;
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

      <Bold>Phones</Bold>

      <ol>
        {contact.phones.map((phone, idx) => {
          return <li key={idx}>{phone.number}</li>;
        })}
      </ol>

      <ActionButtonContainer>
        <AiOutlineClose onClick={() => onDelete(contact.id)} />

        {isFavorite ? (
          <AiFillStar onClick={() => favoriteAction(contact.id)} />
        ) : (
          <AiOutlineStar onClick={() => favoriteAction(contact.id)} />
        )}

        <AiOutlineEdit
          onClick={() =>
            history.push({
              pathname: "/edit",
              state: {
                data: contact,
              },
            })
          }
        />
      </ActionButtonContainer>
    </Container>
  );
};

export default ContactCard;
