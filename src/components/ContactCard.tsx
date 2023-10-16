import styled from "@emotion/styled";
import React from "react";

interface ContactCardProps {
  first_name: string;
  last_name: string;
  phones: Phone[];
}

interface Phone {
  number: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  first_name,
  last_name,
  phones,
}) => {
  const Container = styled.div`
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
    </Container>
  );
};

export default ContactCard;
