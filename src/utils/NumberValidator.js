class NumberValidator {
  static validateInteger(value, errorMessage) {
    // 타입 강제 변환 방지
    if (value === null || value === undefined || value === '') {
      throw new Error(errorMessage);
    }

    const parsed = Number(value);
    if (Number.isNaN(parsed) || !Number.isInteger(parsed)) {
      throw new Error(errorMessage);
    }
    return parsed;
  }

  static validateRange(value, min, max, errorMessage) {
    if (value < min || value > max) {
      throw new Error(errorMessage);
    }
  }
}

export default NumberValidator;
