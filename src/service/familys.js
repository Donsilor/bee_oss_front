import axios from '../lib/http'
import { FAMILY_API } from '~/lib/api'

export default {
  imgList (params) {
    return axios
      .post(FAMILY_API.imgList, params)
      .then(response => response.data)
  },
  addImgs (params) {
    return axios
      .post(FAMILY_API.addImgs, params)
      .then(response => response.data)
  },
  deleteImgs (params) {
    return axios
      .post(FAMILY_API.deleteImgs, params)
      .then(response => response.data)
  },
  editImgs (params) {
    return axios
      .post(FAMILY_API.editImgs, params)
      .then(response => response.data)
  },
  sortImgs (params) {
    return axios
      .post(FAMILY_API.sortImgs, params)
      .then(response => response.data)
  }
}
