import React from "react";
import Loader from "../../Components/Loader";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import device from "../../Components/Device";

const Container = styled.div`
  position: relative;
  height: calc(100vh - 50px);
  width: 100vw;
  padding: 50px;

  @media ${device.tabPort} {
    padding: 2rem;
  }
  @media ${device.phone} {
    padding: 2rem 1rem;
  }
`;
const BackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgUrl});
  background-size: cover;
  background-position: center center;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;
const Content = styled.div`
  overflow: hidden;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`;
const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${props => props.bgUrl});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;

  @media ${device.phone} {
    width: 40%;
  }
`;

const Data = styled.div`
  ::-webkit-scrollbar {
    width: 20px; /* remove scrollbar space */
    background: rgba(
      0,
      0,
      0,
      0.2
    ); /* optional: just make scrollbar invisible */
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(204, 204, 214, 0.4);
  }
  overflow-y: scroll;
  width: 70%;
  height: 100%;
  padding-left: 2rem;

  @media ${device.tabPort} {
    text-align: center;
  }
  @media ${device.phone} {
    width: 60%;
    ::-webkit-scrollbar {
      width: 5px;
    }
  }
`;

const Title = styled.h3`
  font-size: 3.2rem;
  margin-bottom: 20px;
`;
const OverView = styled.p`
  font-size: 1.3rem;
  line-height: 1.5;
  width: 70%;
  opacity: 0.7;
  margin-bottom: 40px;

  @media ${device.tabLand} {
    font-size: 1.3rem;
    width: 90%;
    margin-bottom: 2rem;
  }
  @media ${device.phone} {
    font-size: 1.2rem;
    line-height: 1.2;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;
const SubContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 30%;
  margin-bottom: 20px;
  /* because scrollbar cut marginbottom */
  /* &:last-child {
    margin-bottom: 220px;
  } */

  @media ${device.tabPort} {
    flex-direction: column;
    min-height: 30rem;
  }
`;
const SLink = styled(Link)`
  display: block;
  height: 100%;
  width: 30%;

  @media ${device.tabPort} {
    width: 50%;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
`;
const SubPoster = styled.div`
  background-image: url(${props => props.bgUrl});
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
  height: 100%;
`;

const SubInfo = styled.div`
  width: 70%;
  padding-left: 10px;

  @media ${device.tabPort} {
    width: 90%;
  }
`;
const Subtitle = styled.span`
  font-size: 15px;
  font-weight: 300;
`;
const SubOverView = styled.p`
  margin-top: 10px;
  font-size: 1.2rem;
  line-height: 1.5;
  opacity: 0.7;
`;
const Year = styled.span`
  font-size: 12px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;
const CollectionPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <>
      {" "}
      <Helmet>
        <title>Collection | Nomflix</title>
      </Helmet>
      <Container>
        <BackDrop
          bgUrl={
            result.backdrop_path
              ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
              : require("../../assets/default_backdrop.jpg")
          }
        />
        <Content>
          <Cover
            bgUrl={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/default_cover.jpg")
            }
          />
          <Data>
            <Title>{result.name}</Title>
            <OverView>{result.overview}</OverView>{" "}
            <ItemContainer>
              {result.parts &&
                result.parts.length > 0 &&
                result.parts.map((part, index) => (
                  <SubContainer>
                    <SLink to={`/movie/${part.id}`}>
                      <SubPoster
                        bgUrl={
                          part.poster_path
                            ? `https://image.tmdb.org/t/p/w300${
                                part.poster_path
                              }`
                            : require("../../assets/default_cover.jpg")
                        }
                      />
                    </SLink>
                    <SubInfo>
                      <Subtitle>{part.title}</Subtitle>
                      <Divider>•</Divider>
                      <Year>{part.release_date.substr(0, 4)}</Year>
                      <SubOverView>
                        {part.overview.length > 250
                          ? `${part.overview.substr(0, 250)}...`
                          : part.overview}
                      </SubOverView>
                    </SubInfo>
                  </SubContainer>
                ))}
            </ItemContainer>
          </Data>
        </Content>
      </Container>
    </>
  );
export default CollectionPresenter;
