export default () => {
  const dev_url = 'http://iot-dev-upgrade-center.egtest.cn:7777'
  const bees_url = 'http://iot-dev-upgrade-center-tice.egtest.cn:9000'
  const hardware_url = 'http://iot-dev-upgrade-center-hardware.egtest.cn:9000'
  const pocOss_url = 'http://poc-upgrade.evergrande.me'
  const sx_url = 'http://sandbox-upgrade.egtest.cn:7777'
  const yfb_url = 'http://yfb-upgrade.xl.cn:28083'

  const curUrl = window.location.href

  if (/beeossdev/.test(curUrl) || /localhost/.test(curUrl)) {
    return dev_url
  } else if (/hardtest-oss.evergrande.me/.test(curUrl)) {
    return hardware_url
  } else if (/poc-oss.evergrande.me/.test(curUrl)) {
    return pocOss_url
  } else if (/sandbox-oss.egtest.cn/.test(curUrl)) {
    return sx_url
  } else if (/yfb-oss.xl.cn/.test(curUrl)) {
		return yfb_url
	} else if (/oss-uat.evergrande.cn/.test(curUrl)) {
    return 'http://upgrade-uat.evergrande.cn'
  } else {
    return bees_url
  }
}
