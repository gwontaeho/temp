import axios from 'axios';

export function axiosPost(url, params) {
	return axios
		.post(url, params)
		.then((res) => res.data)
		.catch((res) => console.log(res));
}
