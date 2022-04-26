import { getAuth } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../firebase.config";
import Loading from "../components/Loading";
import styled from "styled-components";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
SwiperCore.use([Pagination]);

const ListingInfo = styled.div`
  height: 100%;
`;
const ListingName = styled.h4``;
const ListingPrice = styled.p``;
const Discount = styled.p``;
const ListingLocation = styled.p``;
const ListingType = styled.p``;
const ListingRooms = styled.p``;
const ListingFeature = styled.p``;
const ContactLandlord = styled.p``;
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
  console.log(params);
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
  console.log(listing.userRef);
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
      <ListingLocation>{listing.location}</ListingLocation>
      <ListingPrice>
        {listing.offer ? listing.discountedPrice : listing.regularPrice}
      </ListingPrice>
      {listing.offer && (
        <Discount>
          {listing.regularPrice - listing.discountedPrice} off regular price
        </Discount>
      )}
      <ListingType>{listing.type === "rent" ? "rent" : "sale"}</ListingType>
      <ListingRooms>bedrooms : {listing.bedrooms} </ListingRooms>
      <ListingRooms>bathrooms : {listing.bathrooms} </ListingRooms>
      <ListingFeature>{listing.parking && "parking"}</ListingFeature>
      <ListingFeature>{listing.furnished && "furnished"}</ListingFeature>
      <ListingFeature>{listing.wifi && "wifi"}</ListingFeature>
      <ContactLandlord>{}</ContactLandlord>
    </ListingInfo>
  );
};

export default SingleListing;
