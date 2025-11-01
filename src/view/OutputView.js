import { Console } from '@woowacourse/mission-utils';

class OutputView {
  printLottos(lottos) {
    Console.print(`${lottos.length}개를 구매했습니다.`);

    lottos.forEach((lotto) => {
      Console.print(lotto.formatSorted());
    });
  }

  printStatistics(statistics, purchaseAmount) {
    Console.print('');
    Console.print('당첨 통계');
    Console.print('---');

    const messages = statistics.formatStatisticsMessage();
    messages.forEach((message) => Console.print(message));

    Console.print(statistics.formatReturnRateMessage(purchaseAmount));
  }

  printError(message) {
    Console.print(message);
  }
}

export default OutputView;
