import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const HomePage = () => {
  const { isLogin, logout, role } = useAuth();

  return (
    <>
      <h1>HomePage</h1>
      {isLogin && (
        <div>
          <h2>đã đăng nhập</h2>
          <button type="submit" onClick={logout}>
            logout
          </button>
          {role && <h2> r: {role}</h2>}
        </div>
      )}
    </>
  );
};

export default HomePage;
