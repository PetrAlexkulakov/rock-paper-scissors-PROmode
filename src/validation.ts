import { Rules } from "./rules";

export class Validation {
    private argv: string[];
    private ourRules: Rules;
  
    constructor(argv: string[], ourRules: Rules){
      this.argv = argv;
      this.ourRules = ourRules;
      this.validateAllArguments()
    }

    private validateAllArguments() {
        const length = this.argv.length
        if(length < 3 || length % 2 !== 1 || new Set(this.argv).size !== length) {
            console.log('Wrong parametrs!')
            process.exit(1);
        }
    }

    validateAChoose(choose: string) {
        if(Number(choose) === 0) {
            process.exit(1);
        } else if (choose === '?'){
            this.ourRules.consoleTableRules()
            return false;
        } else if(!this.ourRules.moveToString(choose)) {
            console.log('Wrong parametrs!')
            process.exit(1);
        }
        return true;
    }
}