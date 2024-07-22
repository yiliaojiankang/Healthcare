import {getDiv, cleanDiv, addListOption} from './base'
import {localhost, color, typeColors, compareColor} from './config'


/**
 * chart导入
 * */
import * as chart from './chart'
import {PointLayer, Popup, Scene} from "@antv/l7";
import {GaodeMap} from '@antv/l7-maps';
import {selectTxt} from "./base";
import * as echarts from "echarts";
import {Pie, Treemap} from "@antv/g2plot";



/**
 * 全局变量
 * */
let scene, dChart
let l1


export default {
    name: "app",
    components: {},
    data() {
        return {
            /**
             * 人体画像
             * */
            bodyVis: 1,
            body3Vis: 1,
            ids: ['d0', 'd01', 'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'd11', 'd12', 'd13', 'd14', 'd15', 'd16', 'd17', 'd18', 'd19'],
            qg: '肺',
            qgVis: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            qgs: ['', '脑', '鼻', '眼', '眼', '喉', '耳', '肺', '心', '肝胆', '胰', '胃', '肝胆', '小肠', '大肠', '肾', '泌尿', '腿', '腿', '血管'],
            qgs2: ['血管', '脑', '眼', '眼', '耳', '耳', '鼻', '嘴', '喉', '手', '', '手', '肺', '肺', '心', '胃', '肝胆', '小肠', '泌尿', '腿', '腿'],
            qgNames: ['', '脑部', '鼻子', '眼部', '眼部', '喉腔', '耳朵', '肺部', '心脏', '肝胆', '胰腺', '胃部', '肝胆', '小肠', '大肠', '肾脏', '泌尿', '关节', '关节', '血液'],
            svgNames: ['', '脑', '鼻子', '眼睛', '眼睛', '嘴唇', '耳朵', '肺', '心', '肝脏', '胰腺', '胃', '胆囊', '小肠', '大肠', '肾脏', '膀胱', '膝关节', '膝关节', '血'],
            qgWordsIds: [
                'd0_200', 'd0_201', 'd0_202', 'd0_203', 'd0_204', 'd0_205',
                'd0_206', 'd0_207', 'd0_208', 'd0_209', 'd0_2010',
                'd0_2011', 'd0_2012', 'd0_2013', 'd0_2014', 'd0_2015',
                'd0_2016', 'd0_2017', 'd0_2018', 'd0_2019', 'd0_2020'
            ],
            jiQunIds: [
                '0_301', '0_302', '0_303', '0_304', '0_305',
                '0_306', '0_307', '0_308', '0_309', '0_3010',
                '0_3011', '0_3012',
            ],
            jiQunQgs: [
                '脑', '鼻', '肺', '心', '胃', '肝胆', '小肠', '大肠', '肾', '泌尿', '腿', '血管'
            ],
            jiQunNames: [
                '脑部', '鼻子', '肺部', '心脏', '胃部', '肝胆', '小肠', '大肠', '肾脏', '泌尿', '关节', '血液'
            ],
            gfQg: ['脑', '心', '肺', '小肠', '胃'],


            /**
             * 页面是否显示
             * */
            visP: 1,

            /**
             * 左边图
             * */
            ageRange: [70, 72],

            /**
             * 筛选字段
             * */
            cybqs: [],
            cybqGroup: [],
            qgmcs: [],
            qgmcGroup: [],
            rylbs: [],
            rylbGroup: [],


            /**
             * 第二页
             * */
            xbGroup2: ['男'],
            xbs: ['男', '女'],


            /**
             * 第三页
             * */
            table_data_data: [],
            table_columns_data: [],
            jzid: "1001Z810000000ZD6SNP",
            zdmc: '肺恶性肿瘤',


            /**
             * 第四页
             * */
            xbGroup4: '男',
            ageSel4: 70,
            lastZdmc: '',
            zzTextInput: '',
            jyxmValue: '',
            ycbs: '',


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
        /**
         *  人体画像
         *
         */
        moveQg(id, ev) {
            if (this.qgVis[ev] === 0) {
                document.getElementById(id).src = require("../img/彩色/" + this.svgNames[ev] + ".svg")
            }
        },
        leaveQg(id, ev) {
            if (this.qgVis[ev] === 0) {
                document.getElementById(id).src = require("../img/黑白/" + this.svgNames[ev] + ".svg")
            }
        },
        clickQg(id, ev) {
            if (this.qgVis[ev] === 0) {
                document.getElementById(id).src = require("../img/彩色/" + this.svgNames[ev] + ".svg")
                this.qgVis[ev] = 1
                this.qg = this.qgs[ev]
                if (this.visP === 2) {
                    this.fmd4()
                } else if (this.visP === 3) {
                    this.fmd1()
                    this.fmd8()
                    this.fmd11()
                }
            } else {
                document.getElementById(id).src = require("../img/黑白/" + this.svgNames[ev] + ".svg")
                this.qgVis[ev] = 0
            }
        },
        clickQgWords(ev) {
            let qgs = ['血管', '脑', '眼', '眼', '耳', '耳', '鼻', '嘴', '喉', '手', '', '手', '肺', '肺', '心', '胃', '肝胆', '小肠', '泌尿', '腿', '腿']
            let qg = qgs[ev]
        },
        fbody2() {
            for (let i in this.qgWordsIds) {
                let qg = this.qgs2[i]
                fetch(localhost + this.xbGroup2 + "/" + this.ageRange + "/" + qg + '/body2')
                    .then((res) => res.json())
                    .then((data) => {
                        if (Number(i) === 9) {
                            i = Number(i) + 1
                        }
                        dChart = chart.wordsCloud1(this.qgWordsIds[Number(i)], color, data)
                    })
            }
        }, // 人体词云
        fbody3(ev = this.body3Vis) {
            this.body3Vis = ev
            for (let i in this.jiQunIds) {
                if (ev === 1) {
                    fetch(localhost + this.xbGroup4 + "/" + this.ageSel4 + "/" + this.jiQunQgs[i] + "/body3_1")
                        .then((res) => res.json())
                        .then((data) => {
                            getDiv('t' + this.jiQunIds[i]).style.fontSize = '10px'
                            getDiv('t' + this.jiQunIds[i]).innerHTML = this.jiQunNames[i] + "-高发病症"
                            this.d0_3 = chart.bar2('d' + this.jiQunIds[i], color, data)
                        })
                } else if (ev === 2) {
                    fetch(localhost + this.xbGroup4 + "/" + this.ageSel4 + "/" + this.jiQunQgs[i] + "/body3_2")
                        .then((res) => res.json())
                        .then((data) => {
                            getDiv('t' + this.jiQunIds[i]).style.fontSize = '10px'
                            getDiv('t' + this.jiQunIds[i]).innerHTML = this.jiQunNames[i] + "-患病评估"
                            this.d0_3 = chart.liquid1('d' + this.jiQunIds[i], color, data)
                        })
                } else if (ev === 3) {
                    fetch(localhost + this.xbGroup4 + "/" + this.ageSel4 + "/" + this.jiQunQgs[i] + "/body3_3")
                        .then((res) => res.json())
                        .then((data) => {
                            getDiv('t' + this.jiQunIds[i]).style.fontSize = '10px'
                            getDiv('t' + this.jiQunIds[i]).innerHTML = this.jiQunNames[i] + "-季节分布"
                            this.d0_3 = chart.area1('d' + this.jiQunIds[i], color, data)
                        })
                }

            }
        },// 集群指数图


        /**
         * 左边菜单
         * */
        leftMenuClick(tab) {
            this.visP = Number(tab)
            this.inits()
            this.clearBodyImg()
        },
        rightMenuClick(ev) {
            this.bodyVis = Number(ev)
            if(this.bodyVis === 4) {
                this.init()
            }
        },
        changeAgeRange() {
            if (this.visP === 1) {
                this.fmd1()
                this.sxValuesForMd2()
                this.fmd2()
                this.qgImg1()
                this.fmd3()
            } else if (this.visP === 2) {
                this.fmd4()
                this.fmd5()
                this.fmd6()
                this.fmd7()
            } else if (this.visP === 3) {
                this.fmd1()
                this.fmd8()
                this.fmd11()
            }
            if (this.bodyVis === 2) {
                this.fbody2()
            }
        },
        changeXbRange() {
            if (this.visP === 2) {
                this.fmd4()
                this.fmd5()
                this.fmd6()
                this.fmd7()
            }
            if (this.bodyVis === 2) {
                this.fbody2()
            }
        },

        /**
         * 统计分析图表
         * */
        fmd1(qg = this.qg) {
            if (this.visP === 1) {
                fetch(localhost + '/md1', {
                    method: 'post',
                    body: JSON.stringify({
                        'age1': this.ageRange[0],
                        'age2': this.ageRange[1],
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => res.json())
                    .then((data) => {
                        l1.setData(data)
                    })
            } else if (this.visP === 3) {
                fetch(localhost + qg + '/_md1', {
                    method: 'post',
                    body: JSON.stringify({
                        'age1': this.ageRange[0],
                        'age2': this.ageRange[1],
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => res.json())
                    .then((data) => {
                        l1.setData(data)
                    })
            }
        },
        fmd2() {
            fetch(localhost + '/md2', {
                method: 'post',
                body: JSON.stringify({
                    'age1': this.ageRange[0],
                    'age2': this.ageRange[1],
                    'colors': typeColors,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    cleanDiv('md2')
                    dChart = new Treemap('md2', {
                        data,
                        colorField: 'name',
                        legend: false,
                        tooltip: {
                            formatter: (v) => {
                                const root = v.path[v.path.length - 1];
                                return {
                                    name: v.name,
                                    value: `${v.value}(总占比${((v.value / root.value) * 100).toFixed(2)}%)`,
                                };
                            },
                        },
                        color: typeColors,
                        interactions: [{type: 'treemap-drill-down'}],
                        animation: {},
                    });
                    dChart.render()
                })
        },
        clearBodyImg() {
            this.gfQg = []
            for (let i = 1; i <= 19; i++) {
                // document.getElementById(this.ids[i]).src = require("../img/黑白/" + this.svgNames[i] + ".svg")
                this.qgVis[i] = 0
                if (Number(i) < 10) {
                    document.getElementById('d0' + i.toString()).src = require(
                        "../img/黑白/" + this.svgNames[i] + ".svg"
                    )
                    document.getElementById('d0' + i.toString()).style.opacity = '1'
                } else {
                    document.getElementById('d' + i.toString()).src = require(
                        "../img/黑白/" + this.svgNames[i] + ".svg"
                    )
                    document.getElementById('d' + i.toString()).style.opacity = '1'
                }
            }
        },
        qgImg1() {
            fetch(localhost + '/mainQgmc', {
                method: 'post',
                body: JSON.stringify({
                    'age1': this.ageRange[0],
                    'age2': this.ageRange[1],
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    this.clearBodyImg()
                    let L = data['mainQgmc']
                    let V = data['values']
                    let maxValue = data['max']
                    let cnt = 0
                    for (let i in L) {
                        if (this.qgs.indexOf(L[i]) !== -1) {
                            let index = this.qgs.indexOf(L[i])
                            this.gfQg[cnt] = this.qgs[index]
                            cnt += 1
                            this.qgVis[index] = 1
                            if (Number(index) < 10) {
                                document.getElementById('d0' + index.toString()).src = require(
                                    "../img/彩色/" + this.svgNames[index] + ".svg"
                                )
                                document.getElementById('d0' + index.toString()).style.opacity = (Math.max(V[i] / maxValue, 0.5)).toString()
                            } else {
                                document.getElementById('d' + index.toString()).src = require(
                                    "../img/彩色/" + this.svgNames[index] + ".svg"
                                )
                                document.getElementById('d' + index.toString()).style.opacity = (Math.max(V[i] / maxValue, 0.5)).toString()
                            }
                        }
                    }
                })
        },
        sxValuesForMd2() {
            fetch(localhost + '/sxValuesForMd2', {
                method: 'post',
                body: JSON.stringify({
                    'age1': this.ageRange[0],
                    'age2': this.ageRange[1],
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    this.qgmcs = data['qgmcs']
                    this.rylbs = data['rylbs']
                    this.cybqs = data['cybqs']
                })
        },
        fmd3() {
            let faDiv = getDiv('md3')
            cleanDiv('md3')
            for (let i in this.gfQg) {
                let qg = this.gfQg[i]
                let div = document.createElement('div')
                div.id = 'md3_' + (i).toString()
                div.style.position = 'absolute'
                div.style.width = '96%'
                div.style.height = '19%'
                div.style.left = '2%'
                div.style.top = (20 * Number(i) + 1).toString() + '%'
                faDiv.appendChild(div)
                fetch(localhost + qg + '/md3')
                    .then((res) => res.json())
                    .then((data) => {
                        // table0
                        let dd = document.createElement('img')
                        dd.id = 'md3_' + (i).toString() + "_0"
                        dd.style.position = 'absolute'
                        dd.style.width = '24%'
                        dd.style.height = '49%'
                        dd.style.left = '0'
                        dd.style.top = '0'
                        dd.style.borderWidth = '0'
                        div.appendChild(dd)
                        let index = this.qgs.indexOf(qg)
                        document.getElementById(dd.id).src = require(
                            "../img/彩色/" + this.svgNames[index] + ".svg"
                        )
                        // table1
                        dd = document.createElement('div')
                        dd.id = 'md3_' + (i).toString() + "_1"
                        dd.style.position = 'absolute'
                        dd.style.width = '24%'
                        dd.style.height = '49%'
                        dd.style.left = '25%'
                        dd.style.top = '0'
                        dd.style.borderWidth = '0'
                        div.appendChild(dd)
                        dChart = chart.radialBar(dd.id, color, data['data1'])
                        // table2
                        dd = document.createElement('div')
                        dd.id = 'md3_' + (i).toString() + "_2"
                        dd.style.position = 'absolute'
                        dd.style.width = '50%'
                        dd.style.height = '49%'
                        dd.style.left = '50%'
                        dd.style.top = '0'
                        dd.style.borderWidth = '0'
                        div.appendChild(dd)
                        dChart = chart.funnel(dd.id, color, data['data2'])
                        // table4
                        dd = document.createElement('div')
                        dd.id = 'md3_' + (i).toString() + "_4"
                        dd.style.position = 'absolute'
                        dd.style.width = '40%'
                        dd.style.height = '49%'
                        dd.style.left = '60%'
                        dd.style.top = '50%'
                        dd.style.borderWidth = '0'
                        div.appendChild(dd)
                        dChart = chart.pie(dd.id, compareColor, data['data4'])
                        // table3
                        dd = document.createElement('div')
                        dd.id = 'md3_' + (i).toString() + "_3"
                        dd.style.position = 'absolute'
                        dd.style.width = '60%'
                        dd.style.height = '50%'
                        dd.style.left = '0%'
                        dd.style.top = '50%'
                        dd.style.borderWidth = '0'
                        div.appendChild(dd)
                        dChart = chart.wordsCloud(dd.id, color, data['data3'])
                    })
            }

        },


        /**
         * 第二页图表
         * */
        fmd4(qg = this.qg) {
            fetch(localhost + qg + '/md4', {
                method: 'post',
                body: JSON.stringify({
                    'age1': this.ageRange[0],
                    'age2': this.ageRange[1],
                    'xb': this.xbGroup2,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    let chartDom = document.getElementById('md4in');
                    let myChart = echarts.init(chartDom);
                    let option;
                    option = {
                        title: {
                            text: '',
                            subtext: '',
                            top: 'bottom',
                            left: 'right'
                        },
                        tooltip: {},
                        // legend: [
                        //     {
                        //         data: data.categories.map(function (a) {
                        //             return a.name;
                        //         })
                        //     }
                        // ],
                        legend: false,
                        animationDurationUpdate: 1500,
                        animationEasingUpdate: 'quinticInOut',
                        series: [
                            {
                                name: '',
                                type: 'graph',
                                layout: 'circular',
                                circular: {
                                    rotateLabel: true
                                },
                                color: typeColors,
                                data: data.nodes,
                                links: data.links,
                                categories: data.categories,
                                roam: true,
                                label: {
                                    position: 'right',
                                    formatter: '{b}'
                                },
                                lineStyle: {
                                    color: 'source',
                                    curveness: 0.3
                                }
                            }
                        ]
                    };
                    myChart.setOption(option);
                    option && myChart.setOption(option);

                    let md4Data = data['md4']
                    md4Data = md4Data.sort(function (x, y) {
                        return -x.value + y.value
                    })
                    cleanDiv('md4')
                    dChart = new Pie('md4', {
                        data: md4Data,
                        angleField: 'value',
                        colorField: 'name',
                        radius: 1,
                        innerRadius: 0.8,
                        color: typeColors,
                        label: {
                            type: 'inner',
                            offset: '-50%',
                            content: '{name}',
                            style: {
                                textAlign: 'center',
                                fontSize: 14,
                            },
                        },
                        legend: false,
                        interactions: [{type: 'element-selected'}, {type: 'element-active'}],
                        statistic: {
                            title: false,
                            content: {
                                style: {
                                    whiteSpace: 'pre-wrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                },
                                content: '',
                            },
                        },
                    });
                    dChart.render()
                })
        },
        fmd5(qg = this.qg) {
            fetch(localhost + qg + '/md5', {
                method: 'post',
                body: JSON.stringify({
                    'age1': this.ageRange[0],
                    'age2': this.ageRange[1],
                    'xb': this.xbGroup2,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    dChart = chart.sankey('md5', typeColors, data)
                    dChart.render()
                })
        },
        fmd6() {
            fetch(localhost + '/md6', {
                method: 'post',
                body: JSON.stringify({
                    'age1': this.ageRange[0],
                    'age2': this.ageRange[1],
                    'xb': this.xbGroup2,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    dChart = chart.venn('md6', typeColors, data)
                    dChart.render()
                })
        },
        fmd7(qg = this.qg) {
            fetch(localhost + qg + '/md7', {
                method: 'post',
                body: JSON.stringify({
                    'age1': this.ageRange[0],
                    'age2': this.ageRange[1],
                    'xb': this.xbGroup2,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    dChart = chart.circle('md7', color, data)
                    dChart.render()
                })
        },


        /**
         * 初始化
         * */
        inits() {
            if (this.visP === 1) {
                this.fmd1()
                this.sxValuesForMd2()
                this.qgImg1()
                this.fmd2()
                this.fmd3()
            }
            if (this.visP === 2) {
                this.fmd4()
                this.fmd5()
                this.fmd6()
                this.fmd7()
            }
            if (this.visP === 3) {
                this.fmd1()
                this.fmd8()
                this.fmd11()
                this.fmd12()
            }
            if (this.visP === 4) {
                fetch(localhost + 'jyxm')
                    .then((res) => res.json())
                    .then((data) => {
                        addListOption('jyxm', data['jyxm'])
                    })
            }
        },
        fmd8(qg = this.qg) {
            fetch(localhost + qg + '/md8', {
                method: 'post',
                body: JSON.stringify({
                    'age1': this.ageRange[0],
                    'age2': this.ageRange[1],
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    let dataArray = data['data']
                    this.table_data_data = []
                    this.table_columns_data = data['columns']
                    if (dataArray.length > 0) {
                        for (let index in dataArray) {
                            dataArray[index]["edit"] = false;
                            this.table_data_data.push(dataArray[index]);
                        }
                    }
                })
        },
        changeJzid() {
            this.fmd9()
            fetch(localhost + this.jzid + '/jzidToGfqg')
                .then((res) => res.json())
                .then((data) => {
                    this.gfQg = data['names']
                    let L = this.gfQg
                    this.clearBodyImg()
                    for (let i in L) {
                        if (this.qgs.indexOf(L[i]) !== -1) {
                            let index = this.qgs.indexOf(L[i])
                            this.qgVis[index] = 1
                            if (Number(index) < 10) {
                                document.getElementById('d0' + index.toString()).src = require(
                                    "../img/彩色/" + this.svgNames[index] + ".svg"
                                )
                            } else {
                                document.getElementById('d' + index.toString()).src = require(
                                    "../img/彩色/" + this.svgNames[index] + ".svg"
                                )
                            }
                        }
                    }
                })
            this.fmd10()
        },
        changeZdmc() {
            this.fmd12()
        },
        lookLish(ev) {
            this.jzid = ev['就诊编码']
            this.changeJzid()
        },
        fmd9(jzid = this.jzid) {
            fetch(localhost + jzid + '/md9', {
                method: 'post',
                body: JSON.stringify({
                    'age1': this.ageRange[0],
                    'age2': this.ageRange[1],
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    dChart = chart.chord('md9', compareColor, data)
                    dChart.render()
                })
        },
        fmd10(jzid = this.jzid) {
            fetch(localhost + jzid + '/md10')
                .then((res) => res.json())
                .then((data) => {
                    dChart = chart.sankey('md10', color, data)
                    dChart.render()
                })
        },
        fmd11(qg = this.qg) {
            fetch(localhost + qg + '/md11', {
                method: 'post',
                body: JSON.stringify({
                    'age1': this.ageRange[0],
                    'age2': this.ageRange[1],
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    data = data.sort(function (x, y) {
                        return -x.value + y.value
                    })
                    dChart = chart.bar2('md11', color, data)
                    dChart.render()
                    dChart.on('click', (ev) => {
                        this.jzid = ev['data']['data']['id']
                        this.zdmc = ev['data']['data']['name'].split('_')[0]
                        this.changeJzid()
                        this.changeZdmc()
                    })
                })
        },
        fmd12(zdmc = this.zdmc) {
            fetch(localhost + zdmc + '/md12')
                .then((res) => res.json())
                .then((data) => {
                    dChart = chart.wordsCloud('md12', color, data, 'Yuppy', [10, 32])
                    dChart.render()
                })
        },

        /**
         * 第四页
         * */
        ycbsGet() {
            fetch(localhost + selectTxt('jyxm') + "/" + this.jyxmValue + '/ycbs')
                .then((res) => res.json())
                .then((data) => {
                    this.messageF('异常结果标识: ' + data['ycbs'])
                    this.ycbs = data['ycbs']
                    getDiv('ycbs').innerHTML = this.ycbs
                    this.preZdmc()
                })
        },
        preZdmc() {
            fetch(localhost + '/preZdmc', {
                method: 'post',
                body: JSON.stringify({
                    'ycbs': this.ycbs,
                    'jyxm': selectTxt('jyxm'),
                    'age': this.ageSel4,
                    'xb': this.xbGroup4
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    this.gfQg = data['qgmcs']
                    this.clearBodyImg()
                    let L = data['qgmcs']
                    let V = data['qgmcValues']
                    let maxValue = data['qgmcMax']
                    let cnt = 0
                    for (let i in L) {
                        if (this.qgs.indexOf(L[i]) !== -1) {
                            let index = this.qgs.indexOf(L[i])
                            this.gfQg[cnt] = this.qgs[index]
                            cnt += 1
                            this.qgVis[index] = 1
                            if (Number(index) < 10) {
                                document.getElementById('d0' + index.toString()).src = require(
                                    "../img/彩色/" + this.svgNames[index] + ".svg"
                                )
                                document.getElementById('d0' + index.toString()).style.opacity = (Math.max(V[i] / maxValue, 0.5)).toString()
                            } else {
                                document.getElementById('d' + index.toString()).src = require(
                                    "../img/彩色/" + this.svgNames[index] + ".svg"
                                )
                                document.getElementById('d' + index.toString()).style.opacity = (Math.max(V[i] / maxValue, 0.5)).toString()
                            }
                        }
                    }
                    /**
                     * 共病预警
                     * */
                    dChart = chart.chord('md16', compareColor, data['gbyj'])
                    dChart.render()
                    /**
                     * 饮食建议
                     * */
                    dChart = chart.wordsCloud('md17_1', color, data['ysjy'], 'Yuppy', [16, 32])
                    dChart.render()
                    /**
                     * 疗养建议
                     * */
                    getDiv('md17_2').innerHTML = ""
                    for (let i in data['lyjy']) {
                        getDiv('md17_2').innerHTML += "■" + data['lyjy'][i] + `<br>`
                    }
                })
        },
        changAgeSel4() {
            if (this.bodyVis === 3) {
                this.fbody3()
            }
        },
        changeXbGroup4() {
            if (this.bodyVis === 3) {
                this.fbody3()
            }
        },



    },
    mounted() {
        scene = new Scene({
            id: 'md1',
            map: new GaodeMap({
                style: '',
                center: [0, 0],
                zoom: 2
            })
        });
        fetch(localhost + '/md1', {
            method: 'post',
            body: JSON.stringify({
                'age1': this.ageRange[0],
                'age2': this.ageRange[1],
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((data) => {
                l1 = new PointLayer({})
                    .source(data, {
                        parser: {
                            type: 'json',
                            x: 'jd',
                            y: 'wd'
                        }
                    })
                    .shape('circle')
                    .size(4)
                    .color('type', typeColors)
                    .active(true)
                    .style({
                        opacity: 0.5,
                        strokeWidth: 0
                    });
                scene.addLayer(l1)
                let xbImg = {
                    '男': '🚹',
                    '女': '🚺'
                }
                let ageImg = [{
                    '男': '🧔‍',
                    '女': '👵',
                }, {
                    '男': '👱‍♂️',
                    '女': '👱‍',
                }, {
                    '男': '👴',
                    '女': '🧓',
                }, {
                    '男': '👨‍🦳',
                    '女': '🧑‍🦳',
                }, {
                    '男': '👨‍🦳',
                    '女': '🧑‍🦳',
                }]
                l1.on('click', (ev) => {
                    this.jzid = ev.feature['name1']
                    this.changeJzid()
                    scene.addPopup(new Popup({
                            offsets: [0, 0],
                            closeButton: false
                        })
                            .setLnglat(ev.lngLat)
                            .setHTML(
                                `<span style="color: #777; font-size: 30px">${xbImg[ev.feature['xb']]}</span>` + `<br>` +
                                `<span style="color: #777; font-size: 30px">${ageImg[Math.ceil((ev.feature['age'] - 60) / 20)][ev.feature['xb']]}</span>`
                            )
                    )
                })
            })
        this.inits()


    }

}