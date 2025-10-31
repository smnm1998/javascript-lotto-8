import { Console } from '@woowacourse/mission-utils';

class InputView {
  async readPurchaseAmount() {
    Console.print('구입금액을 입력해 주세요.');
    return Console.readLineAsync('');
  }

  async readWinningNumbers() {
    Console.print('당첨 번호를 입력해 주세요.');
    return Console.readLineAsync('');
  }

  async readBonusNumber() {
    Console.print('보너스 번호를 입력해 주세요.');
    return Console.readLineAsync('');
  }
}

export default InputView;
