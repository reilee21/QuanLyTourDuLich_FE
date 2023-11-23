import { Route, Router, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {
  defaultRoute,
  quanlyRoute,
  NotLogInRoute,
  IsLoginRoute,
} from "./routes";
import DefaultLayout from "./components/layouts/Layout";
import LayoutQly from "./components/layouts/LayoutQly";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import NotFound from "./page/test";

function App() {
  const [roles, setRoles] = useState("");
  const { isLogin, setupLogin2, role } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setupLogin2();
  }, []);
  useEffect(() => {
    if (role != "client" && role.length > 0 && isLogin) {
      setRoles("qly");
      navigate("/admin");
    }
  }, [isLogin, role]);
  return (
    <div className="App">
      <Routes>
        <Route element={<DefaultLayout />}>
          {defaultRoute.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
          <Route path="*" component={NotFound} />
        </Route>
        {!isLogin ? (
          <Route path="/" element={<DefaultLayout />}>
            {NotLogInRoute.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
            <Route path="*" component={NotFound} />
          </Route>
        ) : (
          <Route path="/" element={<DefaultLayout />}>
            {IsLoginRoute.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
            <Route path="*" component={NotFound} />
          </Route>
        )}

        {roles && roles === "qly" && (
          <Route path="/admin" element={<LayoutQly />}>
            {quanlyRoute.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
            <Route path="*" component={NotFound} />
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
