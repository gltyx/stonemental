const TABS = {
    choose(id, stab=false) {
        if (stab) tmp.stab[tmp.tab] = id
        else if (this.tab[id].req ? this.tab[id].req() : true) tmp.tab = id
    },

    tab_id: ["stone","gold","auto","options"],

    tab: {
        stone: {
            title: "Stone / Quarry",
            res: _=>`You have <b>${player.stone.format(0)}</b> Stone, <b>${player.t_stone.stone.format(0)}</b> ${tmp.t_stoneName}.`,
            icon: "images/stone.png",
        },
        gold: {
            title: "Golden Stone",
            res: _=>`You have <b>${player.gold.stone.format(0)}</b> Golden Stone.`,
            req: _=> player.stone.gte(1e21) || player.gold.unl,
            reqDesc: _=> `Reach <b>${format(1e21)}</b> Stone to Unlock`,
            icon: "images/gold.png",
        },
        auto: {
            title: "Automation",
            unl: _=> player.gold.unl,
            icon: "images/automator.png",
        },
        options: {
            title: "Options",
            icon: "images/option.png",
        },
    },
}