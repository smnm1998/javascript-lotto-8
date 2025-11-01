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
    this.#validateDuplicate(numbers);
    this.#validateRange(numbers);
  }

  #validateType(numbers) {
    if (numbers.some((num) => !Number.isInteger(num))) {
      throw new Error('[ERROR] 로또 번호는 숫자로만 입력 가능합니다!');
    }
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

  countMatchesWith(otherLotto) {
    let count = 0;
    for (const number of this.#numbers) {
      if (otherLotto.hasNumber(number)) {
        count++;
      }
    }
    return count;
  }

  hasNumber(number) {
    return this.#numbers.includes(number);
  }

  formatSorted() {
    const sorted = [...this.#numbers].sort((a, b) => a - b);
    return `[${sorted.join(', ')}]`;
  }
}

export default Lotto;
