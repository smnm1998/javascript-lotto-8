import { Console } from '@woowacourse/mission-utils';
import OutputView from '../../src/view/OutputView.js';
import Lotto from '../../src/domain/Lotto.js';
import LottoStatistics from '../../src/domain/LottoStatistics.js';
import { RANK } from '../../src/constants/rankConstants.js';

describe('OutputView', () => {
  let mockPrint;

  beforeEach(() => {
    mockPrint = jest.fn();
    Console.print = mockPrint;
  });

  test('로또 발행 결과를 출력한다.', () => {
    const lottos = [
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([7, 8, 9, 10, 11, 12]),
    ];

    const outputView = new OutputView();
    outputView.printLottos(lottos);

    expect(mockPrint).toHaveBeenCalledWith('2개를 구매했습니다.');
    expect(mockPrint).toHaveBeenCalledWith('[1, 2, 3, 4, 5, 6]');
    expect(mockPrint).toHaveBeenCalledWith('[7, 8, 9, 10, 11, 12]');
  });

  test('당첨 통계를 출력한다.', () => {
    const results = [RANK.FIFTH, RANK.FOURTH, null];
    const statistics = new LottoStatistics(results);

    const outputView = new OutputView();
    outputView.printStatistics(statistics, 3000);

    expect(mockPrint).toHaveBeenCalledWith('당첨 통계');
    expect(mockPrint).toHaveBeenCalledWith('---');
    expect(mockPrint).toHaveBeenCalledWith('3개 일치 (5,000원) - 1개');
    expect(mockPrint).toHaveBeenCalledWith('4개 일치 (50,000원) - 1개');
    expect(mockPrint).toHaveBeenCalledWith('5개 일치 (1,500,000원) - 0개');
    expect(mockPrint).toHaveBeenCalledWith(
      '5개 일치, 보너스 볼 일치 (30,000,000원) - 0개',
    );
    expect(mockPrint).toHaveBeenCalledWith('6개 일치 (2,000,000,000원) - 0개');
  });

  test('수익률을 출력한다.', () => {
    const results = [RANK.FIFTH, RANK.FIFTH];
    const statistics = new LottoStatistics(results);

    const outputView = new OutputView();
    outputView.printStatistics(statistics, 2000);

    // 10,000원 / 2,000원 = 500.0%
    expect(mockPrint).toHaveBeenCalledWith('총 수익률은 500.0%입니다.');
  });

  test('에러 메시지를 출력한다.', () => {
    const outputView = new OutputView();
    outputView.printError('[ERROR] 잘못된 입력입니다.');

    expect(mockPrint).toHaveBeenCalledWith('[ERROR] 잘못된 입력입니다.');
  });

  test('로또 번호는 오름차순으로 출력한다.', () => {
    const lottos = [new Lotto([6, 3, 1, 5, 2, 4])];

    const outputView = new OutputView();
    outputView.printLottos(lottos);

    expect(mockPrint).toHaveBeenCalledWith('[1, 2, 3, 4, 5, 6]');
  });
});
