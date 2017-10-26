import Mock from 'mockjs';


export const login = Mock.mock('auth\/login', {
	'data': {
		'id': '@natural(10000, 99999)',
		'mobile': '@natural(13000000000, 18900000000)',
		'email': '@email',
		'name': '@ctitle(4, 7)',
		'token': '@guid()'
	}
})

export const logout = Mock.mock('auth\/logout', {
	'data': {
		'code': '200'
	}
});

/*export const homeData = Mock.mock('homepage\/index', {
	'data': {
		'statistics_time': '@date() @time(HH:MM)',
		'router_count': '@natural(10000, 99999)',
		'router_online_count': '@float(0, 100, 2, 2)',
		'app_count': '@natural(10000, 99999)',
		'app_online_count': '@float(0, 100, 2, 2)',
		'pv': '@natural(10000, 99999)',
		'uv': '@natural(10000, 99999)'
	}
});*/

export const alarmst = Mock.mock('homepage\/alarmst', {
	'data': {
		'total|1-20': 1,
		'current_page|1-20': 1,
		'last_page|1-20': 1,
		'next_page_url': '',
		'prev_page_url': '',
		'data|1-20': [{
			'id': '@natural(10000, 99999)',
			'statistics_time': '2017-10-24 @time(hh:mm)',
			'count|1-100': 1,
			'type': ''
		}]
	}
});