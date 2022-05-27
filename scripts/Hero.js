const HeroIdEnum = {
    THUNDER_GOD : 0, // Zues deal aoe = attack + light gems
    MONK : 1, // Orthur +5 damge to all 
    AIR_SPIRIT : 2, // Nefia deal damge and remove selected gem type 
    SEA_GOD : 3, // Magni + attack and health to 1
    MERMAID : 4, // Poko
    SEA_SPIRIT : 'SEA_SPIRIT', // Terra 
    FIRE_SPIRIT : 6, // Sigmund  deal damge base on enemy attack + red gems
    CERBERUS : 7, //Cerberus deal dame = attack + increase self attack
    DISPATER : 8, //Fate
    ELIZAH : 9, // ELIZAH
    TALOS : 10,
    MONKEY:11,
    GUTS:12,
    
    SKELETON : 100, // Skeleton
    SPIDER:101,
    WOLF:102,
    BAT:103,
    BERSERKER:104,
    SNAKE:105,
    GIANT_SNAKE:106
};

const HeroManaType = { //getSFSArray("gemTypes")
    0: [5,2],
    1 : [1,2],
    3 : [5,6],
};

const HeroManaMax = { //getInt("maxMana")
    0: 8,
    1: 7,
    2: 9,
    3: 9,
    4: 9,
    'SEA_SPIRIT' : 6,
    6: 6,
    7: 6,
    8: 6,
    9: 9,
    100: 9
};
  

class Hero {
    constructor(objHero) {
        this.objHero = objHero;
        this.playerId = objHero.getInt("playerId");
        this.id = objHero.getUtfString("id");
        //this.name = id.name();
        this.attack = objHero.getInt("attack");
        this.hp = objHero.getInt("hp");
        this.mana = objHero.getInt("mana");
        this.maxMana = objHero.getInt("maxMana");

        this.gemTypes = [];
        this.gems = [];
        let arrGemTypes = objHero.getSFSArray("gemTypes");
        for (let i = 0; i < arrGemTypes.size(); i++) {
            const gemName = arrGemTypes.getUtfString(i);
            this.gemTypes.push(gemName);
            this.gems.push(GemType[gemName]);
        }
    }

    isMonk() {
        return this.id == 'MONK';
    }

    isMonkCasted() {
        return this.isMonk() && this.attack > 7;
    }

    updateHero(objHero) {
        this.attack = objHero.getInt("attack");
        this.hp = objHero.getInt("hp");
        this.mana = objHero.getInt("mana");
        this.maxMana = objHero.getInt("maxMana");
    }

    isAlive() {
        return this.hp > 0;
    }

    isFullMana() {
        return this.mana >= this.maxMana;
    }

    isHeroSelfSkill() {
        return HeroIdEnum.SEA_SPIRIT == this.id;
    }

    couldTakeMana(type) {
        return this.isAcceptManaType(type) && !this.isFullMana();
    }

    isAcceptManaType(type) {
        return this.gems.includes(type);
    }

    getMaxManaCouldTake() {
        return this.maxMana - this.mana;
    }

    takeDamge(damge) {
        this.hp = this.hp - damge;
    }

    takeMana(value) {
        this.mana += value;
    }

    buffAttack(additionalAttack) {
        this.attack += additionalAttack;
    }

    buffMana(additiionalMana) {
        this.mana += additiionalMana;
        this.mana = Math.max(this.mana, this.maxMana);
    }

    buffHp(additionalHp) {
        this.hp += additionalHp;
    }

    clone() {
        const cloned = new Hero(this.objHero);
        cloned.playerId = this.playerId;
        cloned.id = this.id;
        cloned.attack = this.attack;
        cloned.hp = this.hp;
        cloned.mana = this.mana;
        cloned.maxMana = this.maxMana;
        cloned.gemTypes = this.gemTypes;
        cloned.gems = this.gems;
        cloned.metrics = this.metrics;
        return cloned;
    }
}
