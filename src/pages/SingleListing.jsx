import { getAuth } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../firebase.config";
import Loading from "../components/Loading";
import styled from "styled-components";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
SwiperCore.use([Pagination, Navigation]);

const ListingInfo = styled.div`
  height: 100%;
`;
const ListingName = styled.h4`
  margin-top: 1rem;
  font-size: 2rem;
  color: var(--main-accent-color);
`;
const ListingPrice = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;
const Discount = styled.p`
  margin-bottom: 0.5rem;
`;
const ListingLocation = styled.p`
  margin-bottom: 1rem;
`;
const ListingType = styled.p`
  background-color: var(--main-dark-color);
  color: var(--main-light-color);
  display: inline-block;
  padding: 0.25rem 0.75rem;
  margin-bottom: 0.75rem;
`;
const ListingFeaturesContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
`;
const ListingFeature = styled.p`
  color: var(--main-light-color);
  background-color: var(--main-accent-color);
  padding: 0.5rem 1rem;
  white-space: nowrap;
`;
const ContactOwner = styled.p``;
const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const SingleListing = () => {
  const [listing, setListing] = useState({});
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Loading />;
  }
  return (
    <ListingInfo>
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing.imageUrls.map((url, index) => {
          return (
            <SwiperSlide key={index}>
              <ImgContainer
                style={{ backgroundImage: `url(${url})` }}
              ></ImgContainer>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <ListingName>{listing.name}</ListingName>
      <ListingLocation>{listing.address}</ListingLocation>
      <ListingPrice>
        £{listing.offer ? listing.discountedPrice : listing.regularPrice} {listing.type === "rent" && "/ month"}
      </ListingPrice>
      {listing.offer && (
        <Discount>
          {listing.regularPrice - listing.discountedPrice} off regular price
        </Discount>
      )}
      <ListingType>{listing.type === "rent" ? "for rent" : "for sale"}</ListingType>
      <ListingFeaturesContainer>
        <ListingFeature>bedrooms : {listing.bedrooms} </ListingFeature>
        <ListingFeature>bathrooms : {listing.bathrooms} </ListingFeature>
        {listing.parking && <ListingFeature>parking</ListingFeature>}
        {listing.furnished && <ListingFeature>furnished</ListingFeature>}
        {listing.wifi && <ListingFeature>wifi</ListingFeature>}
      </ListingFeaturesContainer>
      <ContactOwner>{}</ContactOwner>
    </ListingInfo>
  );
};

export default SingleListing;
