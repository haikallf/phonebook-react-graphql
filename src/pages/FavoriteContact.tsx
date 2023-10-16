import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CONTACT_LIST } from "../graphql/queries/list/getContactList";
import ContactCard from "../components/ContactCard";
import { ContactList } from "../interfaces/ContactList";
import { DELETE_CONTACT } from "../graphql/queries/delete/deleteContact";
import styled from "@emotion/styled";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
`;

const ContactListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 16px;
  gap: 12px;

  @media only screen and (min-width: 767px) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media only screen and (min-width: 481px) and (max-width: 767px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const PaginationController = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  width: 120px;
`;

const PaginationButton = styled.button`
  height: 24px;
  width: 24px;
  background: white;
  color: black;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function FavoriteContact() {
  const [currentPage, setCurrentPage] = useState(1);
  const [ids, setIds] = useState<number[]>([]);
  const [getContactList, { loading, data, error }] = useLazyQuery(
    GET_CONTACT_LIST,
    {
      variables: {
        limit: 10,
        offset: (currentPage - 1) * 10,
      },
    }
  );

  const [deleteContact, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_CONTACT, {
      refetchQueries: [
        {
          query: GET_CONTACT_LIST,
          variables: {
            limit: 10,
            offset: (currentPage - 1) * 10,
          },
        },
      ],
      awaitRefetchQueries: true,
    });

  const deleteContactById = (id: number) => {
    deleteContact({
      variables: {
        id,
      },
    });
  };

  const removeFromFavorite = (id: number) => {
    setIds((prev) => {
      var filteredArray = ids.filter(function (e) {
        return e !== id;
      });
      localStorage.setItem("favoriteId", JSON.stringify(filteredArray));
      return filteredArray;
    });
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const item = localStorage.getItem("favoriteId");
    if (item) setIds(JSON.parse(item));

    getContactList();
  }, [currentPage, getContactList, deleteContact]);

  const handleLoadPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleLoadMore = () => {
    handleLoadPage(currentPage + 1);
  };

  const handleLoadLess = () => {
    if (currentPage > 1) {
      handleLoadPage(currentPage - 1);
    }
  };

  if (loading || !data) return <h1>Loading...</h1>;
  if (error) return <h1>Error loading contacts</h1>;

  if (deleteLoading) return <h1>Loading...</h1>;
  if (deleteError) return <h1>Error loading contacts</h1>;

  console.log(data);
  const filteredData = data.contact.filter((el: ContactList) =>
    ids.includes(el.id)
  );
  const hasMoreData = filteredData?.length === 10;

  return (
    <Container>
      <ContactListContainer>
        {filteredData.map((el: ContactList, idx: number) => (
          <ContactCard
            key={idx}
            contact={el}
            isFavorite={false}
            onDelete={() => deleteContactById(el.id)}
            favoriteAction={() => removeFromFavorite(el.id)}
          />
        ))}
      </ContactListContainer>
      <PaginationController>
        <PaginationButton onClick={handleLoadLess} disabled={currentPage === 1}>
          <BsChevronLeft />
        </PaginationButton>
        <span>{currentPage}</span>
        <PaginationButton onClick={handleLoadMore} disabled={!hasMoreData}>
          <BsChevronRight />
        </PaginationButton>
      </PaginationController>
    </Container>
  );
}

export default FavoriteContact;
