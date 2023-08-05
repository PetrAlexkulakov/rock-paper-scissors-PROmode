import * as readline from'readline';
import { Crypto } from './hmac.js';
import { Table } from './table.js';
import { Validation } from './validation.js';

class Game {
  private argv: string[];
  private ourCrypto: Crypto;
  private ourTable: Table;
  private ourValidator: Validation;
  private personMove: string | null;
  private computerMove: string | null;

  constructor(argv: string[]){
    this.argv = argv;
    this.ourValidator = new Validation(argv);
    this.ourCrypto = new Crypto();
    this.ourTable = new Table(argv)
    this.personMove = null; 
    this.computerMove = null; 
  }

  private getComputerMove() {
    const random = Math.floor(Math.random() * this.argv.length) //todo change it
    this.computerMove = this.argv[random]
  }

  private getPersonMove() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    return new Promise((resolve) => {
      rl.question('Enter your move: ', (move) => {
        rl.close();
        this.ourValidator.validateAChoose(move);
        this.personMove = move;
        resolve(move);
      });
    });
  }

  private doEndGame(randomKey: string) {
    console.log(`Your move: ${this.personMove}`);
    console.log(`Computer move: ${this.computerMove}`);
    //
    console.log('HMAC key:')
    console.log(randomKey)
  }

  async start() {
    const randomKey = this.ourCrypto.generateRandomKey();
    this.getComputerMove();
    const HMAS = this.ourCrypto.calculateHMAC(this.computerMove as string, randomKey, 'sha256');
    console.log('HMAC:');
    console.log(HMAS.toUpperCase());
    this.ourTable.createTable();
    await this.getPersonMove();
    this.doEndGame(randomKey);
  }
}

const game = new Game(process.argv.splice(2));
game.start()

// 1) генерация правил
// 2) генерация таблицы
// 3) генерация ключа и hmac (функции генерации ключа и HMAC должны быть в отдельном классе(из текста задания))
// 4) Основной цикл игры — компьютер ходит, пользователь ходит.

// При выборе опции "help" в терминале нужно отобразить таблицу, определяющую какой ход выигрывает.
// Генерация таблицы должна быть вынесена в отдельный класс, определение "правил" кто победил должно 
// быть в отдельном классе, функции генерации ключа и HMAC должны быть в отдельном классе (как минимум 4 класса).

// Победа определяется так — половина следующих по кругу выигрывает, половина предыдущих по кругу 
// проигрывает (семантика строк не важна, в какой последовательности что пользователь ввел, в такую игру и играет, 
// даже если по его порядку камень проигрывает ножницам — для вас содержимое строк не важно).


//to do: verif, help, endless