import axios from "../lib/http";
import { USER_API } from "~/assets/lib/api";

export default {
    getUserPermissionList() {
        return axios.post(USER_API.userPermissionList);
    }
};
