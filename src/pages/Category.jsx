import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import SingleListingComponent from "../components/SingleListingComponent";
import HeaderTitle from "../components/HeaderTitle";

const Container = styled.div``;
const NoListingsMessage = styled.p``;
const ListingsContainer = styled.div``;
const Listings = styled.ul`
  display: grid;
  gap: 3rem;
  padding: 0;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
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
      <HeaderTitle
        title={
          params.categoryName === "rent" ? "Cabins for rent" : "Cabins for sale"
        }
      />
      {loading ? (
        <Loading />
      ) : listings && listings.length > 0 ? (
        <ListingsContainer>
          <Listings>
            {listings.map((listing) => {
              return (
                <SingleListingComponent
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
