import Login from './login.vue';
import Main from './main.vue';
import Home from './home.vue';
import Facility from './facility.vue';
import Cloud from './cloud.vue';
import CMDB from './cmdb.vue';
import upgrade from './upgradeCenter.vue';
import VersionManager from './upgradeCenter/versionManager.vue';
import PushManager from './upgradeCenter/pushManager.vue';
import OPS from './userData/ops.vue';
import MUSER from './userData/muser/index.vue';
import ThroughData from './throughData/index.vue';
import AllThroughData from './throughData/allData.vue';
import AppRouterData from './throughData/appRouterData.vue';
import DevicesData from './throughData/devicesData.vue';
import LogRegData from './throughData/logRegData.vue';
import QpsData from './throughData/qpsData.vue';
import WarnManage from './warnManager/warnManage.vue';
import WarnDataSearch from './warnManager/warnDataSearch.vue';
import RootLog from './allLogs/rootLogs.vue';
import ErrLog from './allLogs/errLogs.vue';
import RouterIndex from './routerManager/index.vue';
import RouterManager from './routerManager/routerManager.vue';
import ImportRouter from './routerManager/importRouter.vue';
import FamilyList from './familyList.vue';
import FamilyImgList from './familyImg/index.vue';
import User from './permission/user.vue'
import Role from './permission/role.vue'
import ResetPwd from './permission/resetPwd.vue'
import UpdatePwd from './permission/updatePwd.vue'
import Error from './error.vue'
import UserData from './analyzer/userData.vue'
import FeedbackList from './feedback/list.vue'
import FeedbackDetail from './feedback/detail.vue'

export {
	Login,
	Main,
	Home,
    OPS,
    MUSER,
    VersionManager,
    PushManager,
	Facility,
	Cloud,
	CMDB,
    upgrade,
    ThroughData,
    RootLog,
    AllThroughData,
    AppRouterData,
    DevicesData,
    LogRegData,
    QpsData,
    WarnManage,
    WarnDataSearch,
    FamilyList,
    ErrLog,
    RouterIndex,
    RouterManager,
    ImportRouter,
    FamilyImgList,
    User,
    Role,
    UpdatePwd,
    ResetPwd,
    Error,
    UserData,
    FeedbackList,
    FeedbackDetail
};