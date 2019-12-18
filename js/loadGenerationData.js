/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var type,character,action,scenery,style,palette,landscapes = [];

function loadGenerationData() {
    console.log("loading generation data...");

    type = ["portrait", "action portrait", "landscape", "scene", "action scene", "fighting scene"];
    character = ["dwarf", "elf", "cyborg", "robot", "grim reaper", "halfling", "wizard", "cowboy", "warrior", "knight", "monster", "bear", "giraffe", "lion", "eagle", "hawk", "dove", "dinosaur", "wolve", "dragon", "catperson", "cat", "lizardperson", "ent", "gnome", "troll", "baby", "child", "middle aged person", "old person", "barbarian", "barber", "frog", "orc", "centaur", "kobold", "giant", "gnoll", "fairy", "vampire", "werewolve", "mermaid", "dryad", "nymph", "satyr", "dark elve", "hydra", "hunter", "soldier", "ghost", "goul", "goblin", "gargoyle", "drake", "assassin", "warlock", "seer", "nomad", "hermit", "white knight", "dark knight", "angel", "demon", "snow elve", "samurai", "ronin", "fox", "rock star", "pop star", "geisha", "wood elve", "ratman", "cyclops", "imp", "nanobot", "slenderman", "skeleton", "zombie", "shapeshifter", "harpy", "yeti", "succubus","sea monster","blind person","elephant","doctor","explorer","teacher","army","army of undead","army of demons","army of monsters"];
    action = ["riding a bike", "swinging a sword", "flying in the air", "holding a balloon","holding a bow","shooting a bow","holding a gun","shooting a gun","sleeping","sitting by a campfire","sitting on the toilet","reading a book","skipping stones","standing","sitting","doing a handstand","taking medicine","planting a tree","placing a bomb","leveling up","taking a phone call","holding a pickaxe","eating a burger","eating ice cream","eating something","taking a walk","swimming","doing a picknick","watching tv","looking on the phone","playing videogames","holding a knife","running", "drinking","showering","doing riddles","dancing","cooking over a fire","cooking","wearing glasses","wearing shopping bags","drawing","holding a mic and singing","singing","playing guitar","playing saxophone","making snowballs","jumping","mixing chemicals","bathing","working out","practicing"];
    scenery = ["in a sunken city","outside a sunken city","in an enchanted forest", "in a castle in the sky", "outside of a castle in the sky","inside a spaceship","outside of a spaceship","in a modern city","in a science fiction city","in a post apocalyptic city","in a post war landscape","in a candy forest","in a medieval city","in a medieval landscape","in a cave","in hell","at the north pole","in a library","in a magic tower","outside an oriental temple","inside a jungle temple","outside a jungle temple","in a desert","in desert mountains","in asian wilderness","in an industrial city","in a steampunk city","by a waterfall"];
    style = ["cartoon", "a realistic", "manga", "sketch", "doodle", "concept art"];
    palette = ["a black and white", "a grayscale", "a full color", "a dark color", "a vibrant color", "a cold color", "a warm color", "a pastel color"];
    landscapes = ["a sunken city", "an enchanted forest", "a castle in the sky", "a spaceship","a modern city","a planet","a science fiction city","a post apocalyptic city","a post war landscape","a candy forest","a library","a sea in the wild","a sea in the mountains","a volcano","asian wilderness","a space-station","a medieval fortress","a cave entrance","a waterfall",""];
    timeOfDay = ["at sunrise","at day","at sunset","at night"];
}

function generate() {
    console.log("generating suggestion...");

    var characterString, actionString, sceneryString, styleString, paletteString, prefix;

    var possibleSceneTypes = [];

    for (let scene of document.forms["sceneTypeOptions"]) {
        if (scene.checked) {
            possibleSceneTypes.push(scene.value);
        }
    }

    var sceneType;

    if (possibleSceneTypes.length === 0) {
        document.getElementById("idea").innerHTML = "";
        return;
    }
    do {
        sceneType = getRandomValue(type);
    } while (!(possibleSceneTypes.indexOf(sceneType) >= 0));

    switch (sceneType) {
        case "landscape":
            prefix = "A painting of ";
            characterString = "";
            actionString = "";
            sceneryString = getRandomValue(landscapes);
            styleString = " in " + getRandomValue(style) + " style";
            paletteString = " with " + getRandomValue(palette) + " palette";
            break;
        case "portrait":
            prefix = "A portrait of ";
            characterString = addIndefiniteArticle(getRandomValue(character));
            actionString = "";
            sceneryString = "";
            styleString = " in " + getRandomValue(style) + " style";
            paletteString = " with " + getRandomValue(palette) + " palette";
            break;
        case "action portrait":
            prefix = "";
            characterString = addIndefiniteArticle(getRandomValue(character));
            actionString = " " + getRandomValue(action);
            sceneryString = "";
            styleString = " in " + getRandomValue(style) + " style";
            paletteString = " with " + getRandomValue(palette) + " palette";
            break;
        case "scene":
            prefix = "";
            characterString = addIndefiniteArticle(getRandomValue(character));
            actionString = "";
            sceneryString = " " + getRandomValue(scenery);
            styleString = " in " + getRandomValue(style) + " style";
            paletteString = " with " + getRandomValue(palette) + " palette";
            break;
        case "action scene":
            prefix = "";
            characterString = addIndefiniteArticle(getRandomValue(character));
            actionString = " " + getRandomValue(action);
            sceneryString = " " + getRandomValue(scenery);
            styleString = " in " + getRandomValue(style) + " style";
            paletteString = " with " + getRandomValue(palette) + " palette";
            break;
        case "fighting scene":
            prefix = "";
            characterString = addIndefiniteArticle(getRandomValue(character));
            actionString = " fighting " + addIndefiniteArticle(getRandomValue(character));
            sceneryString = " " + getRandomValue(scenery);
            styleString = " in " + getRandomValue(style) + " style";
            paletteString = " with " + getRandomValue(palette) + " palette";
            break;
    }

    if (!(document.getElementById("includeStyle").checked))
        styleString = "";
    if (!(document.getElementById("includePalette").checked))
        paletteString = "";
    if (document.getElementById("addSecondCharacterProperty").checked && characterString != "")
        characterString += " " + getRandomValue(character);
    if (document.getElementById("includeTimeOfDay").checked)
        sceneryString += " " + getRandomValue(timeOfDay);
    
    var fullText = prefix + characterString + actionString + sceneryString + styleString + paletteString;
    document.getElementById("idea").innerHTML = fullText[0].toUpperCase() + fullText.slice(1) + ".";
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomValue(array) {
    let rand = randomInt(0, array.length - 1);
    return array[rand];
}

function addIndefiniteArticle(person) {
    if (["a", "e", "i", "o", "u"].indexOf(person.slice(0, 1)) >= 0)
        return("an " + person);
    else
        return("a " + person);
}