export enum CurrencyFlags {
  None = "none",
  StructInvestAvailable = "structInvestAvailable",
  ExchangeAvailable = "exchangeAvailable",
  FiatCurrency = "fiatCurrency",
  AccountAvailable = "accountAvailable"
}

/// Битовые флаги разрешений по доступным активам
export const maskCurrencyFlags = {
  /// Пусто
  none: 0,
  /// Использование в структурных инвест продуктах для фиксирования курсов
  structInvestAvailable: 1,
  /// Использование в операциях обмена на внутренней бирже
  exchangeAvailable: 1 << 1,
  /// Флаг отличия криптовалют от фиатных
  fiatCurrency: 1 << 2,
  /// Возможность держать внутренний баланс в данной валюте, создание внутренних счетов, внутренние переводы (доступность)
  accountAvailable: 1 << 3
};
