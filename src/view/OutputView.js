import { Console } from '@woowacourse/mission-utils';
import { LOTTO_RANKS } from '../constants/rankConstants.js';

class OutputView {
  printLottos(lottos) {
    Console.print(`${lottos.length}개를 구매했습니다.`);

    lottos.forEach((lotto) => {
      const numbers = lotto.getSortedNumbers();
      Console.print(`[${numbers.join(', ')}]`);
    });
  }

  printStatistics(statistics, purchaseAmount) {
    Console.print('');
    Console.print('당첨 통계');
    Console.print('---');

    // 5등부터 1등까지 순회
    LOTTO_RANKS.forEach((rank) => {
      const count = statistics.getRankCount(rank);
      const message = this.#formatRankMessage(rank, count);
      Console.print(message);
    });

    const returnRate = statistics.calculateReturnRate(purchaseAmount);
    Console.print(`총 수익률은 ${returnRate.toFixed(1)}%입니다.`); // toFixed() - 소수점 첫째자리까지 항상 표시
  }

  #formatRankMessage(rank, count) {
    let matchInfo = `${rank.match}개 일치`;

    if (rank.bonus) {
      matchInfo = `${rank.match}개 일치, 보너스 볼 일치`;
    }

    const amount = rank.amount.toLocaleString();
    return `${matchInfo} (${amount}원) - ${count}개`;
  }

  printError(message) {
    Console.print(message);
  }
}

export default OutputView;
