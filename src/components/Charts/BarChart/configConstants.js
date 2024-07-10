const scales = {
	x: {
		display: true,
		beginAtZero: true,
		grid: { display: false },
	},
	y: {
		display: true,
		beginAtZero: true,
		grid: { display: true, color: "#444444" },
	},
};

const plugins = {
	legend: {
		position: "top",
	},
	title: {
		display: true,
		text: "Chart.js Bar Chart",
	},
};

export const options = {
	responsive: true,
	plugins,
	scales,
};

const labels = ["10.08.2023", "11.08.2023", "12.08.2023", "13.08.2023", "14.08.2023", "15.08.2023", "16.08.2023"];

const BACKGROUND_COLOR = "#00C2FF";

const datasets = [
	{
		label: "Dataset 1",
		data: labels.map(() => Math.floor(Math.random() * 100) + 1),
		backgroundColor: BACKGROUND_COLOR,
	},
];

export const data = {
	labels,
	datasets,
};
