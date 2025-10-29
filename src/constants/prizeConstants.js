export const PRIZE = {
  FIRST: { name: '1등', match: 6, bonus: false, amount: 2_000_000_000 },
  SECOND: { name: '2등', match: 5, bonus: true, amount: 30_000_000 },
  THIRD: { name: '3등', match: 5, bonus: false, amount: 1_500_000 },
  FOURTH: { name: '4등', match: 4, bonus: false, amount: 50_000 },
  FIFTH: { name: '5등', match: 3, bonus: false, amount: 5_000 },
};

export const PRIZE_RANKS = [
  PRIZE_RANKS.FIRST,
  PRIZE_RANKS.SECOND,
  PRIZE_RANKS.THIRD,
  PRIZE_RANKS.FOURTH,
  PRIZE_RANKS.FIFTH,
];
