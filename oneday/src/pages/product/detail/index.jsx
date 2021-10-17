import React, { useCallback, useEffect, useState } from "react";
import { Container, List, Item, Map } from "./styles";

const { kakao } = window;
const Detail = (props) => {
  useEffect(() => {}, []);

  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    let map = new kakao.maps.Map(container, options);
    let geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(props.address.split("&")[1], (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        let marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });
        let infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${props.productName}</div>`,
        });
        infowindow.open(map, marker);
        map.setCenter(coords);
      }
    });
  }, []);

  const detailList = JSON.parse(props.detailArray).map((v, i) => {
    return (
      <Item key={i}>
        <div>{v.title}</div>
        <pre>{v.text}</pre>
      </Item>
    );
  });

  return (
    <Container>
      <List>{detailList}</List>
      <Map>
        <div className="header">찾아오시는 길</div>
        <div id="map"></div>
        <div className="header">
          {props.address.split("&")[1] + " " + props.address.split("&")[2]}
        </div>
      </Map>
    </Container>
  );
};

export default Detail;
