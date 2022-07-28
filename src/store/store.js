//Store es típicamente la convención de nombres que le vas a asignar a un archivo al cual te permita manejar el estado de tu app. Se le puede poner el nombre que quieras, pero >store< es tipicamente el nombre que se le pone.

import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext({
  items: [],
  createItem: (item) => {},
  getItem: (id) => {},
  updateItem: (item) => {},
});
/* ¿A qué le llamamos crear un contexto? 
    A qué necesitamos para este estado, definir como va a estar intergado
*/

export default function Store({ children }) {
  const [items, setItems] = useState({});

  function createItem(item) {
    const temp = [...items];
    temp.push(item);

    setItems(item);
  }

  function getItem(id) {
    const item = items.find((item) => item.id === id);

    return item;
  }

  function updateItem(item) {
    const index = items.findIndex((i) => i.id === item.id);

    const temp = [...items];

    temp[index] = { ...item };

    return true;
  }

  return (
    <AppContext.Provider
      value={{
        items,
        createItem,
        getItem,
        updateItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}