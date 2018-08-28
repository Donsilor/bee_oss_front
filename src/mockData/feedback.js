import * as url from "~/lib/api";
const feedbackListData = {
	timestamp: 1526894869,
	msg: "success",
	code: 200,
	result: {
		total: 5,
		current_page: 1,
		last_page: 3,
		next_page_url: "http://beeossdev.egtest.cn.test/user/getUserList?page=2",
		prev_page_url: null,
		data: [
			{
				id: 1,
				uname: "13891666852",
				small_img:
					"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg",
				title: "用户反馈11",
				terminal_name: "Zac's iPhone",
				terminal_type: "iPhone iOS 10.3.3 ",
				client_version: "1.0.2",
				app_version: "Ci 1.0.2",
				create_time: "2018-05-07 14:46:48",
				content: "未读内容摘要摘要111摘要内容摘要摘要摘要内容摘要摘要摘要内容摘要摘要摘要",
				img_list:
					"http://beeossdev.egtest.cn.test/user/getimg?id=1,http://beeossdev.egtest.cn.test/user/getimg?id=2",
				is_read: "0"
			},
			{
				id: 2,
				uname: "13791688852",
				small_img:
					"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg",
				title: "用户反馈22",
				terminal_name: "Zac's iPhone",
				terminal_type: "iPhone iOS 10.3.3 ",
				client_version: "1.0.2",
				app_version: "Ci 1.0.2",
				create_time: "2018-05-07 14:46:48",
				content: "未读内容摘要摘2222要摘要内容摘要摘要摘要内容摘要摘要摘要内容摘要摘要摘要",
				img_list:
					"http://beeossdev.egtest.cn.test/user/getimg?id=1,http://beeossdev.egtest.cn.test/user/getimg?id=2",
				is_read: "1"
			},
			{
				id: 3,
				uname: "12121233",
				small_img:
					"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg",
				title: "用户反馈33",
				terminal_name: "Zac's iPhone",
				terminal_type: "iPhone iOS 10.3.3 ",
				client_version: "1.0.2",
				app_version: "Ci 1.0.2",
				create_time: "2018-05-07 14:46:48",
				content: "未读内容摘要摘3333要摘要内容摘要摘要摘要内容摘要摘要摘要内容摘要摘要摘要",
				img_list:
					"http://beeossdev.egtest.cn.test/user/getimg?id=1,http://beeossdev.egtest.cn.test/user/getimg?id=2",
				is_read: "0"
			},
			{
				id: 4,
				uname: "asfsdfsdf",
				small_img:
					"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg",
				title: "用户反馈44",
				terminal_name: "Zac's iPhone",
				terminal_type: "iPhone iOS 10.3.3 ",
				client_version: "1.0.2",
				app_version: "Ci 1.0.2",
				create_time: "2018-05-07 14:46:48",
				content: "未读内容摘要4444摘要摘要内容摘要摘要摘要内容摘要摘要摘要内容摘要摘要摘要",
				img_list:
					"http://beeossdev.egtest.cn.test/user/getimg?id=1,http://beeossdev.egtest.cn.test/user/getimg?id=2",
				is_read: "1"
			},
			{
				id: 5,
				uname: "13891666852",
				small_img:
					"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg",
				title: "用户反馈55",
				terminal_name: "Zac's iPhone",
				terminal_type: "iPhone iOS 10.3.3 ",
				client_version: "1.0.2",
				app_version: "Ci 1.0.2",
				create_time: "2018-05-07 14:46:48",
				content: "555555未读内容摘要摘要摘要内容摘要摘要摘要内容摘要摘要摘要内容摘要摘要摘要",
				img_list:
					"http://beeossdev.egtest.cn.test/user/getimg?id=1,http://beeossdev.egtest.cn.test/user/getimg?id=2",
				is_read: "0"
			}
		]
	}
};
const feedbackDetailsData = {
	timestamp: 1526894869,
	msg: "success",
	code: 200,
	result: {
		data: {
			id: 1,
			uname: "asdfsdf",
			small_img: "http://beeossdev.egtest.cn.test/user/getimg?id=1",
			title: "用户反馈",
			terminal_name: "Zac's iPhone",
			terminal_type: "iPhone iOS 10.3.3 ",
			client_version: "1.0.2",
			app_version: "Ci 1.0.2",
			create_time: "2018-05-07 14:46:48",
			content: "未读内容摘要摘要摘要内容摘要摘要摘要内容摘要摘要摘要内容摘要摘要摘要",
			img_list:
				"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg,https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg,https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg",
			is_read: "0"
		}
	}
};
const feedbackUpdateStatusData = {
	timestamp: 1526894869,
	msg: "success",
	code: 200,
	result: true
};
export default [
	{
		path: url.feedbackList,
		data: feedbackListData
	},
	{
		path: url.feedbackDetails,
		data: feedbackDetailsData
	},
	{
		path: url.feedbackUpdateStatus,
		data: feedbackUpdateStatusData
	}
];
