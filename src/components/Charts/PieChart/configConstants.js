const datasets = [
	{
		data: [30, 40, 30],
		backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
		label: "My First Dataset",
	},
];

const plugins = {
	legend: {
		position: "left",
		labels: {
			color: "#00c2ff",
			boxWidth: 20,
		},
	},
	title: {
		display: true,
	},
};

const labels = ["Red", "Blue", "Yellow"];

export const data = {
	labels,
	datasets,
};
