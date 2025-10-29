import Lotto from '../src/domain/Lotto';

describe('로또 클래스 테스트', () => {
  test('로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow('[ERROR] 로또 번호는 6개여야 합니다!');
  });

  test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow('[ERROR] 중복된 숫자가 있으면 안됩니다!');
  });

  test('로또 번호에 문자열이 포함되면 예외가 발생한다', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 'abc']);
    }).toThrow('[ERROR] 로또 번호를 다시 한 번 확인해주세요!');
  });

  test.each([[0], [-1], [-100]])(
    '로또 번호가 1보다 작으면 예외 발생: %i',
    (invalidNumber) => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, invalidNumber]);
      }).toThrow('[ERROR] 로또 번호는 1~45 사이여야 합니다!');
    },
  );

  test.each([[46], [75], [100]])(
    '로또 번호가 45를 초과하면 예외 발생: %i',
    (invalidNumber) => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, invalidNumber]);
      }).toThrow('[ERROR] 로또 번호는 1~45 사이여야 합니다!');
    },
  );

  test.each([[null], [undefined]])(
    '로또 번호에 null 또는 undefined가 포함되면 예외가 발생한다',
    (invalidNumber) => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, invalidNumber]);
      }).toThrow('[ERROR] 로또 번호를 다시 한 번 확인해주세요!');
    },
  );
});
