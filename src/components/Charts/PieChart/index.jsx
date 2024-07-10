import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PieChart = ({ data }) => {
	// const backgroundColor = ["rgba(0, 112, 153, 1)", "rgba(0, 171, 188, 1) "];

	const backgroundColor = [
		"rgba(0, 112, 153, 1)",
		"rgba(0, 171, 188, 1)",
		"rgba(102, 214, 255, 1)",
		"rgba(60, 5, 148, 1)",
	];

	const chartData = {
		datasets: [
			{
				data: data.map((item) => parseFloat(item.ratio === 0 ? 0.1 : item.ratio * 100)),
				backgroundColor: data.map((item, index) => backgroundColor[index % backgroundColor.length]),
			},
		],
		labels: data.map((item) => item.title),
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "left",
				labels: {
					color: "00c2ff",
					boxWidth: 20,
				},
			},
			title: {
				display: true,
			},
			tooltip: {
				callbacks: {
					label: (tooltipItem) => {
						return `${tooltipItem.label}: ${tooltipItem.raw}%`;
					},
				},
			},
		},
	};

	return <Pie data={chartData} options={options} />;
};

export default PieChart;
