export function formatValue(key, val) {
	if(key == 'force'){
		return {
			0: '否',
			1: '是'
		}[val]
	}
	if(key == 'release_type'){
		return {
			0: '全量升级',
			1: '白名单',
			2: '黑名单'
		}[val]
	}
	if(key == 'status'){
		return {
			0: '禁用',
			1: '启用'
		}[val]
	}
	return ''
}
