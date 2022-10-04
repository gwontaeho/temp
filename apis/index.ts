import axios from "axios";

const oauth = async (values: any) => {
    const { data } = await axios.post("http://localhost:4000/api/user/oauth", values);
    return data;
};

const signin = async (values: any) => {
    const { data } = await axios.post("http://localhost:4000/api/user/signin", values);
    return data;
};

const signup = async (values: any) => {
    const { data } = await axios.post("http://localhost:4000/api/user/signup", values);
    return data;
};

export { oauth, signin, signup };
