import * as readline from'readline';
import { Crypto } from './hmac.js';
import { Table } from './table.js';

class Game {
  private argv: string[];
  private ourCrypto: Crypto;
  private ourTable: Table;
  private personMove: string | null;

  constructor(argv: string[]){
    this.argv = argv;
    this.ourCrypto = new Crypto();
    this.ourTable = new Table(argv)
    this.personMove = null; 
  }

  private getComputerMove() {
    const random = Math.floor(Math.random() * this.argv.length) //todo change it
    return this.argv[random]
  }

  private getPersonMove() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter your move: ', (move) => {
      this.personMove = move;
      rl.close();
    });
  }

  start() {
    const randomKey = this.ourCrypto.generateRandomKey();
    const botMove = this.getComputerMove();
    const HMAS = this.ourCrypto.calculateHMAC(botMove, randomKey, 'sha256');
    console.log('HMAC:');
    console.log(HMAS.toUpperCase());
    this.ourTable.createTable();
    this.getPersonMove();
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

//to do: verif, help, endless