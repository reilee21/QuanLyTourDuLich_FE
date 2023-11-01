import { Route, Router,Routes } from 'react-router-dom';
import './App.css';
import { clientLoginRoute, defaultRoute } from './routes';
import DefaultLayout from './components/layouts/Layout';
import { useAuth } from './context/AuthContext';
import { jwtDecode } from 'jwt-decode';

function App() { 
  const{isLogin} = useAuth();

  
  return (
  
      <div className="App">
        <Routes>
          {isLogin ?(
            <Route element={<DefaultLayout />}>
            {clientLoginRoute.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Route>
          ):(
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
