const setupAPI = () => {
	switch (process.env.NODE_ENV) {
		case 'local':
			return 'http://192.168.33.10';
		case 'development':
			return 'https://dev-api.swiftsales.fi';
		default:
			return 'http://192.168.33.10';
	}
};

const API_BASE_URL = JSON.stringify(setupAPI());
export default {
	API_BASE_URL,
};
