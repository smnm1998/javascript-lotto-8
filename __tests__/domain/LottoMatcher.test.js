import Lotto from '../../src/domain/Lotto.js';
import WinningNumber from '../../src/domain/WinningNumber.js';
import LottoMatcher from '../../src/domain/LottoMatcher.js';

describe('LottoMatcher', () => {
  test('일치하는 번호 개수를 계산한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winning = new WinningNumber([1, 2, 3, 7, 8, 9], 10);
    const matcher = new LottoMatcher(lotto, winning);

    expect(matcher.getMatchCount()).toBe(3);
  });

  test('보너스 번호 일치 여부를 확인한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 7]);
    const winning = new WinningNumber([1, 2, 3, 4, 5, 6], 7);
    const matcher = new LottoMatcher(lotto, winning);

    expect(matcher.hasBonus()).toBe(true);
  });

  describe('LottoMatcher - 등급 판별', () => {
    test('6개 일치 - 1등', () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const winning = new WinningNumber([1, 2, 3, 4, 5, 6], 7);
      const matcher = new LottoMatcher(lotto, winning);
      const rank = matcher.getRank();
      expect(rank.name).toBe('1등');
    });

    test('5개 일치 & 보너스 번호 일치 - 2등', () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 7]);
      const winning = new WinningNumber([1, 2, 3, 4, 5, 6], 7);
      const matcher = new LottoMatcher(lotto, winning);
      const rank = matcher.getRank();
      expect(rank.name).toBe('2등');
    });

    test('5개 일치 & 보너스 번호 불일치 - 3등', () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 16]);
      const winning = new WinningNumber([1, 2, 3, 4, 5, 6], 7);
      const matcher = new LottoMatcher(lotto, winning);
      const rank = matcher.getRank();
      expect(rank.name).toBe('3등');
    });

    test('4개 일치 - 4등', () => {
      const lotto = new Lotto([1, 2, 3, 4, 15, 16]);
      const winning = new WinningNumber([1, 2, 3, 4, 5, 6], 7);
      const matcher = new LottoMatcher(lotto, winning);
      const rank = matcher.getRank();
      expect(rank.name).toBe('4등');
    });

    test('3개 일치 - 5등', () => {
      const lotto = new Lotto([1, 2, 3, 14, 15, 16]);
      const winning = new WinningNumber([1, 2, 3, 4, 5, 6], 7);
      const matcher = new LottoMatcher(lotto, winning);
      const rank = matcher.getRank();
      expect(rank.name).toBe('5등');
    });

    test('맞춘 개수가 2개 이하일 경우 낙첨', () => {
      const lotto = new Lotto([1, 2, 13, 14, 15, 16]);
      const winning = new WinningNumber([1, 2, 3, 4, 5, 6], 7);
      const matcher = new LottoMatcher(lotto, winning);
      const rank = matcher.getRank();
      expect(rank).toBe(null);
    });
  });
});
