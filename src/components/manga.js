import { Link } from "react-router-dom";

export default function Manga({ item }) {
  const mangaContainerStyle = {
    display: "flex",
    flexDirection: "column",
    width: "300px",
  };

  const mangaInfoStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    textDecoration: "none"
  };

  return (
    <div style={mangaContainerStyle}>
      <Link to={`/view/${item.id}`} style={mangaInfoStyle}>
        <img src={item.cover} width="200" alt={item.title} />
        <div>{item.title}</div>
      </Link>
    </div>
  );
}
