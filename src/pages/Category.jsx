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
import { useParams } from "react-router";
import styled from "styled-components";
import SingleListing from "../components/SingleListing";

const Container = styled.div``;
const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
`;
const NoListingsMessage = styled.p``;
const ListingsContainer = styled.div``;
const Listings = styled.ul`
  padding: 0;
`;

const Category = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const listingsQuery = query(
          listingsRef,
          where("type", "==", params.categoryName),
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
  }, [params.categoryName]);

  return (
    <Container>
      <Title>
        {params.categoryName === "rent" ? "Cabins for rent" : "Cabins for sale"}
      </Title>
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
          no listings for {params.categoryName}
        </NoListingsMessage>
      )}
    </Container>
  );
};

export default Category;
