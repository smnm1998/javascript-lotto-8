import { Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import { LOTTO_CONFIG } from '../constants/lottoConstants.js';

class LottoMachine {
  createLottos(purchaseAmount) {
    this.#validatePurchaseAmount(purchaseAmount);

    const count = purchaseAmount / LOTTO_CONFIG.PRICE;
    const lottos = [];

    for (let i = 0; i < count; i++) {
      lottos.push(this.#createLotto());
    }

    return lottos;
  }

  #validatePurchaseAmount(amount) {
    if (amount < LOTTO_CONFIG.PRICE) {
      throw new Error('[ERROR] 구입 금액은 최소 1000원 부터입니다!');
    }

    if (amount % LOTTO_CONFIG.PRICE !== 0) {
      throw new Error('[ERROR] 구입 금액이 1000원 단위가 아닙니다!');
    }
  }

  #createLotto() {
    const numbers = Random.pickUniqueNumbersInRange(
      LOTTO_CONFIG.MIN_NUMBER,
      LOTTO_CONFIG.MAX_NUMBER,
      LOTTO_CONFIG.NUMBER_COUNT,
    );
    return new Lotto(numbers);
  }
}

export default LottoMachine;
