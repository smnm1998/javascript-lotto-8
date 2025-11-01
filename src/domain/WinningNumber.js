import { LOTTO_CONFIG } from '../constants/lottoConstants.js';
import Lotto from './Lotto.js';

class WinningNumber {
  #winningLotto;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    this.#winningLotto = new Lotto(numbers);
    this.#validateBonusType(bonusNumber);
    this.#validateBonusRange(bonusNumber);
    this.#validateBonusDuplicate(numbers, bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #validateBonusType(bonusNumber) {
    if (!Number.isInteger(bonusNumber)) {
      throw new Error('[ERROR] 보너스 번호는 숫자여야 합니다!');
    }
  }

  #validateBonusRange(bonusNumber) {
    if (
      bonusNumber < LOTTO_CONFIG.MIN_NUMBER ||
      bonusNumber > LOTTO_CONFIG.MAX_NUMBER
    ) {
      throw new Error(
        '[ERROR] 보너스 번호는 1 이상 45 이하의 수만 가능합니다!',
      );
    }
  }

  #validateBonusDuplicate(numbers, bonusNumber) {
    if (numbers.includes(bonusNumber)) {
      throw new Error('[ERROR] 당첨 번호와 보너스 번호는 중복되면 안됩니다!');
    }
  }

  countMatchesWith(lotto) {
    return this.#winningLotto.countMatchesWith(lotto);
  }

  isBonusMatch(lotto) {
    return lotto.hasNumber(this.#bonusNumber);
  }
}

export default WinningNumber;
