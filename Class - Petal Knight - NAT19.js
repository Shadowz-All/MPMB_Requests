/*	-INFORMATION-
    Subject:	Class
    Effect:		This script updates the Petal Knight class, developed by Logan Laidlaw.
    Code by:	ShadowzAll.
    Date:		2025-10-09 (sheet v13.2.3)
    Notes:		This iteration will be from variation published by Nat19 on June 21, 2021
            	
*/

var iFileName = "NAT19-Petal Knight.js";
RequiredSheetVersion("13.2.3");

/*	-SCRIPT AUTHOR NOTE-
    This file should be installed AFTER the other 2024 PHB & DMG scripts made by ThePokésimmer (if using 2024 rules).
*/

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Define Sources for everything first >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //

SourceList["NATPK"] = {
    name: "NAT19: Petal Knight",
    abbreviation: "NAT19PK",
    group: "NAT19",
    date: "2021/06/21",
        url: "https://www.drivethrurpg.com/en/product/365196/somnus-domina-the-petal-knight-5e-class",
};

// Define the spell list
[
    // Cantrips

    // 1st Level
    "absorb elements", "animal friendship", "charm person", "command", "compelled duel", "detect magic", "earth tremor", "entangle", "faerie fire", "jump", "long strider", "snare", "thunderwave", "zephyr strike",

    // 2nd Level
    "barkskin", "blur", "darkvision", "earthbind", "enhance ability", "flame blade", "gust of wind", "hold person", "lesser restoration", "moon beam", "protection from poison", "see invisibility", "spike growth", "warding wind",

    // 3rd Level
    "counterspell", "dispel magic", "elemental weapon", "erupting earth", "fireball", "flame arrows", "fly", "minute meteors", "protection from energy", "sleet storm", "tidal wave", "thunder step", "wall of water", "water breathing", "wind wall",

    // 4th Level
    "banishment", "charm monster", "confusion", "control water", "elemental bane", "freedom of movement", "guardian of nature", "ice storm", "mordenkainen's faithful hound", "sickening radiance", "stone shape", "stoneskin", "wall of fire", "watery sphere",

    // 5th Level
    "antilife shell", "dispel evil & good", "control winds", "holy weapon", "maelstrom", "reincarnate", "skill empowerment", "steel wind strike", "swift quiver", "tree stride", "wall of stone", "wrath of nature"
].forEach(function (s) { if (SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("petal knight") === -1) SpellsList[s].classes.push("petal knight"); });

//Add Base Class
ClassList["petal knight"] = {
  name : "Petal Knight",
  regExpSearch : /petal knight/i,
  source : ["NATPK", 5], /* or [["", PG], ["", PG]] */
  primaryAbility : "Strength, Dexterity, or Wisdom", /* or "" */
  prereqs : "Strength or Dexterity 13 & Wisdom 15",
  die : 10, /* HIT DIE */
  improvements: [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5], /* ability score improvements */
  saves : ["Dex", "Cha"], /* example ["Dex", "Con"] */
  skillstxt : { primary : "Choose 3 from: Animal Handling, Athletics, History, Investigation, Nature, Perception, Persuasion, Religion, and Survival." }, 
  toolProfs : { primary : [["Musical instrument", 1], ["Cartographer's tools"], ["Artisan's tools", 1]]}, /* ["#"] to choose any, number or skill abbrev to add bonus */
  armor : [ /* req; options: ["light", "medium", "heavy", shields"] */
          [true, true, false, false], /* set to true if yes */
          [true, true, false, false], /* if multiclassed into set to true if yes */ 
  ],
  weapons : [ /*req: simple, martial, other */
          [true, true, false], /* for other use ["name"] */
          [true, false, false], /* secondary/multiclass */
  ],
  equipment : "Petal Knight starting equipment:"+
		"\n \u2022 A rapier, longsword or any weapon with the light or finesse property."+
		"\n \u2022 A diplomat's pack -or- an explorer's pack."+
		"\n \u2022 An arcane focus or a pouch of 5 gold coins."+
		"\n \u2022 Leather armor and three daggers.",

  subclasses: ["Epithet", []], /* Required use AddSubClass function */
  attacks : levels.map(function (n) { return n < 5 ? 1 : 2;}), /* # of attacks per level */
  abilitySave : 5, /* Req for caster. used for Ability Saving Throws */
  spellcastingFactor : "warlock1",
  spellcastingFactorRoundupMulti : true,
  spellcastingKnown: {
    spells: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
    prepared: false,
  },
  spellcastingList : {
	"class" : "petal knight",
    level : [1, 5] //lower and higher limit
	},

  features : { /* required. class features */
    "pact magic" : {
		name : "Pact Magic",
		source : [["SRD", 46], ["P", 107], ["NATPK", 5]],
		minlevel : 1,
		description : desc([
			"I can cast Petal Knight spells using Wisdom as my spellcasting ability",
      "I can use an arcane focus and flower/replica of Epithet emblem as material components",
			"I regain these pact (spell) slots after a short rest",
		]),
		additional : levels.map(function (n, idx) {
			var splls = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15][idx];
			var slots = n < 2 ? 1 : n < 10 ? 2 : n < 17 ? 3 : 4;
			var sllvl = n < 3 ? 1 : n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : 5;
			return splls + " pact spells";// + slots + "\xD7 " + Base_spellLevelList[sllvl] + " slots";
		}),
    },

    "fighting style" : {
				name : "Fighting Style",
				source : [["SRD", 24], ["P", 72]],
				minlevel : 1,
				description : desc('Choose a Fighting Style using \Choose Feature\ button'),
				choices : ["Fighting Style [Arcane Flouisher]", "Fighting Style [Archery]", "Fighting Style [Blind Fighting]", "Fighting Style [Defense]", "Fighting Style [Dueling]", "Fighting Style [Interception]", "Fighting Style [Thrown Weapon Fighting]", "Fighting Style [Unarmed Fighting]"],
				"fighting style [arcane flouisher]": {
          name : "Fighting Style [Arcane Flouisher]",
          source : ["NATPK", 5],
	        description : desc([
		        "When I cast a spell that involves a weapon attack or spell attack, +2 bonus to those atk rolls"
	        ]),
          calcChanges: {
              atkCalc: [
                  function (fields, v, output) {
                      if (v.isSpell || v.isWeapon) {
                          output.extraHit += 2;
                      }
                  },
                  "When I cast a spell that involves a weapon or spell attack, I gain a +2 bonus to those attack rolls."
              ]
          }
        },
        "fighting style [archery]": {
			    name: "Fighting Style [Archery]",
			    description: desc(["I gain a +2 bonus to attack rolls I make with Ranged weapons."]),    
			      calcChanges: {
			        atkCalc: [
				        function (fields, v, output) {
				          if (v.isRangedWeapon && !v.isNaturalWeapon && !v.isDC) output.extraHit += 2;
				        },
				      "My ranged weapons get a +2 bonus on the To Hit."
              ]
            }
        },
        "fighting style [blind fighting]": {
			    name: "Fighting Style [Blind Fighting]",
			    description: desc([" I have Blindsight with a range of 10 feet."]),    
			    vision: [["Blindsight", 10]],
		    },
        "fighting style [defense]": {
			    name: "Fighting Style [Defense]",
			    description: desc([" While wearing Light, Medium, or Heavy armor, I gain a +1 bonus to Armor Class."]),    
			      extraAC: {
			        name: "Defense Fighting Style", // necessary for features referring to fighting style properties directly
			        mod: 1,
			        text: "I gain a +1 bonus to AC while wearing armor.",
			          stopeval: function (v) {
				          return !v.wearingArmor;
			          }
			      },
		    },
		    "fighting style [dueling]": {
			    name: "Fighting Style [Dueling]",
			    description: desc(["While holding a Melee weapon in one hand   and no other weapons, gain a +2 bonus to damage rolls with that weapon."]),    
			      calcChanges: {
			        atkCalc: [
				        function (fields, v, output) {
				          for (var i = 1; i <= FieldNumbers.actions; i++) {
					         if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) return;
				          }
				            if (v.isMeleeWeapon && !v.isNaturalWeapon && !(/((^|[^+-]\b)2|\btwo).?hand(ed)?s?\b/i).test(fields.Description)) output.extraDmg += 2;
				        },
				      "When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."
			        ]
			      }
		    },
        "fighting style [interception]": {
			  name: "Fighting Style [Interception]",
			  description : desc([
		      "As a reaction when a creature I can see hits another within 5 ft of me, I can intercept",
		      "I reduce the damage the target takes by 1d10 + my Proficiency Bonus (min 0 damage)",
		      "I can't be the target and it requires me wielding a shield or simple or martial weapon"
	      ]),    
			  action: [["reaction", "Intercept"]],
		    },
        "fighting style [thrown weapon fighting]": {
			    name: "Fighting Style [Thrown Weapon Fighting]",
			    description: desc(["When I hit with a ranged attack roll using a weapon that has the Thrown property, I gain a +2 bonus to the damage roll."]),    
			      calcChanges: {
			        atkAdd: [
				        function (fields, v) {
				          if (v.isThrownWeapon && v.isMeleeWeapon) {
					          fields.Description += (fields.Description ? '; ' : '') + '+2 damage when thrown';
				          }
				        },
				      "I deal +2 damage when I hit a ranged attack made with a thrown weapon."
			        ],
			        atkCalc: [
				        function (fields, v, output) {
				          if (v.isThrownWeapon && !v.isMeleeWeapon) {
					          output.extraDmg += 2;
				          }
				        },
				      ""
			        ],
			      },
		    },
        "fighting style [unarmed fighting]": {
			    name: "Fighting Style [Unarmed Fighting]",
			    description: desc(["When I hit with my Unarmed Strike and deal damage, I can deal Bludgeoning damage equal to 1d6 plus my Strength modifier instead. If I am not holding any weapons or a Shield when I make the attack roll, the d6 becomes a d8.\n At the start of each of my turns, I can deal 1d4 Bludgeoning damage to one creature Grappled by me."]),    
			      calcChanges: {
			        atkAdd: [
				        function (fields, v) {
				          if (v.baseWeaponName == "unarmed strike") {
					          if (fields.Damage_Die == 1 || fields.Damage_Die == "1d4") fields.Damage_Die = '1d6';
					            fields.Description += (fields.Description ? '; ' : '') + 'Versatile (d8)';
				          }
				        },
				        "My unarmed strikes deal 1d6 damage instead of 1, which increases to 1d8 if I have both hands free to make an unarmed strike with.",
				        1
			        ]
			      },
		    },
    },
    "subclassfeature2": {
        name: "Epithet",
        source: ["NATPK", 6],
        minlevel: 2,
        description: " Choose your Petal Knight Epithet (Subclass).",
    },
    "virtuous branches": {
        name: "Virtuous Branches",
        source: ["NATPK", 6],
        minlevel: 3,
        description: desc([
                "When casting a pact spell, I can invoke an effect as part of the casting action. See Pg3 notes.",
        ]),
        additional: "1 per turn",
        toNotesPage: [{
            name: "Virtuous Branches",
            note: [
                "When casting a pact spell, you can invoke an effect as part of the casting action  ( 1 per turn )."+
                "\n \u2022 Blossoming Step. When casting an attack spell to target a creature you can see, teleport (up\n   to 50ft per spell level used) to an unoccupied space adjacent to the target. This effect can\n   only be used if the spell hit the target with an attack roll or if the the target failed a saving\n   throw against it. " +
                "\n \u2022 Fortify. Until the end of your next turn, add 1d4 to weapon or spell attacks." +
                "\n \u2022 Graceful Protection. Self and up to 3 creatures of choice within 30ft gain a bonus ( half of Prof\n   Bonus, rounded down) to the next saving throw they make. This effect lasts for 10 minutes." +
                "\n \u2022 Sweep. Bonus Action: Dash. Targeted creature has DisAdv on opportunity attacks made\n   against you this turn."
            ],
            page3notes: true,
        }],
    },
    "extra attack": {
        name: "Extra Attack",
        source: ["NATPK", 6],
        minlevel: 5,
        description : desc([
				"I can attack twice when I take the Attack action on my turn"
        ]),
    },
    "virtuous flora": {
        name: "Virtuous Flora",
        source: ["NATPK", 6],
        minlevel: 7,
        description: desc([
            "Bonus Action: Choose an effect. see Pg3 Notes"]),
        toNotesPage: [{
            name: "Virtuous Flora",
            note:[   
            "\u2022 Attack. Make one attack with a one-handed weapon."+
            "\n \u2022 Charming Soul. Gain Adv on Charisma checks and saving throws for 1 min"+
            "\n \u2022 Flourish. Gain Adv on attacks until the end of my turn. Req: 1-handed weapon."+
            "\n \u2022 Shroud. Gain resistance against a chosen damage type (choice) until start of next turn" +
            "\n \u2022 Smite. Next Weapon attack this turn + extra damage = to 1d10 + 1/2 Petal Knight level"
            ],
            page3notes: true,
          }],
        usages: "1/2 ProfBon +1 per ",
        usagescalc: "event.value = Math.floor((Number(How('Proficiency Bonus'))/2)+1);",
        recovery: "SR",
        action: ["bonus action", ""],
    },
    "blossoming spell": {
        name: "Blossoming Spell",
        source: ["NATPK", 7],
        minlevel: 10,
        description: desc([
            "When taking the Attack action, I can use a weapon attack to cast a spell with cast time of 1a.",
            "The cast spell must be centered on myself or target, and target must have been already hit.",
            "Ranged spells count as melee spell attack. If a radius effect around the target point, space\n   or creature, you can omit yourself or target from the spell effects."
        ])
    },
    "aura of dignity": {
        name: "Aura of Dignity",
        source: ["NATPK", 7],
        minlevel: 13,
        description: levels.map(function (n) {
                var descr = desc([
                  "Project an invisible shroud of protective energy in a 15ft radius. All allies (+self) within gain:",
                  "\u2022 Adv on Death saving throws, frightened, or charmed as long as I am conscious.",
                  "When I or ally within 15ft radius fails saving throw, I can use my reaction to make it succeed.",
                ]);
                if (n >= 20) {
                    descr = desc([
                    "Project an invisible shroud of protective energy in a 30ft radius. All allies (+self) within gain:",
                  "\u2022 Adv on Death saving throws, frightened, or charmed as long as I am conscious.",
                  "When I or ally within 15ft radius fails a saving throw, I can use my reaction to make it succeed.",
                    ]);
                }
                return descr;
            }),
        action : ["reaction", "force success (save)"],
        usages: "1/2 ProfBonus + 1, ",
		    usagescalc: "event.value = Math.floor((Number(How('Proficiency Bonus'))/2)+1);",
        recovery : "long rest",
        savetxt : {
            text : ["Adv on Frightened, Charmed and Death saves for allies (+self) within 15ft rad."],
        },
        additional: ["", "", "", "", "", "", "", "", "", "", "", "", "15ft radius", "15ft radius", "15ft radius", "15ft radius", "15ft radius", "15ft radius", "15ft radius", "30ft radius"]
    },
    "resplendence": {
        name: "Resplendence",
        source: ["NATPK", 7],
        minlevel: 17,
        usages: 1,
        recovery: "long rest",
        description: desc([
            "Spend 1 minute concentrating on my Epithet's flower to regain expended pact slots",
        ]),
    },
    "paragon of protection":{
        name: "Paragon of Protection",
        source: ["NATPK", 7],
        minlevel: 20,
        description: desc([
            "Aura of Dignity radius increases to 30ft. When using Reaction to force a success on failed\n   save, all allied creatures within Aura succeed on failed saves.",
            "I gain 10 temp hp, and +5 for each failure turned into success; lasts until long rest.",
            "As long temp hp remains, I can make 1 extra weapon attack with Advantage."
        ]),
    },
  },
};
// Subclasses (Epithets)
AddSubClass("petal knight", "camellia", {
    regExpSearch: /camellia/i,
    subname: "Camellia",
    source: [["NATPK", 8]],
    features: {
        "subclassfeature2": {
            name: "Wylam Bond",
            minlevel: 2,
            description: desc([
                "Bonus Action: Touch a creature to grant it a blessing for 1 min.",
                "Target or I can use a Reaction to make an attack against the other miss (before outcome). "+
                "Target must make a Cha check vs. DC (1/2 of atk roll, round up); failure ends the bond."
            ]),
            usages: levels.map (function (n) { return n >= 11 ? 2 : 1; }),
            recovery: "short rest",
            additional: "1 min",
            action: [["bonus action", ""], ["reaction", "Negate Attack"]]
        },
        "subclassfeature6.1": {
            name: "Dual Radiance",
            minlevel: 6,
            description: desc([
                "When I or my Bonded ally attack a creature that the other has hit, the attack has advantage."
            ])
        },
        "subclassfeature6.2": {
            name: "Virtue of the Soft",
            minlevel: 6,
            description: desc([
                "As a Bonus Action, I expend a Wylam Bond use to gain 1d10 + CharLevel temp HP, lasting\n   until my next rest. "+
                "While I have these temp HP, all attacks against me have Disadvantage."
            ]),
            action: [["bonus action", ""]]
        },
        "subclassfeature11.1": {
            name: "Blooming Action",
            minlevel: 11,
            description: desc([
                "As a Reaction, I can end Bond to grant the bonded ally an extra action (not via Action Surge)"
            ]),
            action: [["reaction", ""]]
        },
        "subclassfeature11.2": {
            name: "Bond of Trust",
            minlevel: 11,
            description: desc([
                "My Wylam Bond ally and I can use a Bonus Action to make the other attack with a weapon.",
                "We see/hear through each other’s senses (no special senses shared)."
            ]),
            action: [["bonus action", "Bonded Attack"]]
        },
        "subclassfeature15": {
            name: "Stardust Dream",
            minlevel: 15,
            description: desc([
                "I or my Wylam Bond ally can cast spells from the other’s position or target via their senses.",
                "We can target each other with touch spells regardless of distance."
            ])
        },
    },
});

AddSubClass("petal knight", "dahlia", {
    regExpSearch: /dahlia/i,
    subname: "Dahlia",
    source: [["NATPK", 9]],
    features: {
        "subclassfeature2": {
            name: "Flames of Passion",
            minlevel: 2,
            description: levels.map(function (n) {
                var descr = desc([
		                "Bonus Action: I enter a trance for 1 min and gain:",
                    "\u2022My first weapon attack each turn deals +1d6 fire",
                    "\u2022Fire resistance"+
                    "        \u2022Dash as Bonus Action "+
                    "        \u2022Hits crit on 19-20.",
                    "Requires concentration; can concentrate on another spell simultaneously."
            	      ]);
		            if (n >= 11) {
		                descr = desc([
		                "Bonus Action: I enter a trance for 1 min and gain:",
                    "\u2022All of my attacks deal +1d10 fire dmg",
                    "\u2022Fire immunity"+
                    "        \u2022Dash as Bonus Action "+
                    "        \u2022Hits crit on 19-20.",
                    "Requires concentration; can concentrate on another spell simultaneously."
		                ]);
                }
                return descr;
            }),
            usages: "1/2 ProfBonus per ",
		        usagescalc: "event.value = Math.floor(Number(How('Proficiency Bonus'))/2);",
            recovery: "long rest",
            action: [["bonus action", ""]],
            dmgres: ["fire"],
        },
        "subclassfeature6": {
            name: "Infernal Rebuff",
            minlevel: 6,
            description: desc([
                "When a Crea enters/exits my range, I can use my reaction to force Dex save (DC = spell save).",
                "On fail: fire dmg = to ½ my Char level, set ablaze (repeat each turn, must douse as action),\n   target loses Adv on atks.",
            ]),
            usages: "Prof bonus per ",
            usagescalc: "event.value = (How('Proficiency Bonus'));",
            recovery: "long rest",
            action: [["reaction", ""]]
        },
        "subclassfeature11": {
            name: "Extra Attack Improvement",
            minlevel: 11,
            description: "  When I take the attack action, I can make 3 attacks.",
            savetxt : { immune : ["fire"] },
            changeeval : function(fields,v) {
                      var attackNo = 3;
                          if (attackNo > Number(classes.attacks)) {
                            classes.attacks = attackNo;
                            AddAttacksPerAction();
                          }
                  }     
            },
        "subclassfeature15": {
            name: "Duke of Flames",
            minlevel: 15,
            description: desc([
                "Flames of Passion: Melee attackers within 5ft take an extra 1d8 fire dmg.",
                "When Flames of Passion ends (ANY reason), I can cause a 15-ft radius explosion and all\n   creatures within "+
                "must make Dex save VS my spell DC. Fail: 6d8 fire dmg, half on success."
            ]),
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.isMeleeWeapon | v.isRangedWeapon | v.isThrownWeapon) {
                            fields.Description += (fields.Description ? '; ' : '') + '+1d10 Fire.';
                        }
                    }
                ]
            },
        }
    },
});

AddSubClass("petal knight", "hydrangea", {
    regExpSearch: /hydrangea/i,
    subname: "Hydrangea",
    source: [["NATPK", 10]],
    features: {
        "subclassfeature2.1": {
            name: "Beckoning Knowledge",
            minlevel: 2,
            description: desc([
                "When learning a Petal Knight spell, I can choose a Warlock spell instead (must match spell\n   slot level). "+
                "This spell counts as a Petal Knight spell for me.",
                "Additionally, I can choose to swap a known spell this way when I choose a new spell."
            ]),
            spellcastingBonus: {
                name: "Beckoning Knowledge",
                "class" : "warlock"
            }
        },
        "subclassfeature2.2": {
            name: "Frenetic Reflection",
            minlevel: 2,
            description: desc([
                "As a Reaction, when a creature within 30ft takes damage from an attack or failed save, I can\n   reflect half to another creature within 30ft. Both take half damage.",
            ]),
            usages: "Proficiency Bonus Per ",
            usagescalc: "event.value = (How('Proficiency Bonus'));",
            recovery: "long rest",
            action: [["reaction", ""]]
        },
        "subclassfeature6": {
            name: "Gracious Karma",
            minlevel: 6,
            description: desc([
                "When a creature restores my HP, I can use my reaction to give them temp HP = ½ HP of the",
                "HP they restored. If they restored >= 10 HP, their next attack, save, or check has advantage."
            ]),
            action: [["reaction", ""]]
        },
        "subclassfeature11": {
            name: "Frozen Epithet",
            minlevel: 11,
            description: desc([
                "Weapon attacks deal +1d8 cold damage and I gain cold resistance.",
                "I ignore negative effects of cold environments and difficult terrain from snow/ice/freeze."
            ]),
            dmgres : ["Cold"],
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.isMeleeWeapon | v.isRangedWeapon | v.isThrownWeapon) {
                            fields.Description += (fields.Description ? '; ' : '') + '+1d8 Cold.';
                        }
                    }
                ]
            },
        },
        "subclassfeature15": {
            name: "Garden of Ice",
            minlevel: 15,
            description: desc([
                "Instead of one weapon attack, I can freeze a grounded creature (Dex save vs Spell DC).",
                "Fail: Restrained, +1d10 + ½ Char level cold dmg each turn, Strength check to break free.",
                "If Creature is killed, I can use my reaction to spread effect in a 30-ft radius, targeting all ",
                "creatures in the radius I choose; 'Fog Cloud' fills the space for 1 hour (I can see)",
            ]),
            action: [["reaction", "Ice Bloom"]]
        }
    },
});

AddSubClass("petal knight", "osmanthus", {
    regExpSearch: /osmanthus/i,
    subname: "Osmanthus",
    source: [["NATPK", 11]],
    features: {
      "subclassfeature2.1": {
            name: "Truthful Proficiency",
            minlevel: 2,
            description: desc([
                "When learning a Petal Knight spell, I can choose a Paladin spell instead (must match slot lvl).",
                "I gain proficiency with all martial weapons (non-heavy) and shields."
            ]),
            skills: [["Insight", "full"]],
            weaponProfs: [false, true, ["shields"]],
            armorProfs : [false, false, false, true],
      },
      "subclassfeature2.2": {
            name: "Oath of Nobility",
            minlevel: 2,
            description: desc([
                "When learning a Petal Knight spell, I can choose a Paladin spell instead (must match slot lvl).",
                "This includes on 2nd level."
            ]),
            spellcastingBonus: {
                name: "Oath of Nobility",
                "class" : "paladin"
            }
        },
        "subclassfeature6": {
            name: "Face to Face",
            minlevel: 6,
            description: desc([
                "Ranged weapon attacks against me have disadvantage unless I’m incapacitated.",
                "When I successfully take the Dodge action, I can make one melee weapon attack in return."
            ]),
            action: [["reaction", "Counterattack (Dodge)"]]
        },
        "subclassfeature11": {
            name: "Truesight",
            minlevel: 11,
            description: desc([
                "As a Bonus Action, I gain truesight (120 ft) for 1 min (½ prof bonus uses, regain on long rest).",
            ]),
            usages: "1/2 Proficiency Bonus per ",
            usagescalc: "event.value = Math.floor(Number(How('Proficiency Bonus'))/2);",
            recovery: "long rest",
            action: [["bonus action", "Truesight (120ft/1min)"]]
        },
        "subclassfeature15": {
            name: "Fortress of One",
            minlevel: 15,
            description: desc([
                "As an action, I gain the following benefits for 1 min:",
                "\u2022 Gain resistance to piercing, slashing, bludgeoning damage.",
                "\u2022 Reduce first damage per round by my Petal Knight level.",
                "\u2022 Make one extra weapon attack with Attack action."
            ]),
            usages: 1,
            recovery: "short rest",
            action: [["action", "Fortress of One"]],
        }
    },
});

AddSubClass("petal knight", "pink rose", {
    regExpSearch: /pink rose/i,
    subname: "Pink Rose",
    source: [["NATPK", 12]],
    features: {
        "subclassfeature2.1": {
            name: "Gentle Treatment",
            minlevel: 2,
            description: desc([
                "Treatment die. I have a pool of d10s (prof bonus + 4).",
                "As a bonus action, I can use up to my Proficiency Bonus in d10 to heal a creature within 30 ft.",
            ]),
            usages: "Treatment Die ",
            usagescalc: "event.value = Number(How('Proficiency Bonus'))+4;",
            recovery: "long rest",
            action: [["bonus action", ""]]
        },
        "subclassfeature2.2": {
            name: "Improved Critical (Melee)",
            minlevel: 2,
            description: desc(["I score a critical hit on melee weapon attack rolls of 19 or 20."]),
            calcChanges : {
					    atkAdd : [
						    function (fields, v) {
							    if (!v.isSpell && !v.CritChance && !v.isDC && classes.known.petalknight && classes.known.petalknight.level >= 2) {
								    fields.Description += (fields.Description ? '; ' : '') + 'Crit on 19-20';
								    v.CritChance = 19;
							    }
						    },
						    "My weapon attacks score a critical on a to hit roll of both 19 and 20.",
						    19
					    ]
				    }
        },
        "subclassfeature6": {
            name: "Stunning Drive",
            minlevel: 6,
            description: desc([
                "When I hit with a one-handed weapon, I can use a Treatment die to force a Con save",
                "(DC = spell save). Fail: Target stunned until end of my next turn. I can use this feature ",
                "without expending a die after I crit."
            ])
        },
        "subclassfeature11": {
            name: "Graceful Reach",
            minlevel: 11,
            description: levels.map(function (n) {
                var descr = desc([
                "My one-handed melee weapons gain +20ft range via ethereal chains (still melee attacks).",
                "I can’t be disarmed; grapple at range pulls targets adjacent."
                ]);
		            if (n >= 15) {
		                descr = desc([
                "My one-handed melee weapons gain +60ft range via ethereal chains (still melee attacks).",
                "I can’t be disarmed; grapple at range pulls targets adjacent."
                ]);
              }
              return descr;
            }),
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.isMeleeWeapon && !v.isHeavyWeapon && !v.isTwoHanded) {
                            fields.Range += (fields.Range ? '; ' : '') + '+20ft';
                        }
                        if (classes.known.petalknight.level >= 15 && !v.isHeavyWeapon && !v.isTwoHanded) {
                            fields.Range += (fields.Range ? '; ' : '') + '+60ft';
                        }
                    }
                ]
            },
        },
        "subclassfeature15.1": {
            name: "Elegant Extension: Bursting Range",
            minlevel: 15,
            description: desc([
                  "When attacking with Graceful Reach, my first attack has advantage.",
                ]),
        },
        "subclassfeature15.2": {
            name: "Elegant Extension: Undying Assault",
            minlevel: 15,
            description: desc([
                "As an action, I can attack all chosen creatures within 20ft using Graceful Reach.",
                "(separate hit rolls, single damage roll)."
            ]),
            usages: "1/2 ProfBon per ",
            usagescalc: "event.value = Math.floor(Number(How('Proficiency Bonus'))/2);",
            recovery: "long rest",
            action: [["action", ""]]
        },
        "subclassfeature15.3": {
            name: "Superior Critical (Melee)",
            minlevel: 15,
            description: desc(["I score a critical hit on melee weapon attack rolls of 18-20."]),
            calcChanges : {
					    atkAdd : [
						    function (fields, v) {
							    if (!v.isSpell && !v.CritChance && !v.isDC && classes.known.petalknight && classes.known.petalknight.level >= 15) {
								    fields.Description += (fields.Description ? '; ' : '') + 'Crit on 18-20';
								    v.CritChance = 18;
							    }
						    },
						    "My weapon attacks score a critical on a to hit roll of 18, 19, or 20.",
						    18
					    ]
				    }
        }

      }
});
