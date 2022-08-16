var app

function loadVue() {
    app = new Vue({
        el: "#app",
        data: {
            MAIN,
            player,
            tmp,
            UPGRADES,
            buyUpgrade,
            EINF,
            format,
            formatMult,
            getStoneTierName,
            TABS,
            RESETS,
            AUTO_ID,
            AUTO,
        },
    })

    Vue.component('upgrades',{
        props: ["id"],
        template: `
        <div class="table_center upgs">
            <upgrade v-for="x in UPGRADES.ids[id].ctn.length" :id="id" :idx="x-1" :ctn="UPGRADES.ids[id].ctn[x-1]" :tu="tmp.upgs[id]" :res="typeof UPGRADES.ids[id].resDisplay === 'function' ? UPGRADES.ids[id].resDisplay() : UPGRADES.ids[id].resDisplay"></upgrade>
        </div>
        `
    })

    Vue.component('upgrade',{
        props: ["id","idx","ctn",'tu','res'],
        template: `
        <div class="upg_div">
            <button class="upg_btn" v-if="ctn.unl ? ctn.unl() : true" :class="{locked: tu.res.lt(tu.cost[idx]), bought: ctn.type === 0 ? player.upgs[id][idx] : ctn.type === 1 ? player.upgs[id][idx].gte(tu.max[idx]||EINF) : player.upgs[id][idx] >= ctn.cost.length}" @click="buyUpgrade(id,idx)">
                <div>
                    <b>{{ ctn.title }}</b>
                    <div style="min-height: 15px"><span v-if="ctn.type > 0">Level {{ format(player.upgs[id][idx],0) }}<span v-if="tu.max[idx] || ctn.type === 2"> / {{ format(ctn.type === 1 ? format(tu.max[idx],0) : ctn.cost.length,0) }}</span></span></div>
                    <div style="min-height: 60px" v-html="typeof ctn.desc === 'function' ? ctn.desc() : ctn.desc"></div>
                    <div v-if="ctn.effDesc">Effect: <span v-html="ctn.effDesc(tmp.upgs[id].eff[idx])"></span></div>
                    <div v-if="ctn.type === 0 ? !player.upgs[id][idx] : ctn.type === 1 ? player.upgs[id][idx].lt(tu.max[idx]||EINF) : player.upgs[id][idx] < ctn.cost.length">Cost: {{ tmp.upgs[id].cost[idx].format(0) }} {{ res }}</div>
                </div>
            </button>
        </div>
        `
    })

    Vue.component('tab',{
        props: ["id",'ctn',"req"],
        template: `
        <div v-if="ctn.unl ? ctn.unl() : true">
            <button class="tab_btn" :class="{locked: !req}" @click="TABS.choose(id)"><img v-if="ctn.icon && req" :src="ctn.icon" draggable="false"><img v-if="!req" src="images/mark.png" draggable="false"></button>
            <div class="tab_btn_tooltip">
                <span v-if="req">
                    <h2>{{ ctn.title }}</h2>
                    <br><span v-if="ctn.res" v-html="ctn.res()"></span>
                </span>
                <span v-else v-html="ctn.reqDesc()"></span>
            </div>
        </div>
        `
    })

    Vue.component('reset',{
        props: ["id"],
        template: `
        <resetBtn :id="id" :ctn="RESETS.ids[id]" :can="RESETS.canReset(id)" :gain="RESETS.resGain[id]()"></resetBtn>
        `
    })

    Vue.component('resetBtn',{
        props: ["id",'ctn','can','gain'],
        template: `
        <div>
            <button class="reset_btn" :class="{locked: !can}" @click="RESETS.reset(id)">
                <span v-if="can" v-html="ctn.gainDesc(gain)"></span>
                <span v-else v-html="ctn.reqDesc()"></span>
            </button><div v-if="ctn.resetDesc" v-html="ctn.resetDesc"></div>
        </div> 
        `
    })
}