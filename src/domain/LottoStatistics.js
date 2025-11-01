import { RANK, LOTTO_RANKS } from '../constants/rankConstants.js';

class LottoStatistics {
  #statistics;
  #totalPrize;

  constructor(results) {
    this.#statistics = this.#buildStatistics(results);
    this.#totalPrize = this.#calculateTotalPrize();
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
    return `총 수익률은 ${returnRate.toFixed(1)}%입니다.`;
  }

  getRankCount(rank) {
    return this.#statistics.get(rank) || 0;
  }

  getTotalPrize() {
    return this.#totalPrize;
  }

  calculateReturnRate(purchaseAmount) {
    if (purchaseAmount === 0) {
      return 0;
    }

    return Math.round((this.#totalPrize / purchaseAmount) * 1000) / 10;
  }

  getStatistics() {
    return new Map(this.#statistics);
  }
}

export default LottoStatistics;
