import { axiosPost } from '../../utils/AxiosUtil';

const service = 'api/user';

class UserAPI {
	login(info) {
		return axiosPost(`${service}/login`, info);
	}

	getMember(memberEmail) {
		return axiosPost(`${service}/getMember`, { memberEmail });
	}
}

export default new UserAPI();
