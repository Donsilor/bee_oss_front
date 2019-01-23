import permission from './permission.js'
import user from './user.js'
import analyzer from './analyzer.js'
import muser from './muser'
import cmdata from './cmdata'
import familys from './familys'
import ops from './ops'
import strategy from './strategy'
import upgrade from './upgrade'

export default {
  ...permission,
  ...user,
  ...analyzer,
  ...muser,
  ...cmdata,
  ...familys,
  ...ops,
  ...strategy,
  ...upgrade
}
