import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import ReactEcharts from "echarts-for-react";
import "./style.css";
import request from "../../request";
import moment from "moment";
import { EChartOption } from "echarts";

interface Item {
  title: string;
  count: number;
}

interface Data {
  [key: string]: Item[];
}

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
    request.get("/isLogin").then((res) => {
      setIsLogin(res.data);
      setIsLoaded(true);
    });

    request.get("/crawler").then((res) => {
      if (res.data) {
        const courseNames: string[] = [];
        const times: string[] = [];
        const tempData: {
          [key: string]: number[];
        } = {};
        // format data
        const data: Data = res.data;
        for (let i in data) {
          const item = data[i];
          times.push(moment(Number(i)).format("MM-DD HH:mm"));
          //
          item.forEach((item2) => {
            const { title, count } = item2;
            if (courseNames.indexOf(title) === -1) {
              courseNames.push(title);
            }
            tempData[title]
              ? tempData[title].push(count)
              : (tempData[title] = [count]);
          });
          //
          const result: EChartOption.Series[] = [];
          for (let i in tempData) {
            result.push({
              name: i,
              type: "line",
              data: tempData[i],
            });
          }
          //
          setOption({
            grid: { top: 8, right: 8, bottom: 24, left: 36 },
            xAxis: {
              type: "category",
              data: courseNames,
            },
            yAxis: {
              type: "value",
            },
            series: result,
            tooltip: {
              trigger: "axis",
            },
          });
        }
      }
    });
  }, []);

  const handleCrawler = () => {
    request.post("/crawler").then((res) => {
      console.log("crawler res: ", res);
    });
  };

  const handleLogout = () => {
    request.get("/logout").then((res) => {
      setIsLogin(false);
    });
  };

  if (!isLoaded) return null;

  if (!isLogin) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <>
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
      </div>
      <ReactEcharts option={option} />
    </>
  );
};

export default Home;
