import { useState } from "react";
import { useAppContext } from "../store/store";

import Layout from "../components/layout";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [intro, setIntro] = useState("");
  const [completed, setCompleted] = useState(false);
  const [review, setReview] = useState("");

  const store = useAppContext();
  const navigate = useNavigate();

  const inputStyles = {
    formContainer: {
      width: "400px",
      margin: "0 auto",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      margin: "15px 0",
    },
    title: {
      fontSize: "16px",
      textAlign: "left",
      color: "white",
    },
    input: {
      padding: "10px",
      borderRadius: "5px",
      fontSize: "16px",
    },
  };

  const butonStyle = {
    padding: "15px 20px",
    minWidth: "200px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#1e9638",
    color: "white",
    fontWeigth: "bolder",
    fontSize: "18px",
    cursor: "pointer",
  };

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "intro":
        setIntro(value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "review":
        setReview(value);
        break;

      default:
    }
  }

  function handleChangeFile(e) {
    const element = e.target;
    const file = element.files[0];
    const reader =
      new FileReader(); /* esta es una api que permite manipular archivos desde el navegador */

    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setCover(reader.result.toString());
    };
    /* este evento se va a ejecutar una vez que nosotros podamos leer el archivo que tenemos en >file<, entonces cuando la carga del archivo termine se va a actualizar el estado de >setCover< */
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newManga = {
      id: crypto.randomUUID(),
      title,
      author,
      cover,
      intro,
      completed,
      review,
    };

    //TODO: mandar a registrat el manga
    store.createItem(newManga);
    navigate(`/view/${newManga.id}`);
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit} style={inputStyles.formContainer}>
        {/* TITLE */}
        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Title</div>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={title}
            style={inputStyles.input}
          />
        </div>
        {/* AUTHOR */}
        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Author</div>
          <input
            type="text"
            name="author"
            onChange={handleChange}
            value={author}
            style={inputStyles.input}
          />
        </div>

        {/* COVER */}
        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Cover</div>
          <input type="file" name="cover" onChange={handleChangeFile} />
          <div>
            {!!cover ? <img src={cover} width="200px" alt={title} /> : ""}
          </div>
        </div>

        {/* AUTHOR */}
        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Introduction</div>
          <input
            type="text"
            name="intro"
            onChange={handleChange}
            value={intro}
            style={inputStyles.input}
          />
        </div>

        {/* COMPLETED */}
        <div>
          <div style={inputStyles.title}>Completed</div>
          <input
            type="checkbox"
            name="completed"
            onChange={handleChange}
            value={completed}
          />
        </div>

        {/* REVIEW */}
        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Review</div>
          <input
            type="text"
            name="review"
            onChange={handleChange}
            value={review}
            style={inputStyles.input}
          />
        </div>

        <input type="submit" value="Register manga" style={butonStyle} />
      </form>
    </Layout>
  );
}
