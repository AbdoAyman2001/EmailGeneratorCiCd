import "../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import classes from "./App.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setConfig } from "./store/slices/mainSlice";
import Site from "./Components/Site/Site";
import Side from "./Components/Side";

import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Family from "./Components/Family/Family";
import ThreeMonths from "./Components/ThreeMonths/ThreeMonths";
import Relocation from "./Components/Relocation/Relocation";
import ResponseLetter from "./Components/ResponseLetter/ResponseLetter";
import Transfer from "./Components/Transfer/Transfer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await window.electron.ipcRenderer.invoke(
          "getConfig",
          "main"
        );
        console.log("main config : ", config);
        dispatch(setConfig(config));
      } catch (error) {
        console.error("Failed to load external config, using default:", error);
      }
    };

    fetchConfig();
  }, [dispatch]);

  return (
    <>
      <nav>
        <h1 style={{ fontFamily: "Cairo", fontSize: "1.7rem" }}>
          كاتب البريد الإلكتروني
        </h1>
      </nav>
      <div className="router">
        <Router>
          <div className={classes.container}>
            <Routes>
              <Route path="/" element={<Navigate to="/Site" replace />} />
              <Route path="/Site" element={<Site />}></Route>
              <Route path="/Family" element={<Family />}></Route>
              <Route path="/ThreeMonths" element={<ThreeMonths />}></Route>
              <Route path="/Relocation" element={<Relocation />}></Route>
              <Route path="/Transfer" element={<Transfer />}></Route>
              <Route
                path="/ResponseLetter"
                element={<ResponseLetter />}
              ></Route>
            </Routes>
          </div>
          <Side />
        </Router>
      </div>
    </>
  );
};

export default App;
