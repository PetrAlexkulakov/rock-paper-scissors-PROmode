import { Crypto } from './crypto';

class Game {
  private argv: string[];
  private ourCrypto: Crypto;

  constructor(argv: string[]){
    this.argv = argv;
    this.ourCrypto = new Crypto();
  }

  private returnMove() {
    const random = Math.floor(Math.random() * this.argv.length)
    return this.argv[random]
  }

  start() {
    const randomKey = this.ourCrypto.generateRandomKey();
    const botMove = this.returnMove();
    const HMAS = this.ourCrypto.calculateHMAC(botMove, randomKey, 'sha256');
    console.log('HMAC:');
    console.log(HMAS.toUpperCase());
    console.log('Available moves:');
  }
}

const game = new Game(process.argv.splice(2));
game.start()

// 1) генерация правил
// 2) генерация таблицы
// 3) генерация ключа и hmac (функции генерации ключа и HMAC должны быть в отдельном классе(из текста задания))
// 4) Основной цикл игры — компьютер ходит, пользователь ходит.