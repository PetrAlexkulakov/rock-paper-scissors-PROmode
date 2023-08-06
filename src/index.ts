import * as readline from 'readline';
import * as underscore from 'underscore';
import { Crypto } from './hmac.js';
import { Table } from './table.js';
import { Validation } from './validation.js';
import { Rules } from './rules.js';

class Game {
  private argv: string[];
  private ourCrypto: Crypto;
  private ourTable: Table;
  private ourValidator: Validation;
  private ourRules: Rules;
  private randomKey: string;
  private personMove: string | null;
  private computerMove: string | undefined;

  constructor(argv: string[]){
    this.argv = argv;
    this.ourCrypto = new Crypto();
    this.ourTable = new Table(argv);
    this.ourRules = new Rules(argv);
    this.ourValidator = new Validation(argv, this.ourRules);
    this.ourRules.generateRules();
    this.randomKey = this.ourCrypto.generateRandomKey();
    this.personMove = null;
    this.computerMove = this.getComputerMove(); 
  }

  private getComputerMove() {
    return underscore.sample(this.argv) 
  }

  private async getPersonMove() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    const shouldEnd = await new Promise((resolve) => {
      rl.question('Enter your move: ', (move) => {
        rl.close();
        const shouldEnd = 
          this.ourValidator.validateAChoose(move);
        this.personMove = move;
        resolve(shouldEnd);
      });
    });
    if (shouldEnd) {
      this.doEndGame();
    } else {
      this.doMiddleGame();
    }
  }
  private doMiddleGame() {
    this.ourTable.createTable();
    this.getPersonMove();
  }

  private async doEndGame() {
    console.log(`Your move: ${this.personMove}`);
    console.log(`Computer move: ${this.computerMove}`);
    this.ourRules.handlePersonMove(this.personMove as string, this.computerMove as string);
    console.log('HMAC key:')
    console.log(this.randomKey)
  }

  start() {
    const HMAS = this.ourCrypto.calculateHMAC(this.computerMove as string, this.randomKey, 'sha256');
    console.log('HMAC:');
    console.log(HMAS);
    this.doMiddleGame();
  }
}

const game = new Game(process.argv.splice(2));
game.start()