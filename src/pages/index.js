import { useAppContext } from "../store/store";

import Layout from "../components/layout";
import Manga from "../components/manga";

export default function Index() {
  const store = useAppContext();

  const mangasContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  };

  return (
    <Layout>
      <div style={mangasContainer}>
        {store.items.map((item) => (
          <Manga key={item.id} item={item} />
        ))}
      </div>
    </Layout>
  );
}
