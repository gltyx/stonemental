function calc(dt) {
    if (tmp.pass) {
        /*

        

        

       

        player.break.tier = Math.max(player.break.tier,tmp.bulkPickTier)

        if (player.break.unl) {
            player.break.xp = player.break.xp.add(tmp.xpGain.mul(dt))
        }
        */

        for (let id in CURRENCIES) {
            let c = CURRENCIES[id]
            gainCurrency(id, tmp.currency_gain[id].mul(c.passive ?? 1).mul(dt))
        }

        if (player.stone.gte(1e4) && !player.t_stone.unl) player.t_stone.unl = true;

        if (player.t_stone.unl) {
            player.t_stone.stone = player.t_stone.stone.pow(tmp.t_stoneHard).add(tmp.t_stoneGain.mul(dt)).root(tmp.t_stoneHard)

            if (player.t_stone.stone.gte(tmp.t_stoneNext) && player.t_stone.tier.gte(player.t_stone.max)) player.t_stone.max = player.t_stone.max.add(1);
        }

        for (x in AUTO_ID) {
            let ai = AUTO_ID[x]
            if (player.auto[ai]) AUTO[ai].run(dt);
        }
    }

    if (player.options.theme != tmp.theme) {
        document.getElementById("theme_css").href = player.options.theme != "normal" ? "theme/"+player.options.theme+".css" : ""
        tmp.theme = player.options.theme
    }

    player.timePlayed += dt
    tmp.time += dt
    tmp.pass = true

    app.player = player
    app.tmp = tmp
}