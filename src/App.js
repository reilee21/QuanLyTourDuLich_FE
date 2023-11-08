import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { defaultRoute, quanlyRoute } from "./routes";
import DefaultLayout from "./components/layouts/Layout";
import LayoutQly from "./components/layouts/LayoutQly";
import { useState } from "react";

function App() {
  const [role, setRole] = useState("client");
  return (
    <div className="App">
      <Routes>
        {role && role !== "client" ? (
          <Route path="/admin" element={<LayoutQly />}>
            {quanlyRoute.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Route>
        ) : (
          <Route element={<DefaultLayout />}>
            {defaultRoute.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
