import {color, compareColor, typeColor, localhost} from "./config";
import {addListOption, getDiv, getValue, selectTxt, cleanDiv} from './base'
import chart from "./chart";

let scene, drawControl, lng1, lat1, lng2, lat2
let l1, l2, l3, l4, l5, l6, l7
let dChart, jgNames = [], jgIndex = 0
let maxRatios = [0, 0, 0, 0, 0] // 床位数，占地面积，建筑面积，绿化面积
let yljgRatios = ['床位数', '占地面积', '建筑面积', '绿化面积', '入住人数'] // 养老机构各项基础指标

export default {
    name: "app",
    components: {},
    data() {
        return {}
    },
    methods: {
        init() {
            this.getMaxRatio()
            this.d2()
            this.d4()
            this.d5()
        },
        getMaxRatio() { // 获取区域指数(床位数、建筑面积等)最大值
            fetch(localhost + '/maxRatio', {
                method: 'post',
                body: JSON.stringify({
                    'lng1': lng1,
                    'lng2': lng2,
                    'lat1': lat1,
                    'lat2': lat2
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    for (let i in yljgRatios) {
                        maxRatios[i] = data[yljgRatios[i]]
                    }
                })
        },
        d1(ev) {
            fetch(localhost + ev.feature['name'] + '/rzrs')
                .then((res) => res.json())
                .then((data) => {
                    let value = data['value']
                    getDiv('t1').innerHTML = ev.feature['name']
                    for (let i in yljgRatios) {
                        if (Number(i) !== yljgRatios.length - 1) {
                            value = ev.feature[yljgRatios[i]]
                        } else {
                            value = data['value']
                        }
                        dChart = chart.bullet('d1_' + (Math.ceil(Number(i)) + 1).toString(), compareColor, [{
                            title: '',
                            ranges: [maxRatios[i] * 1.2],
                            measures: [value],
                            target: [maxRatios[i]],
                        }], yljgRatios[i], yljgRatios[i], false)
                        dChart.render()
                    }
                })


        },
        d2() {
            fetch(localhost + '/d2', {
                method: 'post',
                body: JSON.stringify({
                    'lng1': lng1,
                    'lng2': lng2,
                    'lat1': lat1,
                    'lat2': lat2
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    getDiv('t2').innerHTML = "区域养老机构面积信息"
                    dChart = chart.bars('d2', typeColor, data)
                    dChart.render()
                });
        },
        d3_1() {
            fetch(localhost + 'd3_1')
                .then((res) => res.json())
                .then((data) => {
                    dChart = chart.line('d3_1', color, data)
                    dChart.render()
                    let time
                    dChart.on('tooltip:change', (ev) => {
                        time = ev['data']['title']
                    })
                    dChart.on('plot:click', () => {
                        this.d3_2(time)
                    })
                })
        },
        d3_2(time = '2016-11-18') {
            fetch(localhost + time + '/d3_2')
                .then((res) => res.json())
                .then((data) => {
                    dChart = chart.spiderPie('d3_2', typeColor, data, false, {
                        position: 'bottom',
                    })
                    dChart.render()
                })
        },
        d4() {
            fetch(localhost + '/d4', {
                method: 'post',
                body: JSON.stringify({
                    'lng1': lng1,
                    'lng2': lng2,
                    'lat1': lat1,
                    'lat2': lat2
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    getDiv('t4').innerHTML = "区域入住人员特征分布"
                    dChart = chart.columns('d4', typeColor, data)
                    dChart.render()
                });
        },
        d5(x = '等级') {
            fetch(localhost + x + '/d5', {
                method: 'post',
                body: JSON.stringify({
                    'lng1': lng1,
                    'lng2': lng2,
                    'lat1': lat1,
                    'lat2': lat2
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    getDiv('t5').innerHTML = "不同" + x + "入住人数分布"
                    data = data.sort(function (x, y) {
                        return x.value - y.value
                    })
                    dChart = chart.columns('d5', typeColor, data, false, true, false)
                    dChart.render()
                });
        },
        d6(name = '上海奉贤区奉城镇头桥敬老院') {
            fetch(localhost + name + '/d6')
                .then((res) => res.json())
                .then((data) => {
                    getDiv('t6').innerHTML = name + "入住人数变化"
                    dChart = chart.line('d6', color, data, false)
                    dChart.render()
                })
        },
        d7(x = '性别', name = '上海奉贤区奉城镇头桥敬老院') {
            fetch(localhost + name + '/' + x + '/d7')
                .then((res) => res.json())
                .then((data) => {
                    getDiv('t7').innerHTML = name + "入住人员" + x + '分布'
                    dChart = chart.columns('d7', typeColor, data)
                    dChart.render()
                })
        },
        d8(name = '上海奉贤区奉城镇头桥敬老院') {
            fetch(localhost + name + '/d8')
                .then((res) => res.json())
                .then((data) => {
                    getDiv('t8').innerHTML = "硬件设施变化情况"
                    dChart = chart.columns('d8', typeColor, data, false, true, {
                        position: 'right'
                    }, [1, 1, 1, 1])
                    dChart.render()
                })
        },
        initJgName(name) {
            fetch(localhost + name + '/jgMap')
                .then((res) => res.json())
                .then((data) => {
                    let point = {feature: data[0], lngLat: [data[0]['jd'], data[0]['wd']]}
                    this.d1(point)
                    this.d6(point.feature['name'])
                    this.d7('性别', point.feature['name'])
                    this.d8(point.feature['name'])
                    scene.setCenter(point.lngLat)
                    scene.addPopup(chart.mapPopup(
                        point,
                        `<span style="color: #777">
                                ${point.feature['name']} <br>
                                </span>`
                    ))
                })
        },
        recommend() {
            fetch(localhost + '/recommend', {
                method: 'post',
                body: JSON.stringify({
                    'ratio1': selectTxt('in1'),
                    'ratio2': selectTxt('in2'),
                    'ratio3': selectTxt('in3'),
                    'ratio4': selectTxt('in4'),
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    jgNames = data['names']
                    jgIndex = 0
                    this.initJgName(jgNames[jgIndex])
                });
        },
        jgAdd() {
            jgIndex += 1
            jgIndex %= jgNames.length
            this.initJgName(jgNames[jgIndex])
        },
        jgReduce() {
            jgIndex += jgNames.length - 1
            jgIndex %= jgNames.length
            this.initJgName(jgNames[jgIndex])
        }


    },
    mounted() {
        /**
         * 下拉框加载
         * */
        fetch(localhost + 'rzryxx')
            .then((res) => res.json())
            .then((data) => {
                let L = ['年龄等级', '性别', '老人类型', '等级']
                for (let i in L) {
                    addListOption('in' + (Number(i) + 1).toString(), data[L[i]])
                }
            })


        /**
         * 全局变量加载
         * */
        scene = chart.mapScene(
            'page', 118.537473, 36.921850, 'light',
            10, 15
        )

        scene.on('loaded', () => {
            fetch(localhost + 'jgMap')
                .then((res) => res.json())
                .then((data) => {
                    /**
                     * 初始化
                     * */
                    let firstPoint = {feature: data[0], lngLat: [data[0]['jd'], data[0]['wd']]}
                    this.initJgName(firstPoint.feature['name'])
                    // this.d1(firstPoint)
                    // this.d6(firstPoint.feature['name'])
                    // this.d7('性别', firstPoint.feature['name'])
                    // this.d8(firstPoint.feature['name'])
                    // scene.setCenter(firstPoint.lngLat)
                    // scene.addPopup(chart.mapPopup(
                    //     firstPoint,
                    //     `<span style="color: #777">
                    //             ${firstPoint.feature['name']} <br>
                    //             </span>`
                    // ))
                    lng1 = firstPoint.lngLat[0] - 1
                    lat1 = firstPoint.lngLat[1] - 1
                    lng2 = firstPoint.lngLat[0] + 1
                    lat2 = firstPoint.lngLat[1] + 1
                    this.init()
                    /**
                     * 图层1加载
                     * */
                    l1 = chart.circlePointLayer(data)
                    scene.addLayer(l1)
                    l1.on('click', (ev) => {
                        scene.addPopup(chart.mapPopup(
                            ev,
                            `<span style="color: #777">
                                ${ev.feature['name']} <br>
                                </span>`
                        ))
                        this.d1(ev)
                        this.d6(ev.feature['name'])
                        this.d7('性别', ev.feature['name'])
                        this.d8(ev.feature['name'])
                    })

                })
        })

        /**
         * 地图控制
         * */
        drawControl = chart.drawControl1(scene)
        drawControl.on('draw.create', (e) => {
            let L = e.feature['geometry']['coordinates'][0]
            lng1 = L[0][0]
            lng2 = L[2][0]
            lat1 = L[0][1]
            lat2 = L[2][1]
            this.init()
        });
        scene.addControl(drawControl)

        /**
         * 其余图表加载
         * */
        this.d3_1()
        this.d3_2()


    }

}