import { rollDices } from "./index.mjs";
export default class Character {
    constructor(name, occupation, gold, level, skills, weapon) {
        this.name = name;
        this.occupation = occupation;
        this.gold = gold;
        this.level = level;
        this.skills = skills;
        this.weapon = weapon;
    }

    trainForAday(weaponName, day) {

        if(!day.name.includes("Wednesday") && this.occupation.includes("peasant")) return;

        console.log("Day " + day.number + day.name);
        console.log("\n---------------");
        this.showAttributesForTheTraining();

        this.gold -= 50;
        
        let currentWeapon;
        let numOfDice;
        if (weaponName === this.weapon.name) {
            currentWeapon = this.weapon;
        }

        if (this.occupation.includes("peasant")) {
            numOfDice = 2;
        } else {
            numOfDice = 3;
        }

        const skill = this.weaponTypeEqualsSkill(currentWeapon);
        
        let { points, resultDie} = this.insertPointsPerOccupation(1, numOfDice);
        
        let {currentPoints, skillPoints} = this.sumTotalPoints(points, skill);
        
        this.weapon.pointsForNextSkill = Math.floor(currentPoints + skillPoints / 5);

        console.log(this.name + " trains the " + this.weapon.type + " skill by using " + this.weapon.name);
        console.log(" -  current weapon points: " + this.weapon.points);
        console.log(" -  weapon points to increase skill: " + points);
        console.log(this.name + " rolls a D" + numOfDice +  " and obtains a result of " + resultDie);
        console.log("Total points earned: " + points);    
        console.log(this.name + " incrases " + this.weapon.type + " skill to" + skillPoints);
        console.log(" -  current weapon points: " + this.weapon.points);
        console.log(" -  weapon points to increase skill: " + points);


        return day;
    }

    showAttributesForTheTraining() {
        console.log(this.name + ", " + "a " + this.occupation + ", " + "begins the training");
        console.log("Current gold: " + this.gold);
        console.log("Level: " + this.level);
        console.log("Current Skills: ");
        console.log("-  brawl: " + this.skills.brawl);
        console.log("-  melee: " + this.skills.melee);
        console.log("-  missile: " + this.skills.missile);
    }

    insertPointsPerOccupation(die, faces) {
        let points = this.weapon.points;
        let result = rollDices(die, faces)

        if (this.occupation.includes("thug")) {
            points = Math.ceil(this.level / 2) + result - 2;

            if(this.weapon.type.includes("missile")) {
                points + 2;
            }
        } else if(this.occupation.inlcudes("priest")) {
            points = this.level + result - 2;

            if(this.weapon.type.includes("missile")) {
                points + 2;
            } else if (this.weapon.type.includes("brawl")) {
                let probability = -1 /-2 * 100;

                points -= probability;
            } 
        } else if (this.occupation.includes("peasant") && this.weapon.type.includes("brawl")) {
            points = result + Math.ceil(this.level / 2);
        }

        return {points, result };
    }

    weaponTypeEqualsSkill(weapon) {
        if(weapon.type === this.skills.brawl) {
            return this.skills.brawl;
        } else if (weapon.type === this.skills.melee) {
            return this.skills.melee;
        } else if (weapon.type === this.skills.missile) {
            return this.skills.missile;
        }
    }

    sumTotalPoints(points, skill) {
        if (points === skill) {
            skill + 1;
            points = 0;
        } else if (points > skill) {
            skill + 1;
            points -= skill;
        } else if (points > 0) {
            points = 0;
        }

        return { points, skill };
    }
}