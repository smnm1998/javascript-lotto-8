import { RANK } from '../constants/rankConstants.js';

class Rank {
  static from(matchCount, hasBonus) {
    if (matchCount === 6) return RANK.FIRST;
    if (matchCount === 5 && hasBonus) return RANK.SECOND;
    if (matchCount === 5) return RANK.THIRD;
    if (matchCount === 4) return RANK.FOURTH;
    if (matchCount === 3) return RANK.FIFTH;
    return null;
  }
}

export default Rank;
