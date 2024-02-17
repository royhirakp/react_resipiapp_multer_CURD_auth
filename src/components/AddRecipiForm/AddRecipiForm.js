import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddRecipiForm.css";
import Loader from "../Card/Loder";
const AddRecipiForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [directions, setDirections] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [loader, setLoder] = useState(false);
  const navgate = useNavigate();

  async function handeSubmita(e) {
    e.preventDefault();
    setLoder(true);
    // console.log(imageFile.name,'<======imagefile.name')
    // console.log(imageFile,'<======imagefile')
    // console.log(title,'<======title')
    // console.log(describtion,'<======describtion')

    const formData = new FormData();
    formData.append("image", imageFile, imageFile.name);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("ingredients", ingredients);
    formData.append("directions", directions);
    console.log(formData);

    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("logToken"),
        },
      };
      const res = await axios.post(
        "https://api-recipe-dpfc.onrender.com/api/v1/reci",
        formData,
        config
      );
      console.log(res, "<=image post axios");
    } catch (error) {
      console.log(error);
    }
    setLoder(false);
    navgate("/home");
  }

  return (
    <div className="fromContainer">
      <h1>Create recipi</h1>
      <form onSubmit={handeSubmita}>
        title:
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <br />
        author:
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />{" "}
        <br />
        image:
        <input
          type="file"
          name="image"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <br />
        ingredients:
        <input
          type="text"
          name="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />{" "}
        <br />
        directions:
        <input
          type="text"
          name="directions"
          value={directions}
          onChange={(e) => setDirections(e.target.value)}
        />
        <br />
        <button type="submit">SAVE POST</button>
        <p>
          *NB- give ingredients coma(",") separate, its data type Array. split
          `(",")`
        </p>
        {loader ? <Loader /> : <></>}
      </form>
    </div>
  );
};

export default AddRecipiForm;
