<template>
  <div>
    <h1 class="pageTitle">敏感政治文化禁忌</h1>
    <div class="table_border table_box">
      <table cellpadding="0" cellspacing="0" style="width: 100%">
        <colgroup>
          <col width="210" style="width: 105px" />
          <col width="253" style="width: 126.6px" />
          <col width="199" style="width: 99.6px" />
          <col width="818" style="width: 409.2px" />
          <col width="544" style="width: 272.4px" />
          <col width="109" style="width: 54.6px" />
        </colgroup>
        <tbody>
          <tr height="36" style="height: 18px" class="firstRow">
            <td class="et7" height="18" width="105" x:str="" style="">基线</td>
            <td class="et7" width="126" x:str="" style="">敏感内容</td>
            <td class="et7" width="99" x:str="" style="">涉及语言</td>
            <td class="et8" width="409" x:str="" style="">通用版本规则</td>
            <td class="et9" width="272" x:str="" style="">
              定制版本规则/特定规则
            </td>
            <td class="et6" width="54" style=""></td>
          </tr>
          <tr height="380" style="height: 190px">
            <td
              rowspan="2"
              class="et10"
              height="266"
              width="105"
              x:str=""
              style=""
            >
              中国高敏感城市
            </td>
            <td rowspan="2" class="et10" width="126" x:str="" style="">
              台北（以此为代表，台湾省其他城市等同此要求）
            </td>
            <td rowspan="2" class="et10" width="99" x:str="" style="">
              全语言
            </td>
            <td class="et11" width="409" x:str="" style="">
              <span class="font6">1、界面字符串显示的场景</span
              ><span class="font9">必须</span
              ><span class="font6"
                >增加“中国”标记：<br />1）与其他国家地区并列显示；<br />2）其他城市带有国家属性；<br />2、地图界面：<br />1）地图带有国界线且该地区在国界线以内；<br />2）地图不带国界线，需通过显示的字体粗细及大小，来划分该地区的行政等级，不能与中国省份同等粗细大小，如台北的字体大小不能与广东省相同；<br />4、图标类：<br />出现旗帜选择时，不能提供青天白日旗；</span
              >
            </td>
            <td class="et12" width="272" x:str="" style="">
              台湾定制版本中，台北单独显示，不加“台湾”
            </td>
            <td class="et6"></td>
          </tr>
          <tr height="152" style="height: 76px">
            <td class="et14" width="409" x:str="" style="">
              <span class="font6">界面字符串显示的场景</span
              ><span class="font9">不需要</span
              ><span class="font6"
                >增加“中国”标记<br />仅为城市列表，其他城市未带有国家属性；<br />位置定位仅为城市，无国家属性；<br />台北和中国不能在同一级别并列</span
              >
            </td>
            <td class="et15"></td>
            <td class="et6"></td>
          </tr>
          <tr height="532" style="height: 266px">
            <td class="et16" height="266" width="105" x:str="" style="">
              中国高敏感城市
            </td>
            <td class="et10" width="126" x:str="" style="">台湾</td>
            <td class="et16" width="99" x:str="" style="">全语言</td>
            <td class="et11" width="409" x:str="" style="">
              <span class="font6">1、界面字符串显示的场景</span
              ><span class="font9">必须</span
              ><span class="font6"
                >增加“中国”标记：<br />1）与其他国家地区并列显示；<br />2）其他城市带有国家属性；<br />2、网页类：<br />超链接/网址/隐私协议上</span
              ><span class="font9">不能</span
              ><span class="font6"
                >带有countrycode字段并显示给用户；<br />3、地图界面：<br />1）地图带有国界线且该地区在国界线以内；<br />2）地图不带国界线，需通过显示的字体粗细及大小，来划分该地区的行政等级，不能与中国同等粗细大小，同等字体大小；如通过底色区分国家地区，中国大陆和台湾需同底色，“台湾”名称规格与中国省级行政区名称一致；<br />3）带有国家属性的位置定位；<br />4、图标类：<br />出现旗帜选择时，不能提供青天白日旗；</span
              >
            </td>
            <td class="et12" width="272" x:str="" style="">
              台湾定制版本中，国家地区列表不提供，默认选择“台湾”，地图上不标记“台湾”两字，定位信息只出现台湾省内的各个城市名，如台北市、花莲市等
            </td>
            <td class="et6"></td>
          </tr>
          <tr height="378" style="height: 189px">
            <td
              rowspan="2"
              class="et10"
              height="265"
              width="105"
              x:str=""
              style=""
            >
              中国高敏感城市
            </td>
            <td rowspan="2" class="et10" width="126" x:str="" style="">香港</td>
            <td rowspan="2" class="et10" width="99" x:str="" style="">
              全语言
            </td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >1、界面字符串显示的场景必须增加“中国”标记：<br />1)
                与其他国家地区并列显示；<br />2) 其他城市带有国家属性；<br />3）号码归属地、如果带有国家属性的位置定位；<br />3)“选择国家和地区”、“选择语言”、“选择电话国家码”、“选择货币”这类明显带有政治区域属性；<br />2、网页类：<br />超链接/网址/隐私协议上</span
              ><span class="font4">不能</span
              ><span class="font0"
                >带有countrycode字段并显示给用户；<br />3. 旗帜类：<br /></span
              ><span class="font7">禁止出现港独旗帜</span>
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="152" style="height: 76px">
            <td class="et17" width="409" x:str="" style="">
              <span class="font0">界面字符串显示的场景</span
              ><span class="font4">不需要</span
              ><span class="font0"
                >增加“中国”标记<br />仅为城市列表，其他城市未带有国家属性；<br />位置定位仅为城市，无国家属性；<br />香港和中国不能在同一级别并列</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="304" style="height: 152px">
            <td
              rowspan="2"
              class="et10"
              height="228"
              width="105"
              x:str=""
              style=""
            >
              中国高敏感城市
            </td>
            <td rowspan="2" class="et16" width="126" x:str="" style="">澳门</td>
            <td rowspan="2" class="et16" width="99" x:str="" style="">
              全语言
            </td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >1、界面字符串显示的场景必须增加“中国”标记：<br />1)
                与其他国家地区并列显示；<br />2) 其他城市带有国家属性；<br />3）号码归属地、如果带有国家属性的位置定位；<br />3)“选择国家和地区”、“选择语言”、“选择电话国家码”、“选择货币”这类明显带有政治区域属性；<br />2、网页类：<br />超链接/网址/隐私协议上</span
              ><span class="font4">不能</span
              ><span class="font0">带有countrycode字段并显示给用户；</span>
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="152" style="height: 76px">
            <td class="et17" width="409" x:str="" style="">
              <span class="font0">界面字符串显示的场景</span
              ><span class="font4">不需要</span
              ><span class="font0"
                >增加“中国”标记<br />仅为城市列表，其他城市未带有国家属性；<br />位置定位仅为城市，无国家属性；<br />澳门和中国不能在同一级别并列</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="580" style="height: 290.25px">
            <td class="et16" height="290" width="105" x:str="" style="">
              中国高敏感城市
            </td>
            <td class="et16" width="126" x:str="" style="">
              中印边界（藏南地区、阿克赛钦地区等）
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et18" width="409" x:str="" style="">
              <span class="font0"
                >1、地图：<br />a.
                在中国地图上带有国界线的，藏南地区、阿克赛钦地区必须在国界线以内；<br />b.
                海外版本根据是否为当事国家地区进行区分：<br />如果为当事国家地区，按当事国家地区的法律法规要求修订（如印度当地使用印度法律法规要求的标识）<br />如果为非当事国家地区，统一按中国视角标识<br /></span
              ><span class="font7"
                >2、国内及海外方案一致，中印争议地区的敏感县市名去掉国家名、邦/省名。<br />阿克赛钦地区，下面县市后面不能出现Ladakh（拉达克）、Himachal
                Pradesh（喜马偕尔邦）或者 Uttarakhand（北阿坎德邦）：<br /></span
              ><span class="font10">Leh</span
              ><span class="font7">，Kinnaur，</span
              ><span class="font5">Lahaul and Spiti</span
              ><span class="font7"
                >，Chamoli，Uttarkashi，Pithoragarh<br /><br />藏南地区，下面城市后面不能出现
                Arunachal Pradesh（阿鲁纳恰尔邦）：<br /></span
              ><span class="font5"
                >Anjaw，Dibang Valley，East Kameng，East Siang，Kra
                Daadi，Kurung Kumey，Lohit，Lower Dibang Valley，Lower
                Subansiri，</span
              ><span class="font7">Namsai，</span
              ><span class="font5"
                >Papum Pare，Siang，Tawang，Upper Siang，Upper Subansiri，West
                Kameng，West Siang，Itanagar，Kamle，Pakke-Kessang，Lepa
                Rada，Shi-Yomi，Lower Siang</span
              >
            </td>
            <td class="et19" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="570" style="height: 285px">
            <td class="et16" height="285" width="105" x:str="" style="">
              中国周边敏感海岛
            </td>
            <td class="et16" width="126" x:str="" style="">南沙群岛</td>
            <td class="et16" width="99" x:str="" style="">全语言</td>
            <td class="et20" width="409" x:str="" style="">
              在天气、时钟等应用场景中，国内版本在显示敏感海岛时，需要带有“中国”标记，或归属于海南省/福建省等中国省份；<br /><br />提供的位置定位如果带有国家属性，需增加“中国”标记，或归属于海南省等中国省份；<br />海外版本屏蔽或搜索不到该海岛<br /><br />在地图场景中，需符合：<br />1、国内版本的中国地图上带有国界线的，南海诸岛必须在国界线以内；<br />2、国内版本的中国地图上不带有国界线的，南海诸岛必须标记出来，且归属中国；<br />3、海外版本根据是否为当事国家地区进行区分：<br />如果为当事国家地区，特殊处理；<br />如果为非当事国家地区，统一按中国视角标识
            </td>
            <td class="et21" width="272" x:str="" style="">
              地图场景东南亚四国视角下（马来西亚，菲律宾，越南，文莱）：南海诸岛不展示名称，无归属
            </td>
            <td class="et6"></td>
          </tr>
          <tr height="570" style="height: 285px">
            <td class="et16" height="285" width="105" x:str="" style="">
              中国周边敏感海岛
            </td>
            <td class="et16" width="126" x:str="" style="">太平岛</td>
            <td class="et16" width="99" x:str="" style="">全语言</td>
            <td class="et20" width="409" x:str="" style="">
              在天气、时钟等应用场景中，国内版本在显示敏感海岛时，需要带有“中国”标记，或归属于海南省/福建省等中国省份；<br /><br />提供的位置定位如果带有国家属性，需增加“中国”标记，或归属于海南省等中国省份；<br />海外版本屏蔽或搜索不到该海岛<br /><br />在地图场景中，需符合：<br />1、国内版本的中国地图上带有国界线的，南海诸岛必须在国界线以内；<br />2、国内版本的中国地图上不带有国界线的，南海诸岛必须标记出来，且归属中国；<br />3、海外版本根据是否为当事国家地区进行区分：<br />如果为当事国家地区，特殊处理；<br />如果为非当事国家地区，统一按中国视角标识
            </td>
            <td class="et21" width="272" x:str="" style="">
              地图场景东南亚四国视角下（马来西亚，菲律宾，越南，文莱）：南海诸岛不展示名称，无归属
            </td>
            <td class="et6"></td>
          </tr>
          <tr height="570" style="height: 285px">
            <td class="et16" height="285" width="105" x:str="" style="">
              中国周边敏感海岛
            </td>
            <td class="et16" width="126" x:str="" style="">永兴岛</td>
            <td class="et16" width="99" x:str="" style="">全语言</td>
            <td class="et20" width="409" x:str="" style="">
              在天气、时钟等应用场景中，国内版本在显示敏感海岛时，需要带有“中国”标记，或归属于海南省/福建省等中国省份；<br /><br />提供的位置定位如果带有国家属性，需增加“中国”标记，或归属于海南省等中国省份；<br />海外版本屏蔽或搜索不到该海岛<br /><br />在地图场景中，需符合：<br />1、国内版本的中国地图上带有国界线的，南海诸岛必须在国界线以内；<br />2、国内版本的中国地图上不带有国界线的，南海诸岛必须标记出来，且归属中国；<br />3、海外版本根据是否为当事国家地区进行区分：<br />如果为当事国家地区，特殊处理；<br />如果为非当事国家地区，统一按中国视角标识
            </td>
            <td class="et21" width="272" x:str="" style="">
              地图场景东南亚四国视角下（马来西亚，菲律宾，越南，文莱）：南海诸岛不展示名称，无归属
            </td>
            <td class="et6"></td>
          </tr>
          <tr height="570" style="height: 285px">
            <td class="et16" height="285" width="105" x:str="" style="">
              中国周边敏感海岛
            </td>
            <td class="et23" width="126" x:str="" style="">钓鱼岛</td>
            <td class="et16" width="99" x:str="" style="">全语言</td>
            <td class="et20" width="409" x:str="" style="">
              在天气、时钟等应用场景中，国内版本在显示敏感海岛时，需要带有“中国”标记，或归属于海南省/福建省等中国省份；<br /><br />提供的位置定位如果带有国家属性，需增加“中国”标记，或归属于海南省等中国省份；<br />海外版本屏蔽或搜索不到该海岛<br /><br />在地图场景中，需符合：<br />1、国内版本的中国地图上带有国界线的，钓鱼岛与赤尾屿必须在国界线以内；<br />2、国内版本的中国地图上不带有国界线的，钓鱼岛与赤尾屿必须标记出来，且归属中国；<br />3、海外版本根据是否为当事国家地区进行区分：<br />如果为日本，不展示钓鱼岛与赤尾屿名称；<br />如果为非当事国家地区，统一按中国视角标识，标记为钓鱼岛、赤尾屿
            </td>
            <td class="et21" width="272" x:str="" style="">
              地图场景日本视角下：钓鱼岛和赤尾屿不展示名称，无归属
            </td>
            <td class="et6"></td>
          </tr>
          <tr height="570" style="height: 285px">
            <td class="et16" height="285" width="105" x:str="" style="">
              中国周边敏感海岛
            </td>
            <td class="et16" width="126" x:str="" style="">中沙群岛</td>
            <td class="et16" width="99" x:str="" style="">全语言</td>
            <td class="et20" width="409" x:str="" style="">
              在天气、时钟等应用场景中，国内版本在显示敏感海岛时，需要带有“中国”标记，或归属于海南省/福建省等中国省份；<br /><br />提供的位置定位如果带有国家属性，需增加“中国”标记，或归属于海南省等中国省份；<br />海外版本屏蔽或搜索不到该海岛<br /><br />在地图场景中，需符合：<br />1、国内版本的中国地图上带有国界线的，南海诸岛必须在国界线以内；<br />2、国内版本的中国地图上不带有国界线的，南海诸岛必须标记出来，且归属中国；<br />3、海外版本根据是否为当事国家地区进行区分：<br />如果为当事国家地区，特殊处理；<br />如果为非当事国家地区，统一按中国视角标识
            </td>
            <td class="et21" width="272" x:str="" style="">
              地图场景东南亚四国视角下（马来西亚，菲律宾，越南，文莱）：南海诸岛不展示名称，无归属
            </td>
            <td class="et6"></td>
          </tr>
          <tr height="570" style="height: 285px">
            <td class="et16" height="285" width="105" x:str="" style="">
              中国周边敏感海岛
            </td>
            <td class="et16" width="126" x:str="" style="">西沙群岛</td>
            <td class="et16" width="99" x:str="" style="">全语言</td>
            <td class="et20" width="409" x:str="" style="">
              在天气、时钟等应用场景中，国内版本在显示敏感海岛时，需要带有“中国”标记，或归属于海南省/福建省等中国省份；<br /><br />提供的位置定位如果带有国家属性，需增加“中国”标记，或归属于海南省等中国省份；<br />海外版本屏蔽或搜索不到该海岛<br /><br />在地图场景中，需符合：<br />1、国内版本的中国地图上带有国界线的，南海诸岛必须在国界线以内；<br />2、国内版本的中国地图上不带有国界线的，南海诸岛必须标记出来，且归属中国；<br />3、海外版本根据是否为当事国家地区进行区分：<br />如果为当事国家地区，特殊处理；<br />如果为非当事国家地区，统一按中国视角标识
            </td>
            <td class="et21" width="272" x:str="" style="">
              地图场景东南亚四国视角下（马来西亚，菲律宾，越南，文莱）：南海诸岛不展示名称，无归属
            </td>
            <td class="et6"></td>
          </tr>
          <tr height="570" style="height: 285px">
            <td class="et16" height="285" width="105" x:str="" style="">
              中国周边敏感海岛
            </td>
            <td class="et23" width="126" x:str="" style="">东沙群岛</td>
            <td class="et16" width="99" x:str="" style="">全语言</td>
            <td class="et20" width="409" x:str="" style="">
              在天气、时钟等应用场景中，国内版本在显示敏感海岛时，需要带有“中国”标记，或归属于海南省/福建省等中国省份；<br /><br />提供的位置定位如果带有国家属性，需增加“中国”标记，或归属于海南省等中国省份；<br />海外版本屏蔽或搜索不到该海岛<br /><br />在地图场景中，需符合：<br />1、国内版本的中国地图上带有国界线的，南海诸岛必须在国界线以内；<br />2、国内版本的中国地图上不带有国界线的，南海诸岛必须标记出来，且归属中国；<br />3、海外版本根据是否为当事国家地区进行区分：<br />如果为当事国家地区，特殊处理；<br />如果为非当事国家地区，统一按中国视角标识
            </td>
            <td class="et21" width="272" x:str="" style="">
              地图场景东南亚四国视角下（马来西亚，菲律宾，越南，文莱）：南海诸岛不展示名称，无归属
            </td>
            <td class="et6"></td>
          </tr>
          <tr height="570" style="height: 285px">
            <td class="et16" height="285" width="105" x:str="" style="">
              中国周边敏感海岛
            </td>
            <td class="et16" width="126" x:str="" style="">赤尾屿</td>
            <td class="et16" width="99" x:str="" style="">全语言</td>
            <td class="et20" width="409" x:str="" style="">
              在天气、时钟等应用场景中，国内版本在显示敏感海岛时，需要带有“中国”标记，或归属于海南省/福建省等中国省份；<br /><br />提供的位置定位如果带有国家属性，需增加“中国”标记，或归属于海南省等中国省份；<br />海外版本屏蔽或搜索不到该海岛<br /><br />在地图场景中，需符合：<br />1、国内版本的中国地图上带有国界线的，钓鱼岛与赤尾屿必须在国界线以内；<br />2、国内版本的中国地图上不带有国界线的，钓鱼岛与赤尾屿必须标记出来，且归属中国；<br />3、海外版本根据是否为当事国家地区进行区分：<br />如果为日本，不展示钓鱼岛与赤尾屿名称；<br />如果为非当事国家地区，统一按中国视角标识，标记为钓鱼岛、赤尾屿
            </td>
            <td class="et21" width="272" x:str="" style="">
              地图场景日本视角下：钓鱼岛和赤尾屿不展示名称，无归属
            </td>
            <td class="et6"></td>
          </tr>
          <tr height="391" style="height: 195.75px">
            <td class="et16" height="195" width="105" x:str="" style="">
              中国周边敏感海岛
            </td>
            <td class="et16" width="126" x:str="" style="">
              南海九段线/十段线标识
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              中国区版本需标记九段线/十段线<br />海外版本根据是否为当事国家地区区分：<br />如果为当事国家地区，按当事国家地区的法律法规要求修订（如越南当地法律法规要求不能标识九段线）<br />如果为非当事国家地区，统一按中国视角标识
            </td>
            <td class="et12" width="272" x:str="" style="">
              <span class="font0"
                >台湾定制版本中，地图不标记九段线/十段线；<br /></span
              ><span class="font7"
                >地图场景东南亚四国视角下（马来西亚，菲律宾，越南，文莱）：当地不能标记九段线</span
              >
            </td>
            <td class="et6"></td>
          </tr>
          <tr height="76" style="height: 38px">
            <td class="et16" height="38" width="105" x:str="" style="">
              中国周边敏感海岛
            </td>
            <td class="et16" width="126" x:str="" style="">
              南沙群岛与长沙同音之长沙的写法
            </td>
            <td class="et16" width="99" x:str="" style="">越南语</td>
            <td class="et24" width="409" x:str="" style="">
              天气城市搜索、时区城市搜索、时钟城市搜索等场景下，长沙的越南语翻译保持为“Changsha”，不做翻译
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="342" style="height: 171px">
            <td class="et16" height="171" width="105" x:str="" style="">
              海外敏感地区
            </td>
            <td class="et25" width="126" x:str="" style="">耶路撒冷</td>
            <td class="et16" width="99" x:str="" style="">
              全语言，重点关注阿拉伯语、希伯来语
            </td>
            <td class="et26" width="409" x:str="" style="">
              <span class="font6"
                >1、界面字符串显示的场景不增加国家标记：<br />2、地图界面：<br />该地区不要在以色列或巴勒斯坦的国界线内；<br /><br /></span
              ><span class="font9">背景：</span
              ><span class="font6"
                >是以色列和巴勒斯坦的冲突中心。以色列和巴勒斯坦都声称耶路撒冷是他们的首都，这两个声称在国际社会上都没有得到广泛的承认，该市的最终地位也被认为尚未确定，有待以色列和巴勒斯坦双方谈判决定。目前由以色列实际控制，是以色列事实上的首都。多数国家都将大使馆设在特拉维夫。今天耶路撒冷仍然是以巴冲突的中心。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="228" style="height: 114px">
            <td class="et16" height="114" width="105" x:str="" style="">
              海外敏感地区
            </td>
            <td class="et25" width="126" x:str="" style="">以色列</td>
            <td class="et16" width="99" x:str="" style="">
              全语言，重点关注阿拉伯语、希伯来语
            </td>
            <td class="et26" width="409" style=""></td>
            <td class="et12" width="272" x:str="" style="">
              <span class="font0">中东非版本：以色列屏蔽，不显示<br /></span
              ><span class="font7"
                >地图场景中东非视角下（叙利亚、伊拉克、约旦、黎巴嫩）：以色列名称不展示</span
              ><span class="font0"><br /><br /></span
              ><span class="font4">背景</span><span class="font0">：</span
              ><span class="font10">以色列多次和阿拉伯国家</span
              ><span class="font0"
                >多次因为宗教、领土、资源和霸权主义矛盾而发生战争。</span
              >
            </td>
            <td class="et6"></td>
          </tr>
          <tr height="570" style="height: 285px">
            <td class="et16" height="285" width="105" x:str="" style="">
              海外敏感地区
            </td>
            <td class="et25" width="126" x:str="" style="">辛菲罗波尔</td>
            <td class="et16" width="99" x:str="" style="">
              全语言，重点关注乌克兰语、俄语
            </td>
            <td class="et26" width="409" x:str="" style="">
              <span class="font6"
                >1、界面字符串显示的场景不增加国家标记：<br />2、地图界面：<br />1）显示上，该地区不要在乌克兰或俄罗斯的国界线内，以虚线显示为争议地区；<br />2）搜索上，该地区不返回国家归属；<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：俄罗斯和乌克兰争端地。1954年4月26日，为庆祝俄乌合并300周年，辛菲罗波尔连同克里木半岛一起被尼基塔·赫鲁晓夫从俄罗斯划到了乌克兰苏维埃社会主义共和国。1991年苏联解体后，辛菲罗波尔成为乌克兰克里米亚自治共和国的首都。2014年发生“克里米亚公投”事件。该事件导致包括辛菲罗波尔在内的克里米亚自治共和国与塞瓦斯托波尔市成为俄罗斯的一部分。乌克兰当局不承认这次公投，仍宣布对克里米亚半岛拥有主权。世界上有11个国家明确认可俄罗斯对克里米亚半岛的主权，一些国家支持乌克兰政府的立场，其他国家并未明确立场。</span
              >
            </td>
            <td class="et21" width="272" x:str="" style="">
              地图场景俄罗斯或乌克兰视角下：根据当地法律法规显示属于俄罗斯或乌克兰；
            </td>
            <td class="et6"></td>
          </tr>
          <tr height="570" style="height: 285px">
            <td class="et16" height="285" width="105" x:str="" style="">
              海外敏感地区
            </td>
            <td class="et25" width="126" x:str="" style="">塞瓦斯托波尔</td>
            <td class="et16" width="99" x:str="" style="">
              全语言，重点关注乌克兰语、俄语
            </td>
            <td class="et27" width="409" x:str="" style="">
              <span class="font0"
                >1、界面字符串显示的场景不增加国家标记：<br />2、地图界面：<br />1）显示上，该地区不要在乌克兰或俄罗斯的国界线内</span
              ><span class="font7"
                >，以虚线显示为争议地区；<br />2）搜索上，该地区不返回国家归属；</span
              ><span class="font0"><br /><br /></span
              ><span class="font4">背景</span><span class="font0">：</span
              ><span class="font10">俄罗斯和乌克兰争端地。</span
              ><span class="font0"
                >1954年4月26日，为庆祝俄乌合并300周年，辛菲罗波尔连同克里木半岛一起被尼基塔·赫鲁晓夫从俄罗斯划到了乌克兰苏维埃社会主义共和国。1991年苏联解体后，辛菲罗波尔成为乌克兰克里米亚自治共和国的首都。2014年发生“克里米亚公投”事件。该事件导致包括</span
              ><span class="font7">辛菲罗波尔</span
              ><span class="font0">在内的克里米亚自治共和国与</span
              ><span class="font7">塞瓦斯托波尔</span
              ><span class="font0"
                >市成为俄罗斯的一部分。乌克兰当局不承认这次公投，仍宣布对克里米亚半岛拥有主权。世界上有11个国家明确认可俄罗斯对克里米亚半岛的主权，一些国家支持乌克兰政府的立场，其他国家并未明确立场。</span
              >
            </td>
            <td class="et21" width="272" x:str="" style="">
              地图场景俄罗斯或乌克兰视角下：根据当地法律法规显示属于俄罗斯或乌克兰；
            </td>
            <td class="et6"></td>
          </tr>
          <tr height="532" style="height: 266px">
            <td class="et16" height="266" width="105" x:str="" style="">
              海外敏感地区
            </td>
            <td class="et25" width="126" x:str="" style="">西撒哈拉</td>
            <td class="et16" width="99" x:str="" style="">
              全语言，重点关注阿拉伯语
            </td>
            <td class="et27" width="409" x:str="" style="">
              <span class="font0"
                >1、界面字符串显示的场景不出现该地区：<br />2、地图界面：<br />地图完整，不显示该地区名称；<br />3、避免使用该地区的国家旗帜<br /><br /></span
              ><span class="font4">背景</span><span class="font0">：</span
              ><span class="font10"
                >目前，摩洛哥控制着西撒哈拉大约四分之三的领土。摩洛哥强制要求界面上不单独出现西撒哈拉名称（地图和地区选择）。</span
              ><span class="font0"
                >1975
                年西班牙撤离时，与摩洛哥和毛里塔尼亚分别签署了分治协议。1976
                年，由阿尔及利亚支持的波利萨里奥阵线也对该地区提出领土要求，三方多次发生武装冲突。1979
                年，毛里塔尼亚宣布放弃对西撒哈拉的领土主权，而摩洛哥与波利萨里奥阵线的冲突则一直持续到
                1991
                年。目前，摩洛哥控制着西撒哈拉大约四分之三的领土。在产品涉及地名的场景下，对于针对</span
              ><span class="font10"
                >摩洛哥地区的产品，建议将该地区归为摩洛哥所属领土。对于全球用户，建议将该地区归为半自治地区</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="223" style="height: 111.75px">
            <td class="et16" height="111" width="105" x:str="" style="">
              海外敏感地区
            </td>
            <td class="et25" width="126" x:str="" style="">阿尤恩</td>
            <td class="et16" width="99" x:str="" style="">
              全语言，重点关注阿拉伯语
            </td>
            <td class="et27" width="409" x:str="" style="">
              <span class="font0"
                >1、界面字符串显示的场景不出现该地区：<br />2、地图界面：<br />地图完整，不显示该地区名称；<br /><br /></span
              ><span class="font4">背景：</span
              ><span class="font10">西撒哈拉的首府，历史背景同上。</span>
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="380" style="height: 190px">
            <td class="et16" height="190" width="105" x:str="" style="">
              海外敏感地区
            </td>
            <td class="et25" width="126" x:str="" style="">科索沃</td>
            <td class="et16" width="99" x:str="" style="">
              全语言，重点关注塞尔维亚语
            </td>
            <td class="et27" width="409" x:str="" style="">
              <span class="font0"
                >1、界面字符串显示的场景不出现该地区：<br />2、地图界面：<br />地图完整，不显示该地区名称；<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：是一个主权争端地区及有限承认国家，位于欧洲东南部巴尔干半岛，于
                2008
                年单方面宣布独立。塞尔维亚虽然承认其民选政府，但只承认该地区为塞尔维亚的两个自治省之一（科索沃和梅托希亚自治省。</span
              ><span class="font10"
                >中华人民共和国坚决支持塞尔维亚捍卫领土与主权完整的决心，不予承认科索沃<br />独立。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="190" style="height: 95px">
            <td class="et16" height="95" width="105" x:str="" style="">
              海外敏感地区
            </td>
            <td class="et25" width="126" x:str="" style="">普里什蒂纳</td>
            <td class="et16" width="99" x:str="" style="">
              全语言，重点关注塞尔维亚语
            </td>
            <td class="et27" width="409" x:str="" style="">
              <span class="font0"
                >1、界面字符串显示的场景不出现该地区：<br />2、地图界面：<br />地图完整，不显示该地区名称；<br /><br /></span
              ><span class="font4">背景</span><span class="font0">：</span
              ><span class="font10">科索沃的首府，历史背景同上。</span>
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="342" style="height: 171px">
            <td class="et16" height="171" width="105" x:str="" style="">
              海外敏感地区
            </td>
            <td class="et25" width="126" x:str="" style="">北马其顿</td>
            <td class="et16" width="99" x:str="" style="">
              全语言，重点关注希腊语、马其顿语
            </td>
            <td class="et27" width="409" x:str="" style="">
              <span class="font0"
                >官方名称为：北马其顿共和国（Republic of North
                Macedonia）,也可以使用简称：North
                Macedonia（北马其顿）。请特别注意，禁止使用Northern
                Macedonia作为国家名。<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：希腊有个马其顿省，与马其顿共和国的国名重名，由于同名的历史原因，使得</span
              ><span class="font10"
                >希腊担忧马其顿迟早有一天会吞并本国的马其顿省</span
              ><span class="font0"
                >。马其顿独立后想加入北约，必须要北约成员都同意。已成为北约成员的希腊利用这一权利，要求马其顿改名。2019年2月14日
                改名为“北马其顿”</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="195" style="height: 97.5px">
            <td class="et16" height="97" width="105" x:str="" style="">
              海外敏感地区
            </td>
            <td class="et25" width="126" x:str="" style="">斯威士兰</td>
            <td class="et16" width="99" x:str="" style="">
              全语言，重点关注台湾繁体、香港繁体、简体中文、英文
            </td>
            <td class="et27" width="409" x:str="" style="">
              <span class="font0">官方</span
              ><span class="font10">英文名称从Swaziland改为Eswatini</span
              ><span class="font0"
                >，根据国家改名规则进行其他语言的修改；简体中文依据外交部官网公布名称，仍然使用“斯威士兰
                ”<br /><br /></span
              ><span class="font4">背景：</span
              ><span class="font0"
                >斯威士兰成了伊斯瓦蒂尼（eSwatini），这是一个更古老的斯威士兰名字，但含义和斯威士兰一样，意味斯威士人的土地；改名是因为斯威士兰（
                Swaziland ）总是被当作瑞士 Switzerland。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="195" style="height: 97.5px">
            <td class="et28" height="97" width="105" x:str="" style="">
              海外敏感地区
            </td>
            <td class="et29" width="126" x:str="" style="">努尔苏丹</td>
            <td class="et30" width="99" style=""></td>
            <td class="et26" width="409" x:str="" style="">
              <span class="font6"
                >哈萨克斯坦首都名从“阿斯塔纳”改为“努尔苏丹”，根据国家及城市改名规则进行其他语言的修改<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：托卡耶夫2019年3月20日宣誓就任总统。在就职演讲时建议将首都的名称由阿斯塔纳改为首任总统努尔苏丹·纳扎尔巴耶夫的名字“努尔苏丹”，以</span
              ><span class="font10"
                >纪念努尔苏丹·纳扎尔巴耶夫对哈萨克斯坦作出的贡献。</span
              >
            </td>
            <td class="et21" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="195" style="height: 97.5px">
            <td class="et30" height="97" width="105" x:str="" style="">
              海外敏感地区
            </td>
            <td class="et31" width="126" x:str="" style="">克什米尔</td>
            <td class="et30" width="99" style=""></td>
            <td class="et32" width="409" x:str="" style="">
              <span class="font7"
                >中印巴争议地区<br /><br />克什米尔地区的地区名后面不能出现Jammu
                and Kashmir（邦名）：<br /></span
              ><span class="font10"
                >Bandipore，Baramulla，Kupwara，Poonch，Rajouri</span
              >
            </td>
            <td class="et21" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="238" style="height: 119.25px">
            <td class="et16" height="119" width="105" x:str="" style="">
              禁忌动物
            </td>
            <td class="et25" width="126" x:str="" style="">猪</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et27" width="409" x:str="" style="">
              <span class="font0"
                >任何场景下应避免使用猪的图样，避免突出强调猪肉制品，特别是中东非地区<br /><br /></span
              ><span class="font4">背景</span><span class="font0">：</span
              ><span class="font10">“猪”“狗”图片，在中东北非地区属于敏感内</span
              ><span class="font0"
                >容；对动物猪和狗有明确的禁忌要求，《古兰经》在多处指示穆斯林禁食猪肉，因为猪肉是不洁的，因此猪及其一切制品都是禁止食用、使用和宣传。对待狗的态度比较复杂，仅希望是驯养狩猎，不能用作宠物，也视为不洁的动物，以驯养宠物为消遣和兴趣，这也是愚昧人类的一种纵欲，生活方式糜烂，不能公开宣传狗的形象。</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="247" style="height: 123.75px">
            <td class="et16" height="123" width="105" x:str="" style="">
              禁忌动物
            </td>
            <td class="et25" width="126" x:str="" style="">狗</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et27" width="409" x:str="" style="">
              <span class="font0"
                >任何场景下应避免使用狗的图样，避免突出强调狗肉制品，特别是中东非地区和马来西亚。<br /><br />背景：“</span
              ><span class="font10"
                >猪”“狗”图片，在中东北非地区属于敏感内容</span
              ><span class="font0"
                >；对动物猪和狗有明确的禁忌要求，《古兰经》在多处指示穆斯林禁食猪肉，因为猪肉是不洁的，因此猪及其一切制品都是禁止食用、使用和宣传。对待狗的态度比较复杂，仅希望是驯养狩猎，不能用作宠物，也视为不洁的动物，以驯养宠物为消遣和兴趣，这也是愚昧人类的一种纵欲，生活方式糜烂，不能公开宣传狗的形象。</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="190" style="height: 95.25px">
            <td class="et16" height="95" width="105" x:str="" style="">
              禁忌动物
            </td>
            <td class="et25" width="126" x:str="" style="">黑猫</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0">避免使用该形象<br /><br /></span
              ><span class="font4">背景：</span
              ><span class="font0"
                >在阿根廷、萨尔瓦多黑猫代表厄运。牙尖爪利，背部拱起的黑猫通常与无政府主义及无政府主义工会联系紧密，咄咄逼人的样貌暗指自发罢工、破坏行动与激进的工会主义。任何场景下尽量避免使用黑猫形象。</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="181" style="height: 90.75px">
            <td class="et16" height="90" width="105" x:str="" style="">
              禁忌植物
            </td>
            <td class="et25" width="126" x:str="" style="">大麻叶</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              任何场景下避免使用大麻叶与近似图样，避免混淆大麻与枫叶等植物。<br /><br />背景：涉及区域是全球。大麻为毒品来源之一，另有医疗麻醉作用，大麻吸食合法化仅在个别国家和地区推行；大麻在宗教和灵学方面有悠久的应用历史，此类使用通常被禁止。
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="180" style="height: 90px">
            <td class="et16" height="90" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">手背比V</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >英国，爱尔兰，澳大利亚，新西兰，南非，不提供此手势<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：正V是“和平”、“胜利”的意思，但手背比V是一种冒犯手势，在英国用手指比V与竖中指意思相同。所以，将次手势变为手背用食指比1即可。</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="198" style="height: 99px">
            <td class="et16" height="99" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">露出脚底</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >大部分伊斯兰国家，中东、北非、亚洲，尤其在印度尼西亚，印度，泰国和孟加拉国如有图片包含脚部，确保不露出脚底。<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：在伊斯兰国家和地区，
                露出脚底或触摸脚底不仅是一种冒犯行为，还违反了禁止露出脚底的相关法律。<br
              /></span>
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="205" style="height: 102.75px">
            <td class="et16" height="102" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">用门牙咬大拇指</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >美国，印度，巴基斯坦，不要出现在任何场景中。<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：在美国等国家和地区，
                该手势与竖中指意思相同，是一种冒犯行为。</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="196" style="height: 98.25px">
            <td class="et16" height="98" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">拇指穿拳头</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >西欧（尤其是英国、爱尔兰）。土耳其，南非，东欧（俄罗斯），在产品或其他物料中避免出现<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：一种下流手势， 在欧洲， 盛行土耳其和斯拉夫文化的国家和地区，
                该手势等同于竖中指。 在俄罗斯等东欧国家和地区，
                该手势代表对提议的否决。</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="145" style="height: 72.75px">
            <td class="et16" height="72" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">五个爸爸</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et34" width="409" x:str="" style="">
              <span class="font6"
                >中东，尤其在阿拉伯国家，加勒比海等地区产品避免出现该手势<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：该手势为强烈侮辱性手势， 是对相方母亲的侮辱。</span
              >
            </td>
            <td class="et6"></td>
            <td class="et6"></td>
          </tr>
          <tr height="204" style="height: 102px">
            <td class="et16" height="102" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">恶魔牛角</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >该手势在意大利、法国的特定场景下包含敏感含义，当产品中出现该手势，需避免使用。<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：该手势是“摇滚”，“摇滚万岁”的代名词。在美国德克萨斯州，
                魔鬼牛角手势是德州大学的应援手势。但在意大利，
                该手势用于侮辱对方妻子与他人有染。在法国，该手势代表“反警察”。</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="189" style="height: 94.5px">
            <td class="et16" height="94" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">勾食指</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et14" width="409" x:str="" style="">
              <span class="font6"
                >日本和新加坡、菲律宾、印度及东南亚部分国家和地区，严禁使用该手势，可能会因触犯法律而被逮捕。<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：在菲律宾若使用勾手指手势，
                手掌应该朝上，手掌朝下一般用来召唤宠物，
                对人则有贬低，侮辱的意味；而在新加坡和日本，勾食指则会被人认为是死亡。</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="150" style="height: 75px">
            <td class="et16" height="75" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">竖中指</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0">任何场景不应出现该手势。<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：美国以及受到美国文化影响的全球大部分国家与地区</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="266" style="height: 133px">
            <td class="et16" height="133" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">比OK</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et14" width="409" x:str="" style="">
              <span class="font6"
                >巴西，德国，土耳其、希腊等地，尽量不要在图标、图片中出现此手势。<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：放在巴西和德国，这个手势具有侮辱性质，类似于“竖中指”的含义；而在希腊和土耳其，这个手势却是影射对方是“同性恋”，具有挑衅意味。在法国和比利时，如果你在他们面前比出这个手势，表示你在说对方“一文不值”；</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="151" style="height: 75.75px">
            <td class="et16" height="75" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">五指张开</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >塞浦路斯，希腊（重点），墨西哥，尼日利亚，确保在相机相关场景下不出现五指张开朝向用户的物料或动作设计。<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：在部分国家和地区， 五指张开朝向某人与竖中指含义相同。</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="159" style="height: 79.5px">
            <td class="et16" height="79" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">手臂致意</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et14" width="409" x:str="" style="">
              <span class="font6"
                >欧洲大部分国家和地区，尤其在欧洲东部和南部，以及拉美地区，确保该动作及类似变体不在任何场景下出现，否则可能带来潜在的风险。<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：该动作在法国称作bras d&#39;honneur , 在西班牙和拉美称作corte
                de mangas，该动作和竖中指意思相同。</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="172" style="height: 86.25px">
            <td class="et16" height="86" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">
              一手握住手腕，一手握拳
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et14" width="409" x:str="" style="">
              <span class="font6"
                >中东，尤其在黎巴嫩，巴基斯坦和叙利亚，在中东市场产品中不要出现该手势。<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：含有强烈侮辱性含义的手势， 与竖中指类似<br
              /></span>
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="175" style="height: 87.75px">
            <td class="et16" height="87" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">
              一手食指插入另一手食指拇指圈成的环中
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0">任何场景不要出现该手势。<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：在全世界大部分国家和地区， 该手势与竖中指意思相同</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="204" style="height: 102px">
            <td class="et16" height="102" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">竖大拇指</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >意大利、希腊南部，中东，西非，南美大部分地区（不包括巴西），确保任何场景下不使用明显竖大拇指手势。<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：在部分国家和地区， 竖大拇指等同于竖中指。 在美国，
                竖大拇指意指为一切都好，次含义在世界范围内应用更广泛，
                单该手势含义并没有在全世界范围内达成共识。</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="178" style="height: 89.25px">
            <td class="et16" height="89" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">比心</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et36" width="409" x:str="" style="">
              <span class="font0">在西欧地区不提供此类手势标记<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：在欧美主流文化里，这个手势的意思是“钱”，如果用这个手势对女性使用，表达不出爱心，反而带有对女性的不尊重</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="380" style="height: 190px">
            <td class="et16" height="190" width="105" x:str="" style="">
              禁忌手势
            </td>
            <td class="et25" width="126" x:str="" style="">4个手指</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et36" width="409" x:str="" style="">
              <span class="font0"
                >在日本不提供此类标记，用四根手指表示人是一个严重的问题，因为它与过去非常敏感的社会和种族偏见问题有关<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：日本有一条法律涉及到卡通和电子游戏角色的正确手指数。也即是说日本法律规定了必须要有五指。日本人也像我们一样，认为“4”这个数字不吉利，而且4和死的发音相同。另外，大家在影视作品中非常常见的是日本的黑
                社会犯了错误或者背叛组织，都会切掉自己的一条小指赎罪。日本人爱发毒誓，违背誓言也会切小指。这种阴暗的仪式在日本是如此常见，以至于给儿童看的动画片中如果出现四指，会让人浮想联翩，而且都是想到犯罪和背叛。</span
              >
            </td>
            <td class="et17" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="214" style="height: 107.25px">
            <td class="et16" height="107" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">3K党</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et36" width="409" x:str="" style="">
              <span class="font0"
                >恐怖主义团体符号，任何场景下避免红白黑配色与十字架元素同时出现。<br /><br /></span
              ><span class="font4">背景：</span
              ><span class="font0"
                >该符号所代表的3K党为美国历史上和现代三个不同时期奉行的白人至上主义运动和基督教恐怖主义的民间团体，是美国种族主义的代表性组织。该组织常使用不同方式来达成自己的目的。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="190" style="height: 95.25px">
            <td class="et16" height="95" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">
              White Order of Thule（<br />图勒白人秩序）
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et36" width="409" x:str="" style="">
              <span class="font0"
                >种族主义仇恨组织标志，任何场景下避免五角星、万字纹同时出现。<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：20世纪90年代创立的美国组织。它自称是“为振兴欧洲人民的文化与灵魂而努力的神秘兄弟会”。南部贫困法律中心将描述为一个总部设在华盛顿州鹿园的种族主义仇恨组织。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="328" style="height: 164.25px">
            <td class="et16" height="164" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">钩十字，纳粹标志</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et36" width="409" x:str="" style="">
              <span class="font0"
                >纳粹标志，任何场景下避免出现倾斜45°的右旋卐字图案，尽量避免红白黑配色。<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：纳粹党在1920年启用了卐字标志。这个倾斜45°的右旋卐字图案被称为Hakenkreuz（德国直译为钩十字），用于纳粹党的旗帜、徽章及臂章。希特勒为图案设计人，
                他曾在自传中解释纳粹旗帜纹样和配色含义。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="229" style="height: 114.75px">
            <td class="et16" height="114" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">
              万字纹（佛教，印度教）
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et37" width="409" x:str="" style="">
              <span class="font6"
                >印度教、佛教等宗教标志，尽在特定包含宗教元素的长江下可以使用该标志，
                且需要注意纹样的旋转方向与不同宗教场景中该符号的细微差异。<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：中文读作“万”，它是一个古代宗教信仰的标志。
                它在印度教、佛教、耆那教等宗教中被认为是一个神圣和吉祥好运的标志。印度的卐字形状中，四笔的每笔中还包括一点。在西藏原始宗教苯教中，卐字是“永恒不变”的象征，
                由于藏传佛教中使用的转经筒都是从左向右转，
                所以都写作“卐”（右旋）。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="192" style="height: 96px">
            <td class="et16" height="96" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">法轮功，法轮大法</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et37" width="409" x:str="" style="">
              <span class="font6"
                >邪教标志，任何场景下不得出现该纹样或高度近似的其他纹样。<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：意为“法轮练习”或“法轮实践”，是1992年在中国首次引入的精神学科。它以真，善，忍为教义。西方学者将法轮功描述为气功学科，
                是以其创始人的教诲为基础的“精神运动“，中国政府将其判定为邪教。</span
              >
            </td>
            <td class="et6"></td>
            <td class="et6"></td>
          </tr>
          <tr height="189" style="height: 94.5px">
            <td class="et16" height="94" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">星月，星星与新月</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et37" width="409" x:str="" style="">
              <span class="font6"
                >伊斯兰和穆斯林标志，任何场景下谨慎使用该纹样或高度近似的其他纹样，避免误用。<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：19世纪，星月图案被绘制在奥斯曼旗帜上，改成奥斯曼帝国的象征。这一图案随后被土耳其共和国所继用，在奥斯曼帝国前领土上的其他国家也使用了这一图案。在1950年代，子那个月开始逐渐变为伊斯兰和穆斯林社区的象征，并出现在伊斯兰国家的国旗上。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="208" style="height: 104.25px">
            <td class="et16" height="104" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">五芒星</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et37" width="409" x:str="" style="">
              <span class="font6"
                >新异教主义、神秘学标志，任何场景下谨慎使用黑白色调的五芒星与圆形组合图案。<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：五芒星被巴比伦忍和古希腊的毕达哥拉斯人看做重要的宗教象征。今天，该图示被许多新异教主义者看做信仰的象征。此外，
                数个宗教认为该图案与魔法等神秘学有关。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="190" style="height: 95px">
            <td class="et16" height="95" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">
              大卫之星，六芒星、所罗门之星、所罗门封印、希伯来之星、犹太星
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et37" width="409" x:str="" style="">
              <span class="font6"
                >大卫之星是犹太教和犹太文化的标志，任何场景下（尤其中东北非等伊斯兰国家和地区）谨慎使用该符号，避免误用。<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：大卫之星是犹太教和犹太文化的标志。以色列建国后将大卫星置于以色列国旗上，
                因此大卫星也成为了以色列的象征。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="195" style="height: 97.5px">
            <td class="et16" height="97" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">法拉瓦哈</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et37" width="409" x:str="" style="">
              <span class="font6"
                >伊朗国家标志，任何场景下避免使用该符号。<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：法拉瓦哈是琐罗亚斯德教最为知名的一个标志，象征伊朗国家。法拉瓦尔由一个人形象与翼状太阳圆盘组成。太阳圆盘代表埃及和中东，翅膀上的三层羽毛代表善意，善语和善行。顶部的人物是琐罗亚斯德本人的代表，
                提醒人们保持正直和道德。<br
              /></span>
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="192" style="height: 96px">
            <td class="et16" height="96" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">
              犹大之狮，犹太之狮
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et37" width="409" x:str="" style="">
              <span class="font6"
                >以色列犹大部落标志，任何场景下（尤其中东北非等伊斯兰国家和地区）避免使用该符号。<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：创世纪中以色列犹大部落的象征。也是“启示录”中代表耶稣的词语。犹大之狮多年来被用作犹太人的象征，并被列入耶路撒冷的象征。许多季度教徒组织和事工都使用犹大的狮子作为他们的徽章甚至他们的名字。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="207" style="height: 103.5px">
            <td class="et16" height="103" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">
              七烛台，光明节烛台，犹太教灯台
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et37" width="409" x:str="" style="">
              <span class="font6"
                >七烛台为犹太标志，以色列情报特务局中央同样使用该标志，任何场景下谨慎使用该符号。<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：犹太教灯台是犹太人当中最古老旧的标志，根据出埃及记，摩西以杏花形状制作七个分支的金灯盏。起初在犹大旷野会幕中使用，
                后来在耶路撒冷圣殿中使用。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="195" style="height: 97.5px">
            <td class="et16" height="97" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">红新月</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et37" width="409" x:str="" style="">
              <span class="font6"
                >中东地区红十字国际委员会标志，了解该符号的背景，任何场景下谨慎使用该符号及近似符号。<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：伤兵救护国际委员会1875年更名为红十字国际委员会，此后向外扩展至伊斯兰国家，
                但因为十字是基督教的宗教符号，伊斯兰教徒不愿意接受，所以1876年奥斯曼帝国采用了：红新月“标志。红新月标志最早是在俄罗斯以及土耳其的战争时开始使用，
                此后成为正式标志。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="223" style="height: 111.75px">
            <td class="et16" height="111" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">红狮与太阳</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et36" width="409" x:str="" style="">
              <span class="font0"
                >伊朗的“红十字”标志，与红新月、红水晶类似，是日内瓦公约认可的保护符号，需要了解该符号的背景，任何场景下谨慎使用该符号及近似符号。<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：该符号与”红新月“符号类似，为红十字国际委员会认可的保护符号，于俄罗斯与土耳其战争时期间在伊朗开始使用，
                区分于奥斯曼帝国使用的红新月于国际社会普遍使用的红十字。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="208" style="height: 104.25px">
            <td class="et16" height="104" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">
              法蒂玛之手，玛丽之手，米利暗之手
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et36" width="409" x:str="" style="">
              <span class="font0"
                >中东地区穆斯林、基督教徒使用符号，任何场景下谨慎使用该符号，避免误用。<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：法蒂玛之手是西亚以及北非地区常见的一种掌型护身符。穆斯林认为这一手掌为先知穆罕默德之女法蒂玛的右手。在叙利亚、黎巴嫩、巴勒斯坦和约旦地区的基督教徒中，这一护身符被称为”玛丽之手“；犹太人也逐渐开始使用这一标志，称为”米利暗之手“。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="220" style="height: 110.25px">
            <td class="et16" height="110" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et31" width="126" x:str="" style="">
              裸露大面积皮肤的女性
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >中东北非地区严禁使用皮肤暴露的女性图片<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：阿联酋以及其他中东伊斯兰国家，主要服装是面纱和阿拉伯大袍，伊斯兰教女性要穿长袖衣和长裤，不能暴露，禁止穿超短裙及坦胸露背的服装，禁戴各种女帽。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="232" style="height: 116.25px">
            <td class="et16" height="116" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">
              同性恋权利标志；(彩条旗)
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">避免使用该旗帜</td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="213" style="height: 106.5px">
            <td class="et16" height="106" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">
              基督教、天主教、倒十字架&amp;反基督等有关图形
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >避免在中东北非地区伊斯兰国家使用基督教天主教和反基督等标记<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：基督教的十字架，代表耶稣基督被钉的十字架，
                是基督教做著名的宗教象征。天主教和解基督教新教多用拉丁式的纵长十字架。东正教则常用希腊式的正十字架。领红色十字为红十字国际委员会符号、医院符号，该用法也较为常见。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="217" style="height: 108.75px">
            <td class="et16" height="108" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">前苏联苏维埃标记</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >立陶宛、爱沙尼亚、拉脱维亚避免使用与前苏联有关的任何内容<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：锤子和镰刀是俄国革命期间采用的共产主义象征。在创建时，锤子代表工业工人和农民的镰刀
                - 他们代表工人 -
                农民社会主义联盟。在印度尼西亚禁止展示Hammer和Sickle符号。</span
              >
            </td>
            <td class="et12" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="178" style="height: 89.25px">
            <td class="et16" height="89" width="105" x:str="" style="">
              禁忌图标
            </td>
            <td class="et25" width="126" x:str="" style="">酒</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0">中东伊斯兰国家不提供此类标记<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：伊斯兰教禁酒禁赌伊斯兰教在食物方面做出了肯定的规定，最突出的方面就是禁酒。酒对人体有害，会剌激神经，能迷乱理智，或能使理智处于暂时丧失或空虚</span
              >
            </td>
            <td class="et38" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="304" style="height: 152px">
            <td class="et16" height="152" width="105" x:str="" style="">
              禁忌旗帜
            </td>
            <td class="et25" width="126" x:str="" style="">日本旭日军旗</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >中国、中国台湾地区、韩国、日本等严禁使用该旗帜<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：1889年10月7日，它被用作日本帝国军的战旗，并被用作日本帝国海军的海军标志。在日本，它仍然被用作传统和吉祥的象征，并被用于商业产品和广告中。如今，拥有16条射线的旗帜是海上自卫队的标志，而地面自卫队则使用8条射线。在日本侵略的受害国特别是中国和韩国，该标志通常被认为是令人反感的，在中国被视为日本帝国主义的象征。该标志在中国，韩国和东亚其他地区非常敏感</span
              >
            </td>
            <td class="et38" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="152" style="height: 76px">
            <td class="et16" height="76" width="105" x:str="" style="">
              禁忌旗帜
            </td>
            <td class="et25" width="126" x:str="" style="">藏独旗帜</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et39" width="409" x:str="" style="">
              <span class="font0"
                >中国及港澳台地区严禁使用该旗帜和标记<br /><br /></span
              ><span class="font4">背景：</span
              ><span class="font0"
                >争取西藏独立和西藏与中国政治分离的运动中使用的旗帜。该旗帜在中国显示非常敏感</span
              >
            </td>
            <td class="et38" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="223" style="height: 111.75px">
            <td class="et16" height="111" width="105" x:str="" style="">
              禁忌旗帜
            </td>
            <td class="et25" width="126" x:str="" style="">
              东突厥斯坦（维独）旗帜和标记
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et39" width="409" x:str="" style="">
              中国及港澳台地区严禁使用该旗帜和标记
            </td>
            <td class="et38" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="256" style="height: 128.25px">
            <td class="et16" height="128" width="105" x:str="" style="">
              禁忌旗帜
            </td>
            <td class="et25" width="126" x:str="" style="">哈马斯旗帜</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0">以色列避免使用该旗帜<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：是巴勒斯坦一个激进的伊斯兰政治军事派别。杰哈德的目标是解放巴勒斯坦，消灭以色列，建立巴勒斯坦伊斯兰共和国。它曾多次策划针对以色列的自杀式袭击，因而被美国和欧盟认为是恐怖组织</span
              >
            </td>
            <td class="et38" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="213" style="height: 106.5px">
            <td class="et16" height="106" width="105" x:str="" style="">
              禁忌旗帜
            </td>
            <td class="et25" width="126" x:str="" style="">
              解放巴勒斯坦人民阵线旗帜
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0">以色列避免使用该旗帜<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：人阵是巴勒斯坦解放组织的8个成员之一，是巴解内部仅次于法塔赫的第二大组织。人阵的下属军事组织阿布·阿里·穆斯塔法旅策划过多个针对以色列和西方国家的暴力袭击，因此美国国务院定义的恐怖主义组织。该组织的活动范围集中在叙利亚、黎巴嫩、以色列境内和巴勒斯坦被占领土</span
              >
            </td>
            <td class="et38" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="220" style="height: 110.25px">
            <td class="et16" height="110" width="105" x:str="" style="">
              地图标记
            </td>
            <td class="et25" width="126" x:str="" style="">
              大通布（Greater Tunb）和小通布（Lesser Tunb）岛
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >伊朗、阿联酋根据各国法律谨慎使用地图标记<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：伊朗与阿联酋之间的阿布·穆萨（Abu Musa），大通布（Greater
                Tunb）和小通布（Lesser
                Tunb）岛屿存在争议。对于面向伊朗的内容，必须将所有岛屿都显示为伊朗领土（它们都被伊朗占领）<br />根据各国法律谨慎使用地图标记</span
              >
            </td>
            <td class="et38" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="266" style="height: 133px">
            <td class="et16" height="133" width="105" x:str="" style="">
              地图标记
            </td>
            <td class="et25" width="126" x:str="" style="">
              “福克兰群岛”的名称
            </td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >在阿根廷，必须仅将其显示为“ Islas
                Malvinas”，但在所有其他语言环境中，应将其显示为“ Falkland
                Islands（Islas Malvinas）<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：阿根廷政府将福克兰群岛（Falkland
                Islands）列为其领土，并要求提供任何提及或参考地图以反映其主张；在阿根廷，必须仅将其显示为“
                Islas Malvinas”，但在所有其他语言环境中，应将其显示为“ Falkland
                Islands（Islas Malvinas）</span
              >
            </td>
            <td class="et38" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="237" style="height: 118.5px">
            <td class="et16" height="118" width="105" x:str="" style="">
              地图标记
            </td>
            <td class="et25" width="126" x:str="" style="">库尔德斯坦</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >土耳其、叙利亚、伊拉克、伊朗禁止在地图上标记该地区<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：是一个横跨土耳其、伊拉克、伊朗和叙利亚四国山区的地区，自古以来一直都是库尔德人聚居的地方，如今库尔德斯坦被这四个现代国家所分割。库尔德人一直争取在库尔德斯坦地区建国，但一直受到四国政府的镇压<br />不在地图上标记该地区</span
              >
            </td>
            <td class="et38" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="196" style="height: 98.25px">
            <td class="et16" height="98" width="105" x:str="" style="">
              地图标记
            </td>
            <td class="et25" width="126" x:str="" style="">阿拉伯湾/波斯湾</td>
            <td class="et16" width="99" x:str="" style="">不涉及</td>
            <td class="et17" width="409" x:str="" style="">
              <span class="font0"
                >伊朗、阿拉伯国家根据各国法律谨慎使用地图标记<br /><br /></span
              ><span class="font4">背景</span
              ><span class="font0"
                >：在伊朗，必须使用“波斯湾”一词。在阿拉伯国家，必须使用术语“阿拉伯湾”。<br />根据各国法律谨慎使用地图标记</span
              >
            </td>
            <td class="et38" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
          <tr height="228" style="height: 114px">
            <td class="et28" height="114" width="105" x:str="" style="">
              种族禁忌
            </td>
            <td class="et29" width="126" x:str="" style="">种族歧视词语</td>
            <td class="et28" width="99" x:str="" style="">
              英语及其他多语言需要修改（简体中文、繁体中文、藏语和维语除外）
            </td>
            <td class="et14" width="409" x:str="" style="">
              <span class="font6"
                >对用户可见的界面和代码中，避免出现Blacklist/Whitelist、Master/Slave等存在种族歧视风险的词语<br /><br /></span
              ><span class="font9">背景</span
              ><span class="font6"
                >：2020年5月25日，黑人弗洛伊德之死，导致多地游行示威、影视下架、雕像被拆；在种族强压下各大公司纷纷清除软件中潜在种族风险用词(Blacklist/Whitelist和
                Master/Slave)</span
              >
            </td>
            <td class="et43" width="272" style=""></td>
            <td class="et6"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      <br />
    </p>
  </div>
</template>
<style scope>
body {
  background-color: #ffffff;
}
.table_box {
  width: 90%;
  margin: 0 5%;
}
.table_border {
  border: 1px solid #dadce1;
  border-right: none;
  border-bottom: none;
}
td {
  padding: 20px 5px;
  /* text-align: center; */
  border-bottom: 1px solid #dadce1;
  border-right: 1px solid #dadce1;
}
.pageTitle {
  text-align: center;
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
</style>
