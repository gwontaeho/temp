import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const options =
	process.env.NODE_ENV === 'production'
		? { path: '/', sameSite: 'Strict', domain: '211.232.120.67' }
		: { path: '/', sameSite: 'Strict', domain: 'localhost' };

export const setCookie = (name, value) => {
	return cookies.set(name, value, options);
};

export const getCookie = (name) => {
	return cookies.get(name);
};

export const removeCookie = (name) => {
	cookies.remove(name);
};
