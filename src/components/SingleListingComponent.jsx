import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ListingContainer = styled.div``;
const ListingLink = styled(Link)``;
const ListingImg = styled.img`
  width: 100%;
  height: 15rem;
  object-fit: cover;
  margin-bottom: 1rem;
`;
const ListingDetails = styled.div``;
const ListingLocation = styled.p`
  font-weight: 600;
  font-size: 0.75rem;
  opacity: 0.8;
  margin-bottom: 0.25rem;
`;
const ListingName = styled.p`
  font-weight: 800;
  font-size: 1.35rem;
  margin: 0;
  color: var(--main-accent-color);
`;
const ListingPrice = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
`;
const ListingFeatures = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
`;
const FeatureImg = styled.img``; 
const FeatureText = styled.p`
  font-weight: 500;
  font-size: 0.75rem;
`;
const DeleteButton = styled.button``;

const SingleListingComponent = ({ listing, id, onDelete }) => {
  return (
    <ListingContainer>
      <ListingLink to={`/category/${listing.type}/${id}`}>
        <ListingImg src={listing.imageUrls[0]} alt={listing.name} />
        <ListingDetails>
          <ListingLocation>{listing.address}</ListingLocation>
          <ListingName>{listing.name}</ListingName>
          <ListingPrice>
            £{listing.offer ? listing.discountedPrice : listing.regularPrice}
            {listing.type === "rent" && " / Month"}
          </ListingPrice>
          <ListingFeatures>
            <FeatureImg src={bedIcon} alt="bed" />
            <FeatureText>bedrooms : {listing.bedrooms}</FeatureText>
            <FeatureImg src={bathtubIcon} alt="bed" />
            <FeatureText>bathrooms : {listing.bathrooms}</FeatureText>
          </ListingFeatures>
        </ListingDetails>
      </ListingLink>
      {onDelete && (
        <DeleteButton onClick={() => onDelete(listing.id, listing.name)}>
          remove listing
        </DeleteButton>
      )}
    </ListingContainer>
  );
};

export default SingleListingComponent;
