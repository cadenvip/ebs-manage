<template>
    <div>
        <el-container>
            <el-main class="rela">
                <div class="bn_begina">
                    <a @click="goPublish" class="publish-goods">
                        <img src="./images/icon_86.png" alt="">
                    </a>
                </div>
                <div style="overflow: hidden;">
                    <p class="attention">
                        <span>注意事项</span>
                    </p>
                    <h4>商品发布规则</h4>
                    <el-button type="text" @click="open1">商品发布规则</el-button>
                    <el-button type="text" @click="open2">禁售规则</el-button>
                    <el-button type="text" @click="open3">用户诚信规则</el-button>
                    <el-button type="text" @click="open4">重复信息处罚规则</el-button>
                    <h4>发布优质商品</h4>
                    <el-button type="text" @click="open5">快速处理商品图片</el-button>
                    <el-button type="text" @click="open6">了解商品销售优势</el-button>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        info1: '这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容',
        info2: 'test2',
        info3: `<div class="reg_word">
		<p>第一编 总则</p>
		<p>&nbsp;&nbsp;第一章 概述 </p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第一条  为促进开放、透明、分享、责任的新商业文明，保障商户管理系统中国站用户的合法权益，创建、维护和谐的商业环境，制订本规则;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第二条  本规则适用于使用商户管理系统任何产品或服务的用户;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第三条  所有用户在适用规则上一律平等;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第四条  所有用户应遵守国家法律、行政法规、部门规章等规范性文件以及与商户管理系统签署的协议规则的约定;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第五条  若本规则的规定同用户与商户管理系统签署的协议的约定相冲突，则优先适用双方协议的约定。协议中未约定的，则适用本规则。本规则尚无规定的，商户管理系统有权酌情处理，但商户管理系统对用户的处理不能免除用户应尽的法律责任;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第六条  商户管理系统有权随时变更本规则，且规则的变更在商户管理系统网站上公告时及时生效;</p>
		<p>&nbsp;&nbsp;第二章 定义</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第七条  投诉方：指符合相关法律规定具有完全民事行为能力的自然人、法人、其他经济组织;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第八条  被投诉方：指投诉方投诉的商户管理系统企业用户;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第九条  处罚的种类：警告、限权、关闭帐号;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;警告：商户管理系统通过电话、邮件等形式提醒、告诫用户其行为已经构成了违规，应当及时予以改正，如仍进行或不停止违规行为，将给予更为严厉的处理;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;限权：指商户管理系统暂停用户包括但不限于以下权限：暂停商铺的访问权限、对已发布的所有商品执行下架处理（如有）、暂停供求商品的操作权限。被限权用户在限权期限内服务费用（包括但不限于商户管理系统服务费等，如有）照常计算，服务期限不予延长;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关闭帐号：商户管理系统终止向用户提供任何服务，并不予退返服务费（如有）;</p>
		<p>第二编 分则</p>
		<p>&nbsp;&nbsp;第一章 商品发布规则</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第一节 商品发布原则</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第一条  用户在商户管理系统中国站发布商品应遵循真实、准确、合法、有效、完整的基本原则;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第二条  用户发布的商品不得包含违反国家法律法规、涉嫌侵犯他人知识产权等权利或干扰商户管理系统平台运营秩序等相关内容;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第三条  用户发布的商品不得包含商户管理系统产品禁售规则所包含的产品;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第四条  用户发布的商品若涉及商户管理系统产品限售规则所包含的产品则应根据商户管理系统的要求提供相应的证明文件;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第二节 发布违规商品处罚制度</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第五条 用户发布的商品违反产品禁售、限售规则的处罚制度：</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）违规发布禁售产品的处罚制度</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.发布以下商品的，即关闭帐号：</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1)枪支、弹药、军火或相关器材、配件及仿制品;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2)毒品、吸毒工具及配件;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3)危害国家安全、泄露国家秘密、颠覆国家政权、破坏国家统一的、损害国家荣誉或利益或法律法规禁止出版发行的书籍、音像制品、视频、文件资料的;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4)煽动民族仇恨、民族歧视，破坏民族团结的;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6)以非法民间组织名义活动的;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 发布以下商品的，删除违规商品：</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1)扰乱社会秩序，破坏社会稳定的商品;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2)管制类刀具或甩棍、弓、弩、飞镖等可能危害他人人身安全的管制器具;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3)流通中的人民币、伪造变造的货币及其印制设备;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4)涉及诽谤他人，散布谣言的;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 发布以下商品的，删除违规商品： </p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1)卫星电视类接收器材、妨碍交通法规类、间谍类、作弊类等器材;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2)制毒原料、制毒化学品、致瘾性药物;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3)易燃、易爆物品、有毒、有腐蚀性的化学物品; </p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4)扰乱金融市场的服务，如：信用卡套现、公积金套现;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5)买卖或侵害他人个人隐私或企业内部数据的;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6)代写或出售论文;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7)非法买卖、办理证书;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8)买卖、代开发票、票据、考试答案等商品;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9)非法服务行业，如私家侦探、色情服务、债务追收、涉外婚介、迷信服务等;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10)医疗卫生服务商品，如医疗、预防、保健、康复、健康教育、心理健康咨询等;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11)网络游戏等虚拟商品，如网游帐号、游戏装备、游戏外挂、网络私服等;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12)特殊行业、产品的运输服务，如剧毒危险品运输等;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13)黄色淫秽物品、性服务，包括但不限于含有情色暴力低俗内容的漫画、书籍、游戏、音像制品以及SM用具、成人网站等;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;14)临床试用、试生产阶段的医疗器械或国家管制的其他医疗器械;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;15)精神类药品、麻醉类药品、有毒类药品、放射类药品、处方药等;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16)催情、迷幻等涉及违法用途的口服或外用的化学品;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;17)赃物，包括但不限于通过走私、盗窃、抢劫等途径获取的非法所得物;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;18)赌博或作弊工具;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;19)受国家保护的动植物活体、肢体、皮毛、标本、器官及制成品;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20)已灭绝动物或国家二级以上保护动物的化石;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;21)国家级保护文物;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. 发布以下商品的，删除违规商品：</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1)烟草、烟草制品、烟草专用设备;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2)特供酒、军需酒、自制酒;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3)军警制服、标志及军警专用制品;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4)党徽及大型悬挂式国徽、党旗等;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5)生产商认定、公布召回的商品;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6)国家明令淘汰或停止销售的商品;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7)商品本身或外包装上所注明的产品标准、认证标志、成份及含量不符合国家规定的商品;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8)过期、失效、变质的商品;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9)含有罂粟籽的食品、调味品、护肤品等制成品;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10)法律法规禁止发布的其他商品;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11)商户管理系统认为不适合在商户管理系统网站上发布的其他商品，如：违反广告法的商品、义卖的商品等;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第三节 知识产权侵权处理制度</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第六条 用户发布的商品涉及知识产权侵权处罚制度：</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）知识产权侵权处理流程:</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基于上述流程，若被投诉方未提交反通知或提交的反通知不被接受，则商户管理系统有权删除被投诉方于商户管理系统网站上展示之该产品商品，并给予相应的扣分;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;涉嫌侵权的产品商品一旦被删除，被投诉方不得再次发布或展示该产品商品，除非其获得相应的知识产权或知识产权的合法使用权。同时，被投诉方需确保其在商户管理系统网站发布的所有其他产品商品未侵犯其他权利人的知识产权;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如被投诉方因发布侵权产品商品被权利人投诉且投诉成立，则商户管理系统有权排查被投诉方的被投诉帐号和未被投诉的其他关联帐号（即被投诉方在商户管理系统中国站上注册的其他帐号）上的所有产品商品，并有权直接删除其中的侵权产品商品;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）违规行为处理:</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;若用户因某一知识产权侵权被投诉后，在投诉发起之日起五日内（包括五日），又因同一知识产权被一次或数次投诉（以下统称“后次投诉”），则后次投诉免予处罚;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户应保证提供的反通知资料真实、合法、有效，若存在任何虚假情形，则商户管理系统有权直接作出限权直至关闭帐户等处罚。若用户对于某一知识产权侵权投诉提出了反通知，并被商户管理系统接受，则恢复用户由于该知识产权侵权投诉被禁售的处罚;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第四节 不实交易方式处罚制度</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第六条  不实交易方式定义:</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不实交易方式是指用户在其发布的商品商品中明确支持相关支付交易，但在买家与其交易的具体过程中，却以种种理由拒绝采取商定方式进行交易。</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第七条  不实交易方式的处理：</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;任何商户管理系统用户发现有不实交易方式的情形，均可向商户管理系统进行举报，同时提供相应证据，以便商户管理系统进行核查，被举报用户有权对举报进行抗辩，但最终结果以商户管理系统认定为准;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不实交易方式举报成立，暂停对商户管理系统网站的访问。</p>
		<p>&nbsp;&nbsp;第二章 交易行为规则</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第一节 交易行为的原则</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第八条 用户应信守承诺，恪守诚信经营原则。</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第九条 用户应保证对其出售的商品有完全的权利及权力，并保证商品在合理期限内可以正常使用，包括商品不存在危及人身财产安全的不合理危险、具备商品应当具备的使用性能、符合商品或其包装上注明采用的标准等。</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第二节 交易行为的相关定义 </p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第十条 达成交易：指买卖双方就买卖达成一致意见，包括但不限于以下情形：</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(一)中介交易;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(二)买卖双方就交易取得联系并达成一致意见;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第十一条 在线交易：买卖双方通过商户管理系统平台进行的交易;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第十二条 违规行为：包括用户违反其与商户管理系统签订的任何合同、商户管理系统的任何网站规则的行为;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第十三条 未按约定发货: 买方付款成功后，卖方拒绝发货或未按交易双方约定的时间、地点、数量、包装、运输方式等进行发货;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第十四条 未按约定付款：卖方发货后，买方未按约定的付款方式、付款时间等支付货款;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第十五条 其他违约行为：卖方未按照约定向买方提供相关服务，妨害买家权益的行为;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第十六条描述不符：卖家对商品材质、颜色、样式、品质等属性的描述与买家收到的商品不相符;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第十七条 配合解决：指投诉发生后，经双方协商或商户管理系统人工介入斡旋后，双方达成一致并且被投诉方执行协商方案;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第十八条 不配合解决：指投诉发生后，经双方协商或商户管理系统人工介入斡旋后，双方无法达成一致意见或被投诉方未执行协商方案;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第十九条  纠纷退款：指由商户管理系统第三方平台人工介入处理并操作退款的交易投诉;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第二十条  纠纷退款率：在线交易纠纷退款笔数/在线交易总笔数;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第三节 交易投诉处理方式</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第二十一条 买卖双方就达成的交易在履行过程中产生交易争议的，双方应自行协商解决，若协商不成或不愿协商可通过诉讼或仲裁等方式解决。如双方无法协商或协商不能达成一致意见的，一方或双方可申请提交商户管理系统进行斡旋处理的，商户管理系统有权根据本规则决定受理或不受理相关争议，并有权根据本规则对相关事实进行认定并对用户的违规行为进行处罚。鉴于商户管理系统非专业争议解决机构，无权就争议做出有法律约束力的裁决。如商户管理系统介入斡旋后，买卖双方仍无法就相关争议达成一致意见的，买卖双方应采用诉讼或仲裁等方式解决争议。</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;买卖双方使用支付宝中介交易服务进行的交易所产生的贸易争议，适用支付宝的相关规则，但支付宝的处理不能免除违规用户根据本规则应受的处罚。买家与 加入买家保障服务的卖家，在商户管理系统中国站使用支付宝服务进行交易的过程中，因卖家在买家付款后未按约定的时间发货或卖家交付商品的数量或质量与约定不符等所产生的争议，但依照上述规则的处理并不能免除责任方依据本规则应受的处罚。</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第四节 交易投诉受理范围</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第二十二条 交易投诉的受理范围：未按约定发货、买方未按约定付款、描述不符及其他违约行为的投诉。</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;第五节 交易投诉受理条件</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第二十三条 交易投诉的受理条件：</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(一)投诉方须提供真实、有效的身份证明、联系方式;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(二)有具体明确的被投诉方且被投诉方为商户管理系统中国网站的用户;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(三)有明确具体的投诉请求、事实和理由;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(四)提供必要、准确、详实的事实依据和证明材料;</p>
		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(五)其他商户管理系统认为需要具备的条件;</p>
     </div>`,
        info4: 'test4',
        info5: 'test5',
        info6: 'test6'
      }
    },
    methods: {
      open1() {
        this.$alert(this.info1, '商品发布规则', {
          confirmButtonText: '确定'
        })
      },
      open2() {
        this.$alert(this.info2, '禁售规则', {
          confirmButtonText: '确定'
        })
      },
      open3() {
        this.$alert(this.info3, '用户诚信规则', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          callback: () => {
            return
          }
        })
      },
      open4() {
        this.$alert(this.info4, '重复信息处罚规则', {
          confirmButtonText: '确定'
        })
      },
      open5() {
        this.$alert(this.info4, '重复信息处罚规则', {
          confirmButtonText: '确定'
        })
      },
      open6() {
        this.$alert(this.info4, '重复信息处罚规则', {
          confirmButtonText: '确定'
        })
      },
      goPublish() {
        this.$router.push({ path: '/goodsmanage/publishstep1' })
      }
    }
  }
</script>

<style>
.rela{position: relative;}
h4{margin-bottom: 0;}
.bn_begina {background: url(./images/pd01.png) no-repeat;background-size: 100% 100%; height: 230px;width: 100%;position: relative;}
.publish-goods {position: absolute; right: 10%;top: 60%;}
.attention {display: inline-block;position: relative;width: 100%;}
.attention span{padding: 5px 20px;background: #ededef;border-radius: 20px;}
.attention::after {content: '';position: absolute;width: 100%;height: 1px;border-top: 1px dotted #000;top: 10px;left: 110px; }
.el-message-box {width: 600px;}
.el-message-box__content p{max-height: 500px;overflow: auto;}
</style>
