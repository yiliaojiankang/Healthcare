<template>
  <div style="position: absolute; width: 100%; height: 100%; left: 0.5%; top: 0">
    <div id="page"></div>
    <div class="divsBg" style="width: 19.5%; height: 24.5%; left: 0; top: 0"></div>
    <div class="divs" style="width: 19.5%; height: 24.5%; left: 0; top: 0">
      <div id="t1" class="titles"></div>
      <div id="d1" class="contents">
        <img class="imgs" src="./img/床位数.png" style="left: 1%; top: 1%"/>
        <div class="text" style="width: 24%; left: 15%; top: 4%;font-size: 18px">床位数</div>
        <div id="d1_1" class="contents" style="width: 60%; left: 40%; height: 19%; top: 1%"></div>

        <img class="imgs" src="./img/占地面积.png" style="left: 1%; top: 21%"/>
        <div class="text" style="width: 24%; left: 15%; top: 24%;font-size: 18px">占地面积</div>
        <div id="d1_5" class="contents" style="width: 60%; left: 40%; height: 19%; top: 21%"></div>

        <img class="imgs" src="./img/建筑面积.png" style="left: 1%; top: 41%"/>
        <div class="text" style="width: 24%; left: 15%; top: 44%;font-size: 18px">建筑面积</div>
        <div id="d1_4" class="contents" style="width: 60%; left: 40%; height: 19%; top: 41%"></div>

        <img class="imgs" src="./img/绿化面积.png" style="left: 1%; top: 61%"/>
        <div class="text" style="width: 24%; left: 15%; top: 64%;font-size: 18px">绿化面积</div>
        <div id="d1_3" class="contents" style="width: 60%; left: 40%; height: 19%; top: 61%"></div>


        <img class="imgs" src="./img/入住人数.png" style="left: 1%; top: 81%"/>
        <div class="text" style="width: 24%; left: 15%; top: 84%;font-size: 18px">入住人数</div>
        <div id="d1_2" class="contents" style="width: 60%; left: 40%; height: 19%; top: 81%"></div>


      </div>
    </div>

    <div class="divsBg" style="width: 19.5%; height: 14.5%; left: 0; top: 25%"></div>
    <div class="divs" style="width: 19.5%; height: 14.5%; left: 0; top: 25%">
      <div id="t8" class="titles"></div>
      <div id="d8" class="contents"></div>
    </div>

    <div class="divsBg" style="width: 19.5%; height: 39.5%; left: 0; top: 40%"></div>
    <div class="divs" style="width: 19.5%; height: 39.5%; left: 0; top: 40%">
      <div id="t2" class="titles"></div>
      <div id="d2" class="contents"></div>
    </div>


    <div class="divsBg" style="width: 49.5%; height: 19.5%; left: 0; top: 80%"></div>
    <div class="divs" style="width: 49.5%; height: 19.5%; left: 0; top: 80%">
      <div id="t3" class="titles">该养老机构入住人员流量</div>
      <div id="d3" class="contents">
        <div id="d3_1" style="position: absolute; width: 60%; left: 0; height: 100%; top: 0"/>
        <div id="d3_2" style="position: absolute; width: 40%; left: 60%; height: 100%; top: 0"/>
      </div>
    </div>


    <div class="divsBg" style="width: 19.5%; height: 14.5%; left: 80%; top: 0"></div>
    <div class="divs" style="width: 19.5%; height: 14.5%; left: 80%; top: 0">
      <div class="titles">信息输入</div>
      <div class="contents" style="top: 18%; height: 81%">
        <div class="text" style="width: 100px; left: 1%; top: 0;font-size: 18px">年龄等级: </div>
        <select id="in1" class="selects" style="left: 31%; top: 0;font-size: 18px"/>
        <div class="text" style="left: 1%; top: 25%;font-size: 18px">性别: </div>
        <select id="in2" class="selects" style="left: 31%; top: 25%;font-size: 18px"/>
        <div class="text" style="width: 100px; left: 1%; top: 50%;font-size: 18px">老人类型: </div>
        <select id="in3" class="selects" style="left: 31%; top: 50%;font-size: 18px"/>
        <div class="text" style="left: 1%; top: 75%;font-size: 18px">等级: </div>
        <select id="in4" class="selects" style="left: 31%; top: 75%;font-size: 18px"/>

        <button @click="recommend" class="buttons" style="left: 61%; top: 0">推荐</button>
        <button @click="jgReduce" class="buttons" style="width: 11.5%; left: 61%; top: 25%">《</button>
        <button @click="jgAdd" class="buttons" style="width: 11.5%; left: 74%; top: 25%">》</button>
      </div>
    </div>

    <div class="divsBg" style="width: 19.5%; height: 34.5%; left: 80%; top: 15%"></div>
    <div class="divs" style="width: 19.5%; height: 34.5%; left: 80%; top: 15%">
      <div id="t4" class="titles"></div>
      <div id="d4" class="contents"></div>
    </div>

    <div class="divsBg" style="width: 19.5%; height: 29.5%; left: 80%; top: 50%"></div>
    <div class="divs" style="width: 19.5%; height: 29.5%; left: 80%; top: 50%">
      <div id="t5" class="titles"></div>
      <div id="d5" class="contents"></div>
      <button @click="d5('等级')" class="buttons" style="width: 50px; height: 25px; left: 1%; top: 1%">等级</button>
      <button @click="d5('老人类型')" class="buttons" style="width: 50px; height: 25px; left: 1%; top: 11%">类型</button>
    </div>

    <div class="divsBg" style="width: 24.5%; height: 19.5%; left: 50%; top: 80%"></div>
    <div class="divs" style="width: 24.5%; height: 19.5%; left: 50%; top: 80%">
      <div id="t6" class="titles"></div>
      <div id="d6" class="contents"></div>
    </div>

    <div class="divsBg" style="width: 24.5%; height: 19.5%; left: 75%; top: 80%"></div>
    <div class="divs" style="width: 24.5%; height: 19.5%; left: 75%; top: 80%">
      <div id="t7" class="titles"></div>
      <div id="d7" class="contents"></div>
      <button @click="d7('等级')" class="buttons" style="width: 50px; height: 25px; right: 1%; top: 11%">等级</button>
      <button @click="d7('老人类型')" class="buttons" style="width: 50px; height: 25px; right: 1%; top: 26%">类型</button>
      <button @click="d7('性别')" class="buttons" style="width: 50px; height: 25px; right: 1%; top: 41%">性别</button>
    </div>
  </div>
</template>

<script src="./js/index.js">

</script>

<style src="./css/style.css" scoped>

</style>