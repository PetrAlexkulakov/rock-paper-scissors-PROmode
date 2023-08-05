export class Validation {
    private argv: string[];
  
    constructor(argv: string[]){
      this.argv = argv;
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
        if(!this.argv[Number(choose)]) {
            console.log('Wrong parametrs!')
            process.exit(1);
        }
    }
}