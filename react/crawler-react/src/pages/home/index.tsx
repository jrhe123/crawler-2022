import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import ReactEcharts from "echarts-for-react";
import "./style.css";
import axios from "axios";
import { EChartOption } from "echarts";

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [option, setOption] = useState<EChartOption>({
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  });

  useEffect(() => {
    axios.get("/isLogin").then((res) => {
      setIsLogin(res.data.data);
      setIsLoaded(true);
    });
  }, []);

  const handleCrawler = () => {
    axios.post("/crawler").then((res) => {
      console.log("crawler res: ", res);
    });
  };

  const handleLogout = () => {
    axios.get("/logout").then((res) => {
      setIsLogin(false);
    });
  };

  if (!isLoaded) return null;

  if (!isLogin) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <div className="home-page">
      <Button
        type="primary"
        style={{ marginRight: 12 }}
        onClick={handleCrawler}
      >
        crawler
      </Button>
      <Button type="primary" onClick={handleLogout}>
        exit
      </Button>
      <ReactEcharts option={option} />
    </div>
  );
};

export default Home;
