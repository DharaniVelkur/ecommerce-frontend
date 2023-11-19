import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import NoteSate from "./context/NoteSate";
import {Provider} from  "react-redux";
import appStore from "./utils/appStore";

function App() {
  const [selectedoption,setSelectedoption] = useState("Bangalore");

  return (
    <>
    <Provider store={appStore}>
    <NoteSate>
    <Header selectedoption={selectedoption} setSelectedoption={setSelectedoption}/>
    <Outlet />
    </NoteSate>
    </Provider>
    </>
  );
}

export default App; 