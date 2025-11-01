import LottoMachine from '../../src/domain/LottoMachine.js';

describe('LottoMachine', () => {
  test('구매 금액에 맞는 로또 개수를 생성한다.', () => {
    const machine = new LottoMachine();
    const lottos = machine.createLottos(5000);

    expect(lottos.length).toBe(5);
  });

  test('생성된 로또는 6개 번호를 가진다.', () => {
    const machine = new LottoMachine();
    const lottos = machine.createLottos(1000);

    lottos.forEach((lotto) => {
      const formatted = lotto.formatSorted();
      const numbers = formatted.match(/\d+/g); // 숫자 추출
      expect(numbers).toHaveLength(6);
    });
  });

  describe('LottoMachine - 예외 케이스', () => {
    test('0원 미만이면 예외가 발생한다.', () => {
      const machine = new LottoMachine();

      expect(() => {
        machine.createLottos(-1000);
      }).toThrow('[ERROR] 구입 금액은 최소 1000원 부터입니다!');
    });

    test('1000원 단위가 아니면 예외가 발생한다.', () => {
      const machine = new LottoMachine();

      expect(() => {
        machine.createLottos(1500);
      }).toThrow('[ERROR] 구입 금액이 1000원 단위가 아닙니다!');
    });
  });
});
