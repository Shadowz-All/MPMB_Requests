/*	-INFORMATION-
	Subject:	This script adds the "Way of the Spider" (V5) subclass for the Monk class.
				Compatible with MPMB v14.
	Code by:	ShadowzAll
*/

var iFileName = "Way_of_the_Spider_Monk_v14.js";
RequiredSheetVersion("14");

SourceList["WotSM"] = {
	name: "Way of the Spider - Monk Subclass V5",
	abbreviation: "WotSM",
	group: "Homebrew",
	date: "2024/01/01"
};

AddSubClass("monk", "way of the spider", {
	regExpSearch: /^(?=.*(spider))((?=.*(monk))).*$/i,
	subname: "Way of the Spider",
	source: [["WotSM", 1]],
	features: {
		"subclassfeature3": {
			name: "Web Slinger",
			source: [["WotSM", 1]],
			minlevel: 3,
			description: desc([
				"I can conjure web-like threads from my palms that stick to surfaces. When used in combat,",
				"they fade after 6 seconds; outside of combat they have the properties of hemp rope and",
				"stay until broken. I learn Web Zip and one Spider Discipline of my choice via the",
				"\"Choose Feature\" button). I learn additional Spider Disciplines at the 6th, 11th, and 17th level."
			]),
			extraname: "Spider Discipline",
			extrachoices: [
				"Web Burst", "Web Pull", "Reactive Sling", "Distracting Web",
				"Weaver of Words", "Fight or Flight", "Venom Strike", "Zip Strike",
				"Spider Reflexes", "Web Cocoon", "Force of Will", "Impact Web"
			],
			extratimes: levels.map(function (n) {
				return n < 3 ? 0 : n < 6 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4;
			}),
			choicesNotInMenu: false,
			"web burst": {
				name: "Web Burst",
				source: [["WotSM", 1]],
				description: desc([
					"By expending 2 ki points, I can cast Web without material or verbal components, using Wisdom as my spellcasting ability. Additionally, I can move through my webs unimpeded."
				]),
				spellcastingBonus: [{
					name: "Web Burst (2 ki)",
					spells: ["web"],
					selection: ["web"],
					firstCol: 2
				}],
				spellChanges: {
					"web": {
						components: "S",
						compMaterial: "",
						description: "20-ft cube difficult terrain; crea enter/start turn Dex save or Restrained (Str check as action); move unimpeded",
						changes: "Cast using 2 ki points without verbal or material components; I move through my own webs unimpeded."
					}
				}
			},
			"web pull": {
				name: "Web Pull",
				source: [["WotSM", 1]],
				description: desc([
					"As a bonus action, I shoot a sticky web rope at a creature I can see within 30 ft. It must succeed on a Strength saving throw or be pulled to an unoccupied space within 15 ft of me. If it is Large or smaller, I can move it into the air; otherwise, I can only pull it along the ground."
				]),
				action: [["bonus action", ""]]
			},
			"reactive sling": {
				name: "Reactive Sling",
				source: [["WotSM", 1]],
				description: desc([
					"I can use my Deflect Missiles feature even if I am not the target, provided they are within 30 ft of me, though I cannot make a ranged attack with the weapon deflected."
				])
			},
			"distracting web": {
				name: "Distracting Web",
				source: [["WotSM", 1]],
				description: desc([
					"As an action, I shoot a burst of web at a creature to blind or deafen it. It must make a Dexterity saving throw or be Blinded or Deafened (my choice) until the end of my next turn. If it fails, I can expend 1 ki point to make an unarmed strike as a bonus action."
				]),
				action: [["action", ""]]
			},
			"weaver of words": {
				name: "Weaver of Words",
				source: [["WotSM", 1]],
				description: desc([
					"I can cast Vicious Mockery as a bonus action using Wisdom as my spellcasting ability. Additionally, in combat, if a hostile creature misses me or an ally within range of the spell with an attack, I can cast Vicious Mockery as a reaction targeting that creature."
				]),
				action: [["bonus action", "Vicious Mockery"], ["reaction", "Vicious Mockery (on miss)"]],
				spellcastingBonus: [{
					name: "Weaver of Words",
					spells: ["vicious mockery"],
					selection: ["vicious mockery"]
				}],
				spellChanges: {
					"vicious mockery": {
						time: "1 ba",
						description: "1 crea save or 1d4 Psychic dmg and disadv. on next attack; also usable as Reaction when enemy misses me/ally",
						changes: "Cast as a bonus action (or reaction when an enemy misses me or an ally in range) using Wisdom."
					}
				}
			},
			"fight or flight": {
				name: "Fight or Flight",
				source: [["WotSM", 1]],
				description: desc([
					"As a reaction to being targeted by an attack or the Frightened condition, I can expend 2 ki points to become Invisible for 1 minute (ends early if I attack or cast a spell). Alternatively, I can expend 3 ki points to become immune to the Frightened condition and have my weapon attacks score a critical hit on a 19 or 20 for 1 minute."
				]),
				action: [["reaction", ""]]
			},
			"venom strike": {
				name: "Venom Strike",
				source: [["WotSM", 1]],
				description: desc([
					"As part of Stunning Strike, I can expend 1 ki point to deal 2 additional martial arts dice of poison damage if the creature fails its saving throw. If this damage reduces the target to below a fourth of its maximum hit points, it is Paralyzed until the end of my next turn."
				])
			},
			"zip strike": {
				name: "Zip Strike",
				source: [["WotSM", 1]],
				description: desc([
					"If I target a creature with my Web Zip, I can expend 1 ki point to make an unarmed strike against it as part of the action. If I moved at least 20 ft, the damage of this strike increases by my Monk Level plus my Wisdom modifier."
				])
			},
			"spider reflexes": {
				name: "Spider Reflexes",
				source: [["WotSM", 1]],
				description: desc([
					"When targeted with an attack, I can expend 1 ki point as a reaction to impose disadvantage on that attack. If the attack misses me, I can move 10 ft without provoking opportunity attacks, or make an unarmed strike."
				]),
				action: [["reaction", ""]]
			},
			"web cocoon": {
				name: "Web Cocoon",
				source: [["WotSM", 1]],
				description: desc([
					"As a reaction when I take damage, I can expend 3 ki points to encase myself in web until the end of my next turn. I gain 5 temporary HP per Monk level, which take as much of the triggering damage as possible. While encased, I have vulnerability to fire damage, my speed is reduced to 0, and I am Incapacitated. When the cocoon fades, any remaining temporary HP are lost."
				]),
				action: [["reaction", ""]]
			},
			"force of will": {
				name: "Force of Will",
				source: [["WotSM", 1]],
				description: desc([
					"When damage reduces me to 0 HP, I can make a Constitution saving throw (DC 5 + the damage taken). On a success, I drop to 1 HP instead. I can't use this if reduced to 0 HP by a critical hit. Each use after the first before a short or long rest increases the Ki cost by 1.."
				])
			},
			"impact web": {
				name: "Impact Web",
				source: [["WotSM", 1]],
				description: desc([
					"I gain a new ranged attack option (30 ft range) using Dexterity for attack and damage rolls, dealing bludgeoning damage equal to my Martial Arts die. When I take the Attack action, I can expend 1 ki point to make this special attack twice as a bonus action; once I have Extra Attack, I can use it for any attacks made as part of the Attack action."
				]),
				weaponOptions: [{
					regExpSearch: /^(?=.*impact)(?=.*web).*$/i,
					name: "Impact Web",
					source: [["WotSM", 1]],
					ability: 2,
					type: "Simple",
					damage: [1, 4, "bludgeoning"],
					range: "30 ft",
					description: "Monk weapon; 1 ki: 2 attacks as bonus action after Attack action",
					abilitytodamage: true,
					monkweapon: true
				}],
				weaponsAdd: ["Impact Web"]
			}
		},
		"subclassfeature3.1": {
			name: "Web Zip",
			source: [["WotSM", 1]],
			minlevel: 3,
			description: desc([
				"As an action, I can choose a solid surface within 120 ft of me, shoot a web thread that",
				"attaches there, and move up to my speed in a straight line toward where I attached the web."
			]),
			action: [["action", ""]]
		},
		"subclassfeature6": {
			name: "Wall Crawler",
			source: [["WotSM", 1]],
			minlevel: 6,
			description: desc([
				"I gain a climbing speed equal to my walking speed and can move up, down, and across",
				"vertical surfaces and upside down along ceilings while leaving my hands free."
			]),
			speed: {
				climb: { spd: "walk", enc: "walk" }
			}
		},
		"subclassfeature11": {
			name: "Spider Senses",
			source: [["WotSM", 1]],
			minlevel:11,
			description: desc([
				"I can't be surprised (while conscious), and other creatures don't gain advantage on attack rolls",
				"against me as a result of being hidden. My Wisdom modifier is added to initiative rolls."
			]),
			savetxt: {
				immune: ["surprised (while conscious)"]
			},
			addMod: [{
				type: "skill",
				field: "Init",
				mod: "max(Wis|0)",
				text: "I add my Wisdom modifier to my initiative rolls."
			}]
		},
		"subclassfeature17": {
			name: "Proportional Strength",
			source: [["WotSM", 1]],
			minlevel: 17,
			description: desc([
				"I count as one size larger when determining my carrying capacity and the weight I can push, drag, or lift,",
				"and I can use Dexterity in place of Strength for determining any Strength-based ability check or",
				"carrying/push/drag/lift capacity."
			]),
			carryingCapacity: 2
		}
	}
});