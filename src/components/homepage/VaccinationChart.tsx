"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Paper, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const VaccinationChart: React.FC = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
      },
      line: {
        borderColor: "#281BA4",
        fill: false,
      },
    },
  };

  const data = {
    labels: [
      "21/09",
      "22/09",
      "23/09",
      "24/09",
      "25/09",
      "26/09",
      "27/09",
      "28/09",
      "29/09",
      "30/09",
      "01/10",
      "02/10",
      "03/10",
      "04/10",
      "05/10",
      "06/10",
      "07/10",
      "08/10",
      "09/10",
      "10/10",
      "11/10",
      "12/10",
      "13/10",
      "14/10",
      "15/10",
      "16/10",
      "17/10",
      "18/10",
      "19/10",
      "20/10",
    ],
    datasets: [
      {
        label: "Đã tiêm",
        data: [
          500000, 600000, 700000, 800000, 900000, 1000000, 1100000, 1200000,
          1300000, 1400000, 1500000, 1600000, 1700000, 1800000, 1900000,
          2000000, 2100000, 1900000, 1700000, 1600000, 1500000, 1400000,
          1300000, 1200000, 1100000, 1000000, 900000, 800000, 700000, 600000,
        ],
        borderColor: "#281BA4",
        backgroundColor: "#281BA4",
        pointBorderColor: "#EE0033",
      },
    ],
  };

  return (
    <Box sx={{ paddingX: "36px" }}>
      <Paper elevation={4} className="px-4 py-6">
        <Line options={options} data={data} className="border border-red-500" />
        <Typography variant="h5" fontWeight="bold">
          Dữ liệu tiêm theo ngày
        </Typography>
      </Paper>
    </Box>
  );
};

export default VaccinationChart;
