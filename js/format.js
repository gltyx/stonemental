function E(x){return new Decimal(x)};
const EINF = Decimal.dInf

const ST_NAMES = [
	null, [
		["","U","D","T","Qa","Qt","Sx","Sp","Oc","No"],
		["","Dc","Vg","Tg","Qag","Qtg","Sxg","Spg","Ocg","Nog"],
		["","Ce","De","Te","Qae","Qte","Sxe","Spe","Oce","Noe"],
	],[
		["","Mi","Mc","Na","Pc","Fm","At","Zp","Yc","Xn"],
		["","Me","Du","Tr","Te","Pe","He","Hp","Ot","En"],
		["","c","Ic","TCn","TeC","PCn","HCn","HpC","OCn","ECn"],
		["","Hc","DHe","THt","TeH","PHc","HHe","HpH","OHt","EHc"]
	]
]

const FORMATS = {
    omega: {
        config: {
            greek: "βζλψΣΘΨω",
            infinity: "Ω",
        },
        format(value) {
            const step = Decimal.floor(value.div(1000));
            const omegaAmount = Decimal.floor(step.div(this.config.greek.length));
            let lastLetter = this.config.greek[step.toNumber() % this.config.greek.length] + toSubscript(value.toNumber() % 1000);
            const beyondGreekArrayBounds = this.config.greek[step.toNumber() % this.config.greek.length] === undefined;
            if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
            lastLetter = "ω";
            }
            const omegaOrder = Decimal.log(value, 8000);
            if (omegaAmount.equals(0)) {
            return lastLetter;
            } else if (omegaAmount.gt(0) && omegaAmount.lte(3)) {
            const omegas = [];
            for (let i = 0; i < omegaAmount.toNumber(); i++) {
                omegas.push("ω");
            }
            return `${omegas.join("^")}^${lastLetter}`;
            } else if (omegaAmount.gt(3) && omegaAmount.lt(10)) {
            return `ω(${omegaAmount.toFixed(0)})^${lastLetter}`;
            } else if (omegaOrder < 3) {
            return `ω(${this.format(omegaAmount)})^${lastLetter}`;
            } else if (omegaOrder < 6) {
            return `ω(${this.format(omegaAmount)})`;
            }
            const val = Decimal.pow(8000, omegaOrder % 1);
            const orderStr = omegaOrder < 100
            ? Math.floor(omegaOrder).toFixed(0)
            : this.format(Decimal.floor(omegaOrder));
            return `ω[${orderStr}](${this.format(val)})`;
        },
    },
    omega_short: {
        config: {
            greek: "βζλψΣΘΨω",
            infinity: "Ω",
        },
        format(value) {
            const step = Decimal.floor(value.div(1000));
            const omegaAmount = Decimal.floor(step.div(this.config.greek.length));
            let lastLetter = this.config.greek[step.toNumber() % this.config.greek.length] + toSubscript(value.toNumber() % 1000);
            const beyondGreekArrayBounds = this.config.greek[step.toNumber() % this.config.greek.length] === undefined;
            if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
            lastLetter = "ω";
            }
            const omegaOrder = Decimal.log(value, 8000);
            if (omegaAmount.equals(0)) {
            return lastLetter;
            } else if (omegaAmount.gt(0) && omegaAmount.lte(2)) {
            const omegas = [];
            for (let i = 0; i < omegaAmount.toNumber(); i++) {
                omegas.push("ω");
            }
            return `${omegas.join("^")}^${lastLetter}`;
            } else if (omegaAmount.gt(2) && omegaAmount.lt(10)) {
            return `ω(${omegaAmount.toFixed(0)})^${lastLetter}`;
            }
            const val = Decimal.pow(8000, omegaOrder % 1);
            const orderStr = omegaOrder < 100
            ? Math.floor(omegaOrder).toFixed(0)
            : this.format(Decimal.floor(omegaOrder));
            return `ω[${orderStr}](${this.format(val)})`;
        }
    },
    elemental: {
        config: {
            element_lists: [["H"],
            ["He", "Li", "Be", "B", "C", "N", "O", "F"],
            ["Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl"],
            [
              "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe",
              "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br"
            ],
            [
              "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru",
              "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I"
            ],
            [
              "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm",
              "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm",
              "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir",
              "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At"
            ],
            [
              "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np",
              "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md",
              "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt",
              "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts"
            ],
            ["Og"]],
        },
        getAbbreviationAndValue(x) {
            const abbreviationListIndexUnfloored = Math.log(x) / Math.log(118);
            const abbreviationListIndex = Math.floor(abbreviationListIndexUnfloored);
            const abbreviationList = this.config.element_lists[Math.floor(abbreviationListIndex)];
            const abbreviationSublistIndex = Math.floor(
              (abbreviationListIndexUnfloored - abbreviationListIndex) * abbreviationList.length);
            const abbreviation = abbreviationList[abbreviationSublistIndex];
            const value = 118 ** (abbreviationListIndex + abbreviationSublistIndex / abbreviationList.length);
            return [abbreviation, value];
        },
        formatElementalPart(abbreviation, n) {
            if (n === 1) {
              return abbreviation;
            }
            return `${n} ${abbreviation}`;
        },
        format(value,acc) {
            let log = value.log(118);
            const parts = [];
            while (log >= 1 && parts.length < 4) {
              const [abbreviation, value] = this.getAbbreviationAndValue(log);
              const n = Math.floor(log / value);
              log -= n * value;
              parts.unshift([abbreviation, n]);
            }
            if (parts.length >= 4) {
              return parts.map((x) => this.formatElementalPart(x[0], x[1])).join(" + ");
            }
            const formattedMantissa = Decimal.pow(118, log).toFixed(acc);
            if (parts.length === 0) {
              return formattedMantissa;
            }
            if (parts.length === 1) {
              return `${formattedMantissa} × ${this.formatElementalPart(parts[0][0], parts[0][1])}`;
            }
            return `${formattedMantissa} × (${parts.map((x) => this.formatElementalPart(x[0], x[1])).join(" + ")})`;
        },
    },
    old_sc: {
      format(ex, acc) {
        ex = E(ex)
        let e = ex.log10().floor()
        if (e.lt(9)) {
            if (e.lt(3)) {
                return ex.toFixed(acc)
            }
            return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        } else {
            if (ex.gte("eeee10")) {
                let slog = ex.slog()
                return (slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + this.format(slog.floor(), 0)
            }
            let m = ex.div(E(10).pow(e))
            return (e.log10().gte(9)?'':m.toFixed(4))+'e'+this.format(e,0)
        }
      }
    },
    eng: {
      format(ex, acc) {
        ex = E(ex)
        let e = ex.log10().floor()
        if (e.lt(9)) {
          if (e.lt(3)) {
              return ex.toFixed(acc)
          }
          return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        } else {
          if (ex.gte("eeee10")) {
            let slog = ex.slog()
            return (slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + this.format(slog.floor(), 0)
          }
          let m = ex.div(E(1000).pow(e.div(3).floor()))
          return (e.log10().gte(9)?'':m.toFixed(E(4).sub(e.sub(e.div(3).floor().mul(3)))))+'e'+this.format(e.div(3).floor().mul(3),0)
        }
      },
    },
    mixed_sc: {
      format(ex, acc, max) {
        ex = E(ex)
        let e = ex.log10().floor()
        if (e.lt(max)) return format(ex,acc,max,"sc")
        if (e.lt(63)) return format(ex,acc,max,"st")
        else {
          let m = ex.div(E(10).pow(e))
          return (e.gte(1e9)?"":m.toFixed(4))+"e"+format(e,0,max)
        }
      }
    },
    layer: {
      layers: ["infinity","eternity","reality","equality","affinity","celerity","identity","vitality","immunity","atrocity"],
      format(ex, acc, max) {
        ex = E(ex)
        let layer = ex.max(1).log10().max(1).log(INFINITY_NUM.log10()).floor()
        if (layer.lte(0)) return format(ex,acc,max,"sc")
        ex = E(10).pow(ex.max(1).log10().div(INFINITY_NUM.log10().pow(layer)).sub(layer.gte(1)?1:0))
        let meta = layer.div(10).floor()
        let layer_id = layer.toNumber()%10-1
        return format(ex,Math.max(4,acc),max,"sc") + " " + (meta.gte(1)?"meta"+(meta.gte(2)?"^"+format(meta,0,max,"sc"):"")+"-":"") + (isNaN(layer_id)?"nanity":this.layers[layer_id])
      },
    },
    standard: {
      tier1(x) {
        return ST_NAMES[1][0][x % 10] +
        ST_NAMES[1][1][Math.floor(x / 10) % 10] +
        ST_NAMES[1][2][Math.floor(x / 100)]
      },
      tier2(x) {
        let o = x % 10
        let t = Math.floor(x / 10) % 10
        let h = Math.floor(x / 100) % 10
  
        let r = ''
        if (x < 10) return ST_NAMES[2][0][x]
        if (t == 1 && o == 0) r += "Vec"
        else r += ST_NAMES[2][1][o] + ST_NAMES[2][2][t]
        r += ST_NAMES[2][3][h]
  
        return r
      },
    },
    inf: {
      format(ex, acc, max) {
        let meta = 0
        let inf = E(Number.MAX_VALUE)
        let symbols = ["", "∞", "Ω", "Ψ", "ʊ"]
        let symbols2 = ["", "", "m", "mm", "mmm"]
        while (ex.gte(inf)) {
          ex = ex.log(inf)
          meta++
        }
  
        if (meta == 0) return format(ex, acc, max, "sc")
        if (ex.gte(3)) return symbols2[meta] + symbols[meta] + "ω^"+format(ex.sub(1), acc, max, "sc")
        if (ex.gte(2)) return symbols2[meta] + "ω" + symbols[meta] + "-"+format(inf.pow(ex.sub(2)), acc, max, "sc")
        return symbols2[meta] + symbols[meta] + "-"+format(inf.pow(ex.sub(1)), acc, max, "sc")
      }
    },
}


const INFINITY_NUM = E(2).pow(1024);
const SUBSCRIPT_NUMBERS = "₀₁₂₃₄₅₆₇₈₉";
const SUPERSCRIPT_NUMBERS = "⁰¹²³⁴⁵⁶⁷⁸⁹";

function toSubscript(value) {
    return value.toFixed(0).split("")
      .map((x) => x === "-" ? "₋" : SUBSCRIPT_NUMBERS[parseInt(x, 10)])
      .join("");
}

function toSuperscript(value) {
    return value.toFixed(0).split("")
      .map((x) => x === "-" ? "₋" : SUPERSCRIPT_NUMBERS[parseInt(x, 10)])
      .join("");
}

function format(ex, acc=4, max=9, type='mixed_sc') {
    ex = E(ex)
    neg = ex.lt(0)?"-":""
    if (ex.isNan()) return neg + 'NaN'
    if (!ex.isFinite()) return neg + 'Infinity'
    if (ex.lt(0)) ex = ex.mul(-1)
    if (ex.eq(0)) return ex.toFixed(acc)
    let e = ex.log10().floor()
    switch (type) {
        case "sc":
            if (ex.log10().lt(Math.min(-acc,0)) && acc > 1) {
                let e = ex.log10().ceil()
                let m = ex.div(e.eq(-1)?E(0.1):E(10).pow(e))
                let be = e.mul(-1).max(1).log10().gte(9)
                return neg+(be?'':m.toFixed(4))+'e'+format(e, 0, max, "sc")
            } else if (e.lt(max)) {
                let a = Math.max(Math.min(acc-e.toNumber(), acc), 0)
                return neg+(a>0?ex.toFixed(a):ex.toFixed(a).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
            } else {
                if (ex.gte("eeee10")) {
                    let slog = ex.slog()
                    return (slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + format(slog.floor(), 0)
                }
                let m = ex.div(E(10).pow(e))
                let be = e.log10().gte(9)
                return neg+(be?'':m.toFixed(4))+'e'+format(e, 0, max, "sc")
            }
        case "st":
            let e3 = ex.log(1e3).floor()
            if (e3.lt(1)) {
              return neg+ex.toFixed(Math.max(Math.min(acc-e.toNumber(), acc), 0))
            } else {
              let e3_mul = e3.mul(3)
              let ee = e3.log10().floor()
              if (ee.gte(3000)) return "e"+format(e, acc, max, "st")

              let final = ""
              if (e3.lt(4)) final = ["", "K", "M", "B"][Math.round(e3.toNumber())]
              else {
                let ee3 = Math.floor(e3.log(1e3).toNumber())
                if (ee3 < 100) ee3 = Math.max(ee3 - 1, 0)
                e3 = e3.sub(1).div(E(10).pow(ee3*3))
                while (e3.gt(0)) {
                  let div1000 = e3.div(1e3).floor()
                  let mod1000 = e3.sub(div1000.mul(1e3)).floor().toNumber()
                  if (mod1000 > 0) {
                    if (mod1000 == 1 && !ee3) final = "U"
                    if (ee3) final = FORMATS.standard.tier2(ee3) + (final ? "-" + final : "")
                    if (mod1000 > 1) final = FORMATS.standard.tier1(mod1000) + final
                  }
                  e3 = div1000
                  ee3++
                }
              }

              let m = ex.div(E(10).pow(e3_mul))
              return neg+(ee.gte(10)?'':(m.toFixed(E(3).sub(e.sub(e3_mul)).add(acc==0?0:1).toNumber()))+' ')+final
            }
        default:
            return neg+FORMATS[type].format(ex, acc, max)
    }
}

function formatGain(amt, gain, acc=4) {
    let next = amt.add(gain)
    let rate
    if (next.div(amt).gte(10) && amt.gte(1e100)) {
        let ooms = next.div(amt).log10().mul(20)
        rate = "(+"+format(ooms) + " OoMs/sec)"
    }
    else rate = "("+(gain.gte(0)?"+":"")+format(gain,acc)+"/sec)"
    return rate
}

function formatMult(ex,acc=4) {
  ex = E(ex)
  if (ex.gte(1)) return "×"+ex.format(acc)
  else return "/"+ex.pow(-1).format(acc)
}

function formatReduction(ex,acc) { return format(E(1).sub(ex).mul(100),acc)+"%" }

function formatPercent(ex,acc) { return format(Decimal.mul(ex,100),acc)+"%" }