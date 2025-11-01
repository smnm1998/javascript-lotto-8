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
    return this.#winningNumber.countMatchesWith(this.#lotto);
  }

  #checkBonus() {
    return this.#winningNumber.isBonusMatch(this.#lotto);
  }

  determineRank() {
    return Rank.from(this.#matchCount, this.#hasBonus);
  }
}

export default LottoMatcher;
