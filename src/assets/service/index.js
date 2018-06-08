import permission from './permission.js'
import user from './user.js'
import analyzer from './analyzer.js'
import muser from './muser';

export default {
    ...permission,
    ...user,
    ...analyzer,
    ...muser
}