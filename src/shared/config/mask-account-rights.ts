export enum AccountRights {
  None = "none",
  WithdrawBlock = "withdrawBlock",
  TopUpBlock = "topUpBlock",
  ExchangeBlock = "exchangeBlock",
  InnerTransferBlock = "innerTransferBlock",
  InvestBlock = "investBlock",
  LogInBlock = "logInBlock",
  AllTokensNetworks = "allTokensNetworks",
  IsJuridical = "isJuridical",
  GkeBonusBlock = "gkeBonusBlock",
  BlockAll = "blockAll",
  JuridicalBlock = "juridicalBlock",
  Deleted = "deleted"
}

/// Флаги разрешений/типов по клиенту
export const maskAccountRights = {
  none: 0,
  /// Вывод запрещен
  withdrawBlock: 1,
  /// Пополнение запрещено
  topUpBlock: 1 << 1,
  /// Обмен запрещен
  exchangeBlock: 1 << 2,
  /// Внутрение переводы запрещены
  innerTransferBlock: 1 << 3,
  /// Инвестиции запрещены
  investBlock: 1 << 4,
  /// Вход в систему запрещен
  logInBlock: 1 << 5,
  /// Разрешает использовать все варианты сетей вывода и ввода в обход настроек в валютах
  allTokensNetworks: 1 << 6,
  /// Признак юридического лица
  isJuridical: 1 << 7,
  /// Бонусы по инвест-токену запрещены
  gkeBonusBlock: 1 << 8,

  /// Запрещает использовать все варианты сетей вывода и ввода
  /// withdrawBlock | topUpBlock | exchangeBlock | innerTransferBlock | investBlock | logInBlock | gkeBonusBlock
  blockAll: 319,

  /// Блокировки для юридических лиц
  /// investBlock | gkeBonusBlock
  juridicalBlock: 272,

  /// Удаленная учетная запись, архив
  deleted: 1 << 31
};
