import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_CONTACT_LIST } from "../graphql/queries/list/getContactList";
import ContactCard from "../components/ContactCard";
import { ContactList } from "../interfaces/ContactList";
// ... (your imports)

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [getContactList, { loading, data, error, fetchMore }] = useLazyQuery(
    GET_CONTACT_LIST,
    {
      variables: {
        limit: 10,
        offset: (currentPage - 1) * 10,
      },
    }
  );

  useEffect(() => {
    getContactList();
  }, [currentPage]); // Trigger a new request whenever the page changes

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

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error loading contacts</h1>;

  const hasMoreData = data?.contact.length == 10;

  return (
    <div>
      {data?.contact.map((el: ContactList, idx: number) => (
        <React.Fragment key={idx}>
          <ContactCard
            first_name={el.first_name}
            last_name={el.last_name}
            phones={el.phones}
          />
        </React.Fragment>
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
}

export default Home;
