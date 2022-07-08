function calc(dt) {
    player.stone = player.stone.add(tmp.stoneGain.mul(dt))

    if (player.stone.gte(1e4) && !player.t_stone.unl) player.t_stone.unl = true

    if (player.t_stone.unl) {
        player.t_stone.stone = player.t_stone.stone.pow(tmp.t_stoneHard).add(tmp.t_stoneGain.mul(dt)).root(tmp.t_stoneHard)

        if (player.t_stone.stone.gte(tmp.t_stoneNext) && player.t_stone.tier >= player.t_stone.max) player.t_stone.max++
    }

    for (x in AUTO_ID) {
        let ai = AUTO_ID[x]
        if (player.auto[ai]) AUTO[ai].run()
    }

    tmp.time += dt
}