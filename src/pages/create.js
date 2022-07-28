import { useState } from "react";
import { useAppContext } from "../store/store";

import { Link } from 'react-router-dom';

export default function Create() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [intro, setIntro] = useState("");
  const [completed, setCompleted] = useState(false);
  const [review, setReview] = useState("");

  const store = useAppContext();

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
  }

  return (
    <div>
      <Link to='/'>Home</Link>
      <form onSubmit={handleSubmit}>
        <div>
          {/* TITLE */}
          <div>Title</div>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={title}
          />
        </div>
        <div>
          {/* AUTHOR */}
          <div>Author</div>
          <input
            type="text"
            name="author"
            onChange={handleChange}
            value={author}
          />
        </div>

        <div>
          {/* COVER */}
          <div>Cover</div>
          <input type="file" name="cover" onChange={handleChangeFile} />
          <div>{!! cover ? <img src={cover} width='200px' alt={title} /> : ''}</div>
        </div>

        <div>
          {/* AUTHOR */}
          <div>Introduction</div>
          <input
            type="text"
            name="intro"
            onChange={handleChange}
            value={intro}
          />
        </div>

        <div>
          {/* COMPLETED */}
          <div>Completed</div>
          <input
            type="checkbox"
            name="completed"
            onChange={handleChange}
            value={completed}
          />
        </div>

        <div>
          {/* REVIEW */}
          <div>Review</div>
          <input
            type="text"
            name="review"
            onChange={handleChange}
            value={review}
          />
        </div>

        <input type="submit" value="Register manga" />
      </form>
    </div>
  );
}
