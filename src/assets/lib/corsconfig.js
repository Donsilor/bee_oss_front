
export default  () => {
    let dev_url = 'http://iot-dev-upgrade-center.egtest.cn:7777'
    let bees_url = 'http://iot-dev-upgrade-center-tice.egtest.cn:9000'
    let hardware_url = 'http://iot-dev-upgrade-center-hardware.egtest.cn:9000'
    const curUrl = window.location.href
    if (/beeossdev/.test(curUrl) || /localhost/.test(curUrl)) {
        return dev_url
    } else if (/iot-dev-upgrade-center-hardware/.test(curUrl)) {
        return hardware_url
    }else {
        return bees_url
    }

}