import { Console } from '@woowacourse/mission-utils';

class InputView {
  async readPurchaseAmount() {
    return await Console.readLineAsync('구입금액을 입력해 주세요.\n');
  }

  async readWinningNumbers() {
    return await Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n');
  }

  async readBonusNumber() {
    return await Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n');
  }
}

export default InputView;
