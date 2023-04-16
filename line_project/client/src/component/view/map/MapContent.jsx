import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import mapData from "../../../data/mapData.json";
import StationListBar from './StationListBar';


const { kakao } = window;
const { navigator } = window;

const Map = styled.div`
width: 100%;
height: 100%;
`;

const Content = styled.div`
width: 100%;
height: 100%;
position: relative;
`;

let markers = [];


export default function MapContent({ id }) {
  const [click, setClick] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const map = createMap(latitude, longitude);
          const places = createPlaces(map, "지하철역");
        }, (err) => {
          console.log(err);
        });
    } else {
      console.log("위치 정보를 가져올 수 없습니다.");
    };

    const createMap = (latitude, longitude) => {
      const mapContainer = document.querySelector("#map");
      const mapOption = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 3
      };

      const map = new kakao.maps.Map(mapContainer, mapOption);

      return map;
    };

    const createMarker = (map, lat, lon, text) => {
      mapData.forEach(item => {
        if(text.substr(0, text.indexOf("역")) !== item.역명) return;

        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(lat, lon),
          title: text
        });
        marker.setMap(map);

        kakao.maps.event.addListener(marker, "click", () => {
          const arr = [];
          mapData.forEach(item => {
            if(text.substr(0, text.indexOf("역")) === item.역명) {
              arr.push(item);
              setData(arr);
              setClick(true);
            }
          });
        });
        return { marker, text };
      });
    };

    const markerListener = {
      over: (map, marker, infowindow) => {
        return () => {
          infowindow.open(map, marker);
        };
      },
      out: (infowindow) => {
        return () => {
          infowindow.close();
        };
      }
    };

    const createInfoWindow = (map, marker, text) => {
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      infowindow.setContent(`<div style="padding:5px;font-size:12px;">${text}</div>`);
      kakao.maps.event.addListener(marker, 'mouseover', markerListener.over(map, marker, infowindow));
      kakao.maps.event.addListener(marker, 'mouseout', markerListener.out(infowindow));
    };

    const createPlaces = (map, keyword) => {
      const places = new kakao.maps.services.Places();

      places.keywordSearch(keyword, (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();

          for (var i = 0; i < data.length; i++) {
            const marker = createMarker(map, data[i].y, data[i].x, data[i].place_name);
            // const infowindow = createInfoWindow(map, marker.marker, marker.text);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        };
      });

      return places;
    };
  }, []);

  return (
    <>
      <Content>
        <Map id="map" className="map"></Map>
        {click ? <StationListBar data={data} setData={setData} setBtnClick={setClick} /> : null}
      </Content>
    </>
  );
};