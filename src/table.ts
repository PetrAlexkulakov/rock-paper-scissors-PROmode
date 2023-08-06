export class Table {
    private argv: string[];

    constructor(argv: string[]) {
        this.argv = argv
    }

    createTable(){
        console.log('Available moves:');
        this.argv.forEach((arg, index) => console.log(`${index + 1} - ${arg}`))
        console.log('0 - exit');
        console.log('? - help');
    }
}