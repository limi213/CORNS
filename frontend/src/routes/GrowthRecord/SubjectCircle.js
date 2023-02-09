import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useDispatch, useSelector } from "react-redux";
import { getIndicators } from "store/reducers/indicatorsReducer";
import { Box } from "@mui/material";

function SubjectCircle() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.indicatorsReducer);
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    dispatch(getIndicators(2));
  }, [dispatch]);

  useEffect(() => {
    setGraphData(data.subjectRatio);
  }, [data]);

  if (!loading) {
    return (
      <Box sx={{ width: "100%", border: "3px solid #111" }}>
        <Box sx={{ width: "80%", height: "500px", m: "64px auto" }}>
          <ResponsivePie
            data={graphData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={2}
            borderColor="#111"
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#111111"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="#111111"
            colors={{ scheme: "pastel1" }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "일상",
                },
                id: "",
              },
              {
                match: {
                  id: "c",
                },
                id: "dots",
              },
              {
                match: {
                  id: "go",
                },
                id: "dots",
              },
              {
                match: {
                  id: "python",
                },
                id: "dots",
              },
              {
                match: {
                  id: "scala",
                },
                id: "lines",
              },
              {
                match: {
                  id: "lisp",
                },
                id: "lines",
              },
              {
                match: {
                  id: "elixir",
                },
                id: "lines",
              },
              {
                match: {
                  id: "javascript",
                },
                id: "lines",
              },
            ]}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
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
  } else {
    return <p>로딩중</p>;
  }
}

export default SubjectCircle;
