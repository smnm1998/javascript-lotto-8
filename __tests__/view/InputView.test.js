import { Console } from '@woowacourse/mission-utils';
import InputView from '../../src/view/InputView';

describe('InputView', () => {
  let mockReadLineAsync;
  let mockPrint;

  beforeEach(() => {
    mockReadLineAsync = jest.fn();
    mockPrint = jest.fn();
    Console.readLineAsync = mockReadLineAsync;
    Console.print = mockPrint;
  });

  test('구입 금액을 입력받는다.', async () => {
    mockReadLineAsync.mockResolvedValue('8000');

    const inputView = new InputView();
    const amount = await inputView.readPurchaseAmount();

    expect(mockPrint).toHaveBeenCalledWith('구입금액을 입력해 주세요.');
    expect(amount).toBe('8000');
  });

  test('당첨 번호를 입력받는다.', async () => {
    mockReadLineAsync.mockResolvedValue('1,2,3,4,5,6');

    const inputView = new InputView();
    const numbers = await inputView.readWinningNumbers();

    expect(mockPrint).toHaveBeenCalledWith('당첨 번호를 입력해 주세요.');
    expect(numbers).toBe('1,2,3,4,5,6');
  });

  test('보너스 번호를 입력받는다.', async () => {
    mockReadLineAsync.mockResolvedValue('7');

    const inputView = new InputView();
    const numbers = await inputView.readBonusNumber();

    expect(mockPrint).toHaveBeenCalledWith('보너스 번호를 입력해 주세요.');
    expect(numbers).toBe('7');
  });

  test('입력값을 그대로 반환한다. (검증 없음)', async () => {
    mockReadLineAsync.mockResolvedValue('invalid input');

    const inputView = new InputView();
    const result = await inputView.readPurchaseAmount();

    // InputView는 검증하지 않고 그대로 반환
    expect(result).toBe('invalid input');
  });
});
