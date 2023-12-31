import React from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";

const NavbarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #000000;
  display: flex;
  font-size: 20px;
  color: white;
`;

const DIV = styled.div`
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const A = styled.a`
  text-decoration: none;
  color: white;
`;

const NavItem = styled.p`
  margin: 0 10px;
`;

const Navbar = () => {
  const history = useHistory();

  return (
    <NavbarContainer>
      <DIV>
        <A href="">
          <NavItem
            onClick={() => history.push("/")}
            style={{
              marginRight: "10px",
            }}
          >
            Contacts
          </NavItem>
        </A>
        <p>|</p>
        <A href="">
          <NavItem
            style={{
              marginLeft: "10px",
              marginRight: "10px",
            }}
            onClick={() => history.push("/favorite")}
          >
            Favorite
          </NavItem>
        </A>
        <p>|</p>
        <A href="">
          <NavItem
            style={{
              marginLeft: "10px",
            }}
            onClick={() => history.push("/contact")}
          >
            Add New
          </NavItem>
        </A>
      </DIV>
    </NavbarContainer>
  );
};

export default Navbar;
