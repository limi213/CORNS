import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useDispatch, useSelector } from "react-redux";
import { getIndicators } from "store/reducers/indicatorsReducer";
import { Box } from "@mui/material";

function WeeklyLiner() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.indicatorsReducer);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    dispatch(getIndicators(3));
  }, [dispatch]);

  useEffect(() => {
    setGraphData(data);
  }, [data]);

  if (!loading) {
    // console.log(graphData);
    // if (graphData !== undefined) {
    //   setChangeData(
    //     graphData.map((day, idx) => {
    //       const dd = 6;
    //       return (day.x = (dd - idx).toString() + "일 전");
    //     })
    //   );
    // }
    // console.log(changeData);

    // const thisWeek = [
    //   {
    //     x: "금",
    //     y: "0",
    //   },
    //   {
    //     x: "토",
    //     y: "15",
    //   },
    //   {
    //     x: "일",
    //     y: "0",
    //   },
    //   {
    //     x: "월",
    //     y: "5",
    //   },
    //   {
    //     x: "화",
    //     y: "3",
    //   },
    //   {
    //     x: "수",
    //     y: "3",
    //   },
    //   {
    //     x: "목",
    //     y: "3",
    //   },
    // ];
    // const lastWeek = [
    //   {
    //     x: "금",
    //     y: "18",
    //   },
    //   {
    //     x: "토",
    //     y: "5",
    //   },
    //   {
    //     x: "일",
    //     y: "0",
    //   },
    //   {
    //     x: "월",
    //     y: "20",
    //   },
    //   {
    //     x: "화",
    //     y: "3",
    //   },
    //   {
    //     x: "수",
    //     y: "10",
    //   },
    //   {
    //     x: "목",
    //     y: "3",
    //   },
    // ];

    const dailyData = [
      {
        id: "이번주",
        color: "hsl(359, 70%, 50%)",
        data: data.thisWeek,
      },
      {
        id: "저번주",
        color: "hsl(359, 70%, 50%)",
        data: data.lastWeek,
      },
    ];

    return (
      <Box sx={{ width: "100%", border: "3px solid #111" }}>
        <Box sx={{ width: "80%", height: "500px", m: "64px auto" }}>
          <ResponsiveLine
            data={dailyData}
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
              legend: "경험치",
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
    return <p>로딩중</p>;
  }
}

export default WeeklyLiner;
