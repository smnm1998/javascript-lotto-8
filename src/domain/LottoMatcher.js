import Rank from './Rank.js';

class LottoMatcher {
  #matchCount;
  #hasBonus;

  constructor(lotto, winningNumber) {
    this.#matchCount = winningNumber.countMatchesWith(lotto);
    this.#hasBonus = winningNumber.isBonusMatch(lotto);
  }

  determineRank() {
    return Rank.from(this.#matchCount, this.#hasBonus);
  }
}

export default LottoMatcher;
