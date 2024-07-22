<template>
  <div id="page" style="position: absolute;width: 100%;height: 100%;left: 0;top: 0;">
    <div class="titles"
         style="width: 100%; height: 6%; left: 0; top: 0; background-color: #333; color: #fff; font-size: 40px; border-radius: 0">
      基 于 健 康 数 据 的 可 视 化 科 普
      <div style="position: absolute; height: 100%; width: 30%; left: 1%; top: 0">
        <el-menu default-active='1'
                 background-color="#333"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
                 mode="horizontal" @select="leftMenuClick">
          <el-menu-item
              index="1">
            <i class="el-icon-s-data"></i>
            <span slot="title">统计分析</span>
          </el-menu-item>
          <el-menu-item
              index="2">
            <i class="el-icon-s-marketing"></i>
            <span slot="title">共病分析</span>
          </el-menu-item>
          <el-menu-item
              index="3">
            <i class="el-icon-s-custom"></i>
            <span slot="title">既往史</span>
          </el-menu-item>
          <el-menu-item
              index="4">
            <i class="el-icon-message-solid"></i>
            <span slot="title">疾病预警</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div style="position: absolute; height: 100%; width: 24%; right: 1%; top: 0">
        <el-menu default-active='1'
                 background-color="#333"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
                 mode="horizontal" @select="rightMenuClick">
          <el-menu-item
              index="1">
            <i class="el-icon-s-custom"></i>
            <span slot="title">科普画像</span>
          </el-menu-item>
          <el-menu-item
              index="2">
            <i class="el-icon-s-order"></i>
            <span slot="title">人体词云</span>
          </el-menu-item>
          <el-menu-item
              index="3">
            <i class="el-icon-s-data"></i>
            <span slot="title">集群指数</span>
          </el-menu-item>
          <el-menu-item
              index="4">
            <i class="el-icon-s-help"></i>
            <span slot="title">沉浸式画像</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>

    <div class="innerPage">
      <!--      器官画像-->
      <div v-if="bodyVis===1">
        <img alt="body" src="./img/body.svg"
             style="position: absolute; width: 118%; left: -9%; height: 80%; top: 15%;"/>
        <img
            id="d01"
            alt="脑"
            @mousemove="moveQg('d01', 1)"
            @mouseleave="leaveQg('d01', 1)"
            @click="clickQg('d01', 1)"
            src="./img/黑白/脑.svg"
            style="position: absolute; width: 7%; height: 4%; left: 46.5%; top: 16%; z-index: 99">
        <img
            id="d02"
            @mousemove="moveQg('d02', 2)"
            @mouseleave="leaveQg('d02', 2)"
            @click="clickQg('d02', 2)"
            alt="鼻" src="./img/黑白/鼻子.svg"
            style="position: absolute; width: 3%; height: 3%; left: 48.5%; top: 20%; z-index: 100">
        <img
            id="d03"
            @mousemove="moveQg('d03', 3)"
            @mouseleave="leaveQg('d03', 3)"
            @click="clickQg('d03', 3)"
            alt="眼" src="./img/黑白/眼睛.svg"
            style="position: absolute; width: 3%; height: 3%; left: 46.5%; top: 18%; z-index: 100">
        <img
            id="d04"
            @mousemove="moveQg('d04', 4)"
            @mouseleave="leaveQg('d04', 4)"
            @click="clickQg('d04', 4)"
            alt="眼" src="./img/黑白/眼睛.svg"
            style="position: absolute; width: 3%; height: 3%; left: 50.5%; top: 18%; z-index: 100">
        <img
            id="d05"
            @mousemove="moveQg('d05', 5)"
            @mouseleave="leaveQg('d05', 5)"
            @click="clickQg('d05', 5)"
            alt="嘴" src="./img/黑白/嘴唇.svg"
            style="position: absolute; width: 4%; height: 4%; left: 48%; top: 22%; z-index: 100">
        <img
            id="d06"
            @mousemove="moveQg('d06', 6)"
            @mouseleave="leaveQg('d06', 6)"
            @click="clickQg('d06', 6)"
            alt="耳" src="./img/黑白/耳朵.svg"
            style="position: absolute; width: 4%; height: 4%; left: 44%; top: 19%; z-index: 100">
        <img
            id="d19"
            @mousemove="moveQg('d19', 19)"
            @mouseleave="leaveQg('d19', 19)"
            @click="clickQg('d19', 19)"
            alt="血" src="./img/黑白/血.svg"
            style="position: absolute; width: 3%; height: 3%; left: 63.2%; top: 50%; z-index: 100">


        <img
            id="d08"
            @mousemove="moveQg('d08', 8)"
            @mouseleave="leaveQg('d08', 8)"
            @click="clickQg('d08', 8)"
            alt="心" src="./img/黑白/心.svg"
            style="position: absolute; width: 8%; height: 10%; left: 48%; top: 27%; z-index: 100">

        <img
            id="d09"
            @mousemove="moveQg('d09', 9)"
            @mouseleave="leaveQg('d09', 9)"
            @click="clickQg('d09', 9)"
            alt="肝胆" src="./img/黑白/肝脏.svg"
            style="position: absolute; width: 8%; height: 10%; left: 42%; top: 35.5%; z-index: 100">
        <img
            id="d10"
            @mousemove="moveQg('d10', 10)"
            @mouseleave="leaveQg('d10', 10)"
            @click="clickQg('d10', 10)"
            alt="胰腺" src="./img/黑白/胰腺.svg"
            style="position: absolute; width: 6%; height: 6%; left: 51%; top: 39%; z-index: 100">
        <img
            id="d11"
            @mousemove="moveQg('d11', 11)"
            @mouseleave="leaveQg('d11', 11)"
            @click="clickQg('d11', 11)"
            alt="胃" src="./img/黑白/胃.svg"
            style="position: absolute; width: 8%; height: 12%; left: 48%; top: 34%; z-index: 100">
        <img
            id="d12"
            @mousemove="moveQg('d12', 12)"
            @mouseleave="leaveQg('d12', 12)"
            @click="clickQg('d12', 12)"
            alt="肝胆" src="./img/黑白/胆囊.svg"
            style="position: absolute; width: 6%; height: 6%; left: 42%; top: 41%; z-index: 100">
        <img
            id="d13"
            @mousemove="moveQg('d13', 13)"
            @mouseleave="leaveQg('d13', 13)"
            @click="clickQg('d13', 13)"
            alt="小肠" src="./img/黑白/小肠.svg"
            style="position: absolute; width: 10%; height: 40%; left: 45%; top: 30%; z-index: 16">
        <img
            id="d14"
            @mousemove="moveQg('d14', 14)"
            @mouseleave="leaveQg('d14', 14)"
            @click="clickQg('d14', 14)"
            alt="大肠" src="./img/黑白/大肠.svg"
            style="position: absolute; width: 16%; height: 50%; left: 42%; top: 25%; z-index: 15">


        <img
            id="d17"
            @mousemove="moveQg('d17', 17)"
            @mouseleave="leaveQg('d17', 17)"
            @click="clickQg('d17', 17)"
            alt="腿" src="./img/黑白/膝关节.svg"
            style="position: absolute; width: 6%; height: 6%; left: 42%; top: 70%; z-index: 100">
        <img
            id="d18"
            @mousemove="moveQg('d18', 18)"
            @mouseleave="leaveQg('d18', 18)"
            @click="clickQg('d18', 18)"
            alt="腿" src="./img/黑白/膝关节.svg"
            style="position: absolute; width: 6%; height: 6%; right: 42%; top: 70%; z-index: 100">


        <img
            id="d07"
            @mousemove="moveQg('d07', 7)"
            @mouseleave="leaveQg('d07', 7)"
            @click="clickQg('d07', 7)"
            alt="肺" src="./img/黑白/肺.svg"
            style="position: absolute; width: 16%; height: 30%; left: 42%; top: 18%; z-index: 17">
        <img
            id="d15"
            @mousemove="moveQg('d15', 15)"
            @mouseleave="leaveQg('d15', 15)"
            @click="clickQg('d15', 15)"
            alt="肾" src="./img/黑白/肾脏.svg"
            style="position: absolute; width: 18%; height: 50%; left: 41%; top: 25%; z-index: 10">

        <img
            id="d16"
            @mousemove="moveQg('d16', 16)"
            @mouseleave="leaveQg('d16', 16)"
            @click="clickQg('d16', 16)"
            alt="膀胱" src="./img/黑白/膀胱.svg"
            style="position: absolute; width: 6%; height: 6%; left: 47%; top: 55%; z-index: 17">
      </div>
      <!--      人体词云-->
      <div v-if="bodyVis===2" style="position: absolute; width: 100%; height: 95%; top: 0; left: 0">
        <div @click="clickQgWords(0)" class="divs2"
             style="width: 30%; left: 35%; top: 10%; height: 18%;"></div>
        <div @click="clickQgWords(2)" id="d0_202" class="divs2"
             style="width: 6%; left: 40%; top: 15%; height: 4%; font-size: 20px"></div>
        <div @click="clickQgWords(3)" id="d0_203" class="divs2"
             style="width: 6%; right: 40%; top: 15%; height: 4%; font-size: 20px"></div>
        <div @click="clickQgWords(4)" id="d0_204" class="divs2"
             style="width: 6%; left: 30%; top: 15%; height: 10%; font-size: 20px"></div>
        <div @click="clickQgWords(5)" id="d0_205" class="divs2"
             style="width: 6%; right: 30%; top: 15%; height: 10%; font-size: 20px"></div>
        <div @click="clickQgWords(6)" id="d0_206" class="divs2"
             style="width: 6%; left: 47%; top: 19%; height: 4%; font-size: 20px"></div>
        <div @click="clickQgWords(7)" id="d0_207" class="divs2"
             style="width: 28%; left: 36%; top: 23%; height: 4%; font-size: 20px"></div>
        <div @click="clickQgWords(8)" id="d0_208" class="divs2"
             style="width: 10%; left: 45%; top: 27%; height: 4%; font-size: 20px"></div>
        <div @click="clickQgWords(10)" id="d0_2010" class="divs2"
             style="width: 10%; left: 15%; top: 30%; height: 34%; font-size: 30px"></div>
        <div @click="clickQgWords(11)" id="d0_2011" class="divs2"
             style="width: 10%; right: 15%; top: 30%; height: 34%; font-size: 30px"></div>
        <div @click="clickQgWords(1)" id="d0_201" class="divs2"
             style="width: 30%; left: 35%; top: 10%; height: 18%; font-size: 20px"></div>

        <div @click="clickQgWords(12)" id="d0_2012" class="divs2"
             style="width: 15%; left: 30%; top: 30%; height: 15%; font-size: 50px"></div>
        <div @click="clickQgWords(13)" id="d0_2013" class="divs2"
             style="width: 15%; right: 30%; top: 30%; height: 15%; font-size: 50px"></div>
        <div @click="clickQgWords(14)" id="d0_2014" class="divs2"
             style="width: 10%; left: 45%; top: 30%; height: 15%; font-size: 30px"></div>
        <div @click="clickQgWords(15)" id="d0_2015" class="divs2"
             style="width: 20%; right: 30%; top: 45%; height: 8%; font-size: 30px"></div>
        <div @click="clickQgWords(16)" id="d0_2016" class="divs2"
             style="width: 20%; left: 30%; top: 45%; height: 8%; font-size: 30px"></div>
        <div @click="clickQgWords(17)" id="d0_2017" class="divs2"
             style="width: 40%; left: 30%; top: 53%; height: 12%; font-size: 30px"></div>
        <div @click="clickQgWords(18)" id="d0_2018" class="divs2"
             style="width: 25%; left: 37.5%; top: 65%; height: 8%; font-size: 30px"></div>
        <div @click="clickQgWords(19)" id="d0_2019" class="divs2"
             style="width: 10%; left: 30%; top: 65%; height: 34%; font-size: 30px"></div>
        <div @click="clickQgWords(20)" id="d0_2020" class="divs2"
             style="width: 10%; right: 30%; top: 65%; height: 34%; font-size: 30px"></div>
      </div>
      <!--      指数集群-->
      <div v-if="bodyVis===3" style="position: absolute; width: 70%; height: 85%; top: 10%; left: 15%">
        <div class="divs3" style="width: 32%; height: 24%; left: 0; top: 0">
          <div class="contents" id="d0_301"></div>
          <div class="title" id="t0_301"></div>
        </div>
        <div class="divs3" style="width: 32%; height: 24%; left: 33%; top: 0">
          <div class="contents" id="d0_302"></div>
          <div class="title" id="t0_302"></div>
        </div>
        <div class="divs3" style="width: 32%; height: 24%; left: 66%; top: 0">
          <div class="contents" id="d0_303"></div>
          <div class="title" id="t0_303"></div>
        </div>
        <div class="divs3" style="width: 32%; height: 24%; left: 0; top: 25%">
          <div class="contents" id="d0_304"></div>
          <div class="title" id="t0_304"></div>
        </div>
        <div class="divs3" style="width: 32%; height: 24%; left: 33%; top: 25%">
          <div class="contents" id="d0_305"></div>
          <div class="title" id="t0_305"></div>
        </div>
        <div class="divs3" style="width: 32%; height: 24%; left: 66%; top: 25%">
          <div class="contents" id="d0_306"></div>
          <div class="title" id="t0_306"></div>
        </div>
        <div class="divs3" style="width: 32%; height: 24%; left: 0; top: 50%">
          <div class="contents" id="d0_307"></div>
          <div class="title" id="t0_307"></div>
        </div>
        <div class="divs3" style="width: 32%; height: 24%; left: 33%; top: 50%">
          <div class="contents" id="d0_308"></div>
          <div class="title" id="t0_308"></div>
        </div>
        <div class="divs3" style="width: 32%; height: 24%; left: 66%; top: 50%">
          <div class="contents" id="d0_309"></div>
          <div class="title" id="t0_309"></div>
        </div>
        <div class="divs3" style="width: 32%; height: 24%; left: 0; top: 75%">
          <div class="contents" id="d0_3010"></div>
          <div class="title" id="t0_3010"></div>
        </div>
        <div class="divs3" style="width: 32%; height: 24%; left: 33%; top: 75%">
          <div class="contents" id="d0_3011"></div>
          <div class="title" id="t0_3011"></div>
        </div>
        <div class="divs3" style="width: 32%; height: 24%; left: 66%; top: 75%">
          <div class="contents" id="d0_3012"></div>
          <div class="title" id="t0_3012"></div>
        </div>
        <button @click="fbody3(1)" class="buttons"
                style="left: 12.5%; bottom: -3%; height: 25px; width: 24%">高发病症
        </button>
        <button @click="fbody3(2)" class="buttons"
                style="left: 37.5%; bottom: -3%; height: 25px; width: 24%">发病概率
        </button>
        <button @click="fbody3(3)" class="buttons"
                style="left: 62.5%; bottom: -3%; height: 25px; width: 24%">发病周期
        </button>
      </div>
      <!--      沉浸式画像-->
      <div v-if="bodyVis===4" id="vr"
           style="position: absolute; width: 90%; height: 90%; left: 5%; top: 5%"></div>
    </div>

    <!--    主体内容-->
    <div class="contents" style="width: 99%; left: 1%; height: 92%; top: 7%">
      <div v-show="visP===1">
        <div class="divs" style="width: 29%; height: 44%; left: 0; top: 55%">
          <div class="titles">
            <i class="el-icon-s-help"></i>
            <span id="mt2" slot="title">病症分布</span>
          </div>
          <div id="md2" class="contents"></div>
        </div>
        <div class="divs" style="width: 29%; height: 99%; left: 70%; top: 0">
          <div class="titles" style="width: 50%; left: 25%; height: 3.5%">
            <i class="el-icon-s-help"></i>
            <span id="mt3" slot="title">高发病器官画像</span>
          </div>
          <div id="md3" class="contents" style="height: 92%; top: 5%">
          </div>
        </div>
      </div>
      <div v-show="visP===2">
        <div class="divs" style="width: 29%; height: 9%; left: 0; top: 0">
          <div class="titles" style="width: 20%; left: 1%; height: 90%; top: 5%; background-color: #fff; color: #000">
            <i class="el-icon-edit"/>
            <span slot="title" style="font-size: 20px">年龄筛选</span>
          </div>
          <div class="block" style="position: absolute; width: 60%; left: 30%">
            <el-slider
                @change="changeAgeRange"
                v-model="ageRange"
                range
                :min="60"
                :max="102">
            </el-slider>
          </div>
          <div class="titles" style="width: 20%; left: 1%; height: 40%; top: 50%; background-color: #fff; color: #000">
            <i class="el-icon-s-custom"/>
            <span slot="title" style="font-size: 20px">性别筛选</span>
          </div>
          <el-checkbox-group @change="changeXbRange"
                             style="position: absolute; left: 30%; top: 50%" size="big" v-model="xbGroup2">
            <el-checkbox-button v-for="xb in xbs" :label="xb" :key="xb">{{ xb }}
            </el-checkbox-button>
          </el-checkbox-group>
        </div>


        <div class="divs" style="width: 29%; height: 54%; left: 0; top: 10%">
          <div class="titles">
            <i class="el-icon-s-help"></i>
            <span id="mt4" slot="title">病症关联度</span>
          </div>
          <div class="contents">
            <div id="md4" style="position: absolute; width: 90%; height: 90%; left: 5%; top: 5%"></div>
          </div>
          <div class="contents">
            <div id="md4in" style="position: absolute; width: 80%; height: 80%; left: 10%; top: 10%"></div>
          </div>
        </div>


        <div class="divs" style="width: 29%; height: 34%; left: 0; top: 65%">
          <div class="titles" style="height: 10%">
            <i class="el-icon-s-help"></i>
            <span id="mt5" slot="title">病症流向</span>
          </div>
          <div id="md5" class="contents">

          </div>
        </div>


        <div class="divs" style="width: 29%; height: 49%; left: 70%; top: 0">
          <div class="titles">
            <i class="el-icon-s-help"></i>
            <span id="mt6" slot="title" style="font-size: 20px">器官患病交叉集</span>
          </div>
          <div id="md6" class="contents">
          </div>
        </div>


        <div class="divs" style="width: 29%; height: 49%; left: 70%; top: 50%">
          <div class="titles">
            <i class="el-icon-s-help"></i>
            <span id="mt7" slot="title" style="font-size: 20px">共病分析</span>
          </div>
          <div id="md7" class="contents">
          </div>
        </div>
      </div>
      <div v-show="visP===3">
        <div v-show="false" class="divs" style="width: 29%; height: 24%; left: 0; top: 55%">
          <div id="md8" class="contents">
            <el-table
                ref="mytable"
                :data="table_data_data"
                style="width: 100%"
                height="100%"
            >
              <el-table-column
                  align="center"
                  v-for="(item,index,key) in table_columns_data"
                  :item="item"
                  :key="key"
                  :index="index"
                  :label="item.label"
              >
                <template slot-scope="scope">
                  <span v-if="!scope.row.edit">{{ scope.row[item.prop] }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  fixed="right"
                  label="操作"
                  width="50">
                <template slot-scope="scope">
                  <el-button @click="lookLish(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="titles" style="height: 40px">
            <i class="el-icon-s-help"></i>
            <span id="mt8" slot="title">病案首页</span>
          </div>
        </div>
        <div class="divs" style="width: 29%; height: 44%; left: 0; top: 55%">
          <div id="md11" class="contents" style="top: 40px; height: 90%"></div>
          <div class="titles" style="height: 40px">
            <i class="el-icon-s-help"></i>
            <span id="mt11" slot="title">住院频次</span>
          </div>
        </div>
        <div class="divs" style="width: 29%; height: 49%; left: 70%; top: 0">
          <div class="titles" style="height: 6%">
            <i class="el-icon-s-help"></i>
            <span id="mt9" slot="title">病症关系</span>
          </div>
          <div id="md9" class="contents">
          </div>
        </div>
        <div class="divs" style="width: 29%; height: 24%; left: 70%; top: 50%">
          <div class="titles" style="height: 15%">
            <i class="el-icon-s-help"></i>
            <span id="mt10" slot="title">就诊转移</span>
          </div>
          <div id="md10" class="contents">
          </div>
        </div>
        <div class="divs" style="width: 29%; height: 24%; left: 70%; top: 75%">
          <div class="titles" style="height: 15%">
            <i class="el-icon-s-help"></i>
            <span id="mt12" slot="title">检查结论画像</span>
          </div>
          <div id="md12" class="contents" style="height: 80%; top: 16%;">
          </div>
        </div>
      </div>
      <div v-show="visP===4">
        <div class="divs" style="width: 29%; height: 19%; left: 0; top: 0">
          <div id="md13" class="contents" style="top: 40px; height: 90%">
            <div style="position: absolute; left: 20%; top: 5%; width: 30%; height: 30%">
              <i class="el-icon-user-solid"></i>
              <span slot="title">性别选择</span>
            </div>
            <div style="position: absolute; left: 50%; top: 2%; width: 30%; height: 30%">
              <el-radio-group @change="changeXbGroup4" v-model="xbGroup4">
                <el-radio-button label="男"></el-radio-button>
                <el-radio-button label="女"></el-radio-button>
              </el-radio-group>
            </div>
            <div style="position: absolute; left: 20%; top: 35%; width: 30%; height: 30%">
              <i class="el-icon-user"></i>
              <span slot="title">年龄选择</span>
            </div>
            <div style="position: absolute; left: 50%; top: 32%; width: 30%; height: 30%">
              <el-slider
                   @change="changAgeSel4"
                  style="position: absolute; width: 100%; left: 0;"
                  :min="60"
                  :max="102"
                  v-model="ageSel4"></el-slider>
            </div>
            <div style="position: absolute; left: 20%; top: 65%; width: 30%; height: 30%">
              <i class="el-icon-s-order"></i>
              <span slot="title">既往病症</span>
            </div>
            <div style="position: absolute; left: 50%; top: 62%; width: 30%; height: 30%">
              <el-input v-model="lastZdmc" placeholder="请输入既往病症"></el-input>
            </div>
          </div>
          <div class="titles" style="height: 40px">
            <i class="el-icon-edit"></i>
            <span id="mt13" slot="title">基础信息</span>
          </div>
        </div>
        <div class="divs" style="width: 29%; height: 14%; left: 0; top: 20%">
          <div id="md14" class="contents" style="top: 40px; height: 90%">
            <el-input
                style="position: absolute; width: 90%; height: 75%; left: 5%; top: 5%"
                type="textarea"
                placeholder="请输入症状描述"
                v-model="zzTextInput"
                maxlength="300"
                show-word-limit
            >
            </el-input>
          </div>
          <div class="titles" style="height: 40px">
            <i class="el-icon-s-comment"></i>
            <span id="mt14" slot="title">症状描述</span>
          </div>
        </div>
        <div class="divs" style="width: 29%; height: 34%; left: 0; top: 35%">
          <div id="md15" class="contents" style="top: 40px; height: 90%">
            <div style="position: absolute; left: 20%; top: 5%; width: 30%; height: 30%">
              <i class="el-icon-video-camera-solid"></i>
              <span slot="title">检验项目列</span>
            </div>
            <div class="selects"
                 style="position: absolute; left: 36.5%; top: 5%; width: 30%; height: 30%">
              <select id="jyxm" class="selects" style="width: 200px;"></select>
            </div>
            <div style="position: absolute; left: 20%; top: 35%; width: 30%; height: 30%">
              <i class="el-icon-s-order"></i>
              <span slot="title">检验结果值</span>
            </div>
            <div class="selects"
                 style="position: absolute; left: 50%; top: 32%; width: 30%; height: 30%">
              <el-input
                  style="position: absolute; width: 200px; height: 90%; left: 5%; top: 5%"
                  type="textarea"
                  placeholder="请输入检验项目值"
                  v-model="jyxmValue"
                  maxlength="10"
                  show-word-limit
                  @change="ycbsGet"
              >
              </el-input>
            </div>
            <div style="position: absolute; left: 20%; top: 65%; width: 30%; height: 30%">
              <i class="el-icon-s-order"></i>
              <span slot="title">异常标识值</span>
            </div>
            <div style="position: absolute; left: 50%; top: 65%; width: 30%; height: 30%">
              <span id="ycbs" slot="title"></span>
            </div>
          </div>
          <div class="titles" style="height: 40px">
            <i class="el-icon-s-order"></i>
            <span id="mt15" slot="title">检验项目</span>
          </div>
        </div>
        <div class="divs" style="width: 29%; height: 49%; left: 70%; top: 0">
          <div id="md16" class="contents" style="top: 40px; height: 90%"></div>
          <div class="titles" style="height: 40px">
            <i class="el-icon-s-help"></i>
            <span id="mt16" slot="title">共病预警</span>
          </div>
        </div>
        <div class="divs" style="width: 29%; height: 29%; left: 0; top: 70%">
          <div class="contents" id="md17_1" style="top: 40px; height: 90%"></div>
          <div class="titles" style="height: 40px">
            <i class="el-icon-s-opportunity"></i>
            <span id="mt17_1" slot="title">饮食建议</span>
          </div>
        </div>
        <div class="divs" style="width: 29%; height: 49%; left: 70%; top: 50%">
          <div id="md17_2" class="contents" style="top: 40px; height: 90%; text-align: left">
          </div>
          <div class="titles" style="height: 40px">
            <i class="el-icon-s-opportunity"></i>
            <span id="mt17" slot="title">疗养建议</span>
          </div>
        </div>
      </div>
      <div v-show="visP===1||visP===3">
        <div class="divs" style="width: 29%; height: 4%; left: 0; top: 0">
          <div class="titles" style="width: 20%; left: 1%; height: 90%; top: 5%; background-color: #fff; color: #000">
            <i class="el-icon-edit"/>
            <span slot="title" style="font-size: 20px">年龄筛选</span>
          </div>
          <div class="block" style="position: absolute; width: 60%; left: 30%">
            <el-slider
                @change="changeAgeRange"
                v-model="ageRange"
                range
                :min="60"
                :max="102">
            </el-slider>
          </div>
        </div>
        <div class="divs" style="width: 29%; height: 49%; left: 0; top: 5%">
          <div id="md1" class="contents" style="height: 100%; top: 0"></div>
          <div class="titles">
            <i class="el-icon-s-help"></i>
            <span id="mt1" slot="title">人员关系网</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/index.js">

</script>

<style src="./css/style.css" scoped>

</style>