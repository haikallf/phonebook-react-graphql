import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CONTACT_LIST } from "../graphql/queries/list/getContactList";
import ContactCard from "../components/ContactCard";
import { ContactList } from "../interfaces/ContactList";
import { DELETE_CONTACT } from "../graphql/queries/delete/deleteContact";

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
    if (loading || !data) return <h1>Loading...</h1>;
    if (error) return <h1>Error loading contacts</h1>;

    if (deleteLoading) return <h1>Loading...</h1>;
    if (deleteError) return <h1>Error loading contacts</h1>;

    const filteredData = data.contact.filter(
      (el: ContactList) => !ids.includes(el.id)
    );
    const hasMoreData = filteredData?.length === 10;
    return (
      <div>
        {filteredData.map((el: ContactList, idx: number) => (
          <ContactCard
            key={idx}
            id={el.id}
            first_name={el.first_name}
            last_name={el.last_name}
            phones={el.phones}
            isFavorite={false}
            onDelete={() => deleteContactById(el.id)}
            favoriteAction={() => addToFavorite(el.id)}
          />
        ))}
        <div>
          <button onClick={handleLoadLess} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button onClick={handleLoadMore} disabled={!hasMoreData}>
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <input
        type="text"
        name=""
        id=""
        value={search}
        onChange={(e) => {
          debounced(e.target.value);
          setSearch(e.target.value);
        }}
      />
      {showData()}
    </div>
  );
}

export default Home;
