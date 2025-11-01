import { LOTTO_CONFIG } from '../constants/lottoConstants';

class PurchaseAmount {
  #value;

  constructor(input) {
    const amount = this.#parseAmount(input);
    this.#validate(amount);
    this.#value = amount;
  }

  #parseAmount(input) {
    const amount = Number(input);
    if (Number.isNaN(amount)) {
      throw new Error('[ERROR] 구입 금액은 숫자여야 합니다!');
    }
    return amount;
  }

  #validate(amount) {
    if (amount < LOTTO_CONFIG.PRICE) {
      throw new Error('[ERROR] 구입 금액은 최소 1000원 부터입니다!');
    }

    if (amount % LOTTO_CONFIG.PRICE !== 0) {
      throw new Error('[ERROR] 구입 금액이 1000원 단위가 아닙니다!');
    }
  }

  getValue() {
    return this.#value;
  }

  getLottoCount() {
    return this.#value / LOTTO_CONFIG.PRICE;
  }
}

export default PurchaseAmount;
