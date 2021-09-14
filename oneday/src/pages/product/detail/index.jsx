import React, { useCallback, useEffect, useState } from "react";
import { Container } from "./styles";

import axios from "axios";

const { kakao } = window;
const Detail = (props) => {
  useEffect(() => {
    console.log(JSON.parse(props.detailArray));
    console.log(props);
  }, []);

  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    let map = new kakao.maps.Map(container, options);
    let geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(props.address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        let marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });
        let infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${props.className}</div>`,
        });
        infowindow.open(map, marker);
        map.setCenter(coords);
      }
    });
  }, []);

  const detailList = JSON.parse(props.detailArray).map((v) => {
    return (
      <div>
        <div className="title">{v.title}</div>
        <div className="text">
          <pre>{v.text}</pre>
        </div>
      </div>
    );
  });

  return (
    <Container>
      <div id="map"></div>
      <div>sad</div>
      {detailList}
    </Container>
  );
};

export default Detail;
