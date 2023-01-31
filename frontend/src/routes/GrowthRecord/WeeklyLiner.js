import React from "react";
import { ResponsiveLine } from "@nivo/line";

import { Box } from "@mui/material";

function WeeklyLiner() {
  const data = [
    {
      id: "japan",
      color: "hsl(359, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 204,
        },
        {
          x: "helicopter",
          y: 201,
        },
        {
          x: "boat",
          y: 121,
        },
        {
          x: "train",
          y: 98,
        },
        {
          x: "subway",
          y: 265,
        },
        {
          x: "bus",
          y: 21,
        },
        {
          x: "car",
          y: 247,
        },
        {
          x: "moto",
          y: 28,
        },
        {
          x: "bicycle",
          y: 131,
        },
        {
          x: "horse",
          y: 295,
        },
        {
          x: "skateboard",
          y: 14,
        },
        {
          x: "others",
          y: 276,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(314, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 110,
        },
        {
          x: "helicopter",
          y: 25,
        },
        {
          x: "boat",
          y: 288,
        },
        {
          x: "train",
          y: 112,
        },
        {
          x: "subway",
          y: 61,
        },
        {
          x: "bus",
          y: 150,
        },
        {
          x: "car",
          y: 112,
        },
        {
          x: "moto",
          y: 67,
        },
        {
          x: "bicycle",
          y: 193,
        },
        {
          x: "horse",
          y: 137,
        },
        {
          x: "skateboard",
          y: 61,
        },
        {
          x: "others",
          y: 242,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(5, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 12,
        },
        {
          x: "helicopter",
          y: 280,
        },
        {
          x: "boat",
          y: 237,
        },
        {
          x: "train",
          y: 186,
        },
        {
          x: "subway",
          y: 23,
        },
        {
          x: "bus",
          y: 239,
        },
        {
          x: "car",
          y: 175,
        },
        {
          x: "moto",
          y: 82,
        },
        {
          x: "bicycle",
          y: 150,
        },
        {
          x: "horse",
          y: 258,
        },
        {
          x: "skateboard",
          y: 31,
        },
        {
          x: "others",
          y: 230,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(211, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 269,
        },
        {
          x: "helicopter",
          y: 111,
        },
        {
          x: "boat",
          y: 30,
        },
        {
          x: "train",
          y: 134,
        },
        {
          x: "subway",
          y: 162,
        },
        {
          x: "bus",
          y: 193,
        },
        {
          x: "car",
          y: 143,
        },
        {
          x: "moto",
          y: 85,
        },
        {
          x: "bicycle",
          y: 130,
        },
        {
          x: "horse",
          y: 160,
        },
        {
          x: "skateboard",
          y: 201,
        },
        {
          x: "others",
          y: 75,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(15, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 207,
        },
        {
          x: "helicopter",
          y: 298,
        },
        {
          x: "boat",
          y: 94,
        },
        {
          x: "train",
          y: 205,
        },
        {
          x: "subway",
          y: 140,
        },
        {
          x: "bus",
          y: 99,
        },
        {
          x: "car",
          y: 263,
        },
        {
          x: "moto",
          y: 167,
        },
        {
          x: "bicycle",
          y: 162,
        },
        {
          x: "horse",
          y: 159,
        },
        {
          x: "skateboard",
          y: 8,
        },
        {
          x: "others",
          y: 33,
        },
      ],
    },
  ];
  return (
    <Box sx={{ width: "100%", border: "3px solid #111" }}>
      <Box sx={{ width: "80%", height: "500px", m: "64px auto" }}>
        <ResponsiveLine
          data={data}
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
            tickSize: 5,
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
              itemOpacity: 0.75,
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
