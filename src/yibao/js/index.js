import * as chart from './chart'
import {emptyCenterBar1} from './chart'
import {addListOption, changeTextColor, getDiv, getValue, selectTxt} from './base'
import {color, compareColor, typeColors, localhost} from './config'
import {GaodeMap, LineLayer, PointLayer, Popup, Scene} from "@antv/l7";
import {bars, bars2, bars3, feeTransFrom, liquid, pie, words, words2} from "./chart";
import axios from "axios";
// 引入HTML2Canvas库
import html2canvas from 'html2canvas';


/**
 * 全局变量
 * */
let scene, l1, l2, l3, l4, dChart

let yljgml = '盐酸坦索罗辛缓释胶囊' // 医药目录名称
let jzid = "MDTRT_ID_1" // 就诊ID
let ybjgmls = [
    "麻醉中检测",
    "一体式吸氧",
    "低流量吸氧"
] // 选中的医药目录名称列表


export default {
    name: "app",
    components: {},
    data() {
        return {
            visL: 1,
            visR: 1,


            jzid: '',

            /**
             * 左第一页
             * */
            tzxl1: [], // 人员信息特征序列
            checkboxGroup1: ['性别', '民族', '年龄'], // 初始化人员信息分类特征序列
            colors1: [
                // '#89DAC8', '#EAC1CA', '#F4F4B5', '#CF6D73', '#CBE0E0',
                // '#B4EEF4', '#99C08F', '#93DCF2', '#B5F4B5', '#B5F4F4',
                typeColors[0], typeColors[1], typeColors[2], typeColors[3], typeColors[4],
                typeColors[5], typeColors[6], typeColors[7], typeColors[8], typeColors[9],
            ], // 分类色系
            sxValues1: [],
            sxValueRange1: {}, // 人员信息筛选内容范围
            sxValuesMin1: 0,
            sxValuesMax1: 1,
            fzbsJzid: [], // 当前标记的分组就诊ID
            fzbsVis: false, // 是否显示当前分组的就诊ID
            fzbsValue: 0, // 当前标记的分组的分组组号码
            ryxxflL: [0, 1, 2, 3, 4], // 人员信息分类序列
            ryxxflGroup: [1], // 已选择人员信息分类
            r1ElseChartVis: false,


            /**
             * 左第二页
             * */
            tzxl2: [], // 行为识别特征序列
            checkboxGroup2: ['全自费占比', '超限价自费占比', '符合范围占比', '先行自付占比'], // 初始化行为识别特征序列
            colors2: [
                // '#89DAC8', '#EAC1CA', '#F4F4B5', '#CF6D73', '#CBE0E0',
                // '#B4EEF4', '#99C08F', '#93DCF2', '#B5F4B5', '#B5F4F4',
                typeColors[0], typeColors[1], typeColors[2], typeColors[3], typeColors[4],
                typeColors[5], typeColors[6], typeColors[7], typeColors[8], typeColors[9],
            ], // 分类色系
            sxValues2: [],
            sxValueRange2: {}, // 行为识别筛选内容范围
            sxValuesMin2: 0,
            sxValuesMax2: 1,
            fzbsflL: [1, 2, 3, 4], // 人员信息分类序列
            fzbsflGroup: [1], // 已选择人员信息分类
            r2ElseChartVis: false,


            /**
             * 右第三页
             * */
            jzid1: [],
            jzid2: [],


        }
    },
    methods: {
        messageF(text) {
            this.$notify({
                title: '成功',
                message: text,
                type: 'success'
            });
        },
        selectTxt(div) {
            return selectTxt(div)
        },

        /**
         * 菜单选取
         * */
        leftMenuClick(ev) {
            this.visL = Number(ev)
            if (Number(ev) !== 1) {
                this.r1ElseChartVis = false
                this.fzbsVis = false
            } else if (Number(ev) !== 2) {
                this.r2ElseChartVis = false
            }
        },
        rightMenuClick(ev) {
            this.visR = Number(ev)
        },


        /**
         * 左第一页
         * */
        tzxl1SelInit() {
            fetch(localhost + '/tzxl1')
                .then((res) => res.json())
                .then((data) => {
                    this.tzxl1 = data['tzxl1']
                    this.tzxled1()
                })
        }, // 人员信息分类特征序列下拉框初始化
        tzxl1Selected() {

        }, // 选择特征序列后
        tzxled1() {
            fetch(localhost + 'tzxled1')
                .then((res) => res.json())
                .then((data) => {
                    this.checkboxGroup1 = data['tzxl1']
                })
        },
        changeTextColor(id) {
            changeTextColor(id)
            if (id.indexOf('color1_') !== -1) {
                this.colors1[Number(id.replace('color1_', '')) - 1] = getValue(id)
            } else if (id.indexOf('color2_') !== -1) {
                this.colors2[Number(id.replace('color2_', '')) - 1] = getValue(id)
            }
        },
        colors1Init() {
            for (let i in this.colors1) {
                let id = 'color1_' + (Number(i) + 1).toString()
                getDiv(id).value = this.colors1[i]
                changeTextColor(id)
            }
        }, // 人员信息分类编码色系初始化
        classify1() {
            fetch(localhost + '/classify1', {
                method: 'post',
                body: JSON.stringify({
                    'headers': this.checkboxGroup1,
                    'classifyNum': getValue('classifyNum'),
                    'randomState': getValue('randomState'),
                    'classifyType': getValue('classifyType'),
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    this.messageF(data['message'])
                    this.sxHeader1Init()
                    this.data1Gl()
                    this.r1Init()
                    this.ryxxflGroup = []
                    this.ryxxflL = []
                    for (let i = 0; i < Number(getValue('classifyNum')); i += 1) {
                        this.ryxxflL.push(i)
                    }
                })
        }, // 人员信息分类
        sxHeader1Init() {
            fetch(localhost + 'sxHeader1')
                .then((res) => res.json())
                .then((data) => {
                    addListOption('sxHeader1', data['headers'])
                    this.sxValues1 = []
                    this.sxValueRange1 = {}
                    this.sxValuesMin1 = 0
                    this.sxValuesMax1 = 1
                    for (let i in data['headers']) {
                        let header = data['headers'][i]
                        fetch(localhost + header + '/sxValues1')
                            .then((res) => res.json())
                            .then((data) => {
                                this.sxValueRange1[header] = [data['min'], data['max']]
                            })
                    }
                    this.sxValue1Init()
                })
        }, // 人员信息筛选字段
        sxValue1Init() {
            fetch(localhost + selectTxt('sxHeader1') + '/sxValue1')
                .then((res) => res.json())
                .then((data) => {
                    addListOption('sxValue1', data['values'])
                    this.sxValues1Init()
                })
        }, // 人员信息筛选值
        sxValues1Init() {
            let header = selectTxt('sxHeader1')
            this.sxValues1 = this.sxValueRange1[header]
            this.sxValuesMin1 = this.sxValues1[0]
            this.sxValuesMax1 = this.sxValues1[1]
        }, // 范围更新
        sxValues1Change() {
            let header = selectTxt('sxHeader1')
            this.sxValueRange1[header] = this.sxValues1
        }, // 筛选范围修改
        data1Gl() {
            fetch(localhost + '/data1Gl', {
                method: 'post',
                body: JSON.stringify({
                    'sxValueRange': this.sxValueRange1,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    this.messageF(data['message'])
                    this.r1Init()
                })
        }, // 人员信息聚类数据过滤
        sxValuesChangeWith_data1Gl() {
            this.sxValues1Change()
            this.data1Gl()
        }, // 滑块过滤
        r1Init() {
            fetch(localhost + 'r1')
                .then((res) => res.json())
                .then((data) => {
                    this.fzbsJzid = []
                    l1.show()
                    l2.hide()
                    l3.hide()
                    l4.hide()
                    l1.setData(data)
                })
        }, // 人员信息聚类画像更新
        clickR1Point(ev, flag) {
            this.r1ElseChartVis = true
            if (flag) {
                scene.setCenter([ev.feature['x'], ev.feature['y']]) // 设置视野中心
            }
            fetch(localhost + ev.feature['就诊ID'] + '/' + 'readFzbs')
                .then((res) => res.json())
                .then((data) => {
                    let group = data['group']
                    let div = `<span >${ev.feature['就诊ID']}</span>` + `<br>` +
                        `<div>分组标识: </div><input id="fzbs"/><button id="fzbsEnter"">确认</button>` + `<br>` +
                        `<div id="R1chart3" style="width: 200px; height: 200px"></div>`
                    scene.addPopup(new Popup({
                            offsets: [0, 0],
                            closeButton: false
                        })
                            .setLnglat(ev.lngLat)
                            .setHTML(div)
                    )
                    dChart = chart.radar('R1chart3', compareColor, ev['chart3'])
                    dChart.render()
                    /**
                     * 其余图表
                     * */
                    this.jzid = ev.feature['就诊ID']
                    let fa = getDiv('R1chart1')
                    let texts = ['报销平均频率', '报销最大频率', '报销最大金额', '小额多次']
                    for (let i = 0; i < 2; i += 1) {
                        for (let j = 0; j < 2; j += 1) {
                            let child = document.createElement('div')
                            child.id = 'R1chart1_' + (i * 2 + j).toString()
                            child.style.position = 'absolute'
                            child.style.width = '49%'
                            child.style.height = '49%'
                            child.style.left = (i * 50).toString() + '%'
                            child.style.top = (j * 50).toString() + '%'
                            fa.appendChild(child)
                            dChart = liquid(child.id, color, ev['chart1'][texts[
                                Number(i * 2 + j)
                                ]], texts[Number(i * 2 + j)])
                            dChart.render()
                        }
                    }
                    dChart = feeTransFrom('R1chart2', compareColor, ev['chart2'])
                    dChart.on('click', (e) => {
                        yljgml = e['item']['_cfg']['id']
                        this.rank1()
                    })
                    getDiv('fzbs').value = group
                    document.getElementById('fzbsEnter').onclick = function () {
                        fetch(localhost + ev.feature['就诊ID'] + '/' + getValue('fzbs') + '/addFzbs')
                            .then((res) => res.json())
                            .then(() => {

                            })
                    }
                    /**
                     * 更新分组就诊ID列表
                     * */
                    l1.on('dblclick', () => {
                        this.fzbsVis = true
                        if (this.fzbsJzid.indexOf(ev.feature['就诊ID']) === -1) {
                            this.fzbsJzid.push(ev.feature['就诊ID'])
                        }
                    })
                })
        }, // 点击图层中的点
        classify1Socre() {
            fetch(localhost + '/classify1Score', {
                method: 'post',
                body: JSON.stringify({
                    'headers': this.checkboxGroup1,
                    'classifyNum': getValue('classifyNum'),
                    'randomState': getValue('randomState'),
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    dChart = chart.line1('r2_1', compareColor, data['score'])
                    dChart.render()

                    let div = getDiv('r2_2')
                    let clsNum = 2
                    for (let i = 0; i < 2; i++) {
                        for (let j = 0; j < 5; j++) {
                            let idStr = (clsNum).toString()
                            let child = document.createElement('div')
                            child.style.position = 'absolute'
                            child.style.width = '19%'
                            child.style.height = '49%'
                            child.style.left = (j * 20).toString() + '%'
                            child.style.top = (i * 50).toString() + '%'
                            child.style.borderWidth = '1px'
                            child.style.borderStyle = 'groove'
                            let content = document.createElement('div')
                            content.style.position = 'absolute'
                            content.style.width = '100%'
                            content.style.height = '90%'
                            content.style.left = '0'
                            content.style.top = '10%'
                            content.id = 'r2_2_' + idStr
                            let title = document.createElement('div')
                            title.innerHTML = '分类数为' + idStr
                            title.style.position = 'absolute'
                            title.style.width = '100%'
                            title.style.height = '10%'
                            title.style.left = '0'
                            title.style.top = '0'
                            child.appendChild(content)
                            child.appendChild(title)
                            div.appendChild(child)
                            dChart = chart.scatter1(content.id, this.colors1, data['datas'][idStr])
                            dChart.render()
                            clsNum += 1
                        }
                    }
                })
        }, // 人员信息聚类分数识别
        handleClose_fzbsJzid(tag) {
            this.fzbsJzid.splice(this.fzbsJzid.indexOf(tag), 1)
        }, // 删除当前分组的就诊ID
        fzbj() {
            fetch(localhost + '/fzbj', {
                method: 'post',
                body: JSON.stringify({
                    'jzid': this.fzbsJzid,
                    'fzbsValue': this.fzbsValue
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    this.messageF(data['message'])
                    this.fzbsJzid = []
                })
        }, //分组标记
        rankHeaders1() {
            fetch(localhost + 'rankHeaders1')
                .then((res) => res.json())
                .then((data) => {
                    addListOption('rankHeaders1', data['rankHeaders1'])
                    this.rank1()
                })
        }, // 更新rank字段
        rank1() {
            fetch(localhost + '/rank1', {
                method: 'post',
                body: JSON.stringify({
                    'yljgml': yljgml,
                    'ratio': selectTxt('rankHeaders1'),
                    'L': this.ryxxflGroup
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    getDiv('t_rank1').innerHTML = yljgml + selectTxt('rankHeaders1') + '排行画像'
                    dChart = chart.bar1('rank1', color, data)
                    dChart.render()
                    dChart.on('click', (ev) => {
                        let id = ev['data']['data']['name']
                        fetch(localhost + id + '/rank1Click', {
                            method: 'post',
                            body: JSON.stringify({
                                'ybjgmls': ybjgmls,
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                this.clickR1Point(data, true)
                            })
                    })
                    dChart.on('dblclick', (ev) => {
                        let id = ev['data']['data']['name']
                        this.fzbsVis = true
                        if (this.fzbsJzid.indexOf(id) === -1) {
                            this.fzbsJzid.push(id)
                        }
                    })
                })
        }, // 排名视图1


        /**
         * 左第二页
         * */
        tzxl2SelInit() {
            fetch(localhost + '/tzxl2')
                .then((res) => res.json())
                .then((data) => {
                    this.tzxl2 = data['tzxl2']
                    this.tzxled2()
                })
        }, //行为识别特征序列下拉框初始化
        tzxl2Selected() {

        }, // 选择特征序列后
        tzxled2() {
            fetch(localhost + 'tzxled2')
                .then((res) => res.json())
                .then((data) => {
                    this.checkboxGroup2 = data['tzxl2']
                })
        },
        colors2Init() {
            for (let i in this.colors2) {
                let id = 'color2_' + (Number(i) + 1).toString()
                getDiv(id).value = this.colors2[i]
                changeTextColor(id)
            }
        }, // 行为识别分组分类编码色系初始化
        classify2() {
            fetch(localhost + '/classify2', {
                method: 'post',
                body: JSON.stringify({
                    'headers': this.checkboxGroup2,
                    'defineType': selectTxt('defineType'),
                    'defineFun': selectTxt('defineFun'),
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    this.messageF(data['message'])
                    this.fzbsflL = data['fzbsflL']
                    this.fzbsflGroup = [this.fzbsflL[0]]
                    this.sxHeader2Init()
                    this.data2Gl()
                    this.r2Init()
                    /**
                     * 簇类对比
                     * */
                    this.r3_rela()
                })
        }, // 行为识别
        sxHeader2Init() {
            fetch(localhost + 'sxHeader2')
                .then((res) => res.json())
                .then((data) => {
                    addListOption('sxHeader2', data['headers'])
                    for (let i in data['headers']) {
                        let header = data['headers'][i]
                        fetch(localhost + header + '/sxValues2')
                            .then((res) => res.json())
                            .then((data) => {
                                this.sxValueRange2[header] = [data['min'], data['max']]
                            })
                    }
                    this.sxValue2Init()
                })
        }, // 行为识别筛选字段
        sxValue2Init() {
            fetch(localhost + selectTxt('sxHeader2') + '/sxValue2')
                .then((res) => res.json())
                .then((data) => {
                    addListOption('sxValue2', data['values'])
                    this.sxValues2Init()
                })
        }, // 行为识别筛选值
        sxValues2Init() {
            let header = selectTxt('sxHeader2')
            this.sxValues2 = this.sxValueRange2[header]
            this.sxValuesMin2 = this.sxValues2[0]
            this.sxValuesMax2 = this.sxValues2[1]
        }, // 范围更新
        sxValues2Change() {
            let header = selectTxt('sxHeader2')
            this.sxValueRange2[header] = this.sxValues2
        }, // 筛选范围修改
        data2Gl() {
            fetch(localhost + '/data2Gl', {
                method: 'post',
                body: JSON.stringify({
                    'sxValueRange': this.sxValueRange2,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    this.messageF(data['message'])
                    this.r2Init()
                })
        }, // 行为识别数据过滤
        sxValuesChangeWith_data2Gl() {
            this.sxValues2Change()
            this.data2Gl()
        }, // 滑块过滤
        r2Init() {
            fetch(localhost + 'r2')
                .then((res) => res.json())
                .then((data) => {
                    l1.hide()
                    l2.show()
                    l3.hide()
                    l4.hide()
                    l2.setData(data)
                })
        }, // 行为识别画像更新
        clickR2Point(ev, flag) {
            this.r2ElseChartVis = true
            if (flag) {
                scene.setCenter([ev.feature['x'], ev.feature['y']])
            }
            /**
             * R2chart1
             * */
            getDiv('tR2chart1').innerHTML = jzid + ' 报销医药画像'
            dChart = bars3('R2chart1', compareColor, ev['s1'])
            dChart.render()
            dChart.on('plot:click', (ev) => {
                yljgml = ev['data']['data']['name1']
                fetch(localhost + jzid + '/' + yljgml + '/rank2Click_s2')
                    .then((res) => res.json())
                    .then((data) => {
                        getDiv('tR2chart2').innerHTML = jzid + yljgml + '费用占比'
                        dChart = pie('R2chart2', typeColors, data['s2'])
                        dChart.render()
                    })

            })
            /**
             * R2chart1
             * */
            getDiv('tR2chart2').innerHTML = jzid + yljgml + '费用占比'
            getDiv('tR2chart2').style.fontSize = '14px'
            dChart = pie('R2chart2', typeColors, ev['s2'])
            dChart.render()
            scene.addPopup(new Popup({
                    offsets: [0, 0],
                    closeButton: false
                })
                    .setLnglat(ev.lngLat)
                    .setHTML(
                        `<span>${ev.feature['就诊ID']}</span>` +
                        `<div>分组标识: </div><input id="fzbs"/><button id="fzbsEnter">校正</button>`
                    )
            )
            getDiv('fzbs').value = ev.feature['分组标识']
            document.getElementById('fzbsEnter').onclick = function () {
                fetch(localhost + ev.feature['就诊ID'] + '/' + getValue('fzbs') + '/initFzbs')
                    .then((res) => res.json())
                    .then(() => {
                    })
            }
        },
        rankHeaders2() {
            fetch(localhost + 'rankHeaders2')
                .then((res) => res.json())
                .then((data) => {
                    addListOption('rankHeaders2', data['rankHeaders2'])
                    this.rank2()
                })
        }, // 更新rank字段
        rank2() {
            fetch(localhost + '/rank2', {
                method: 'post',
                body: JSON.stringify({
                    'ratio': selectTxt('rankHeaders2'),
                    'L': this.fzbsflGroup
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    getDiv('t_rank2').innerHTML = selectTxt('rankHeaders2') + '排行画像'
                    dChart = chart.bar1('rank2', color, data)
                    dChart.render()
                    dChart.on('click', (ev) => {
                        let id = ev['data']['data']['name']
                        fetch(localhost + id + '/' + yljgml + '/rank2Click')
                            .then((res) => res.json())
                            .then((data) => {
                                this.clickR2Point(data, true)
                            })
                    })
                })
        }, // 排名视图2


        /**
         * 左第三页
         * */
        r3_rela() {
            fetch(localhost + 'r3_rela')
                .then((res) => res.json())
                .then((data) => {
                    addListOption('r3_rela', data['r3_rela'])
                    this.r3_size()
                })
        }, // r3的关系下拉框加载
        r3_size() {
            fetch(localhost + 'r3_size')
                .then((res) => res.json())
                .then((data) => {
                    addListOption('r3_size', data['r3_size'])
                    fetch(localhost + selectTxt('r3_rela') + '/' + selectTxt('r3_size') + '/r3')
                        .then((res) => res.json())
                        .then((data) => {
                            l3 = new PointLayer({})
                                .source(data['s1'], {
                                    parser: {
                                        type: 'json',
                                        x: 'x',
                                        y: 'y'
                                    }
                                })
                                .shape('circle')
                                .size(selectTxt('r3_size'), [4, 10])
                                .color('分组标识', this.colors2)
                                .active(true)
                                .style({
                                    opacity: 0.9,
                                    strokeWidth: 0
                                });
                            scene.addLayer(l3)
                            l4 = new LineLayer({
                                blend: 'normal'
                            }).source(data['s2'], {
                                parser: {
                                    type: 'json',
                                    x: 'x1',
                                    y: 'y1',
                                    x1: 'x2',
                                    y1: 'y2'
                                }
                            })
                                .size('size', [0.5, 2])
                                .shape('line')
                                .color('color', this.colors2)
                                .animate(false)
                                .style({
                                    opacity: 0.05
                                });
                            scene.addLayer(l4)
                            l3.hide()
                            l4.hide()
                            let div
                            l3.on('mousemove', (ev) => {
                                let id = ev.feature['就诊ID']
                                div = new Popup({
                                    offsets: [0, 0],
                                    closeButton: false
                                })
                                    .setLnglat(ev.lngLat)
                                    .setHTML(`<div>就诊ID: ${id}</div>`)
                                scene.addPopup(div)
                            })
                            l3.on('click', (ev) => {
                                let id = ev.feature['就诊ID']
                                if (this.jzid1.indexOf(id) === -1) {
                                    this.jzid1.push(id)
                                }
                                this.r3l()
                                this.relaHeat(this.jzid1, 'l3_heat1')
                                fetch(localhost + '/bzmcWords', {
                                    method: 'post',
                                    body: JSON.stringify({
                                        'jzidL': this.jzid1,
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }).then((res) => res.json())
                                    .then((data) => {
                                        console.log(data)
                                        dChart = words2('l3_words1', color, data)
                                        dChart.render()
                                    })
                            })
                            l3.on('contextmenu', (ev) => {
                                let id = ev.feature['就诊ID']
                                if (this.jzid2.indexOf(id) === -1) {
                                    this.jzid2.push(id)
                                }
                                this.r3r()
                                this.relaHeat(this.jzid2, 'l3_heat2')
                                fetch(localhost + '/bzmcWords', {
                                    method: 'post',
                                    body: JSON.stringify({
                                        'jzidL': this.jzid2,
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }).then((res) => res.json())
                                    .then((data) => {
                                        dChart = words2('l3_words2', color, data)
                                        dChart.render()
                                    })
                            })
                            l3.on('dblclick', (ev) => {
                                let id = ev.feature['就诊ID']
                                if (this.jzid2.indexOf(id) === -1) {
                                    this.jzid2.push(id)
                                }
                                this.r3r()
                                this.relaHeat(this.jzid2, 'l3_heat2')
                                fetch(localhost + '/bzmcWords', {
                                    method: 'post',
                                    body: JSON.stringify({
                                        'jzidL': this.jzid2,
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }).then((res) => res.json())
                                    .then((data) => {
                                        dChart = words('l3_words2', color, data)
                                        dChart.render()
                                    })
                            })
                        })
                })
        }, // r3的size下拉框加载
        r3Init() {
            fetch(localhost + selectTxt('r3_rela') + '/' + selectTxt('r3_size') + '/r3')
                .then((res) => res.json())
                .then((data) => {
                    l1.hide()
                    l2.hide()
                    l3.show()
                    l4.show()
                    l3.setData(data['s1'])
                    l4.setData(data['s2'])
                    this.jzid1 = []
                    this.jzid2 = []
                })
        }, // 簇类对比画像更新
        handleClose1(tag) {
            this.jzid1.splice(this.jzid1.indexOf(tag), 1);
            this.r3l()
            this.relaHeat(this.jzid1, 'l3_heat1')
        }, // 簇类1就诊ID删除
        handleClose2(tag) {
            this.jzid2.splice(this.jzid2.indexOf(tag), 1);
            this.r3r()
            this.relaHeat(this.jzid2, 'l3_heat2')
        }, // 簇类2就诊ID删除
        l3_scatter1() {
            fetch(localhost + '/l3_scatter', {
                method: 'post',
                body: JSON.stringify({
                    'jzid': this.jzid1,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    dChart = chart.scatter2('l3_scatter1', ['#aaa', color[0]], data)
                    dChart.render()
                })
        },
        l3_scatter2() {
            fetch(localhost + '/l3_scatter', {
                method: 'post',
                body: JSON.stringify({
                    'jzid': this.jzid2,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    dChart = chart.scatter2('l3_scatter2', ['#aaa', color[0]], data)
                    dChart.render()
                })
        },
        relaHeat(jzidL, id) {
            fetch(localhost + '/relaHeat', {
                method: 'post',
                body: JSON.stringify({
                    'jzidL': jzidL,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    dChart = chart.headerMap(id, color, data)
                    dChart.render()
                })
        },


        /**
         * 右第三页
         * */

        relationHeader() {
            return selectTxt('relationHeader')
        },
        r3() {
            this.r3l()
            this.r3r()
        },
        r3l() {
            /**
             * 簇类1
             * */
            this.r3_1(this.jzid1, 'dr3_1l')
            this.r3_2(this.jzid1, 'dr3_2l', 'tr3_2l')
            this.r3_3(this.jzid1, 'dr3_3l')
            this.r3_4(this.jzid1, 'dr3_4l', 'tr3_4l')
            this.l3_scatter1()
        },
        r3r() {
            /**
             * 簇类2
             * */
            this.r3_1(this.jzid2, 'dr3_1r')
            this.r3_2(this.jzid2, 'dr3_2r', 'tr3_2r')
            this.r3_3(this.jzid2, 'dr3_3r')
            this.r3_4(this.jzid2, 'dr3_4r', 'tr3_4r')
            this.l3_scatter2()
        },
        r3_1(jzidL, id) {
            fetch(localhost + '/r3_1', {
                method: 'post',
                body: JSON.stringify({
                    'relationHeader': this.relationHeader(),
                    'jzidL': jzidL,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    dChart = emptyCenterBar1(id, compareColor, data)
                    dChart.render()
                    dChart.on('plot:click', (ev) => {
                        let kdks = ev['data']['data']['name2']
                        this.r3_2(this.jzid1, 'dr3_2l', 'tr3_2l', kdks)
                        this.r3_3(this.jzid1, 'dr3_3l', kdks)
                        this.r3_2(this.jzid2, 'dr3_2r', 'tr3_2r', kdks)
                        this.r3_3(this.jzid2, 'dr3_3r', kdks)
                    })
                });
        },
        r3_2(jzidL, id, tId, kdks = '麻醉苏醒室') {
            let relationValue = kdks
            fetch(localhost + '/r3_2', {
                method: 'post',
                body: JSON.stringify({
                    'relationHeader': this.relationHeader(),
                    'relationValue': relationValue,
                    'ybjgmls': ybjgmls,
                    'jzidL': jzidL,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    getDiv(tId).innerHTML = relationValue + '医药开具数量情况'
                    dChart = words(id, compareColor, data)
                    dChart.render()
                    // 增加医药目录名称数量
                    dChart.on('click', (ev) => {
                        ybjgmls.push(ev['data']['data']['text'])
                        yljgml = ev['data']['data']['text']
                        this.r3_2(this.jzid1, 'dr3_2l', 'tr3_2l', kdks)
                        this.r3_3(this.jzid1, 'dr3_3l', kdks)
                        this.r3_2(this.jzid2, 'dr3_2r', 'tr3_2r', kdks)
                        this.r3_3(this.jzid2, 'dr3_3r', kdks)
                        this.rank1()
                    })
                    // 删除医药目录
                    dChart.on('contextmenu', (ev) => {
                        for (let i in ybjgmls)
                            if (ybjgmls[i] === ev['data']['data']['text'])
                                delete ybjgmls[i]
                    })
                });
        },
        r3_3(jzidL, id, kdks = '麻醉苏醒室') {
            fetch(localhost + '/r3_3', {
                method: 'post',
                body: JSON.stringify({
                    'relationHeader': this.relationHeader(),
                    'relationValue': kdks,
                    'ybjgmls': ybjgmls,
                    'jzidL': jzidL,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    dChart = bars(id, color, data)
                    dChart.render()
                    dChart.on('plot:click', (ev) => {
                        yljgml = ev['data']['data']['name2']
                        jzid = ev['data']['data']['name1']
                        this.r3_4(this.jzid1, 'dr3_4l', 'tr3_4l')
                        this.r3_4(this.jzid2, 'dr3_4r', 'tr3_4r')
                        this.rank1()
                    })
                });
        },
        r3_4(jzidL, id, tId) {
            fetch(localhost + '/r3_4', {
                method: 'post',
                body: JSON.stringify({
                    'yljgml': yljgml,
                    'jzidL': jzidL
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    getDiv(tId).innerHTML = yljgml + '支付/报销费用对比'
                    dChart = bars2(id, compareColor, data)
                    dChart.render()
                    dChart.on('plot:click', (ev) => {
                        jzid = ev['data']['data']['name1']
                    })
                })
        },
        clear_yljgml() {
            ybjgmls = []
            this.r3_2(this.jzid1, 'dr3_2l', 'tr3_2l')
            this.r3_2(this.jzid2, 'dr3_2r', 'tr3_2r')
        },


        /**
         * 数据下载
         * */
        downloadCsv() {
            let csvName
            if (this.visL === 1) {
                csvName = '_data1'
            } else if (this.visL === 2) {
                csvName = '_data2'
            }
            let url = localhost + 'download/' + csvName
            axios.get(url).then(response => {
                // 创建a标签
                let a = document.createElement("a");
                a.download = 'data.csv';
                // 创建二进制对象
                const blob = new Blob([response.data]);
                const downloadURL = (window.URL || window.webkitURL).createObjectURL(blob);
                a.href = downloadURL;
                // 模拟点击
                a.click();
                //释放资源并删除创建的a标签
                URL.revokeObjectURL(downloadURL);// a.href
                document.body.removeChild(a);
            }).catch(error => {
                console.log(error);
            });
        },

        /**
         * 画像保存
         * */
        divSave(e) {
            function save(divId, name) {
                // 获取要保存为png的div元素
                const divElement = document.getElementById(divId);
                // 使用html2canvas将div转换为canvas
                html2canvas(divElement).then(canvas => {
                    // 创建一个新的canvas元素
                    const newCanvas = document.createElement('canvas');
                    newCanvas.width = canvas.width;
                    newCanvas.height = canvas.height;

                    // 将canvas上的内容绘制到新的canvas上
                    const ctx = newCanvas.getContext('2d');
                    ctx.drawImage(canvas, 0, 0);

                    // 将新的canvas转换为png格式的图片
                    newCanvas.toBlob(blob => {
                        // 创建一个下载链接
                        const downloadLink = document.createElement('a');
                        downloadLink.href = URL.createObjectURL(blob);
                        downloadLink.download = name + '.png';

                        // 模拟点击下载链接
                        downloadLink.click();

                        // 释放URL对象
                        URL.revokeObjectURL(downloadLink.href);
                    }, 'image/png');
                });
            }

            if(e === 'R1chart1') {
                save(e, this.jzid + "_行为指标")
            } else if(e === 'R1chart2') {
                save(e, this.jzid + "_费用转移")
            } else if(e === 'R2chart1') {
                save(e, getDiv('tR2chart1').innerHTML)
            } else if(e === 'R2chart2') {
                save(e, getDiv('tR2chart2').innerHTML)
            }
        },


    },
    mounted() {
        /**
         * 左第一页
         * */
        this.tzxl1SelInit()
        this.colors1Init()
        addListOption('classifyType', ['kmeans', 'tsne'])
        this.sxHeader1Init()
        scene = new Scene({
            id: 'r1',
            map: new GaodeMap({
                style: 'xxx',
                center: [0, 0],
                zoom: 2
            })
        });
        fetch(localhost + 'r1')
            .then((res) => res.json())
            .then((data) => {
                l1 = new PointLayer({})
                    .source(data, {
                        parser: {
                            type: 'json',
                            x: 'x',
                            y: 'y'
                        }
                    })
                    .shape('circle')
                    .size(5)
                    .color('人员信息分类', this.colors1)
                    .active(true)
                    .style({
                        opacity: 0.8,
                        strokeWidth: 0
                    });
                scene.addLayer(l1)
                l1.on('click', (ev) => {
                    fetch(localhost + ev.feature['就诊ID'] + '/rank1Click', {
                        method: 'post',
                        body: JSON.stringify({
                            'ybjgmls': ybjgmls,
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            this.clickR1Point(data, false)
                        })
                })
                l1.hide()
            })
        this.rankHeaders1()

        /**
         * 左第二页
         * */
        this.tzxl2SelInit()
        this.colors2Init()
        addListOption('defineType', [
            'BaggingClassifier',
            'XGBClassifier',
            'ExtraTreesClassifier',
            'RandomForestClassifier'
        ])
        addListOption('defineFun', ['分组识别', '非分组识别'])
        this.sxHeader2Init()
        fetch(localhost + 'r2')
            .then((res) => res.json())
            .then((data) => {
                l2 = new PointLayer({})
                    .source(data, {
                        parser: {
                            type: 'json',
                            x: 'x',
                            y: 'y'
                        }
                    })
                    .shape('circle')
                    .size(5)
                    .color('分组标识', this.colors2)
                    .active(true)
                    .style({
                        opacity: 0.8,
                        strokeWidth: 0
                    });
                scene.addLayer(l2)
                l2.on('click', (ev) => {
                    let id = ev.feature['就诊ID']
                    fetch(localhost + id + '/' + yljgml + '/rank2Click')
                        .then((res) => res.json())
                        .then((data) => {
                            this.clickR2Point(data, false)
                        })
                })
                l2.hide()
            })
        fetch(localhost + 'fzbsUnique')
            .then((res) => res.json())
            .then((data) => {
                this.fzbsflL = data['fzbsflL']
                this.fzbsflGroup = [this.fzbsflL[0]]
                this.rankHeaders2()
            })


        /**
         * 左第三页
         * */
        this.r3_rela()


        /**
         * 右第三页
         * */
        addListOption('relationHeader', ['开单科室名称', '定点医药机构名称', '医药机构目录名称', '病种名称'])
        this.r3()


    }

}