import axios from "../lib/http";
import { BASE_URL } from "~/assets/lib/api";

export default {
    getMUserList(params) {
        return axios.post(`${BASE_URL}iotuser/muserlist`, params);
    },
    addMUser(params) {
        return axios.post(`${BASE_URL}iotuser/savemuser`, params);
    },
    deleteMUser(user_ids) {
        return axios.post(`${BASE_URL}iotuser/delmuser`, {user_ids});
    }
};