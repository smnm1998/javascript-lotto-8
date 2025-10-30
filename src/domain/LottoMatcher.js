import Rank from './Rank.js';

class LottoMatcher {
  #lotto;
  #winningNumber;
  #matchCount;
  #hasBonus;

  constructor(lotto, winningNumber) {
    this.#lotto = lotto;
    this.#winningNumber = winningNumber;
    this.#matchCount = this.#calculateMatch();
    this.#hasBonus = this.#checkBonus();
  }

  #calculateMatch() {
    const lottoNumbers = this.#lotto.getNumbers();
    const winningNumbers = this.#winningNumber.getWinningNumbers();

    let count = 0;
    for (const number of lottoNumbers) {
      if (winningNumbers.includes(number)) {
        count++;
      }
    }

    return count;
  }

  #checkBonus() {
    const lottoNumbers = this.#lotto.getNumbers();
    const bonusNumber = this.#winningNumber.getBonusNumber();

    return lottoNumbers.includes(bonusNumber);
  }

  // 일치 개수 조회
  getMatchCount() {
    return this.#matchCount;
  }

  // 보너스 일치 여부
  hasBonus() {
    return this.#hasBonus;
  }

  // 등급 판별
  getRank() {
    return Rank.from(this.#matchCount, this.#hasBonus);
  }
}

export default LottoMatcher;
