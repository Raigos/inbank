const VALIDATION_CONFIG = {
  PREFIXES: {
    MOBILE: '55',
  },
  LIMITS: {
    MIN_INCOME: 100,
    MOBILE_LENGTH: {
      MIN: 9,
      MAX: 10,
    },
    LOAN: {
      MIN: 300,
      MAX: 7200,
    },
  },
  MESSAGES: {
    REQUIRED: 'Field is required',
    EMAIL: {
      INVALID: 'E-mail must be valid',
      WRONG_TYPE: 'Invalid email format',
    },
    MOBILE: {
      INVALID: (prefix: string) =>
        `Mobile number must start with ${prefix} and be ${VALIDATION_CONFIG.LIMITS.MOBILE_LENGTH.MIN}-${VALIDATION_CONFIG.LIMITS.MOBILE_LENGTH.MAX} digits`,
      WRONG_TYPE: 'Invalid mobile format',
    },
    INCOME: {
      TOO_LOW: (min: number) => `Monthly income must be greater than ${min}`,
      WRONG_TYPE: 'Invalid income value',
    },
    LOAN: {
      TOO_LOW: (min: number) => `Minimum amount is ${min}€`,
      TOO_HIGH: (max: number) => `Maximum amount is ${max}€`,
      WRONG_TYPE: 'Invalid loan amount',
    },
  },
} as const

type ValidationRule = (value: unknown) => boolean | string

interface ValidationRules {
  required: ValidationRule
  email: ValidationRule
  mobile: ValidationRule
  income: ValidationRule
  loanAmount: ValidationRule[]
}

export const useFormRules = (): { rules: ValidationRules } => {
  const rules: ValidationRules = {
    required: (value: unknown): boolean | string => {
      if (typeof value === 'string') {
        return value.trim().length > 0 || VALIDATION_CONFIG.MESSAGES.REQUIRED
      }
      return !!value || VALIDATION_CONFIG.MESSAGES.REQUIRED
    },

    email: (value: unknown): boolean | string => {
      if (typeof value !== 'string')
        return VALIDATION_CONFIG.MESSAGES.EMAIL.WRONG_TYPE
      return /.+@.+\..+/.test(value) || VALIDATION_CONFIG.MESSAGES.EMAIL.INVALID
    },

    mobile: (value: unknown): boolean | string => {
      if (typeof value !== 'string')
        return VALIDATION_CONFIG.MESSAGES.MOBILE.WRONG_TYPE
      const { MOBILE } = VALIDATION_CONFIG.PREFIXES
      return (
        /^55\d{7,8}$/.test(value) ||
        VALIDATION_CONFIG.MESSAGES.MOBILE.INVALID(MOBILE)
      )
    },

    income: (value: unknown): boolean | string => {
      const numValue = typeof value === 'string' ? Number(value) : value
      if (typeof numValue !== 'number' || isNaN(numValue)) {
        return VALIDATION_CONFIG.MESSAGES.INCOME.WRONG_TYPE
      }
      const { MIN_INCOME } = VALIDATION_CONFIG.LIMITS
      return (
        numValue >= MIN_INCOME ||
        VALIDATION_CONFIG.MESSAGES.INCOME.TOO_LOW(MIN_INCOME)
      )
    },
    loanAmount: [
      (value: unknown): boolean | string => {
        if (typeof value !== 'string')
          return VALIDATION_CONFIG.MESSAGES.LOAN.WRONG_TYPE
        const numValue = Number(value.replace(/[^0-9]/g, ''))
        return (
          numValue >= VALIDATION_CONFIG.LIMITS.LOAN.MIN ||
          VALIDATION_CONFIG.MESSAGES.LOAN.TOO_LOW(
            VALIDATION_CONFIG.LIMITS.LOAN.MIN,
          )
        )
      },
      (value: unknown): boolean | string => {
        if (typeof value !== 'string')
          return VALIDATION_CONFIG.MESSAGES.LOAN.WRONG_TYPE
        const numValue = Number(value.replace(/[^0-9]/g, ''))
        return (
          numValue <= VALIDATION_CONFIG.LIMITS.LOAN.MAX ||
          VALIDATION_CONFIG.MESSAGES.LOAN.TOO_HIGH(
            VALIDATION_CONFIG.LIMITS.LOAN.MAX,
          )
        )
      },
    ],
  }

  return { rules }
}
