import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CONTACT_LIST } from "../graphql/queries/list/getContactList";
import ContactCard from "../components/ContactCard";
import { ContactList } from "../interfaces/ContactList";
import { DELETE_CONTACT } from "../graphql/queries/delete/deleteContact";
import styled from "@emotion/styled";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Spinner from "../components/Spinner";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
`;

const SearchField = styled.input`
  width: 90vw;
  margin: 0 auto;
  display: table;
  border: 1px solid black;
  border-radius: 12px;
  padding: 16px;
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

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setSearchValue(() => {
        getContactList({
          variables: {
            where: {
              first_name: {
                _like: `%${value}%`,
              },
            },
          },
        });
        return value;
      });
    },
    // delay in ms
    300
  );
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

  const addToFavorite = (id: number) => {
    setIds((prev) => {
      localStorage.setItem("favoriteId", JSON.stringify([...prev, id]));
      return [...prev, id];
    });
  };

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

  const showData = () => {
    if (loading || !data) return <Spinner text="Loading..." />;
    if (error) return <h1>Error loading contacts</h1>;

    if (deleteLoading) return <h1>Loading...</h1>;
    if (deleteError) return <h1>Error loading contacts</h1>;

    const filteredData = data.contact.filter(
      (el: ContactList) => !ids.includes(el.id)
    );
    const hasMoreData = filteredData?.length === 10;
    return (
      <React.Fragment>
        <ContactListContainer>
          {filteredData.map((el: ContactList, idx: number) => (
            <ContactCard
              key={idx}
              contact={el}
              isFavorite={false}
              onDelete={() => deleteContactById(el.id)}
              favoriteAction={() => addToFavorite(el.id)}
            />
          ))}
        </ContactListContainer>
        <PaginationController>
          <PaginationButton
            onClick={handleLoadLess}
            disabled={currentPage === 1}
          >
            <BsChevronLeft />
          </PaginationButton>
          <span>{currentPage}</span>
          <PaginationButton onClick={handleLoadMore} disabled={!hasMoreData}>
            <BsChevronRight />
          </PaginationButton>
        </PaginationController>
      </React.Fragment>
    );
  };

  return (
    <Container>
      <SearchField
        type="text"
        name="search"
        placeholder="Search contacts..."
        value={search}
        onChange={(e) => {
          debounced(e.target.value);
          setSearch(e.target.value);
        }}
      />
      {showData()}
    </Container>
  );
}

export default Home;
