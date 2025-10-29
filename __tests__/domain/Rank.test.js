import Rank from '../../src/domain/Rank.js';

describe('Rank - 등급 판별 테스트', () => {
  describe('등급 판별', () => {
    test('6개가 일치하면 1등이다.', () => {
      const rank = Rank.from(6, false);

      expect(rank.name).toBe('1등');
      expect(rank.amount).toBe(2_000_000_000);
    });

    test('5개가 일치하고 보너스가 일치하면 2등이다.', () => {
      const rank = Rank.from(5, true);

      expect(rank.name).toBe('2등');
      expect(rank.amount).toBe(30_000_000);
    });

    test('5개 일치하고 보너스가 불일치하면 3등이다.', () => {
      const rank = Rank.from(5, false);

      expect(rank.name).toBe('3등');
      expect(rank.amount).toBe(1_500_000);
    });

    test('4개 일치하면 4등이다.', () => {
      const rank = Rank.from(4, false);

      expect(rank.name).toBe('4등');
      expect(rank.amount).toBe(50_000);
    });

    test('3개가 일치하면 5등이다.', () => {
      const rank = Rank.from(3, false);

      expect(rank.name).toBe('5등');
      expect(rank.amount).toBe(5_000);
    });

    test('일치하는 수가 2개 이하면 낙첨이다.', () => {
      const rank = Rank.from(2, false);

      expect(rank).toBeNull();
    });
  });
});
