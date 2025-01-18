var app

function loadVue() {
    app = new Vue({
        el: "#app",
        data: {
            MAIN,
            player,
            tmp,
            CURRENCIES,
            UPGRADE_GROUPS,
            UPGRADES,
            EINF,
            format,
            formatMult,
            formatPow,
            formatPercent,
            formatReduction,
            getStoneTierName,
            isAutomationEnabled,
            TABS,
            TAB_DATA,
            RESETS,
            AUTO_ID,
            AUTO,
            SAVE_SLOT,
            MOD_KEYS,
            MODS,
            icon,
            CHANGELOGS,
        },
    })
    
    Vue.component('upgrades',{
        props: ["id","row"],
        computed: {
            style() {
                return this.row ? {'grid-template-columns': `repeat(${this.row}, auto)`} : {}
            },
        },
        template: `
        <div class="upg-grid" :style="style">
            <upgrade v-for="x in UPGRADE_GROUPS[id]" :id="x" :upg="UPGRADES[x]"></upgrade>
        </div>
        `
    })

    Vue.component('upgrade',{
        props: ["id","upg"],
        computed: {
            unlocked() { return this.upg.unl() || hasUpgrade(this.id) },
            classObject() {
                let lvl = player.upgs[this.id]
                return {
                    "locked": lvl.lt(this.upg.max) && CURRENCIES[this.upg.curr].amount.lt(this.upg.cost(lvl)),
                    "bought": lvl.gte(this.upg.max),
                }
            },
            get_level() {
                let lvl = player.upgs[this.id], bonus = this.upg.bonus
                return formatPercent(this.upg.strength ?? 1) + "<br>Level: " + format(lvl,0) + (bonus > 0 ? ` + ${format(bonus)} ➜ ${format(lvl.add(bonus),0)}` : "") + (Decimal.lt(this.upg.max,EINF) ? " / " + format(this.upg.max,0) : "");
            },
            get_desc() {
                let h = ""
                if ('name' in this.upg) h += `<b>${this.upg.name}</b><br class='sub-line'>`;
                h += this.upg.description
                if ('effDesc' in this.upg) h += `<br class='sub-line'> Effect: ` + this.upg.effDesc(tmp.upg_effect[this.id]).bold();
                return h
            },
            get_cost() {
                return "Cost: " + format(this.upg.cost(player.upgs[this.id])) + " " + CURRENCIES[this.upg.curr].name;
            },
        },
        methods: {
            purchase() { buyUpgrade(this.id); },
            purchase_all() { buyUpgrade(this.id,'bulk'); },
        },
        template: `
        <div v-if="unlocked" :id="id">
            <button class="o-upgrade-btn" :class="classObject" @click="purchase">
                <div class="o-upgrade-btn--id">{{ id }}</div>
                <div class="o-upgrade-btn--level" v-if="upg.max > 1" v-html="get_level"></div>
                <div v-html="get_desc"></div>
                <div class="o-upgrade-btn--cost" v-html="get_cost"></div>
            </button>
            <div class="o-upgrade-bottom">
                <button v-if="upg.max > 1" @click="purchase_all">Buy MAX</button>
            <div>
        </div>
        `
    })

    /*
    Vue.component('upgrade',{
        props: ["id"],
        data() {
            const U = UPGRADES[this.id]

            return {
                ctn: U,
                curr: CURRENCIES[U.curr],
            }
        },
        computed: {
            objectClass() {
                let bought = player.upgs[this.id].gte(tmp.upgs.max[this.id]);
                return {
                    bought,
                    locked: !bought && this.curr.amount.lt(this.ctn.cost(player.upgs[this.id])),
                }
            },
            max_level() {
                let max = tmp.upgs.max[this.id];
                return Decimal.gt(max, 1) && Decimal.lt(max, EINF) ? ` / ${format(max, 0)}` : "";
            },
        },
        template: `
        <div class="upg_div">
            <button class="upg_btn" v-if="ctn.unl()" :class="objectClass" @click="buyUpgrade(id)">
                <div>
                    <b>{{ ctn.name ?? "" }}</b>
                    <div style="min-height: 15px">Level {{ format(player.upgs[id],0) }} {{ max_level }}</div>
                    <div style="min-height: 60px" v-html="ctn.desc"></div>
                    <div v-if="ctn.effDesc">Effect: <span v-html="ctn.effDesc(tmp.upgs.effect[id])"></span></div>
                    <div v-if="player.upgs[id].lt(tmp.upgs.max[id])">Cost: {{ ctn.cost(player.upgs[id]).format(0) }} {{ curr.name }}</div>
                </div>
            </button>
        </div>
        `
    })
        */

    Vue.component('tab',{
        props: ["data","stab","tab_index"],
        computed: {
            unlocked() { return this.data.unl?.() ?? true },
            require() { return this.data.req?.() ?? true },
        },
        methods: {
            choose() {
                if (this.stab) chooseTab(this.tab_index,this.data.index);
                else chooseTab(this.data.index);
            },
        },
        template: `
        <div v-if="unlocked">
            <button class="tab_btn" :class="{locked: !require}" @click="choose"><img v-if="data.icon && require" :src="data.icon" draggable="false"><img v-if="!require" src="images/mark.png" draggable="false"></button>
            <div class="tab_btn_tooltip">
                <span v-if="require">
                    <h3>{{ data.name }}</h3>
                    <br><span v-if="data.res" v-html="data.res()"></span>
                </span>
                <span v-else v-html="data.reqDesc()"></span>
            </div>
        </div>
        `
    })

    Vue.component('reset',{
        props: ["id"],
        computed: {
            can() { return RESETS[this.id].require() },
            gain_desc() { return RESETS[this.id].gainDesc(tmp.currency_gain[RESETS[this.id].curr]) },
            req_desc() { return RESETS[this.id].reqDesc },
            reset_desc() { return RESETS[this.id].resetDesc },
        },
        methods: {
            doReset() { doReset(this.id) },
        },
        template: `
        <div style="margin: 10px 0px">
            <button class="reset_btn" :class="{locked: !can}" @click="doReset">
                <span v-if="can" v-html="gain_desc"></span>
                <span v-else v-html="req_desc"></span>
            </button><div v-if="RESETS[id].resetDesc" v-html="reset_desc"></div>
        </div> 
        `
    })

    Vue.component('save-slot',{
        props: ["index"],
        computed: {
            is_current() { return SAVE_SLOT.current === this.index },
            resources_display() {
                const DATA = getPlayerData()
                let data = deepUndefinedAndDecimal(deepNaN(JSON.parse(atob(SAVE_SLOT.slots[this.index])), DATA), DATA)

                let h = [`<b>${format(data.stone,0)}</b> Stone`]

                if (data.t_stone.unl) h.push(`<b>${format(data.t_stone.stone,0)}</b> ${getStoneTierName(data.t_stone.tier)}</b>`);
                if (data.gold.unl) h.push(`<b>${format(data.gold.stone,0)}</b> Golden Stone`);
                if (data.break.unl) h.push(`<b>${format(data.break.stone,0)}</b> Cobblestone`);

                return `You have ${h.join(", ")}.`
            },
            get_mods() {
                const DATA = getPlayerData()
                let data = deepUndefinedAndDecimal(deepNaN(JSON.parse(atob(SAVE_SLOT.slots[this.index])), DATA), DATA)
                let mods = data.mods ?? []

                return mods.length > 0 ? mods.map(x => MODS[x].short).join(", ") : "None"
            },
        },
        methods: {
            save_slot() {
                localStorage.setItem("stonemental-save-"+this.index, SAVE_SLOT.slots[this.index] = btoa(JSON.stringify(player)));
            },
            remove_slot() {
                if (SAVE_SLOT.length > 1 && confirm("Are you sure you want to delete this save?")) {
                    for (let x = this.index; x <= SAVE_SLOT.length; x++) {
                        if (x === SAVE_SLOT.length) localStorage.removeItem("stonemental-save-"+x);
                        else localStorage.setItem("stonemental-save-"+x, SAVE_SLOT.slots[x] = SAVE_SLOT.slots[x+1]);
                    }

                    SAVE_SLOT.length --;
                    localStorage.setItem("stonemental-save-slots", SAVE_SLOT.length);

                    let c = SAVE_SLOT.current === this.index;

                    if (SAVE_SLOT.current >= this.index) localStorage.setItem("stonemental-save-slot", --SAVE_SLOT.current);

                    if (c) location.reload();
                }
            },
            load_slot() {
                localStorage.setItem("stonemental-save-slot", this.index);
                location.reload()
            },
            import_slot() {
                let loadgame = prompt("Paste in your save WARNING: WILL OVERWRITE YOUR SAVE")
                if (loadgame != null) {
                    setTimeout(()=>{
                        try {
                            if (findNaN(loadgame, true)) {
                                return
                            }
                            localStorage.setItem("stonemental-save-"+this.index, SAVE_SLOT.slots[this.index] = loadgame);
                            if (this.index === SAVE_SLOT.current) location.reload();
                        } catch (error) {
                            notify("Failed Importing", "error")
                        }
                    }, 200)
                }
            },
            copy_slot() {
                copy_clipboard(SAVE_SLOT.slots[this.index])
                notify("Copied to Clipboard")
            },
            download_slot() {
                export_file(SAVE_SLOT.slots[this.index],"Stone-emental Save #"+this.index)
            },
        },
        template: `
        <div class="save-slot">
            <h3>Save #{{ index }}</h3> <span v-if="is_current">(Selected)</span>
            <div style="min-height: 80px;">
                <div><b>Modifiers:</b> <span v-html="get_mods"></span></div>
                <div v-html="resources_display"></div>
            </div>
            <div class="table_center">
                <button class="small-button" @click="save_slot">Save</button>
                <button class="small-button" @click="load_slot">Load</button>
                <button class="small-button" @click="import_slot">Import</button>
                <button class="small-button" @click="copy_slot">Export via Clipboard</button>
                <button class="small-button" @click="download_slot">Export via File</button>
                <button class="small-button" @click="remove_slot">Delete</button>
            </div>
        </div>
        `,
    })

    Vue.component('modifier-slot',{
        props: ["id"],
        template: `
        <div class="modifier-slot">
            <div class="modifier-top">
                <div class="modifier-name"><div>{{ MODS[id].name }}</div></div>
                <button @click="MODS[id].choosed = !MODS[id].choosed" :class="{'choosed': MODS[id].choosed}">{{ MODS[id].choosed ? 'ON' : 'OFF' }}</button>
                <button style="font-size: 40px;" @click="MODS[id].expanded = !MODS[id].expanded" v-html="icon(MODS[id].expanded ? 'collapse' : 'expand')"></button>
            </div><div class="modifier-bottom" v-if="MODS[id].expanded">
                <br class="line">
                <div v-html="MODS[id].description"></div>
            </div>
        </div>
        `,
    })

    Vue.component('changelog-slot',{
        props: ["id"],
        template: `
        <div class="changelog-slot">
            <div class="modifier-top">
                <div class="modifier-name"><div>{{ CHANGELOGS[id].version }}</div></div>
                <button style="font-size: 40px;" @click="CHANGELOGS[id].expanded = !CHANGELOGS[id].expanded" v-html="icon(CHANGELOGS[id].expanded ? 'collapse' : 'expand')"></button>
            </div><div class="modifier-bottom" v-if="CHANGELOGS[id].expanded">
                <br class="line">
                <div v-html="CHANGELOGS[id].description"></div>
            </div>
        </div>
        `,
    })
}