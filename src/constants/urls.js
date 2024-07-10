const devUrls = {
	api_url: "https://clickclinician-live-api.azurewebsites.net/",
	// api_url: "http://localhost:6216/",
	file_url: "http://localhost:8000",
	front_end: "http://localhost:3001",
};

const prodUrls = {
	api_url: "https://clickclinician-live-api.azurewebsites.net/",
	file_url: "https://splitmart.com",
	front_end: "https://splitmart.com",
};

// const prodUrls = {
// 	api_url: "http://51.20.250.84/api",
// 	file_url: "http://51.20.250.84",
// 	front_end: "http://51.20.250.84",
// };

const common = {
	// bucketUrl: "https://jobb-connect-assets.s3.amazonaws.com/images",
	bucketUrl: "/assets/images",
};

const environment = import.meta.env.MODE === "development" ? devUrls : prodUrls;

export const environmentUrls = {
	...environment,
	...common,
};
