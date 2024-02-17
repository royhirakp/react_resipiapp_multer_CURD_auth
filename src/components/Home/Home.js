import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Card/Header";
import RecipiCard from "../Card/RecipiCard";
import "./Home.css";
import Loader from "../Card/Loder";
import { useNavigate } from "react-router-dom";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
const Home = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const navgate = useNavigate();
  let [loder, setLoader] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("logToken")) {
      navgate("/");
    }
  }, [navgate]);

  function search() {
    let result = [];
    // console.log(searchData)
    // console.log(data)

    for (let i = 0; i < data.length; i++) {
      if (data[i].title.includes(searchData)) {
        result.push(data[i]);
      }
    }
    // console.log(result,"<<<result");
    setData(result);
  }

  useEffect(() => {
    async function datafunction() {
      setLoader(true);
      try {
        const config = {
          headers: {
            authorization: localStorage.getItem("logToken"),
          },
        };
        const res = await axios.get(
          "https://prt-25feb-nodejs.onrender.com/reci",
          config
        );
        setData(res.data.recipi);
        console.log(res.data.recipi);
      } catch (error) {
        console.log(error);
      }
      setLoader(false);
    }
    datafunction();
  }, []);

  return (
    <div>
      <Header />

      <div className="searchContainer">
        <div>
          <input
            type="text"
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="search here..."
          />
          <button onClick={search} className="searchbutton">
            search
          </button>
        </div>
      </div>
      <br />
      <div className="addRecipiContainer">
        <button onClick={() => navgate("../create")}>
          <LocalPizzaIcon />
          add
        </button>
      </div>
      <h1>Allrecipites</h1>
      <div className="allrecipies">
        {data.map((item, i) => {
          return (
            <div key={i * 0.0022}>
              <RecipiCard data={item} />
            </div>
          );
        })}
      </div>
      {loder ? <Loader /> : <></>}
    </div>
  );
};

export default Home;
