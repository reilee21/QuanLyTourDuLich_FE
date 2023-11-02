import { Route, Router,Routes } from 'react-router-dom';
import './App.css';
import { defaultRoute,quanlyRoute } from './routes';
import DefaultLayout from './components/layouts/Layout';

function App() { 
  return (
  
      <div className="App">
        <Routes>
          <Route element={<DefaultLayout />}>
            {quanlyRoute.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Route>
          </Routes>
       </div>

  );
}

export default App;
