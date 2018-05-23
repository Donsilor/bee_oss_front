
export default  () => {
    let dev_url = 'http://iot-dev-upgrade-center.egtest.cn:7777'
    let bees_url = 'http://iot-dev-upgrade-center-tice.egtest.cn:9000'
    let hardware_url = 'http://iot-dev-upgrade-center-hardware.egtest.cn:9000'
    let pocOss_url = 'http://poc-upgrade.evergrande.me'
    let sx_url = 'http://sandbox-upgrade.egtest.cn:7777'
    const curUrl = window.location.href
    if (/beeossdev/.test(curUrl) || /localhost/.test(curUrl)) {
        return dev_url
    } else if (/hardtest-oss.evergrande.me/.test(curUrl)) {
        return hardware_url
    }else if(/poc-oss.evergrande.me/.test(curUrl)) {
        return pocOss_url
    }else if(/sandbox-oss.egtest.cn/.test(curUrl)) {
        return sx_url
    } else {
        return bees_url
    }

}