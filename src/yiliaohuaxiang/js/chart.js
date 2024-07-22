import {getDiv, cleanDiv} from "./base"
import {Area, Bar, Chord, CirclePacking, Funnel, Liquid, Pie, RadialBar, Sankey, Venn, WordCloud} from "@antv/g2plot";

export function chord(id, color, data) {
    getDiv(id).innerHTML = ""
    const chord = new Chord(id, {
        data,
        appendPadding: 40,
        sourceField: 'name1',
        targetField: 'name2',
        seriesField: 'type',
        weightField: 'value',
        color,
    });
    chord.render();
    chord.update({
        "theme": {
            "styleSheet": {
                "brandColor": color[0],
                "paletteQualitative10": color,
                "paletteQualitative20": color
            }
        }
    });
    return chord
}

export function circle(id, color, data) {
    getDiv(id).innerHTML = ""
    const plot = new CirclePacking(id, {
        autoFit: true,
        data,
        label: {
            style: {
                fill: '#ffffff',
                fontSize: 10,
                fontWeight: 'bold'
            }
        },
        color,
        legend: false,
        hierarchyConfig: {
            sort: (a, b) => b.depth - a.depth,
        },
    });
    plot.render();
    return plot
}

export function venn(id, color, data) {
    getDiv(id).innerHTML = ""
    const plot = new Venn(id, {
        data,
        setsField: 'sets',
        sizeField: 'size',
        pointStyle: {fillOpacity: 0.85},
        legend: false,
        label: {
            style: {
                fill: '#ffffff',
                fontSize: 10,
            },
            formatter: ({sets}) => `${sets[0]}`,
        },
        color,
    });
    plot.render();
    return plot
}

export function sankey(id, color, data) {
    cleanDiv(id)
    return new Sankey(id, {
        data,
        sourceField: 'name1',
        targetField: 'name2',
        weightField: 'value',
        color,
        nodeWidthRatio: 0.008,
        nodePaddingRatio: 0.03,
    });
}

export function wordsCloud(id, color, data, fontFamily = 'Verdana', fontSize = [8, 16]) {
    getDiv(id).innerHTML = ""
    const wordCloud = new WordCloud(id, {
        data,
        wordField: 'name',
        weightField: 'value',
        colorField: 'value',
        color,
        wordStyle: {
            fontFamily,
            fontSize,
            rotation: 45,
        },
        random: () => 0.5,
    });
    wordCloud.render()
    return wordCloud
}

export function wordsCloud1(id, color, data, fontFamily = 'Verdana', fontSize = [8, 16]) {
    getDiv(id).innerHTML = ""
    const wordCloud = new WordCloud(id, {
        data,
        wordField: 'name',
        weightField: 'value',
        colorField: 'value',
        color,
        wordStyle: {
            fontFamily,
            fontSize,
            rotation: 90,
        },
        random: () => 0.5,
    });
    wordCloud.render()
    return wordCloud
}

export function pie(id, color, data) {
    getDiv(id).innerHTML = ""
    const piePlot = new Pie(id, {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'name',
        radius: 0.8,
        color,
        legend: false,
        label: {
            type: 'spider',
            content: '{name} {percentage}',
        },
        pirStyle: {
            strokeOpacity: 0.7,
            shadowColor: 'black',
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            cursor: 'pointer'
        },
        interactions: [{type: 'pie-legend-active'}, {type: 'element-active'}],
    });
    piePlot.render();
    return piePlot
}

export function bar(id, color, data) {
    getDiv(id).innerHTML = ""
    const bar = new Bar(id, {
        data,
        xField: 'value',
        yField: 'name',
        seriesField: 'value',
        yAxis: false,
        xAxis: false,
        barWidthRatio: 0.95,
        color,
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
    });
    bar.render()
    return bar
}

export function bar2(id, color, data) {
    getDiv(id).innerHTML = ""
    const bar = new Bar(id, {
        data,
        xField: 'value',
        yField: 'name',
        seriesField: 'value',
        yAxis: false,
        xAxis: false,
        barWidthRatio: 0.95,
        color,
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
    });
    bar.render()
    return bar
}

export function liquid1(id, color, data) {
        getDiv(id).innerHTML = ""
        const liquidPlot = new Liquid(id, {
            percent: data['value'],
            shape: 'circle',
            color: color[1],
            wave: {
                length: 64,
            },
            statistic: {
                content: {
                    style: {
                        fontSize: '20px',
                        color: color[5],
                        fontFamily: 'Kaiti TC',
                    }
                }
            },
        });
        liquidPlot.render();
        return liquidPlot
    }

export function area1(id, color, data) {
        getDiv(id).innerHTML = ""
        const area = new Area(id, {
            data,
            xField: 'name',
            yField: 'value',
            color: color[3],
            smooth: true,
            xAxis: false,
            yAxis: false,
        });
        area.render();
        return area
    }

export function funnel(id, color, data) {
    getDiv(id).innerHTML = ""
    const funnelPlot = new Funnel(id, {
        data,
        xField: 'name',
        yField: 'value',
        legend: false,
        label: false,
        color,
        colorField: 'value',
        conversionTag: false
    });
    funnelPlot.render();
    return funnelPlot
}

export function radialBar(id, color, data) {
    getDiv(id).innerHTML = ""
    const bar = new RadialBar(id, {
        data,
        xField: 'name',
        yField: 'value',
        colorField: 'value',
        maxAngle: 270,
        radius: 0.9,
        innerRadius: 0.2,
        color,
        barStyle: {
            lineCap: 'round',
        },
    });
    bar.render();
    return bar
}