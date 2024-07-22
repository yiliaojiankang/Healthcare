import {cleanDiv, getDiv} from "./base"
import {Bar, Column, Gauge, Heatmap, Line, Pie, Radar, Scatter, WordCloud} from "@antv/g2plot";
import * as echarts from "echarts";
import G6 from "@antv/g6";

export function radar(id, color, data) {
    cleanDiv(id)
    return new Radar(id, {
        data,
        xField: 'name',
        yField: 'value',
        seriesField: 'type',
        color,
        xAxis: false,
        point: {
            size: 2,
        },
    })
}

// 关系矩阵热力图
export function headerMap(id, color, data) {
    cleanDiv(id)
    return new Heatmap(document.getElementById(id), {
        data,
        xField: 'name1',
        yField: 'name2',
        colorField: 'value',
        color,
        meta: {
            'name1': {
                type: 'cat',
            },
            'name2': {
                type: 'cat',
            },
        },
        xAxis: false,
        yAxis: false,
    })
}

export function bar1(id, color, data) {
    getDiv(id).innerHTML = ""
    data = data.sort(function (x, y) {
        return -x.value + y.value
    })
    return new Bar(id, {
        data,
        xField: 'value',
        yField: 'name',
        seriesField: 'value',
        yAxis: false,
        xAxis: {
            grid: null
        },
        barWidthRatio: 0.95,
        color: color,
        legend: false,
        barStyle: {
            radius: [5, 5, 5, 5],
        },
        label: {
            formatter: (item) => {
                return item.name;
            },
            style: {
                fontSize: 8,
                fontFamily: 'Kaiti',
            }
        },
        scrollbar: {
            type: 'vertical',
        },
        shape: 'hollow-rect',
    })
}

export function column1(id, color, data) {
    getDiv(id).innerHTML = ""
    return new Column(id, {
        data,
        yField: 'value',
        xField: 'name',
        seriesField: 'type',
        yAxis: false,
        xAxis: {
            grid: null
        },
        barWidthRatio: 0.95,
        color,
        legend: false,
        columnStyle: {
            radius: [5, 5, 5, 5],
        },
        label: {
            formatter: (item) => {
                return item.value;
            },
            style: {
                fontSize: 8,
                fontFamily: 'Kaiti',
            }
        },
    })
}

export function line1(id, color, data) {
    cleanDiv(id)
    return new Line(id, {
        data,
        padding: 'auto',
        xField: 'name',
        seriesField: 'type',
        color,
        yField: 'value',
        point: {
            size: 5,
            shape: 'circle',
            style: {
                fill: ({type}) => {
                    return Number(type) === 1 ? color[0] : color[1]
                },
                stroke: color[0],
                lineWidth: 2,
            },
        },
    });
}

export function scatter1(id, color, data) {
    cleanDiv(id)
    return new Scatter(id, {
        appendPadding: 10,
        data,
        xField: 'x',
        yField: 'y',
        shape: 'circle',
        colorField: 'type',
        size: 5,
        color,
        yAxis: false,
        xAxis: false,
        legend: false,
    })
}

export function scatter2(id, color, data) {
    cleanDiv(id)
    return new Heatmap(document.getElementById(id), {
        appendPadding: 10,
        data,
        type: 'density',
        xField: 'x',
        yField: 'y',
        colorField: 'size',
        color: color,
        yAxis: false,
        xAxis: false,
        legend: false,
    })
    // return new Scatter(id, {
    //     appendPadding: 10,
    //     data,
    //     xField: 'x',
    //     yField: 'y',
    //     shape: 'circle',
    //     colorField: 'type',
    //     size: 'size',
    //     color,
    //     yAxis: false,
    //     xAxis: false,
    //     legend: false,
    // })
}

// 关系网络图
export function relationChart(id, color, data, name = '关系图') {
    let chartDom = document.getElementById(id);
    let myChart = echarts.init(chartDom);
    let option;
    option = {
        tooltip: {},
        legend: [
            {
                data: data.categories.map(function (a) {
                    return a.name;
                })
            }
        ],
        series: [
            {
                name,
                color,
                type: 'graph',
                layout: 'none',
                data: data.nodes,
                links: data.links,
                categories: data.categories,
                roam: true,
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                },
                labelLayout: {
                    hideOverlap: true
                },
                scaleLimit: {
                    min: 0.4,
                    max: 2
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
    return myChart
}

// 一条线的空心柱状图
export function emptyCenterBar1(id, color, data) {
    cleanDiv(id)
    data = data.sort(function (x, y) {
        return -x.value + y.value
    })
    data = data.slice(0, 6)
    return new Bar(id, {
        data,
        xField: 'value',
        yField: 'name1',
        seriesField: 'name2',
        legend: false,
        xAxis: false,
        yAxis: false,
        isStack: true,
        isPercent: true,
        color: color[0],
        label: {
            formatter: ({name2}) => `${name2}`,
            fontsize: 5,
        },
        shape: 'hollow-rect',
    });
}


// 支持选中的词云
export function words(id, color, data) {
    cleanDiv(id)
    return new WordCloud(id, {
        data,
        wordField: 'name1',
        weightField: 'value',
        colorField: 'name2',
        color,
        wordStyle: {
            fontFamily: "yYuppy SC",
            fontSize: [8, 32],
            rotation: 0,
        },
        random: () => 0.5,
    });
}


// 支持选中的词云
export function words2(id, color, data) {
    cleanDiv(id)
    return new WordCloud(id, {
        data,
        wordField: 'name',
        weightField: 'value',
        colorField: 'value',
        color,
        wordStyle: {
            fontFamily: "yYuppy SC",
            fontSize: [8, 32],
            rotation: 0,
        },
        random: () => 0.5,
    });
}


// 带文本的多样式柱状图
export function bars(id, color, data, isStack = true, isGroup = false) {
    cleanDiv(id)
    return new Bar(id, {
        data,
        xField: 'value',
        yField: 'name1',
        seriesField: 'name2',
        colorField: 'value',
        yAxis: {
            grid: null
        },
        xAxis: false,
        barWidthRatio: 0.9,
        color,
        isStack,
        isGroup,
        legend: false,
        barStyle: {
            radius: [3, 3, 3, 3],
        },
        label: {
            formatter: (item) => {
                return item.name2;
            },
            style: {
                fontSize: 8,
                fontFamily: 'Yuppy SC',
            }
        },
        shape: 'hollow-rect',
        interactions: [{type: 'element-link'}, {type: 'element-highlight-by-color'}],
    });
}


// 展示占比的柱状图
export function bars2(id, color, data) {
    cleanDiv(id)
    return new Bar(id, {
        data,
        xField: 'value',
        yField: 'name1',
        seriesField: 'name2',
        color,
        label: false,
        legend: {
            position: 'bottom'
        },
        xAxis: false,
    });
}


// 描述一些费用转移情况
export function feeTransFrom(id, color, data) {
    cleanDiv(id)
    data.edges.forEach(edge => {
        edge.label = `报销费用: ¥${edge.value}`
    })
    const colors = {
        '个人支付费用': color[0],
        '报销费用': color[1],
    }
    data.nodes.forEach(node => {
        node.donutColorMap = colors;
        node.size = 0;
        Object.keys(node.donutAttrs).forEach(key => {
            node.size += node.donutAttrs[key];
        })
        node.size = Math.sqrt(node.size) * 5
    })


    const legendData = {
        nodes: [{
            id: '个人支付费用',
            label: '个人支付费用',
            order: 0,
            style: {
                fill: color[0],
            }
        }, {
            id: '报销费用',
            label: '报销费用',
            order: 2,
            style: {
                fill: color[1],
            }
        }]
    }
    const legend = new G6.Legend({
        data: legendData,
        align: 'center',
        layout: 'vertical', // vertical
        position: 'top-left',
        vertiSep: 12,
        horiSep: 24,
        offsetY: -24,
        padding: [0, 0, 8, 16],
        containerStyle: {
            fill: '#ccc',
            lineWidth: 1
        },
        title: '',
        titleConfig: {
            offsetY: -8,
        },
    });


    const width = document.getElementById(id).scrollWidth;
    const height = document.getElementById(id).scrollHeight;
    const graph = new G6.Graph({
        container: id,
        width,
        height,
        // translate the graph to align the canvas's center, support by v3.5.1
        fitCenter: true,
        plugins: [legend],
        modes: {
            default: ['drag-canvas', 'drag-node'],
        },
        layout: {
            type: 'radial',
            focusNode: 'li',
            linkDistance: 60,
            unitRadius: 250
        },
        defaultEdge: {
            style: {
                endArrow: true
            },
            labelCfg: {
                autoRotate: true,
                style: {
                    stroke: "#fff",
                    lineWidth: 1
                }
            }
        },
        defaultNode: {
            type: 'donut',
            style: {
                lineWidth: 0,
            },
            labelCfg: {
                position: 'bottom',
            },
        },
    });

    graph.data(data);
    graph.render();

    graph.on('node:mouseenter', (evt) => {
        const {item} = evt;
        graph.setItemState(item, 'active', true);
    });

    graph.on('node:mouseleave', (evt) => {
        const {item} = evt;
        graph.setItemState(item, 'active', false);
    });

    graph.on('node:click', (evt) => {
        const {item} = evt;
        graph.setItemState(item, 'selected', true);
    });
    graph.on('canvas:click', (evt) => {
        graph.getNodes().forEach((node) => {
            graph.clearItemStates(node);
        });
    });
    return graph
}


// 就诊流量热力图
export function dateHeatMap(id, color, data, titleText = '') {
    let chartDom = document.getElementById(id);
    let myChart = echarts.init(chartDom);
    let option;
    let colorL = []
    for (let i = color.length - 1; i >= 0; i--) {
        colorL.push(color[i])
    }
    option = {
        title: {
            top: 30,
            left: 'center',
            text: titleText,
        },
        tooltip: {},
        visualMap: {
            color: colorL,
            min: data['min'],
            max: data['max'],
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            top: 65
        },
        calendar: {
            top: 120,
            left: 30,
            right: 30,
            cellSize: ['auto', 13],
            range: data['range'],  // 如果年份更新需要修改
            itemStyle: {
                borderWidth: 0.5
            },
            yearLabel: {show: false}
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: data['data'],
        }
    };
    option && myChart.setOption(option);
    return myChart
}


// 展示占比隐藏Y轴的柱状图
export function bars3(id, color, data) {
    cleanDiv(id)
    data = data.sort(function (x, y) {
        return -x.value + y.value
    })
    return new Bar(id, {
        data,
        xField: 'value',
        yField: 'name1',
        seriesField: 'name2',
        color,
        legend: {
            position: 'top'
        },
        // isPercent: true,
        xAxis: false,
        yAxis: false,
        scrollbar: {
            type: 'vertical',
        },
        barWidthRatio: 0.9,
        barStyle: {
            radius: [3, 3, 3, 3],
        },
        label: {
            formatter: (item) => {
                if (item.name2 === '医保认可费用总额') {
                    return item.name1;
                }
            },
            style: {
                fontSize: 16,
                fontFamily: 'Yuppy SC',
                fill: '#fff'
            }
        },
    });
}


// 各种费用占比
export function pie(id, color, data) {
    cleanDiv(id)
    return new Pie(id, {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'name1',
        radius: 0.8,
        color: color,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        legend: false,
        interactions: [{type: 'pie-legend-active'}, {type: 'element-active'}],
    });
}


export function liquid(id, color, data, text = '') {
    cleanDiv(id)
    return new Gauge(id, {
        percent: data,
        range: {
            color: 'l(0) 0:' + color[0].toString() + ' 1:' + color[5].toString(),
        },
        startAngle: Math.PI,
        endAngle: 2 * Math.PI,
        indicator: null,
        statistic: {
            title: {
                offsetY: -36,
                style: {
                    fontSize: '18px',
                    color: color[5],
                },
                // formatter: () => (data.toFixed(2) * 100).toString() + '%',
            },
            content: {
                style: {
                    fontSize: '12px',
                    lineHeight: '22px',
                    color: color[5],
                },
                formatter: () => text,
            },
        },
    });
}
