import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import "./style.css";
import axios from "axios";

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    axios.get("/isLogin").then((res) => {
      setIsLogin(res.data.data);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) return null;

  if (!isLogin) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <div className="home-page">
      <Button type="primary">crawler</Button>
      <Button type="primary">display</Button>
      <Button type="primary">exit</Button>
    </div>
  );
};

export default Home;
