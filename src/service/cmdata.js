import axios from '../lib/http'
import { CMDATA_API } from '~/lib/api'

export default {
  CmDataList(params) {
    return axios
      .post(CMDATA_API.CmDataList, params)
      .then(response => response.data)
  },
  CmDataAdd(params) {
    return axios
      .post(CMDATA_API.CmDataAdd, params)
      .then(response => response.data)
  },
  CmDataEdit(params) {
    return axios
      .post(CMDATA_API.CmDataEdit, params)
      .then(response => response.data)
  },
  CmDataDel(params) {
    return axios
      .post(CMDATA_API.CmDataDel, params)
      .then(response => response.data)
  },
  ModuleList(params) {
    return axios
      .post(CMDATA_API.ModuleList, params)
      .then(response => response.data)
  },
  // output(params) {
  //     return new Promise((resolve, reject) => {
  //         axios
  //             .get(CMDATA_API.output, params)
  //             .then(response => {

  //             })
  //             .catch(error => {
  //                 console.log(error);
  //             });
  //     });
  // },
  input(params) {
    return axios.post(CMDATA_API.input, params).then(response => response.data)
  }
}
