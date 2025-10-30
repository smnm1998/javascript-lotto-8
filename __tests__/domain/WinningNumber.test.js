import WinningNumber from '../../src/domain/WinningNumber.js';

describe('WinningNumber', () => {
  test('보너스 번호가 당첨 번호와 중복되면 예외가 발생한다.', () => {
    expect(() => {
      new WinningNumber([1, 2, 3, 4, 5, 6], 6);
    }).toThrow('[ERROR] 당첨 번호와 보너스 번호는 중복되면 안됩니다!');
  });

  test('보너스 번호 1~45 범위를 벗어나면 예외가 발생한다.', () => {
    expect(() => {
      new WinningNumber([1, 2, 3, 4, 5, 6], 46);
    }).toThrow('[ERROR] 보너스 번호는 1 이상 45 이하의 수만 가능합니다!');
  });

  test.each([[12.5], ['abc'], [null], [undefined]])(
    '보너스 번호가 정수가 아니면 예외가 발생한다: %s',
    (bonusNumber) => {
      expect(() => {
        new WinningNumber([1, 2, 3, 4, 5, 6], bonusNumber);
      }).toThrow('[ERROR] 보너스 번호는 숫자여야 합니다!');
    },
  );

  test('보너스 번호를 조회할 수 있다.', () => {
    expect(() => {
      const winning = new WinningNumber([1, 2, 3, 4, 5, 6], 7);
      expect(winning.getBonusNumber()).toBe(7);
    });
  });

  test('당첨 번호를 조회할 수 있다.', () => {
    const winning = new WinningNumber([1, 2, 3, 4, 5, 6], 7);
    expect(winning.getWinningNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
