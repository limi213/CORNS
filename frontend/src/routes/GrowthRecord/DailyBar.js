import React from "react";

import { ResponsiveMarimekko } from "@nivo/marimekko";

import { Box } from "@mui/material";

function DailyBar() {
  const data = [
    {
      statement: "it's good",
      participation: 9,
      stronglyAgree: 22,
      agree: 25,
      disagree: 1,
      stronglyDisagree: 32,
    },
    {
      statement: "it's sweet",
      participation: 1,
      stronglyAgree: 3,
      agree: 16,
      disagree: 7,
      stronglyDisagree: 32,
    },
    {
      statement: "it's spicy",
      participation: 2,
      stronglyAgree: 1,
      agree: 28,
      disagree: 30,
      stronglyDisagree: 19,
    },
    {
      statement: "worth eating",
      participation: 9,
      stronglyAgree: 9,
      agree: 5,
      disagree: 15,
      stronglyDisagree: 13,
    },
    {
      statement: "worth buying",
      participation: 22,
      stronglyAgree: 17,
      agree: 28,
      disagree: 29,
      stronglyDisagree: 14,
    },
  ];
  return (
    <Box sx={{ width: "100%", border: "3px solid #111" }}>
      <Box sx={{ width: "80%", height: "500px", m: "64px auto" }}>
        <ResponsiveMarimekko
          data={data}
          colors={{ scheme: "pastel1" }}
          id="statement"
          value="participation"
          dimensions={[
            {
              id: "disagree strongly",
              value: "stronglyDisagree",
            },
            {
              id: "disagree",
              value: "disagree",
            },
            {
              id: "agree",
              value: "agree",
            },
            {
              id: "agree strongly",
              value: "stronglyAgree",
            },
          ]}
          innerPadding={9}
          axisTop={null}
          axisRight={{
            orient: "right",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: 0,
          }}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "participation",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "opinions",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          margin={{ top: 40, right: 80, bottom: 100, left: 80 }}
          borderWidth={2}
          borderColor="#111"
          defs={[
            {
              id: "lines",
              type: "patternLines",
              background: "rgba(0, 0, 0, 0)",
              color: "inherit",
              rotation: -45,
              lineWidth: 4,
              spacing: 8,
            },
          ]}
          fill={[
            {
              match: {
                id: "agree strongly",
              },
              id: "",
            },
            {
              match: {
                id: "disagree strongly",
              },
              id: "",
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 80,
              itemsSpacing: 0,
              itemWidth: 140,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "right-to-left",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "square",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
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

export default DailyBar;
