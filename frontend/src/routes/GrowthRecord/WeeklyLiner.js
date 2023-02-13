import React, { useEffect, useState } from "react";
import useAxios from "auth/useAxios";
import { ResponsiveLine } from "@nivo/line";
// import { useDispatch, useSelector } from "react-redux";
// import { getIndicators } from "store/reducers/indicatorsReducer";
import { Box } from "@mui/material";

function WeeklyLiner() {
  // const dispatch = useDispatch();
  // const { data, loading } = useSelector((state) => state.indicatorsReducer);
  const { data, status, isLoading, sendRequest } = useAxios();
  const userId = sessionStorage.getItem("userId");

  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    sendRequest({
      url: `${process.env.REACT_APP_HOST}/growth/indicator/${userId}/1`,
    });
  }, []);
  // useEffect(() => {
  //   dispatch(getIndicators(1));
  // }, [dispatch]);

  useEffect(() => {
    setGraphData(data.dailySpeakingByWeek);
  }, [data]);

  if (!isLoading && status === 200) {
    const weekData = [
      {
        id: "발화량",
        color: "hsl(359, 70%, 50%)",
        data: graphData,
      },
    ];
    return (
      <Box sx={{ width: "100%", border: "3px solid #111" }}>
        <Box sx={{ width: "80%", height: "500px", m: "64px auto" }}>
          <ResponsiveLine
            data={weekData}
            colors={{ scheme: "pastel1" }}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "날짜",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 10,
              tickPadding: 5,
              tickRotation: 0,
              legend: "발화량(분)",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 1,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
      </Box>
    );
  } else {
    return <p>loading 중...</p>;
  }
}

export default WeeklyLiner;
