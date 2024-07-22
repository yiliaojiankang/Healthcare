<template>
  <div id="page">
    <!--    标题-->
    <div class="titles"
         style="width: 100%; height: 6%; left: 0; top: 0; background-color: #333; color: #fff; font-size: 40px; border-radius: 0">
      <div style="position: absolute; height: 100%; width: 50%; left: 0; top: 0">
        <el-menu default-active='1'
                 background-color="#333"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
                 mode="horizontal"
                 @select="leftMenuClick">
          <el-menu-item
              index="1">
            <i class="el-icon-s-custom"></i>
            <span slot="title">信息聚类</span>
          </el-menu-item>
          <el-menu-item
              index="2">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">行为识别</span>
          </el-menu-item>
          <el-menu-item
              index="3">
            <i class="el-icon-s-grid"></i>
            <span slot="title">簇类对比</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div style="position: absolute; height: 100%; width: 50%; left: 50%; top: 0">
        <el-menu default-active='1'
                 background-color="#333"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
                 mode="horizontal" @select="rightMenuClick">
          <el-menu-item
              index="1">
            <i class="el-icon-s-help"></i>
            <span slot="title">聚类画像</span>
          </el-menu-item>
          <el-menu-item
              index="2">
            <i class="el-icon-s-marketing"></i>
            <span slot="title">识别效果</span>
          </el-menu-item>
          <el-menu-item
              index="3">
            <i class="el-icon-picture"></i>
            <span slot="title">医保画像</span>
          </el-menu-item>
          <!--          <el-menu-item-->
          <!--              index="4">-->
          <!--            <i class="el-icon-video-camera-solid"></i>-->
          <!--            <span slot="title">病种画像</span>-->
          <!--          </el-menu-item>-->
        </el-menu>
      </div>
    </div>
    <!--    内容-->
    <div style="position: absolute; width: 100%; height: 93%; left: 0; top: 6.5%">
      <!--      配置-->
      <div style="position: absolute; width: 100%; height: 49%; left: 0; top: 0">
        <div v-show="visL === 1">
          <div class="divs" style="width: 100%; height: 19.5%; left: 0; top: 0">
            <div class="titles" style="height: 30px">
              <img class="img" src="./img/img1.png" style="left: 2%; width: auto; height: 96%; top: 2%"/>
              <div class="titles" style="width: 60%;left: 20%;">
                人 员 信 息 特 征 序 列 筛 选
              </div>
            </div>
            <div class="contents" style="height: 60%; top: 35%">
              <el-checkbox-group
                  v-model="checkboxGroup1"
                  size="mini"
              >
                <el-checkbox-button
                    @change="tzxl1Selected"
                    v-for="tag in tzxl1"
                    :label="tag"
                    :key="tag"
                >{{ tag }}
                </el-checkbox-button>
              </el-checkbox-group>
            </div>
          </div>
          <div class="divs" style="width: 100%; height: 24.5%; left: 0; top: 20%">
            <div class="titles" style="height: 30px">
              <img class="img" src="./img/img2.png" style="left: 2%; width: auto; height: 96%; top: 2%"/>
              <div class="titles" style="width: 60%;left: 20%;">
                人 员 信 息 分 类 模 型 配 置
              </div>
            </div>
            <div class="contents" style="height: 75%; top: 20%">
              <div class="text" style="left: 0; top: 0;">分类数:</div>
              <input id="classifyNum" class="inputs" style="left: 11%; top: 0" value="5"/>

              <div class="text" style="left: 0; top: 25%;">随机状态:</div>
              <input id="randomState" class="inputs" style="left: 11%; top: 25%" value="9"/>

              <div class="text" style="left: 0; top: 50%;">分类色系:</div>
              <div style="position: absolute; width: 86%; left: 11%; top: 50%; height: 50%">
                <input id="color1_1" class="inputs" style="left: 0; top: 0"
                       @change="changeTextColor('color1_1')"/>
                <input id="color1_2" class="inputs" style="left: 20%; top: 0"
                       @change="changeTextColor('color1_2')"/>
                <input id="color1_3" class="inputs" style="left: 40%; top: 0"
                       @change="changeTextColor('color1_3')"/>
                <input id="color1_4" class="inputs" style="left: 60%; top: 0"
                       @change="changeTextColor('color1_4')"/>
                <input id="color1_5" class="inputs" style="left: 80%; top: 0"
                       @change="changeTextColor('color1_5')"/>
                <input id="color1_6" class="inputs" style="left: 0; top: 50%"
                       @change="changeTextColor('color1_6')"/>
                <input id="color1_7" class="inputs" style="left: 20%; top: 50%"
                       @change="changeTextColor('color1_7')"/>
                <input id="color1_8" class="inputs" style="left: 40%; top: 50%"
                       @change="changeTextColor('color1_8')"/>
                <input id="color1_9" class="inputs" style="left: 60%; top: 50%"
                       @change="changeTextColor('color1_9')"/>
                <input id="color1_10" class="inputs" style="left: 80%; top: 50%"
                       @change="changeTextColor('color1_10')"/>
              </div>


              <div class="text" style="left: 28%; top: 0;">分类模型:</div>
              <select id="classifyType" class="selects" style="left: 40%; top: 0"></select>


              <button @click="classify1" class="buttons"
                      style="left: 60%; top: 0">信息分类
              </button>

              <button @click="classify1Socre" class="buttons1"
                      style="left: 80%; top: 0">效果分析
              </button>
            </div>
          </div>
          <div class="divs" style="width: 100%; height: 14.5%; left: 0; top: 45%">
            <div class="titles" style="height: 30px">
              <img class="img" src="./img/img3.png" style="left: 2%; width: auto; height: 96%; top: 2%"/>
              <div class="titles" style="width: 60%;left: 20%;">
                人 员 信 息 数 据 过 滤
              </div>
            </div>
            <div class="contents" style="height: 60%; top: 35%">
              <div class="text" style="left: 0; top: 0;">信息筛选字段:</div>
              <select @change="sxValue1Init" id="sxHeader1"
                      class="selects" style="left: 15%; top: 0"/>

              <div class="text" style="left: 0; top: 50%;">信息筛选值:</div>
              <select id="sxValue1" class="selects" style="left: 15%; top: 50%"/>
              <el-slider
                  style="position: absolute; width: 60%; left: 30%; height: 50%; top: 50%;"
                  v-model="sxValues1"
                  :min="sxValuesMin1"
                  :max="sxValuesMax1"
                  @change="sxValuesChangeWith_data1Gl"
                  range>
              </el-slider>

              <button @click="sxValues1Change" class="buttons1"
                      style="left: 30%; top: 0">添加
              </button>
              <button @click="sxValues1Init" class="buttons3"
                      style="left: 45%; top: 0">更新
              </button>
              <button @click="data1Gl" class="buttons2"
                      style="left: 60%; top: 0">过滤
              </button>
            </div>
          </div>
          <div class="divs" style="width: 100%; height: 39.5%; left: 0; top: 60%">
            <div class="titles" style="height: 30px">
              <img class="img" src="./img/img5.png" style="left: 2%; width: auto; height: 96%; top: 2%"/>
              <div id="t_rank1" class="titles" style="width: 60%;left: 20%;">
                人 员 信 息 特 征 画 像
              </div>
            </div>
            <div class="contents" style="height: 80%; top: 15%">
              <div style="position: absolute; width: 100%; height: 10%; left: 0; top: 0">
                <el-checkbox-group
                    @change="rank1"
                    v-model="ryxxflGroup"
                    size="mini"
                >
                  <el-checkbox-button
                      v-for="tag in ryxxflL"
                      :label="tag"
                      :key="tag"
                  >{{ tag }}
                  </el-checkbox-button>
                </el-checkbox-group>
                <select @change="rank1" id="rankHeaders1"
                        class="selects" style="right: 0; top: 0; width: 150px"></select>
              </div>
              <div id="rank1" style="position: absolute; width: 100%; height: 80%; left: 0; top: 15%"></div>
            </div>
          </div>
        </div>
        <div v-show="visL === 2">
          <div class="divs" style="width: 100%; height: 19.5%; left: 0; top: 0">
            <div class="titles" style="height: 30px">
              <img class="img" src="./img/img1.png" style="left: 2%; width: auto; height: 96%; top: 2%"/>
              <div class="titles" style="width: 60%;left: 20%;">
                人 员 行 为 特 征 序 列 筛 选
              </div>
            </div>
            <div class="contents" style="height: 70%; top: 25%">
              <el-checkbox-group
                  v-model="checkboxGroup2"
                  size="mini"
              >
                <el-checkbox-button
                    @change="tzxl2Selected"
                    v-for="tag in tzxl2"
                    :label="tag"
                    :key="tag"
                >{{ tag }}
                </el-checkbox-button>
              </el-checkbox-group>
            </div>
          </div>
          <div class="divs" style="width: 100%; height: 24.5%; left: 0; top: 20%">
            <div class="titles" style="height: 30px">
              <img class="img" src="./img/img2.png" style="left: 2%; width: auto; height: 96%; top: 2%"/>
              <div class="titles" style="width: 60%;left: 20%;">
                人 员 行 为 识 别 模 型 配 置
              </div>
            </div>
            <div class="contents" style="height: 75%; top: 20%">
              <div class="text" style="left: 0; top: 0;">识别模型:</div>
              <select id="defineType" class="selects"
                      style="width: 200px;left: 15%; top: 0"></select>

              <div class="text" style="left: 50%; top: 0;">识别方式:</div>
              <select id="defineFun" class="selects"
                      style="left: 65%; top: 0"></select>

              <button @click="classify2" class="buttons"
                      style="left: 0; top: 25%">行为识别
              </button>

              <div class="text" style="left: 0; top: 50%;">分类色系:</div>
              <div style="position: absolute; width: 86%; left: 11%; top: 50%; height: 50%">
                <input id="color2_1" class="inputs" style="left: 0; top: 0"
                       @change="changeTextColor('color2_1')"/>
                <input id="color2_2" class="inputs" style="left: 20%; top: 0"
                       @change="changeTextColor('color2_2')"/>
                <input id="color2_3" class="inputs" style="left: 40%; top: 0"
                       @change="changeTextColor('color2_3')"/>
                <input id="color2_4" class="inputs" style="left: 60%; top: 0"
                       @change="changeTextColor('color2_4')"/>
                <input id="color2_5" class="inputs" style="left: 80%; top: 0"
                       @change="changeTextColor('color2_5')"/>
                <input id="color2_6" class="inputs" style="left: 0; top: 50%"
                       @change="changeTextColor('color2_6')"/>
                <input id="color2_7" class="inputs" style="left: 20%; top: 50%"
                       @change="changeTextColor('color2_7')"/>
                <input id="color2_8" class="inputs" style="left: 40%; top: 50%"
                       @change="changeTextColor('color2_8')"/>
                <input id="color2_9" class="inputs" style="left: 60%; top: 50%"
                       @change="changeTextColor('color2_9')"/>
                <input id="color2_10" class="inputs" style="left: 80%; top: 50%"
                       @change="changeTextColor('color2_10')"/>
              </div>
            </div>
          </div>
          <div class="divs" style="width: 100%; height: 14.5%; left: 0; top: 45%">
            <div class="titles" style="height: 30px">
              <img class="img" src="./img/img3.png" style="left: 2%; width: auto; height: 96%; top: 2%"/>
              <div class="titles" style="width: 60%;left: 20%;">
                人 员 行 为 数 据 过 滤
              </div>
            </div>
            <div class="contents" style="height: 60%; top: 35%">
              <div class="text" style="left: 0; top: 0;">行为筛选字段:</div>
              <select @change="sxValue2Init" id="sxHeader2"
                      class="selects" style="left: 15%; top: 0"/>

              <div class="text" style="left: 0; top: 50%;">行为筛选值:</div>
              <select id="sxValue2" class="selects" style="left: 15%; top: 50%"/>
              <el-slider
                  style="position: absolute; width: 60%; left: 30%; height: 50%; top: 50%;"
                  v-model="sxValues2"
                  :min="sxValuesMin2"
                  :max="sxValuesMax2"
                  @change="sxValuesChangeWith_data2Gl"
                  range>
              </el-slider>

              <button @click="sxValues2Change" class="buttons1"
                      style="left: 30%; top: 0">添加
              </button>
              <button @click="sxValues2Init" class="buttons3"
                      style="left: 45%; top: 0">更新
              </button>
              <button @click="data2Gl" class="buttons2"
                      style="left: 60%; top: 0">过滤
              </button>
            </div>
          </div>
          <div class="divs" style="width: 100%; height: 39.5%; left: 0; top: 60%">
            <div class="titles" style="height: 30px">
              <img class="img" src="./img/img5.png" style="left: 2%; width: auto; height: 96%; top: 2%"/>
              <div id="t_rank2" class="titles" style="width: 60%;left: 20%;">
                人 员 行 为 特 征 画 像
              </div>
            </div>
            <div class="contents" style="height: 80%; top: 15%">
              <div style="position: absolute; width: 100%; height: 10%; left: 0; top: 0">
                <el-checkbox-group
                    v-model="fzbsflGroup"
                    size="mini"
                    @change="rank2"
                >
                  <el-checkbox-button
                      v-for="tag in fzbsflL"
                      :label="tag"
                      :key="tag"
                  >{{ tag }}
                  </el-checkbox-button>
                </el-checkbox-group>
                <select @change="rank2" id="rankHeaders2"
                        class="selects" style="right: 0; top: 0; width: 150px"></select>
              </div>
              <div id="rank2" style="position: absolute; width: 100%; height: 80%; left: 0; top: 15%"></div>
            </div>
          </div>
        </div>
        <div v-show="visL === 3">
          <div class="divs" style="width: 100%; height: 19.5%; left: 0; top: 0">
            <div class="titles" style="height: 30px">
              <img class="img" src="./img/img1.png" style="left: 2%; width: auto; height: 96%; top: 2%"/>
              <div class="titles" style="width: 60%;left: 20%;">
                人 员 行 为 特 征 序 列 筛 选
              </div>
            </div>
            <div class="contents" style="height: 60%; top: 35%">
              <div class="text" style="left: 0; top: 0">边关系:</div>
              <select id="r3_rela" class="selects"
                      style="width: 200px; left: 11%; top: 0"></select>

              <div class="text" style="left: 0; top: 50%">节点大小:</div>
              <select id="r3_size" class="selects"
                      style="width: 200px; left: 11%; top: 50%"></select>

              <button @click="r3Init" class="buttons1"
                      style="left: 50%; top: 0">生成
              </button>
            </div>
          </div>
          <div class="divs" style="width: 100%; height: 39.5%; left: 0; top: 20%">
            <div class="titles" style="height: 30px">
              <img class="img" src="./img/img5.png" style="left: 2%; width: auto; height: 96%; top: 2%"/>
              <div class="titles" style="width: 60%;left: 20%;">
                簇 类 1
              </div>
            </div>
            <div class="contents" style="height: 90%; top: 9%">
              <div style="position: absolute; width: 100%; height: 70%; left: 0; top: 0">
                <el-tag
                    :key="tag"
                    v-for="tag in jzid1"
                    closable
                    :disable-transitions="false"
                    @close="handleClose1(tag)">
                  {{ tag }}
                </el-tag>
              </div>
              <div style="position: absolute; width: 69%; height: 29%; right: 0; top: 70%">
                <div id="l3_scatter1" class="contents"></div>
              </div>
              <div style="position: absolute; width: 29%; height: 29%; left: 0; top: 70%">
                <div id="l3_heat1" class="contents"></div>
              </div>
            </div>
          </div>
          <div class="divs" style="width: 100%; height: 39.5%; left: 0; top: 60%">
            <div class="titles" style="height: 30px">
              <img class="img" src="./img/img5.png" style="left: 2%; width: auto; height: 96%; top: 2%"/>
              <div class="titles" style="width: 60%;left: 20%;">
                簇 类 2
              </div>
            </div>
            <div class="contents" style="height: 90%; top: 9%">
              <div style="position: absolute; width: 100%; height: 70%; left: 0; top: 0">
                <el-tag
                    :key="tag"
                    v-for="tag in jzid2"
                    closable
                    :disable-transitions="false"
                    @close="handleClose2(tag)">
                  {{ tag }}
                </el-tag>
              </div>
              <div style="position: absolute;width: 69%; height: 29%; right: 0; top: 70%">
                <div id="l3_scatter2" class="contents"></div>
              </div>
              <div style="position: absolute; width: 29%; height: 29%; left: 0; top: 70%">
                <div id="l3_heat2" class="contents"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--      画像-->
      <div style="position: absolute; width: 100%; height: 49%; left: 0; top: 50%">
        <div v-show="visR === 1">
          <div class="divs" style="width: 100%; height: 99.5%; left: 0; top: 0">
            <div class="titles" style="height: 30px">
              <img class="img" src="./img/img4.png" style="left: 2%; width: auto; height: 96%; top: 2%"/>
              <div class="titles" style="width: 60%;left: 20%;">
                人 员 信 息 聚 类 画 像
              </div>
            </div>
            <div class="contents" style="height: 94%; top: 4%">
              <div id="r1" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0"></div>
              <div v-show="r1ElseChartVis">
                <div class="divs2" style="width: 98%; height: 9%; left: 1%; top: 1%">
                  <el-tag
                      v-show="fzbsVis"
                      :key="tag"
                      v-for="tag in fzbsJzid"
                      closable
                      :disable-transitions="false"
                      @close="handleClose_fzbsJzid(tag)">
                    {{ tag }}
                  </el-tag>
                  <el-input v-model="fzbsValue" style="width: 40px"></el-input>
                  <el-button @click="fzbj">分组</el-button>
                </div>
                <div class="divs2" style="width: 99%; height: 24%; right: 0; bottom: 5%">
                  <div id="R1chart1" class="contents" style="width: 29%; height: 99%; left: 0; top: 0"></div>
                  <div id="R1chart2" class="contents" style="width: 69%; height: 99%; left: 30%; top: 0"></div>
                </div>
              </div>
              <div v-show="r2ElseChartVis">
                <div class="divs2" style="width: 24%; height: 69%; left: 75%; bottom: 5%">

                  <div class="divs2" style="width: 100%; height: 69%; left: 0; top: 0">
                    <div id="tR2chart1" class="titles2"></div>
                    <div id="R2chart1" class="contents"></div>
                  </div>
                  <div class="divs2" style="width: 100%; height: 39%; left: 0; top: 70%">
                    <div id="tR2chart2" class="titles2"></div>
                    <div id="R2chart2" class="contents"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div v-show="visR === 2">
          <div class="divs" style="width: 100%; height: 99.5%; left: 0; top: 0">
            <div class="titles" style="height: 30px">
              <img class="img" src="./img/img4.png" style="left: 2%; width: auto; height: 96%; top: 2%"/>
              <div class="titles" style="width: 60%;left: 20%;">
                识 别 效 果
              </div>
            </div>
            <div id="r2" class="contents" style="height: 94%; top: 4%">
              <div id="r2_1" style="position: absolute; width: 98%; height: 49%; left: 1%; top: 0"></div>
              <div id="r2_2" style="position: absolute; width: 98%; height: 49%; left: 1%; top: 50%"></div>
            </div>
          </div>
        </div>

        <div v-show="visR === 3">
          <div class="divs" style="width: 100%; height: 99.5%; left: 0; top: 0">
            <div class="titles" style="height: 30px">
              <img class="img" src="./img/img4.png" style="left: 2%; width: auto; height: 96%; top: 2%"/>
              <div class="titles" style="width: 60%;left: 20%;">
                医 保 画 像
              </div>
            </div>
            <div id="r3" class="contents" style="height: 94%; top: 4%">
              <div style="position: absolute; width: 100%; height: 5%; left: 0; top: 0">
                <div class="text" style="left: 0; top: 0">分布关系:</div>
                <select @change="r3"
                        id="relationHeader" class="selects"
                        style="left: 10%; top: 0; width: 180px"></select>
              </div>
              <div style="position: absolute; width: 100%; height: 95%; left: 0; top: 5%">
                <div class="divs" style="width: 49%; height: 100%; left: 0; top: 0">
                  <div class="titles" style="height: 30px;">簇类1画像</div>
                  <div class="contents" style="height: 94%; top: 5%">
                    <div class="divs2" style="width: 100%; left: 0; height: 9%; top: 0">
                      <div class="titles2" id="tr3_1l"></div>
                      <div class="contents" id="dr3_1l"></div>
                    </div>
                    <div class="divs2" style="width: 100%; left: 0; height: 29%; top: 10%">
                      <div class="titles2" id="tr3_2l" style="font-size: 10px"></div>
                      <div class="contents" id="dr3_2l"></div>
                      <el-button @click="clear_yljgml" style="position: absolute; right: 0; top: 0">清除</el-button>
                    </div>
                    <div class="divs2" style="width: 100%; left: 0; height: 19%; top: 40%">
                      <div class="titles2" id="tr3_3l"></div>
                      <div class="contents" id="dr3_3l"></div>
                    </div>
                    <div class="divs2" style="width: 100%; left: 0; height: 39%; top: 60%">
                      <div class="titles2" id="tr3_4l"></div>
                      <div class="contents" id="dr3_4l"></div>
                    </div>
                  </div>
                </div>
                <div class="divs" style="width: 49%; height: 100%; left: 50%; top: 0">
                  <div class="titles" style="height: 30px;">簇类2画像</div>
                  <div class="contents" style="height: 94%; top: 5%">
                    <div class="divs2" style="width: 100%; left: 0; height: 9%; top: 0">
                      <div class="titles2" id="tr3_1r"></div>
                      <div class="contents" id="dr3_1r"></div>
                    </div>
                    <div class="divs2" style="width: 100%; left: 0; height: 29%; top: 10%">
                      <div class="titles2" id="tr3_2r" style="font-size: 10px"></div>
                      <div class="contents" id="dr3_2r"></div>
                    </div>
                    <div class="divs2" style="width: 100%; left: 0; height: 19%; top: 40%">
                      <div class="titles2" id="tr3_3r"></div>
                      <div class="contents" id="dr3_3r"></div>
                    </div>
                    <div class="divs2" style="width: 100%; left: 0; height: 39%; top: 60%">
                      <div class="titles2" id="tr3_4r"></div>
                      <div class="contents" id="dr3_4r"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-show="visR === 4">

        </div>

      </div>
    </div>
  </div>
</template>

<script src="./js/index.js">

</script>

<style src="./css/style.css" scoped>

</style>