import { axiosPost } from '../../utils/AxiosUtil';

const service = 'api/setting';

class SettingAPI {
	getSettingBasic() {
		return axiosPost(`${service}/getSettingBasic`);
	}

}

export default new SettingAPI();
