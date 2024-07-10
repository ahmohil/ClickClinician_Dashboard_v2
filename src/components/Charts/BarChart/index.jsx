import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

const BarChart = ({ barChartData }) => {
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

	const labels = barChartData.map((item) => item.title);
	const dataValues = barChartData.map((item) => item.ratio);

	const backgroundColor = [
		"rgba(0, 112, 153, 1)",
		"rgba(0, 171, 188, 1)",
		"rgba(102, 214, 255, 1)",
		"rgba(60, 5, 148, 1)",
	];

	const data = {
		labels: labels,
		datasets: [
			{
				label: "Percentage",
				data: barChartData.map((item) => item.ratio),
				backgroundColor: barChartData.map((item, index) => backgroundColor[index % backgroundColor.length]),
			},
		],
	};

	const options = {
		indexAxis: "x",
		elements: {
			bar: {
				borderWidth: 2,
			},
		},
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 20,
					callback: function (value) {
						return value + "%";
					},
				},
			},
		},
		plugins: {
			tooltip: {
				callbacks: {
					label: (tooltipItem) => {
						return `${tooltipItem.label}: ${tooltipItem.raw}%`;
					},
				},
			},
		},
	};

	return (
		<div className="">
			<Bar data={data} options={options} />
		</div>
	);
};

export default BarChart;
