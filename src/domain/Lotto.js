import { LOTTO_CONFIG } from '../constants/lottoConstants.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    this.#validateType(numbers);
    this.#validateLength(numbers);
    this.#validateRange(numbers);
    this.#validateDuplicate(numbers);
  }

  #validateLength(numbers) {
    if (numbers.length !== LOTTO_CONFIG.NUMBER_COUNT) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다!');
    }
  }

  #validateDuplicate(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new Error('[ERROR] 중복된 숫자가 있으면 안됩니다!');
    }
  }

  #validateRange(numbers) {
    if (
      numbers.some(
        (num) => num < LOTTO_CONFIG.MIN_NUMBER || num > LOTTO_CONFIG.MAX_NUMBER,
      )
    ) {
      throw new Error('[ERROR] 로또 번호는 1~45 사이여야 합니다!');
    }
  }

  #validateType(numbers) {
    if (numbers.some((num) => typeof num !== 'number')) {
      throw new Error('[ERROR] 로또 번호를 다시 한 번 확인해주세요!');
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
