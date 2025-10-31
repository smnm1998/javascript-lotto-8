import LottoStatistics from '../../src/domain/LottoStatistics.js';
import { RANK } from '../../src/constants/rankConstants.js';

describe('LottoStatistics', () => {
  test('등급별 당첨 개수를 집계한다.', () => {
    const results = [RANK.FIFTH, RANK.FIFTH, RANK.FOURTH, null];
    const stats = new LottoStatistics(results);

    expect(stats.getRankCount(RANK.FIFTH)).toBe(2);
    expect(stats.getRankCount(RANK.FOURTH)).toBe(1);
    expect(stats.getRankCount(RANK.THIRD)).toBe(0);
  });

  test('총 상금을 계산한다.', () => {
    // 5등 2개 (10,000원) + 4등 1개 (50,000원) = 60,000원
    const results = [RANK.FIFTH, RANK.FIFTH, RANK.FOURTH, null];
    const stats = new LottoStatistics(results);

    expect(stats.getTotalPrize()).toBe(60_000);
  });

  test('수익률을 계산한다.', () => {
    // 8,000원 투자, 60,000원 수익 = 750.0%
    const results = [RANK.FIFTH, RANK.FIFTH, RANK.FOURTH, null];
    const stats = new LottoStatistics(results);

    expect(stats.calculateReturnRate(8_000)).toBe(750.0);
  });

  test('당첨이 없으면 수익률은 0%이다.', () => {
    const results = [null, null, null];
    const stats = new LottoStatistics(results);

    expect(stats.getTotalPrize()).toBe(0);
    expect(stats.calculateReturnRate(3_000)).toBe(0);
  });

  test('모든 등급의 통계를 조회한다.', () => {
    const results = [
      RANK.FIRST,
      RANK.SECOND,
      RANK.THIRD,
      RANK.FOURTH,
      RANK.FIFTH,
      RANK.FIFTH,
      null,
    ];
    const stats = new LottoStatistics(results);
    const statistics = stats.getStatistics();

    expect(statistics.get(RANK.FIRST)).toBe(1);
    expect(statistics.get(RANK.SECOND)).toBe(1);
    expect(statistics.get(RANK.THIRD)).toBe(1);
    expect(statistics.get(RANK.FOURTH)).toBe(1);
    expect(statistics.get(RANK.FIFTH)).toBe(2);
  });

  test('수익률은 소수점 첫째 자리까지 반올림한다.', () => {
    // 1,000원 투자, 5,000원 수익 = 500.0%
    const results = [RANK.FIFTH];
    const stats = new LottoStatistics(results);

    expect(stats.calculateReturnRate(1_000)).toBe(500.0);
  });

  test('빈 결과 배열로 통계를 생성할 수 있다.', () => {
    const results = [];
    const stats = new LottoStatistics(results);

    expect(stats.getTotalPrize()).toBe(0);
    expect(stats.getRankCount(RANK.FIFTH)).toBe(0);
  });
});
