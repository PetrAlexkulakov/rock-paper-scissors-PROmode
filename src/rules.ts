export class Rules {
    private argv: string[];
    private rules: any; //todo

    constructor(argv: string[]){
      this.argv = argv;
      this.rules = {}
    }

    generateRules() {
      this.argv.forEach((arg1, index1) => {
        this.argv.forEach((arg2, index2) => { 
            this.rules[arg1] ? null : this.rules[arg1] = {}
            const minus = index2 - index1 > 0 ? null : this.argv.length - 1 - (index2 - index1)
            if (index2 - index1 > 0) {
                this.rules[arg1][arg2] = "Win" 
            } else if (index2 - index1 < 0) {
                this.rules[arg1][arg2] = "Lose" 
            } else {
                this.rules[arg1][arg2] = "Draw" 
            }
        })
      })
      //console.log(this.rules)
    }
}