import React, { useEffect, useState } from "react";
import Header from "../Card/Header";
import axios from "axios";
import Loader from "../Card/Loder";
import "./ResipDetailsPage.css";
const ResipDetailsPage = () => {
  const [data, setdta] = useState({});
  const [buttnStatus, setBstatus] = useState(false);
  const [loader, setLoader] = useState(false);
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
          `https://api-recipe-dpfc.onrender.com/api/v1/reci/${localStorage.getItem(
            "recipiID"
          )}`,
          config
        );
        setdta(res.data.recipi[0]);
        console.log(res.data.recipi[0]);
      } catch (error) {
        console.log(error);
      }
      setLoader(false);
    }
    datafunction();
  }, []);

  const base64Str = btoa(
    String.fromCharCode(...new Uint8Array(data.image?.data.data))
  );

  return (
    <div>
      <Header />
      <h1>{data.title}</h1>
      <div className="datacontainer">
        <div className="unitImgecontainer">
          {/* hhh */}
          <img src={`data:image/png;base64,${base64Str}`} alt="" />
        </div>

        <div className="data">
          <button onClick={() => setBstatus(false)}>Instuutions</button>
          <button onClick={() => setBstatus(true)}>Ingridends</button>

          <div className="displaay">
            {!buttnStatus ? (
              <div className="Instuutionsdisplay">
                <h1>Instructions</h1>
                <p>{data?.directions}</p>
              </div>
            ) : (
              <div className="Ingridendsdisplay">
                <h1>Ingridends</h1>
                {data?.ingredients.map((item, i) => {
                  return (
                    <div key={i * 55}>
                      <li>{item}</li>
                    </div>
                  );
                })}
              </div>
            )}
            {/* <p>{data?.directions}</p>
                     {console.log(data.ingredients)}
                     {buttnStatus?<h1>Instructions</h1>:<h1>Ingridends</h1>} */}
          </div>
        </div>
      </div>
      {loader ? <Loader /> : <></>}
    </div>
  );
};

export default ResipDetailsPage;
