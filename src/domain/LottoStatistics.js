import { LOTTO_RANKS } from '../constants/rankConstants.js';
import { STATISTICS_CONFIG } from '../constants/lottoConstants.js';

class LottoStatistics {
  #statistics;
  #totalPrize;

  constructor(results) {
    this.#statistics = this.#buildStatistics(results);
    this.#totalPrize = this.#calculateTotalPrize();
  }

  formatStatisticsMessage() {
    const messages = [];
    LOTTO_RANKS.forEach((rank) => {
      const count = this.getRankCount(rank);
      let matchInfo = `${rank.match}개 일치`;

      if (rank.bonus) {
        matchInfo = `${rank.match}개 일치, 보너스 볼 일치`;
      }

      const amount = rank.amount.toLocaleString();
      messages.push(`${matchInfo} (${amount}원) - ${count}개`);
    });
    return messages;
  }

  formatReturnRateMessage(purchaseAmount) {
    const returnRate = this.calculateReturnRate(purchaseAmount);
    return `총 수익률은 ${returnRate.toFixed(STATISTICS_CONFIG.DECIMAL_PLACES)}%입니다.`;
  }

  calculateReturnRate(purchaseAmount) {
    if (purchaseAmount === 0) {
      return 0;
    }

    const { RETURN_RATE_MULTIPLIER, RETURN_RATE_DIVISOR } = STATISTICS_CONFIG;
    return (
      Math.round((this.#totalPrize / purchaseAmount) * RETURN_RATE_MULTIPLIER) /
      RETURN_RATE_DIVISOR
    );
  }

  getRankCount(rank) {
    return this.#statistics.get(rank) || 0;
  }

  getTotalPrize() {
    return this.#totalPrize;
  }

  getStatistics() {
    return new Map(this.#statistics);
  }

  #buildStatistics(results) {
    const statistics = new Map();

    // 모든 등급을 0으로 초기화
    LOTTO_RANKS.forEach((rank) => {
      statistics.set(rank, 0);
    });

    // 결과를 순회하며 카운트를 증가
    results.forEach((rank) => {
      if (rank !== null) {
        statistics.set(rank, statistics.get(rank) + 1);
      }
    });

    return statistics;
  }

  // 당첨 금액 총합
  #calculateTotalPrize() {
    let total = 0;

    this.#statistics.forEach((count, rank) => {
      total += rank.amount * count;
    });

    return total;
  }
}

export default LottoStatistics;
