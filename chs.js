/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com
 @idle games : http://www.gityx.com
 @QQ Group : 627141737

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Achievement Gotten!": "成就达成！",
    "Better Miner": "更好的矿工",
    "Dark": "深色",
    "Effect:": "效果：",
    "Enabled:": "启用：",
    "Export Game": "导出游戏",
    "Export to Clipboard": "导出到剪贴板",
    "Golden Stone.": "金石。",
    "harder than Stone.": "。",
    "Hello, World!": "你好世界！",
    "Import Game": "导入游戏",
    "Increase": "增加",
    "Increase Stone gain by": "增加石头增益",
    "Miner": "矿工",
    "New Quarry Tier at": "新采石层位于",
    "Normal": "普通",
    "Options": "选项",
    "Reach": "达到",
    "Sandstone.": "砂岩。",
    "Save Game": "保存游戏",
    "Stone / Quarry": "采石场",
    "Stone to Unlock": "石头解锁",
    "Stone,": "结石，",
    "To unlock any machine, you need to bought upgrade or made anything...": "要解锁任何机器，您需要购买升级或制作任何东西......",
    "Wipe Game": "擦除游戏",
    "You have mined": "你已经开采了",
    "'s base by": "的基数",
    "How are you dawg?": "你好吗？",
    "Auto-Stone Upgrades": "自动石头升级",
    "Auto-Tiered Stone Upgrades": "自动石头层级升级",
    "Automation": "自动化",
    "BREAKING THE DIAMOND??? WTFFFFF": "打破钻石？？？ WTFFFFF",
    "Convert your Stone into": "把你的石头变成",
    "Converting into Golden Stone will reset your Stone, Tiered Stone and their upgrades.": "转换成金石会重置你的石、阶梯石和它们的升级。",
    "Decrease Super Andesite's strength by": "将超级安山岩的强度降低",
    "Deep Miner": "深矿工",
    "Flurry Stone": "乱石",
    "Golden Deep": "金深",
    "Golden Miner": "黄金矿工",
    "Golden Stone": "金石",
    "Golden Stone's effect increases": "金石效果提升",
    "Hard Miner": "困难矿工",
    "Harder Miner": "更难的矿工",
    "Increase Golden Stone gain based on highest Quarry Tier reached.": "根据达到的最高采石场等级增加金石增益。",
    "Increase Super Andesite gain by": "将超级安山岩增益增加",
    "Increase the exponent from Golden Stone's effect by": "金石效果的指数增加",
    "is": "是",
    "is affected by": "受影响来自",
    "is sightly stronger. Keep this upgrade on Tiered Quarry entered.": "明显更强。 保持此升级进入分层采石场。",
    "New Tiered Quarry's requirement is": "新分层采石场的要求是",
    "Newble Automation": "新宝自动化",
    "Ok and?": "好吧？",
    "Stone gain is increased based on Super Andesite. Keep this upgrade on Tiered Quarry entered.": "石头增益基于超级安山岩增加。 保持此升级进入分层采石场。",
    "Stone's Tiered Boost": "石头的分层提升",
    "Strong Golden Effect": "强烈的金色效果",
    "stronger.": "更强。",
    "Super Andesite gain is boosted based on Quarry Tier you mined.": "超级安山岩增益会根据您开采的采石场层级而提高。",
    "Super Andesite.": "超级安山岩。",
    "Synergism Miner": "协同矿工",
    "Tiered Miner": "分层矿工",
    "Weak Quarry": "弱采石场",
    "weaker.": "较弱。",
    "You unlocked": "你解锁了",
    "Decrease Cobalt's strength by": "将钴的强度降低",
    "Decrease Diamond's strength by": "将钻石的强度降低",
    "Decrease Lonsdaleite's strength by": "将 Lonsdaleite 的力量降低",
    "Decrease Obsidian's strength by": "黑曜石的强度降低",
    "Decrease Quartz's strength by": "将石英的强度降低",
    "Decrease Ruby's strength by": "将 Ruby 的强度降低",
    "Decrease Titanium's strength by": "将钛的强度降低",
    "Decrease Topaz's strength by": "将黄玉的强度降低",
    "Decrease w-BN's strength by": "将 w-BN 的强度降低",
    "Diamond gain is boosted based on Quarry Tier you mined.": "钻石收益会根据您开采的采石场等级而提高。",
    "Diamond.": "钻石。",
    "Diorite gain is boosted based on Quarry Tier you mined.": "闪长岩增益会根据您开采的采石场等级而提高。",
    "Diorite.": "闪长岩。",
    "Eating a Stone in Ancient Greece be like...": "在古希腊吃石头就像...",
    "Granite gain is boosted based on Quarry Tier you mined.": "花岗岩增益会根据您开采的采石场等级而提高。",
    "Granite.": "花岗岩。",
    "Increase Andesite gain by": "将安山岩增益增加",
    "Increase Basalt gain by": "玄武岩增益增加",
    "Increase Cobalt gain by": "增加钴增益",
    "Increase Diamond gain by": "增加钻石增益",
    "Increase Diorite gain by": "将闪长岩增益增加",
    "Increase Granite gain by": "花岗岩增益增加",
    "Increase Ironstone gain by": "增加铁石增益",
    "Increase Lonsdaleite gain by": "将 Lonsdaleite 增益提高",
    "Increase Obsidian gain by": "黑曜石增益增加",
    "Increase Prismarine gain by": "海晶石增益增加",
    "Increase Quartz gain by": "增加石英增益",
    "Increase Ruby gain by": "红宝石增益增加",
    "Increase Sandstone gain by": "增加砂岩增益",
    "Increase Titanium gain by": "增加钛增益",
    "Increase Topaz gain by": "增加黄玉增益",
    "Increase w-BN gain by": "增加 w-BN 增益",
    "Ironstone gain is boosted based on Quarry Tier you mined.": "铁石增益会根据您开采的采石场等级而提高。",
    "IronStone? More like FeStone :D": "铁石？更像铁石：D",
    "Ironstone.": "铁石。",
    "Lonsdaleite gain is boosted based on Quarry Tier you mined.": "Lonsdaleite 增益会根据您开采的采石场等级而提高。",
    "Lonsdaleite.": "朗斯代莱特。",
    "Obsidian gain is boosted based on Quarry Tier you mined.": "黑曜石收益会根据您开采的采石场等级而提高。",
    "Obsidian.": "黑曜石。",
    "Prismarine gain is boosted based on Quarry Tier you mined.": "海晶石增益会根据您开采的采石场等级而提高。",
    "Prismarine.": "海晶石。",
    "Quartz gain is boosted based on Quarry Tier you mined.": "石英增益会根据您开采的采石层而提高。",
    "Quartz.": "石英。",
    "Ruby gain is boosted based on Quarry Tier you mined.": "红宝石增益会根据您开采的采石场等级提高。",
    "Ruby.": "红宝石。",
    "Sandstone gain is boosted based on Quarry Tier you mined.": "砂岩增益会根据您开采的采石场等级而提高。",
    "Stone gain is increased based on Basalt. Keep this upgrade on Tiered Quarry entered.": "石增益基于玄武岩增加。保持此升级进入分层采石场。",
    "Stone gain is increased based on Cobalt. Keep this upgrade on Tiered Quarry entered.": "石增益基于钴增加。保持此升级进入分层采石场。",
    "Stone gain is increased based on Diamond. Keep this upgrade on Tiered Quarry entered.": "石头增益基于钻石增加。保持此升级进入分层采石场。",
    "Stone gain is increased based on Diorite. Keep this upgrade on Tiered Quarry entered.": "石增益基于闪长岩增加。保持此升级进入分层采石场。",
    "Stone gain is increased based on Granite. Keep this upgrade on Tiered Quarry entered.": "石头增益基于花岗岩增加。保持此升级进入分层采石场。",
    "Stone gain is increased based on Ironstone. Keep this upgrade on Tiered Quarry entered.": "石增益基于铁石增加。保持此升级进入分层采石场。",
    "Stone gain is increased based on Lonsdaleite. Keep this upgrade on Tiered Quarry entered.": "石增益基于 Lonsdaleite 增加。保持此升级进入分层采石场。",
    "Stone gain is increased based on Obsidian. Keep this upgrade on Tiered Quarry entered.": "基于黑曜石增加石头增益。保持此升级进入分层采石场。",
    "Stone gain is increased based on Prismarine. Keep this upgrade on Tiered Quarry entered.": "石头增益基于海晶石而增加。保持此升级进入分层采石场。",
    "Stone gain is increased based on Quartz. Keep this upgrade on Tiered Quarry entered.": "石增益基于石英增加。保持此升级进入分层采石场。",
    "Stone gain is increased based on Ruby. Keep this upgrade on Tiered Quarry entered.": "石头增益基于红宝石增加。保持此升级进入分层采石场。",
    "Stone gain is increased based on Titanium. Keep this upgrade on Tiered Quarry entered.": "石增益基于钛而增加。保持此升级进入分层采石场。",
    "Stone gain is increased based on Topaz. Keep this upgrade on Tiered Quarry entered.": "石增益基于黄玉增加。保持此升级进入分层采石场。",
    "Stone gain is increased based on w-BN. Keep this upgrade on Tiered Quarry entered.": "石增益基于 w-BN 增加。保持此升级进入分层采石场。",
    "Stone to convert.": "要转换的石头。",
    "Titanium gain is boosted based on Quarry Tier you mined.": "钛金收益会根据您开采的采石场等级而提高。",
    "Titanium.": "钛。",
    "Topaz gain is boosted based on Quarry Tier you mined.": "黄玉收益会根据您开采的采石场层数提高。",
    "Topaz.": "黄玉。",
    "w-BN gain is boosted based on Quarry Tier you mined.": "w-BN 收益会根据您开采的采石场层级而提高。",
    "w-BN.": "w-BN。",
    "(additive).": "(附加).",
    "Andesite gain is boosted based on Quarry Tier you mined.": "安山岩收益会根据您开采的采石场层数提高。",
    "Andesite.": "安山岩。",
    "Basalt gain is boosted based on Quarry Tier you mined.": "玄武岩增益会根据您开采的采石场等级提高。",
    "Basalt.": "玄武岩。",
    "Cobalt gain is boosted based on Quarry Tier you mined.": "钴增益会根据您开采的采石场等级提高。",
    "Cobalt.": "钴。",
    ", bulked Stone & Tiered Stone Upgrades.": "，散装石头和分层石头升级。",
    "'s base at a severely reduced rate.": "的基数大大降低。",
    "'s base is multiplied by": "的基数乘以",
    "'s maxmium level by": "的最大等级",
    "Decrease Super Sandstone's strength by": "将超级砂岩的强度降低",
    "Gold made in [Au]stralia!": "[澳洲]黄金制造！",
    "Increase Super Sandstone gain by": "将超级砂岩增益提高",
    "Richer than Trillionaire": "比亿万富翁更富有",
    "Stone gain is increased based on Super Sandstone. Keep this upgrade on Tiered Quarry entered.": "石头增益基于超级砂岩增加。 保持此升级进入分层采石场。",
    "Super Sandstone gain is boosted based on Quarry Tier you mined.": "超级砂岩增益会根据您开采的采石场等级而提高。",
    "Super Sandstone.": "超级砂岩。",
    "Bedrock.": "基岩。",
    "Bedrock gain is boosted based on Quarry Tier you mined.": "基岩增益会根据您开采的采石层级提高。",
    "Decrease Bedrock's strength by": "降低基岩的强度",
    "Decrease Neutronium's strength by": "将中子的强度降低",
    "Decrease Strange Matter's strength by": "将奇异物质的强度降低",
    "Decrease Unobtainium's strength by": "将 难得素 的强度降低",
    "HOLY COW!! IS THAT A MINECRAFT REFERENCE???": "天啊！！ 那是我的世界参考吗？？？",
    "Increase Bedrock gain by": "增加基岩增益",
    "Increase Neutronium gain by": "增加中子增益",
    "Increase Strange Matter gain by": "增加奇异物质增益",
    "Increase Unobtainium gain by": "将 难得素 增益提高",
    "Neutronium gain is boosted based on Quarry Tier you mined.": "中子增益会根据您开采的采石场等级而提高。",
    "Neutronium.": "中子。",
    "Stone gain is increased based on Bedrock. Keep this upgrade on Tiered Quarry entered.": "石头增益基于基岩增加。 保持此升级进入分层采石场。",
    "Stone gain is increased based on Neutronium. Keep this upgrade on Tiered Quarry entered.": "石头增益基于中子增加。 保持此升级进入分层采石场。",
    "Stone gain is increased based on Strange Matter. Keep this upgrade on Tiered Quarry entered.": "石头增益基于奇异物质而增加。 保持此升级进入分层采石场。",
    "Stone gain is increased based on Unobtainium. Keep this upgrade on Tiered Quarry entered.": "石头增益基于 难得素 增加。 保持此升级进入分层采石场。",
    "Strange Matter gain is boosted based on Quarry Tier you mined.": "奇异物质增益会根据您开采的采石场等级而提高。",
    "Strange Matter.": "奇怪的物质。",
    "Unobtainium gain is boosted based on Quarry Tier you mined.": "难得素 增益会根据您开采的采石场等级而提高。",
    "Unobtainium.": "难得素。",
    "Stone gain is increased based on Andesite. Keep this upgrade on Tiered Quarry entered.": "石头增益基于安山岩增加。 保持此升级进入分层采石场。",
    "Game Saved!": "游戏已保存！",
    "Stone gain is increased based on Sandstone. Keep this upgrade on Tiered Quarry entered.": "石头增益基于砂岩增加。 保持此升级进入分层采石场。",
    "boost of Stone & Tiered Stone.": "石头和分层石头的提升。",
    "Break Stone": "碎石",
    "Break your Stone into": "把你的石头打碎成",
    "Breaking stone resets everything golden stone as well except stone automation.": "打破石头会重置所有金色石头，除了石头自动化。",
    "Cobblestone.": "鹅卵石。",
    "Pickaxe's Tier": "镐的层级",
    "Provides a": "提供了一个",
    "Stone-emental v1.0 - Made by MrRedShark77": "Stone-emental v1.0 - 由 MrRedShark77 制作",
    "You have broken": "你已经坏了",
    "You have skilled with": "你已经熟练了",
    "I HAVE PLAYED THIS GAME BEFORE!!!!!!!!!!!": "我以前玩过这个游戏！！！！！！！！！！！",
    "Choosing modifiers is not recommended for beginners or who haven't finished or played!": "不建议初学者或没有完成或玩过的人选择修饰符！",
    "per level.": "每级。",
    "miners.": "矿工.",
    "Buy MAX": "购买最大",
    "Create Save": "创建存档",
    "Stone": "石头",
    "Next Quarry Tier at": "下一个采石场层级在",
    "Your wealth is": "您的财富为",
    "You have hired": "你雇佣了",
    "Increases your income by": "提高你的收入",
    "5 hours? more like 5 years": "5小时？更像是5年",
    "boost to Stone and Tiered Stone.": "提升到石头和阶梯石。",
    "Start the new Normal/Modified Game": "开始新的普通/修改版游戏",
    "To unlock any automation, you should purchase any automation upgrades.": "要解锁任意自动化，您应该购买任意自动化升级。",
    "Converting into Golden Stone resets your Stone, Quarry, and their upgrades.": "转换成金石重置你的石头，采石场，和他们的升级。",
    "Ok, and?": "好的，然后呢？",
    "per level, based on Quarry Tier.": "每级，基于采石场层级。",
    "Hello everybody, my name is Markiplier and welcome to Five Nights at Freddy's, an indie horror game that you guys suggested, en masse, and I saw that Yamimash played it and he said it was really really good... So I'm very eager to see what is up. And that is a terrifying animatronic bear! 'Family pizzeria looking for security guard to work the nightshift.' Oh... 12 a.m. The first night. If I didn't wanna stay the first night, why would I stay any more than... five... Why I stay any more than two- hello? Okay...": "大家好，我是Markiplier，欢迎来到《Freddy’s Five Nights at Freddy’s》，这是一款你们集体推荐的独立恐怖游戏，我看到Yamimash玩了这款游戏，他说这款游戏非常非常棒……所以我很想知道发生了什么。那是一只可怕的电子熊！“家庭披萨店招聘夜班保安”哦……12点。第一个晚上。如果第一晚我都不想留下来，那我为什么还要留下来…五个。为什么我要多待两分钟？喂？好吧……",
    "Stone is boosted by unspent Granite.": "未消耗的花岗岩可以提升石头。",
    "Stone is boosted by unspent Prismarine.": "未消耗的海晶石可以提升石头。",
    "Stone is boosted by unspent Andesite.": "未消耗的安山岩可以提升石头。",
    "Stone is boosted by unspent Basalt.": "未消耗的玄武岩可以提升石头。",
    "Stone is boosted by unspent Diorite.": "未消耗的闪长岩可以提升石头。",
    "Stone is boosted by unspent Sandstone.": "未消耗的砂岩可以提升石头。",
    "Hard Mode": "困难模式",
    "Easy Mode": "简单模式",
    "Changelogs": "更新日志",
    "Delete": "删除",
    "Export via Clipboard": "导出到剪贴板",
    "Export via File": "导出到文件",
    "Load": "加载",
    "Main Options": "主选项",
    "Modifiers": "修饰符",
    "Modifiers:": "修饰符:",
    "None": "无",
    "Saving": "保存",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "Stone-emental Prototype v0.1 - Made by MrRedShark77": "Stone-emental Prototype v0.1 - Made by MrRedShark77",
    // 图标代码，不能汉化
    "Jacorb's Games": "Jacorb's Games",
    "O": "O",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "By Jacorb90": "By Jacorb90",
    "content_copy": "content_copy",
    "library_books": "library_books",
    "discord": "discord",
    "drag_handle": "drag_handle",
    "edit": "edit",
    "forum": "forum",
    "content_paste": "content_paste",
    "delete": "delete",
    "info": "info",
    "settings": "settings",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'Git游戏': 'Git游戏',
    'QQ群号': 'QQ群号',
    'x': 'x',
    'QQ群号:': 'QQ群号:',
    '* 启用后台游戏': '* 启用后台游戏',
    '更多同类游戏:': '更多同类游戏:',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Shift-Click to Toggle Tooltips: ": "Shift-单击以切换工具提示：",
    "Quarry Tier ": "采石层 ",
    "Level: ": "等级: ",
    "t_stone\\": "石头\\",
    "stone\\": "石头\\",
    "Save #": "存档 #",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": " ",
    "\n": "",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "/sec) Stone.": "/秒) 石头.",
    " maxmium level": " 最大等级",
    " to Quarry Tier": " 至采石层",
    "/sec) \n                        Super Sandstone, \n                        which is": "/秒) \n                        超级砂岩, \n                        比石头还硬",
    "/sec) \n                        Titanium, \n                        which is": "/秒) \n                        钛, \n                        比石头还硬",
    "/sec) \n                        Diamond, \n                        which is": "/秒) \n                        钻石, \n                        比石头还硬",
    "/sec) \n                        Quartz, \n                        which is": "/秒) \n                        石英, \n                        比石头还硬",
    "/sec) \n                        Cobalt, \n                        which is": "/秒) \n                        钴, \n                        比石头还硬",
    "/sec) \n                        w-BN, \n                        which is": "/秒) \n                        w-BN, \n                        比石头还硬",
    "/sec) \n                        Neutronium, \n                        which is": "/秒) \n                        中子, \n                        比石头还硬",
    "/sec) \n                        Prismarine, \n                        which is": "/秒) \n                        海晶石, \n                        比石头还硬",
    "/sec) \n                        Sandstone, \n                        which is": "/秒) \n                        砂岩, \n                        比石头还硬",
    "/sec) \n                        Granite, \n                        which is": "/秒) \n                        花岗岩, \n                        比石头还硬",
    "/sec) \n                        Strange Matter, \n                        which is": "/秒) \n                        奇异物质, \n                        比石头还硬",
    "/sec) \n                        Unobtainium, \n                        which is": "/秒) \n                        难得素, \n                        比石头还硬",
    "/sec) \n                        Obsidian, \n                        which is": "/秒) \n                        黑曜石, \n                        比石头还硬",
    "/sec) \n                        Lonsdaleite, \n                        which is": "/秒) \n                        朗斯代尔石, \n                        比石头还硬",
    "/sec) \n                        Basalt, \n                        which is": "/秒) \n                        玄武岩, \n                        比石头还硬",
    "/sec) \n                        Andesite, \n                        which is": "/秒) \n                        安山岩, \n                        比石头还硬",
    "/sec) \n                        Topaz, \n                        which is": "/秒) \n                        黄玉, \n                        比石头还硬",
    "/sec) \n                        Ironstone, \n                        which is": "/秒) \n                        铁石, \n                        比石头还硬",
    "/sec) \n                        Super Andesite, \n                        which is": "/秒) \n                        超级安山岩, \n                        比石头还硬",
    "/sec) \n                        Ruby, \n                        which is": "/秒) \n                        红宝石, \n                        比石头还硬",
    "/sec) \n                        Diorite, \n                        which is": "/秒) \n                        闪长岩, \n                        比石头还硬",
    "/sec) \n                        Bedrock, \n                        which is": "/秒) \n                        基岩, \n                        比石头还硬",
    "% weaker": "% 减弱",
    " maximum level": " 最高等级",
    "/s) Stone.": "/秒) 石头.",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)\-([\d\.]+)\-([\d\.]+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^\(([\d\.]+)\%\)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)K$/,
    /^([\d\.]+)M$/,
    /^([\d\.]+)B$/,
    /^([\d\.]+) K$/,
    /^([\d\.]+) M$/,
    /^([\d\.]+) B$/,
    /^([\d\.]+) Oc$/,
    /^([\d\.]+) Oc$/,
    /^([\d\.]+) Sp$/,
    /^([\d\.]+) TDc$/,
    /^([\d\.]+) QtDc$/,
    /^([\d\.]+) Spx$/,
    /^([\d\.]+) No$/,
    /^([\d\.]+) QaDc$/,
    /^([\d\.]+) Ocx$/,
    /^([\d\.]+) SpDcx$/,
    /^([\d\.]+)s$/,
    /^\(\+([\d\.]+)(.+)$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^×([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^\(\+([\d\.,]+)$/,
    /^\+([\d\.,]+)$/,
    /^\-([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^×([\d\.,]+)$/,
    /^([\d\.,]+) \/ ([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^\(\+([\d\.]+)e([\d\.,]+)$/,
    /^e([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^You have (.+) total Golden Stone, which boosts Stone \& Tiered Stone by$/, '你总共有 $1 金石，这将石头和阶梯石的增益提高'],
    [/^You have (.+) total Golden Stone, which boosts Stone \& Tiered Stone gain by$/, '你总共有 $1 金石，这将石头和阶梯石的增益提高'],
    [/^(.+)\n(.+)Prismarine, \n(.+)which is$/, '$1\n$2海晶石, \n$3'],
    [/^(.+)\n(.+)Basalt, \n(.+)which is$/, '$1\n$2玄武岩, \n$3'],
    [/^(.+)\n(.+)Diorite, \n(.+)which is$/, '$1\n$2闪长岩, \n$3'],
    [/^(.+)\n(.+)Andesite, \n(.+)which is$/, '$1\n$2安山岩, \n$3'],
    [/^(.+)\n(.+)Sandstone, \n(.+)which is$/, '$1\n$2砂岩, \n$3'],
    [/^(.+)\n(.+)Granite, \n(.+)which is$/, '$1\n$2花岗岩, \n$3'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
    [/^How are you making (.+) of uranium\?$/, '你是如何制造 $1 的铀的？'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^([\d\.]+) elves$/, '$1 精灵'],
    [/^([\d\.]+)d ([\d\.]+)h ([\d\.]+)m$/, '$1天 $2小时 $3分'],
    [/^([\d\.]+)e([\d\.,]+) elves$/, '$1e$2 精灵'],
    [/^([\d\.,]+) elves$/, '$1 精灵'],
    [/^Level ([\d\.,]+)$/, '等级 $1'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Cost: (.+) Super Andesite$/, '成本：$1 超级安山岩'],
    [/^Cost: (.+) Obsidian$/, '成本：$1 黑曜石'],
    [/^Cost: (.+) Cobalt$/, '成本：$1 钴'],
    [/^Cost: (.+) Ironstone$/, '成本：$1 铁石'],
    [/^Cost: (.+) Lonsdaleite$/, '成本：$1 朗斯代尔石'],
    [/^Cost: (.+) Neutronium$/, '成本：$1 中子'],
    [/^Cost: (.+) Quartz$/, '成本：$1 石英石'],
    [/^Cost: (.+) Ruby$/, '成本：$1 红宝石'],
    [/^Cost: (.+) Topaz$/, '成本：$1 黄玉'],
    [/^Cost: (.+) Andesite$/, '成本：$1 安山岩'],
    [/^Cost: (.+) Diorite$/, '成本：$1 闪长石'],
    [/^Cost: (.+) w-BN$/, '成本：$1 w-BN'],
    [/^Cost: (.+) Diamond$/, '成本：$1 钻石'],
    [/^Cost: (.+) Super Sandstone$/, '成本：$1 超级砂岩'],
    [/^Cost: (.+) Sandstone$/, '成本：$1 砂岩'],
    [/^Cost: (.+) Strange Matter$/, '成本：$1 奇异物质'],
    [/^Cost: (.+) Bedrock$/, '成本：$1 基岩'],
    [/^Cost: (.+) Unobtainium$/, '成本：$1 难得素'],
    [/^Cost: (.+) Granite$/, '成本：$1 花岗岩'],
    [/^Cost: (.+) Basalt$/, '成本：$1 玄武岩'],
    [/^Cost: (.+) Titanium$/, '成本：$1 钛'],
    [/^Cost: (.+) Prismarine$/, '成本：$1 海晶石'],
    [/^Cost: (.+) Stone$/, '成本：$1 石头'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Req: (.+) elves$/, '要求：$1 精灵'],
    [/^Req: (.+) \/ (.+) elves$/, '要求：$1 \/ $2 精灵'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);