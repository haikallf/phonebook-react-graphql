import React from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";

const NavbarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #000000;
  display: flex;
  font-family: "Courier New", Courier, monospace;
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

const Navbar = () => {
  const history = useHistory();

  return (
    <NavbarContainer>
      <DIV>
        <A href="">
          <p
            onClick={() => history.push("/")}
            style={{
              marginRight: "10px",
            }}
          >
            Contacts
          </p>
        </A>
        <p>|</p>
        <A href="">
          <p
            style={{
              marginLeft: "10px",
            }}
            onClick={() => history.push("/favorite")}
          >
            Favorite
          </p>
        </A>
        <p>|</p>
        <A href="">
          <p
            style={{
              marginLeft: "10px",
            }}
            onClick={() => history.push("/contact")}
          >
            Add New
          </p>
        </A>
      </DIV>
    </NavbarContainer>
  );
};

export default Navbar;