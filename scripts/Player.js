class Player
{
    constructor(playerId, name)
    {
        this.signature = Math.random();
        this.playerId = playerId;
        this.displayName = name;

        this.heroes = [];
        this.heroGemType = new Set();
    }

    getTotalHeroAlive() {
        return this.getHerosAlive().length;
    }

    getHerosAlive() {
        return this.heroes.filter(hero => hero.isAlive());
    }
    

    getCastableHeros() {
        let arr = this.heroes.filter(hero => hero.isAlive() && hero.isFullMana());
        return arr;
    }

    sameOne(other) {
        return this.signature == other.signature;
    }

    isLose() {
        return !this.firstHeroAlive();
    }

    anyHeroFullMana() {
        let fullManaHeroes = this.heroes.filter(hero => hero.isAlive() && hero.isFullMana());

        let monks = fullManaHeroes.filter(hero => hero.isMonk());
        let monk = monks != null && monks.length > 0 ? monks[0] : null;
        let notMonksFullMana = fullManaHeroes.filter(hero => !hero.isMonk());
        let notMonkFullMana = notMonksFullMana != null  && notMonksFullMana.length > 0 ? notMonksFullMana[0] : null;

        if (monk != null && notMonkFullMana != null && !monk.isMonkCasted()) {
            console.log('Monk full mana want to cast (not casted yet)')
            return monk;
        }

        return fullManaHeroes != null && fullManaHeroes != undefined && fullManaHeroes.length > 0 ? fullManaHeroes[0] : null;
    }

    monkNotCast() {
        console.log('Check monkNotCast ' + this.heroes)
        let monks = this.heroes.filter((hero) => {
            console.log('monkNotCast ' + hero.id)
            return hero.isMonk()
        });
        console.log('Check monkNotCast MONKS' + monks.length)
        let monk = monks != null && monks.length > 0 ? monks[0] : null;

        console.log('Check monkNotCast ' + monk)
        if (monk != null && monk != undefined && monk.isAlive()) {
            console.log('Check monkNotCast --- Monk exit ' + monk.isMonkCasted().toString())
            if (!monk.isMonkCasted()) {
                console.log('Monk not cast yet')
                return true;
            }
        }

        return false;
    }

    firstHeroAlive() {
        let aliveHeroes = this.heroes.filter(hero => hero.isAlive());

        return aliveHeroes != null && aliveHeroes != undefined && aliveHeroes.length > 0 ? aliveHeroes[0] : null;
    }

    getRecommendGemType() {
        this.heroGemType = new Set();

        for (let i = 0; i < this.heroes.length; i++){
            let hero = this.heroes[i];

            for (let j = 0; j < hero.gemTypes.length; j++){
                let gt = hero.gemTypes[j];
                this.heroGemType.add(GemType[gt]);
            }
        }        

        return this.heroGemType;
    }

    firstAliveHeroCouldReceiveMana(type) {
        const res = this.heroes.find(hero => hero.isAlive() && hero.couldTakeMana(type));
        return res;
    }

    clone() {
        const cloned = new Player(this.playerId, this.displayName);
        cloned.heroes = this.heroes.map(hero => hero.clone());
        cloned.heroGemType = new Set(Array.from(this.heroGemType));
        cloned.signature = this.signature;
        cloned.metrics = this.metrics;
        return cloned;
    }
}
