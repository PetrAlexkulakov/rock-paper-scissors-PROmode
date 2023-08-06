export class Rules {
    private argv: string[];
    private rules: any; //todo

    constructor(argv: string[]){
      this.argv = argv;
      this.rules = {}
    }

    generateRules() {
      const length = this.argv.length;
      this.argv.forEach((arg1, index1) => {
        this.argv.forEach((arg2, index2) => { 
            this.rules[arg1] ? null : this.rules[arg1] = {}
            const minus = index2 - index1 >= 0 ? index2 - index1 : length + (index2 - index1)
            if (minus == 0) {
                this.rules[arg1][arg2] = "Draw" 
            } else if (minus > length / 2) {
                this.rules[arg1][arg2] = "Lose" 
            } else {
                this.rules[arg1][arg2] = "Win" 
            }
        })
      })
    }
    
    consoleTableRules() {
      console.table(this.rules);
    }

    handlePersonMove(personMove: string, computerMove: string) {
        console.log(`${this.calculateResult(this.moveToString(personMove), computerMove)}!`)
    }

    moveToString(personMove: string) {
      return this.argv[Number(personMove) - 1]
    }

    private calculateResult(personMove: string, computerMove: string){
      return this.rules[personMove][computerMove];
    }
}