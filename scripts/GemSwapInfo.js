class GemSwapInfo {
    //info after gems blow up => next match
    weight = 0;
    gemModifiers = [];

    constructor(index1, index2, sizeMatch, type)
    {
        this.index1 = index1;
        this.index2 = index2;
        this.sizeMatch = sizeMatch;
        this.type = type;
    }

    getIndexSwapGem() {
        return [this.index1, this.index2];
    }
}
