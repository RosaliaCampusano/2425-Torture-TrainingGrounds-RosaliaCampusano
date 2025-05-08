import CharacterData from "./data/CharacterData.js";
import Character from "./Character.mjs";
import Weapon from "./Weapon.mjs";
import Day from "./Day.mjs";

const characters = [];
const day = new Day(3,"Tuesday");



createCharacters();

function createCharacters() {
    for (let i = 0; i < CharacterData.length; i++) {
        const character = CharacterData[i];
        let weapons = createAndInsertWeapon(character["weapons"]);
        characters.push(new Character(
            character["name"], 
            character["occupation"],
            character["gold"],
            character["level"],
            character["skills"],
            weapons
        ));
    }
}

function createAndInsertWeapon(weapon) {
    let weapons = [];
    for (let i = 0; i < weapon.length; i++) {
        const newWeapon = weapon[i];
        weapons.push(new Weapon(newWeapon["name"], newWeapon["type"], newWeapon["points_for_next_skill"], 0));   
    }
    return weapons;
}

export function rollDices(die, faces) {
    const rollDices = Math.floor(Math.random() * faces) + die;
    return rollDices;
}