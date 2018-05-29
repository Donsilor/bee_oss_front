import axios from "../lib/http";
import { BASE_URL } from "~/assets/lib/api";

export default {
    getUserPermissionList() {
        return axios.post(`${BASE_URL}user/menu`);
    }
};
