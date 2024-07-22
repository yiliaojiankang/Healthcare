import {GaodeMap, HeatmapLayer, LineLayer, PointLayer, Popup, Scene} from "@antv/l7";
import {Bullet, Chord, CirclePacking, Column, DualAxes, Funnel, Venn, WordCloud} from '@antv/g2plot';
import {Pie, G2, Radar, Liquid, Gauge, Area, Bar, Heatmap, Rose, Violin, RadialBar, Progress} from '@antv/g2plot';
import {PivotSheet} from '@antv/s2';
import {Line} from '@antv/g2plot';
import {DrawControl} from "@antv/l7-draw";
import {cleanDiv} from "./base"


export default {
    // g2 plot
    spiderPie(id, color, data, label = {
                type: 'spider',
                labelHeight: 28,
                content: '{name}\n{percentage}',
            }, legend=false) {
        cleanDiv(id)
        return new Pie(id, {
            appendPadding: 10,
            data,
            angleField: 'value',
            colorField: 'name1',
            radius: 0.75,
            color,
            label,
            legend,
            interactions: [{type: 'element-selected'}, {type: 'element-active'}],
        })
    },
    bullet(id, color, data = [{
               title: '',
               ranges: 100,
               measures: 80,
               target: 85,
           }],
           title1 = '实际值', title2 = '目标值',
           legend = {
               custom: true,
               position: 'bottom',
               items: [{
                   value: title1,
                   name: title1,
                   marker: {symbol: 'square', style: {fill: color[1], r: 5}},
               }, {
                   value: title2,
                   name: title2,
                   marker: {symbol: 'line', style: {stroke: color[2], r: 5}},
               },
               ],
           }
    ) {
        cleanDiv(id)
        return new Bullet(id, {
            data,
            measureField: 'measures',
            rangeField: 'ranges',
            targetField: 'target',
            xField: 'title',
            color: {
                range: color[0],
                measure: color[1],
                target: color[2],
            },
            xAxis: false,
            yAxis: false,
            legend,
        })
    },
    bars(id, color, data) {
        cleanDiv(id)
        return new Bar(id, {
            data,
            xField: 'value',
            yField: 'name1',
            seriesField: 'name2',
            color,
            xAxis: false,
            yAxis: {
                grid: null
            },
            isStack: true,
        })
    },
    line(id, color, data, slider = {
        begin: 0,
        end: 0.2
    }) {
        cleanDiv(id)
        return new Area(id, {
            data,
            xField: 'name1',
            yField: 'value',
            xAxis: {
                range: [0, 1],
                tickCount: 5,
                grid: null
            },
            yAxis: false,
            smooth: true,
            areaStyle: () => {
                return {
                    fill: 'l(270) 0:' + color[0] + ' 0.5:' + color[1] + ' 1:' + color[2],
                };
            },
            slider,
        });
    },
    columns(id, color, data, isGroup = true, isStack = false, legend = {}, radius=[20, 20, 0, 0]) {
        cleanDiv(id)
        return new Column(id, {
            data,
            xField: 'name1',
            yField: 'value',
            seriesField: 'name2',
            isGroup,
            isStack,
            xAxis: {
                grid: null
            },
            yAxis: {
                grid: null
            },
            color,
            columnStyle: {
                radius,
            },
        });
    },


    // l7_scene
    mapScene(id, jd = 104.0727473, wd = 30.57899372,
             style = 'amap://styles/95df43206c2149e1816132324ae47130?isPublic=true',
             zoom = 5.5, pitch = 60,
    ) {
        return new Scene({
            id,
            map: new GaodeMap({
                center: [jd, wd],
                style,
                zoom,
                pitch,
            })
        });
    },
    drawControl1(scene, position = 'topcenter') {
        return new DrawControl(scene, {
            position,
            layout: 'horizontal', // horizontal vertical
            controls: {
                point: false,
                polygon: false,
                line: false,
                circle: false,
                rect: true,
                delete: true
            }
        });
    },


    // l7_popup
    mapPopup(ev, span = `<span style="color: #777">${ev.feature['jd']}</span>`) {
        return new Popup({
            offsets: [0, 0],
            closeButton: false
        })
            .setLnglat(ev.lngLat)
            .setHTML(span);
    },
    mapPopup1(jd, wd, span = `<span style="color: #777"></span>`) {
        return new Popup({
            offsets: [0, 0],
            closeButton: false
        })
            .setLnglat({'lng': jd, 'lat': wd})
            .setHTML(span);
    },

    // l7_layer
    circlePointLayer(data, color = 'rgb(8, 64, 129)',
                     size = 10, style = {
            stroke: '#fff',
            strokeWidth: 4,
        }) {
        return new PointLayer()
            .source(data, {
                parser: {
                    type: 'json',
                    x: 'jd',
                    y: 'wd'
                }
            })
            .shape('circle')
            .size(size)
            .color(color)
            .style(style)
    },
    textPointLayer(data, header = 'name', color = '#000', size = 15) {
        return new PointLayer()
            .source(data, {
                parser: {
                    type: 'json',
                    x: 'jd',
                    y: 'wd'
                }
            })
            .shape(header, 'text')
            .color(color)
            .size(size)
            .style({
                textOffset: [0, 20]
            })
    },
    imgPointLayer(scene, data, imgUrl = 'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*BJ6cTpDcuLcAAAAAAAAAAABkARQnAQ', size = 12) {
        scene.addImage(
            'marker',
        );
        return new PointLayer()
            .source(data, {
                parser: {
                    type: 'json',
                    x: 'jd',
                    y: 'wd'
                }
            })
            .shape('marker')
            .size(size);
    }

}