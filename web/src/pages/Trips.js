import React, { useEffect, useState } from "react";
import "../App.css";
import { Row, Col } from "antd";
import * as api from "../api/index";
import { useHistory } from "react-router-dom";

function CradTrips() {
  const [APIData, setAPIData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [dataTrips, setDataTrips] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: trips } = await api.getTrips();
        setAPIData(trips);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (searchInput.length === 0) {
      setDataTrips(APIData);
    }
  });

  useEffect(() => {
    setSearchInput(searchInput);
    const searchTrips = async () => {
      if (searchInput.length === 0) {
        setDataTrips(APIData);
        history.push("/");
      } else {
        const { data: filteredData } = await api.getSearchTrips(searchInput);
        setDataTrips(filteredData);
        history.push(`/trips?keyword=${searchInput}`);
      }
    };
    searchTrips();
  }, [searchInput]);

  return (
    <div className="App">
      <Row align="center">
        <Col xs={24} lg={8} align="center">
          <p className="App-title">เที่ยวไหนดี</p>
          <input
            name="search"
            type="text"
            value={searchInput}
            placeholder="หาที่เที่ยวแล้วไปกัน..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {dataTrips.length !== 0 ? (
            <>
              {dataTrips.map((dt) => {
                return (
                  <Row align="start" key={dt.eid} className="card">
                    <Col span={8}>
                      <img
                        src={dt.photos[0]}
                        className="card-image-main"
                        alt="image1"
                      />
                    </Col>
                    <Col offset={1} span={15} align="start">
                      <a href={dt.url} target="blank">
                        <p className="card-title">{dt.title}</p>
                      </a>
                      <p className="card-description">
                        {dt.description.split("\n")[0]}
                      </p>
                      <div className="flex-container">
                        <p id="content" className="card-content">
                          {dt.description.split("\n")[2]}
                          {dt.description.split("\n")[0]}
                        </p>
                        <a href={dt.url} target="blank">
                          <span className="card-read-more">อ่านต่อ</span>
                        </a>
                      </div>
                      <p>
                        หมวด :
                        {dt.tags.map((tag, index) => (
                          <span
                            className="card-tag"
                            key={index}
                            onClick={() => setSearchInput(tag)}
                          >
                            {tag}
                          </span>
                        ))}
                      </p>
                      <div className="flex-container">
                        <img
                          src={dt.photos[1]}
                          id="img"
                          className="card-image-sub"
                          alt="image2"
                        />
                        <img
                          src={dt.photos[2]}
                          id="img"
                          className="card-image-sub"
                          alt="image3"
                        />
                        <img
                          src={dt.photos[3]}
                          id="img"
                          className="card-image-sub"
                          alt="image4"
                        />
                      </div>
                    </Col>
                  </Row>
                );
              })}
            </>
          ) : (
            <h3 style={{ margin: "16px 0" }}>ไม่มีข้อมูลที่ต้องการ</h3>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default CradTrips;
