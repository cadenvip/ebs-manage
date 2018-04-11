<template>
    <div>
        <el-container>
            <el-main class="rela">
                <div class="bn_begina">
                    <el-button :disabled="isClick" @click.prevent="goPublish" class="publish-goods">
                        <img src="./images/icon_86.png" alt="">
                    </el-button>
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
        <el-dialog title="商品发布规则" :visible.sync="dialogVisible" width="60%" center>
          <div class=reg_word style="HEIGHT: 200px">
          <P>商品发布规则适用于在商户管理系统平台上发布商品的所有用户，包括卖家及买家，用户需遵守商品发布规则规范有序地发布商品商品。</P>
          <P>一、商品发布规则</P>
          <P>&nbsp;&nbsp;（一） 商品组成要素及定义</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;1.行业类目：根据商品的用途、功能、材质等特性所设置的行业性分类;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;2.商品标题：在包含商品名称的前提下从商品的外观、功能、特点等方面进行个性化的商品描述; </P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;3.商品属性：商品本身所固有的属性特征，如：品牌、型号、用途等;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;4.商品图片：与商品相关的图片，如：商品实拍图、图纸、加工成品图等;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;5.详细说明：对于商品功能、用途、使用方法等特性的详细描述;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;6.交易属性：商品的价格、单位、最小起订量等交易属性;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;7.物流运费商品：发货地址、运费设置等物流环节所需的商品内容;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;8.其他商品：商品有效期的设置;</P>
          <P>&nbsp;&nbsp;（二）供应商品各组成要素发布规则</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;1.行业类目</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）根据商品选择类目，类目必须与标题中的商品、商品的详细说明保持匹配，且必须选择到最次级;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）代理、合作、加工及二手设备必须归属到相应的行业商品代理、合作、加工及二手设备类目的子类下;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;2.商品标题</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）标题必须带有明确且单一的商品名称，严禁出现商品词堆砌：* 同一条商品标题中严禁出现超过单个的品牌或型号, 品牌不同、型号不同，即为不同单品； * 同一条商品标题中的商品修饰词严禁超过5个，且修饰词间严禁用符号或商品词进行分隔，否则即会被判定为标题商品词堆砌;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）标题中严禁出现电话号码、E-mail、公司名称等任何联系方式;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）标题中的商品名称必须与详细说明及图片中的商品保持一致;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;3.商品属性</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;商品属性描述必须与商品相匹配，且真实有效。</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;4.商品图片</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）图片必须清晰完整，且商品图片必须与商品内容所介绍的商品保持一致;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）图片商品必须属于合法可展示的图片内容，严禁发布侵权、色情等违法图片;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）图片尽量为实物图片，可以适当提供具有说明性的图片包装，严禁上传任何类型的证书图片;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;5.详细说明</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1） 详细说明允许以中英文对照的形式发布商品说明，严禁发布纯英文的商品说明;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2） 可以利用html格式在详细说明中带上商品图片;</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;6.交易属性</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;商品价格、单位、最小起订量等交易属性描述必须真实有效；</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;7.物流运费商品</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;发货地址、运费设置等物流环节所需的商品内容必须真实有效。</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;8.其他商品</P>
          <P>&nbsp;&nbsp;&nbsp;&nbsp;可以根据各自的需求设置不同的商品有效期。</P></div>
          <span slot="footer" class="dialog-footer">
            <el-button size="medium" type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="禁售规则" :visible.sync="dialogVisible2" width="60%" center>
            <P>一、商户管理系统禁止发布的商品信息定义</P>
            <P>&nbsp;&nbsp;禁止发布的商品信息：包含违反国家相关法律法规的商品及服务、不适合在网络平台发布的商品等。</P>
            <P>&nbsp;&nbsp;商户管理系统用户在发布商品信息前，应当仔细阅读《禁止发布的商品信息规则》，并予以遵守。由于发布下列商品信息所引起的法律责任由相关用户完全承担，与商户管理系统无关。一旦商户管理系统发现有任何违反本规则的商品信息，商户管理系统有权立即予以删除，并保留警告、暂停服务，直至终止服务的权力，请各用户自觉遵守。</P>
            <P>二、商户管理系统禁止发布的商品信息规则</P>
            <P>&nbsp;&nbsp;商户管理系统为农业相关商品的发布平台，禁止销售与农业无关的商品，包且不仅包含以下内容：</P>
            <P>&nbsp;&nbsp;★ 禁止发布的商品信息</P>
            <P>&nbsp;&nbsp;一、电子通讯器材</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（一）可能危害他人安全、利益或者用于违法目的的物品，如撬锁设备（万能钥匙）、解密软件、导弹发射程序、汽车反雷达测速仪、车用电子狗、 GPS预警器、银行卡复制设备、遥控信号拦截器、加油机干扰器、汽车跑表器等；</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（二）短信群发类硬件设备、短信群发类工具，如短信猫、CDMA MODEM、GPRS MODEM等；</P>
            <P>&nbsp;&nbsp;二、商务服务</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（一）任何形式的由国家相关部门颁发的证件及政府文件，如身份证、档案、各类许可证、介绍信、学历证书、涉及国家秘密的资料或者文件等；</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（二）任何形式的需通过正规途径申领的票据，如发票、核销单等；</P>
            <P>&nbsp;&nbsp;三、管制药品、药械</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（一）特殊药品及原料药（治疗性功能障碍，肿瘤，糖尿病，艾滋病，癫痫，红斑狼疮，性病，乙肝，白癜风药品，戒毒药品，抗生素成品，麻醉药品，精神药品，药疗用毒性药品，放射性药品和医疗机构制剂等）；</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（二）处方药；</P>
            <P>&nbsp;&nbsp;四、枪支弹药</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（一）任何形式的枪支（包括枪支配件）、弹药及仿真枪等，如枪械、枪械仿制品、子（炮）弹、枪支瞄准器、消音器、麻醉注射枪、射击枪等；</P>
            <P>&nbsp;&nbsp;五、管制化学品、爆炸品</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（一）根据《中华人民共和国危险化学品安全管理条例》易燃、易爆物品、兴奋剂、剧毒化学品、易制毒化学品、有腐蚀性的化学物品，如火药、炸药、雷管、胡椒醛、黄樟素、麦角胺等；</P>
            <P>&nbsp;&nbsp;六、反党反政府类：</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（一）含有反动、种族或者宗教歧视或其他法律所禁止的出版物、文件、资料等；</P>
            <P>&nbsp;&nbsp;七、伪劣商品</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（一）部分保健食品，如带有减肥、丰胸、壮阳功能的食品；</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（二）被国家相关监管部门通告并曝光的属于质量不合格类的商品，如假药、地沟油、问题奶粉等；</P>
            <P>&nbsp;&nbsp;八、国家重点保护物种</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（一）野生动物、世界\国家保护类动物、濒危动物活体、内脏、任何肢体、皮毛、标本及其制品，如象牙、犀牛角、熊胆及玳瑁制品；鱼翅及鱼翅制品；</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（二）商户管理系统特殊保护物种，猫皮、狗皮等制品；</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（三）国家或地方法律法规中明文规定重点保护的珍稀植物及其制品，如野生红豆杉；</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（四）《中华人民共和国文物保护法》规定不得买卖的文物，如馆藏文物，出土文物，国家保护级文物；</P>
            <P>&nbsp;&nbsp;九、烟酒类</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（一）烟草、烟草制品，如烟叶、卷烟纸、滤嘴棒、烟用丝束、香烟等；烟草专用设备；</P>
            <P>&nbsp;&nbsp;十、其他类</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（一）流通人民币，任何人不得出售或购买正在流通的人民币；</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（二）保健食品、药品、医用器械商品类信息不能违反广告法，如内容中出现“治疗”、“最新科学”、“安全无毒副作用”、“药到病除”、“无效退款”；</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（三）任何侵犯他人知识产权的商品信息，如假冒商品信息，侵犯他人版权或者专利权的商品，非法复制品（如盗版、翻录、备份、盗录等）、软件程序、电视游戏、音乐集、电影、电视节目或照片；</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（四）根据《军服管理条例》禁止用“军需”、“军服”、“军品”等用语招揽顾客。 玩具 书籍、游戏类除外；</P>
            <P>&nbsp;&nbsp;&nbsp;&nbsp;（五）根据法律、法规禁止销售或本网站认为违反公共良俗而不应贩售的物品。</P>
            <P>&nbsp;&nbsp;★ 其它经本平台认定为不应发布的商品信息</P>
          <span slot="footer" class="dialog-footer">
            <el-button size="medium" type="primary" @click="dialogVisible2 = false">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="用户诚信规则" :visible.sync="dialogVisible3" width="60%" center>
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
          <span slot="footer" class="dialog-footer">
            <el-button size="medium" type="primary" @click="dialogVisible3 = false">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="重复信息处罚规则" :visible.sync="dialogVisible4" width="60%" center>
          <p>一、什么是重复信息</p>
          <p>&nbsp;&nbsp;重复信息是指：重复发布完全相同或相似的信息。一条信息的主体部分包括属性参数、详细说明和图片。因此，判断重复信息的主要标准为：属性参数、详细说明与图片三部分均相同或相似的信息。</p>
          <p>二、发布重复信息带来的害处</p>
          <p>&nbsp;&nbsp;发布重复信息并不会带来有利于排名的好处，反而会适得其反，带来以下害处：</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;（一）对浏览者而言，会影响浏览者对信息的判断，从而大大降低浏览者对信息的反馈几率！</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;（二）对发布者而言，重复信息会被系统或编辑删除，浪费发布者大量的时间和精力！</p>
          <p>三、对发布重复信息的处罚规则?</p>
          <p>&nbsp;&nbsp;网站会视重复情况的严重程度给予信息发布者相应的处罚，处罚分以下三类等级：</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;（一）如果发布者新发或已上网信息中存在重复信息，网站会删除该等重复信息；</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;（二）如果发布者已上网信息中存在大量重复信息，网站会下撤其所有信息；下撤后的信息，发布者可以通过修改，修改为质量较好且不重复的信息后再次提交发布;</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;（三）如果多次发现发布者已上网信息中存在大量重复信息，网站将保留删除其所有信息，并屏蔽其使用权限的权利。</p>
          <span slot="footer" class="dialog-footer">
            <el-button size="medium" type="primary" @click="dialogVisible4 = false">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="快速处理商品图片" :visible.sync="dialogVisible5" width="60%" center>
          <p>我们拍摄好的商品图片，尺寸和容量一般都是非常大的。 而网站对上传图片都有所限制，如图1,商品图片请控制在5MB以内。因为一旦上传的图片太大，会影响网页打开的速度，客户看起来也不美观，最终导致客户流失。</p>
          <p>&nbsp;&nbsp;一、不得不知晓的图片的三个属性</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;那如何来解决这个问题呢？  首先，我们要搞清楚三个属性--图片尺寸、图片容量和图片格式。如图2, 当我们选中一张图片，就可以看到这三个属性。</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <img width="512" height="131" src="/ebs/images/tupian001.JPG">
            <img width="261" height="166" src="/ebs/images/tupian002.JPG">
          </p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;图片尺寸：即在屏幕上显示的长度和宽度（如图3）； 单位，像素（PX）。跟长度单位，厘米（CM）之间是可以换算的。</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <img width="322" height="223" src="/ebs/images/tupian003.JPG">
          </p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;图片容量（图片大小）：图片在计算机上存储需要占据的空间， 单位有 兆（M）， KB, 字节（B）。图片容量越大，传输话费的时间越长，客户打开网页的速度就越慢。 同一张图片，在图片质量不变的情况下， 如果尺寸越小，那么相应的图片容量也会越小。</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;图片格式： 图片在计算机上的存储格式，目前网络上常用的有 jpg,jpeg,gif,png,bmp。</p>
          <p>&nbsp;&nbsp; 二、如何处理图片大小</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;接下来我们就来处理图片的大小。无论采用哪种软件，在明白了原理的情况下，方法都是相通的。 在这里，我们采用"光影魔术手"来处理，完成三个任务。 第一、修改图片尺寸。第二，选择图片存储格式； 第三，修改图片存储的大小。</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1）修改图片尺寸</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;打开光影魔术手软件并导入照片以后，点击菜单栏上的"缩放"图标，弹出"调整图像尺寸"的窗口，在这里你就可以修改图片尺寸，如图4.一般情况下，网上图片的宽度控制在800像素以内。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注意1:"维持原图片长宽比例"打勾，那么当您修改高度或者宽度的任意一项时，另外一项就会跟着变，从而保证长宽不变形。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注意2:图片的像素只建议改小，不建议改大。 因为图片放大只会导致模糊。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <img width="491" height="407" src="/ebs/images/tupian004.JPG">
          </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;修改完图片的宽度和高度后，点击右下角"开始缩放"按钮，就完成了图片尺寸的修改。  </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2）将图片存储为JPG格式</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 根据上传的需要，选择符合条件的格式。一般情况下，JPG和JPEG,以及GIF是网络传输最常用的格式。只要不超出上传规定的大小，都是可以的。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3）修改图片存储的大小</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;完成图片尺寸的修改以后，点击菜单栏上面的"保存"图标，弹出"保存图像文件"对话框。 系统默认的是JPEG格式， 在这里，我们可以选择图片保存的质量。 图片质量越高，清晰度越高，占用的空间也就越大。  我们可以点击"估算大小 "按钮，来了解图片存储的大小。 通过调整图片质量来控制输出的储存大小。 一般情况下，不建议图片质量低于80%, 否则图片会很模糊。 如图</p>
            <p>通过以上几个步骤，我们就完成了图片大小的处理，步骤非常简单。 接下来， 就赶紧去试试吧！</p>
          <span slot="footer" class="dialog-footer">
            <el-button size="medium" type="primary" @click="dialogVisible5 = false">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="了解商品x销售优势" :visible.sync="dialogVisible6" width="60%" center>
          <p>详细说明可以通过文字详细介绍商品的相关信息，并运用商品图片强有力的视觉吸引力，展现商品各个角度和细节的真实情况，彰显商品的专业品质和企业实力，让买家对商品更了解，对服务更放心。</p>
          <p>&nbsp;&nbsp;详细说明可填写如下几部分内容：</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;属性中没有包含的商品特点;</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;商品实拍大图、细节图;</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;商品的使用帮助;</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;商品相关知识点;</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;商品的售后服务;</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;购买须知;</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;公司经营特点和企业资质等;</p>
          <p>长篇的文字，容易使人产生疲劳感，即使是看完所有内容，也会过目即忘。 </p>
          <p>那怎样消除视觉疲劳？让买家过目不忘呢？在此建议： </p>
          <p>&nbsp;&nbsp;巧用不同的字号和颜色强调不同的内容; </p>
          <p>&nbsp;&nbsp;避免大段的文字堆积，分段描述不同的内容; </p>
          <p>&nbsp;&nbsp;多用图片和表格来表达; </p>
          <span slot="footer" class="dialog-footer">
            <el-button size="medium" type="primary" @click="dialogVisible6 = false">确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>

<script>
  import { checkSeller } from '@/api/goodsRelease'

  export default {
    created() {
    },
    data() {
      return {
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
        dialogVisible4: false,
        dialogVisible5: false,
        dialogVisible6: false,
        isClick: false
      }
    },
    methods: {
      open1() {
        this.dialogVisible = true
      },
      open2() {
        this.dialogVisible2 = true
      },
      open3() {
        this.dialogVisible3 = true
      },
      open4() {
        this.dialogVisible4 = true
      },
      open5() {
        this.dialogVisible5 = true
      },
      open6() {
        this.dialogVisible6 = true
      },
      goPublish() {
        this.isClick = true
        checkSeller().then((res) => {
          if (res.status === 200) {
            this.$router.push({ path: '/goodsmanage/publishstep1' })
          } else {
            this.$message.error(res.msg)
          }
        })
        setTimeout(() => {
          this.isClick = false
        }, 5000)
      }
    }
  }
</script>

<style scoped>
.rela{position: relative;}
h4{margin-bottom: 0;}
.bn_begina {background: url(./images/pd01.png) no-repeat;background-size: 100% 100%; height: 230px;width: 100%;position: relative;}
.publish-goods {position: absolute; right: 10%;top: 60%;padding: 0;background: transparent !important;border: none;}
.attention {display: inline-block;position: relative;width: 100%;}
.attention span{padding: 5px 20px;background: #ededef;border-radius: 20px;}
.attention::after {content: '';position: absolute;width: 100%;height: 1px;border-top: 1px dotted #000;top: 10px;left: 110px; }
.el-message-box {max-height: 600px; overflow: scroll; width: 60%;}
.el-message-box__content p{max-height: 500px;overflow: auto;}
.el-message-box__btns{text-align: center;}
</style>
