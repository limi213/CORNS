import React from "react";
import { ResponsiveLine } from "@nivo/line";

import { Box } from "@mui/material";

function WeeklyLiner() {
  const data = [
    {
      id: "발화량",
      color: "hsl(359, 70%, 50%)",
      data: [
        {
          x: "6일전",
          y: 204,
        },
        {
          x: "5일전",
          y: 201,
        },
        {
          x: "4일전",
          y: 121,
        },
        {
          x: "3일전",
          y: 98,
        },
        {
          x: "그제",
          y: 265,
        },
        {
          x: "어제",
          y: 21,
        },
        {
          x: "오늘",
          y: 247,
        },
      ],
    },
    {
      id: "발음",
      color: "hsl(314, 70%, 50%)",
      data: [
        {
          x: "6일전",
          y: 204,
        },
        {
          x: "5일전",
          y: 201,
        },
        {
          x: "4일전",
          y: 121,
        },
        {
          x: "3일전",
          y: 98,
        },
        {
          x: "그제",
          y: 265,
        },
        {
          x: "어제",
          y: 21,
        },
        {
          x: "오늘",
          y: 247,
        },
      ],
    },
    {
      id: "단어",
      color: "hsl(5, 70%, 50%)",
      data: [
        {
          x: "6일전",
          y: 204,
        },
        {
          x: "5일전",
          y: 201,
        },
        {
          x: "4일전",
          y: 121,
        },
        {
          x: "3일전",
          y: 98,
        },
        {
          x: "그제",
          y: 265,
        },
        {
          x: "어제",
          y: 21,
        },
        {
          x: "오늘",
          y: 247,
        },
      ],
    },
  ];
  return (
    <Box sx={{ width: "100%", border: "3px solid #111" }}>
      <Box sx={{ width: "80%", height: "500px", m: "64px auto" }}>
        <ResponsiveLine
          data={data}
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
            legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
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
}

export default WeeklyLiner;
