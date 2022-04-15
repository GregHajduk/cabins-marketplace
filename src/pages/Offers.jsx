import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SingleListing from "../components/SingleListing";
import HeaderTitle from "../components/HeaderTitle";

const Container = styled.div``;
const NoListingsMessage = styled.p``;
const ListingsContainer = styled.div``;
const Listings = styled.ul`
  padding: 0;
`;

const Offers = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const listingsQuery = query(
          listingsRef,
          where("offer", "==", true),
          // orderBy("timestamp", "desc"),
          limit(10)
        );
        const querySnap = await getDocs(listingsQuery);
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("couldn't find any listings");
      }
    };
    fetchListings();
  },[]);

  return (
    <Container>
      <HeaderTitle title="offers"/>
      {loading ? (
        <Loading />
      ) : listings && listings.length > 0 ? (
        <ListingsContainer>
          <Listings>
            {listings.map((listing) => {
              return (
                <SingleListing
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              );
            })}
          </Listings>
        </ListingsContainer>
      ) : (
        <NoListingsMessage>
          there are no offers at the moment
        </NoListingsMessage>
      )}
    </Container>
  );
};

export default Offers;
