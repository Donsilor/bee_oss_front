import Mock from "mockjs"
import feedback from "./feedback"

function addToMock(list) {
  list.forEach(n => {
    Mock.mock(n.path, n.data)
  })
}

addToMock(feedback)

export default Mock
