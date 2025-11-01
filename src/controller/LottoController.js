import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import LottoMachine from '../domain/LottoMachine.js';
import WinningNumber from '../domain/WinningNumber.js';
import LottoMatcher from '../domain/LottoMatcher.js';
import LottoStatistics from '../domain/LottoStatistics.js';

class LottoController {
  #inputView;
  #outputView;

  constructor() {
    this.#inputView = new InputView();
    this.#outputView = new OutputView();
  }

  async run() {
    const { purchaseAmount, lottos } = await this.#purchaseLottos();
    const winningNumber = await this.#getWinningNumber();
    const results = this.#checkWinning(lottos, winningNumber);
    this.#printResults(results, purchaseAmount);
  }

  async #purchaseLottos() {
    while (true) {
      try {
        const amount = await this.#inputPurchaseAmount();
        const lottos = this.#issueLottos(amount);
        this.#printLottos(lottos);
        return { purchaseAmount: amount, lottos };
      } catch (error) {
        this.#outputView.printError(error.message);
      }
    }
  }

  async #inputPurchaseAmount() {
    const input = await this.#inputView.readPurchaseAmount();
    return this.#parsePurchaseAmount(input);
  }

  #issueLottos(amount) {
    const machine = new LottoMachine();
    return machine.createLottos(amount);
  }

  #printLottos(lottos) {
    this.#outputView.printLottos(lottos);
  }

  #parsePurchaseAmount(input) {
    const amount = Number(input);
    if (Number.isNaN(amount)) {
      throw new Error('[ERROR] 구입 금액은 숫자여야 합니다.');
    }
    return amount;
  }

  async #getWinningNumber() {
    while (true) {
      try {
        const numbersInput = await this.#inputView.readWinningNumbers();
        const bonusInput = await this.#inputView.readBonusNumber();

        const numbers = this.#parseNumbers(numbersInput);
        const bonus = this.#parseBonus(bonusInput);

        return new WinningNumber(numbers, bonus);
      } catch (error) {
        this.#outputView.printError(error.message);
      }
    }
  }

  #validateNumber(value, errorMessage) {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      throw new Error(errorMessage);
    }
    return parsed;
  }

  #parseNumbers(input) {
    return input
      .split(',')
      .map((num) =>
        this.#validateNumber(
          num.trim(),
          '[ERROR] 당첨 번호는 숫자여야 합니다!',
        ),
      );
  }

  #parseBonus(input) {
    return this.#validateNumber(
      input.trim(),
      '[ERROR] 보너스 번호는 숫자여야 합니다!',
    );
  }

  #checkWinning(lottos, winningNumber) {
    return lottos.map((lotto) => {
      const matcher = new LottoMatcher(lotto, winningNumber);
      return matcher.determineRank();
    });
  }

  #printResults(results, purchaseAmount) {
    const statistics = new LottoStatistics(results);
    this.#outputView.printStatistics(statistics, purchaseAmount);
  }
}

export default LottoController;
