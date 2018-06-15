import pagerConfig from './config'

export const getConfig = (result) => {
    return {
        page: result.current_page,
        pageSize: pagerConfig.pageSize,
        total: result.total
    }
}

export const getOnlyUserList = (data) => {
    const userList = [];
    data.map(item => {
        const user = {
            id: item.user_id,
            name: item.user_name,
            phone: item.phone,
            familyList: [],
            familyCount: item.family_list.length
        };
        item.family_list.map(fa => {
            const family = {
                isOnline: fa.router_online ? '在线' : '离线',
                total: 0,
                name: item.user_name,
                phone: item.phone
            };
            if(fa.device_list.length > 0) {
                fa.device_list.map(ca => {
                    family[`type${ca.category_id}`] = ca.num;
                    if (parseInt(ca.num) > 0) {
                        family.total += parseInt(ca.num);
                    }
                });
            }
            user.familyList.push(family);
        });
        userList.push(user);
    });
    return userList;
}

export const getUserList = (data) => {
    const userList = [];
    data.map(item => {
        if (item.family_list.length === 0) {
            userList.push({
                id: item.user_id,
                name: item.user_name,
                phone: item.phone,
                isOnline: "离线",
                total: 0
            });
        } else {
            item.family_list.map(it => {
                const user = {
                    id: item.user_id,
                    name: item.user_name,
                    phone: item.phone,
                    isOnline: it.router_online ? '在线' : '离线',
                    total: 0
                };
                if (it.device_list.length > 0) {
                    it.device_list.map(ca => {
                        user[`type${ca.category_id}`] = ca.num;
                        if (parseInt(ca.num) > 0) {
                            user.total += parseInt(ca.num);
                        }
                    })
                }
                userList.push(user);
            })
        }
    });
    return userList;
}

export const getTypes = (data) => {
    const types = [];
    const categories = {};
    const datas = data.filter(item => item.family_list.length > 0);
    datas.map(data => {
        data.family_list.map(item => {
            if (item.device_list.length > 0) {
                item.device_list.map(it => {
                    if(!categories[it.category_id] && categories[it.category_id] !== '') {
                        categories[it.category_id] = it.category_name;
                    }
                });
            }
        });
    });
    Object.keys(categories).map(key => {
        types.push({
            id: key,
            name: `type${key}`,
            text: categories[key]
        })
    });
    types.push({
        id: 'heji',
        name: 'total',
        text: '合计'
    });
    return types;
}