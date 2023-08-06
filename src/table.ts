import { Rules } from "./rules.js";

export class Table {
    private argv: string[];
    private rules: Rules;

    constructor(argv: string[]) {
        this.argv = argv
        this.rules = new Rules(argv);
    }

    createTable(){
        console.log('Available moves:');
        this.argv.forEach((arg, index) => console.log(`${index + 1} - ${arg}`))
        console.log('0 - exit');
        console.log('? - help');
        this.rules.generateRules()
    }
}