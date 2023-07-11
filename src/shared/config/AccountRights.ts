// Флаги разрешений/типов по клиенту
export enum AccountRights {
    none = 0,
    /// Вывод запрещен
    withdrawBlock = 1,
    /// Пополнение запрещено
    topUpBlock = 1 << 1,
    /// Обмен запрещен
    exchangeBlock = 1 << 2,
    /// Внутрение переводы запрещены
    innerTransferBlock = 1 << 3,
    /// Инвестиции запрещены
    investBlock = 1 << 4,
    /// Вход в систему запрещен
    logInBlock = 1 << 5,
    /// Разрешает использовать все варианты сетей вывода и ввода в обход настроек в валютах
    allTokensNetworks = 1 << 6,
    /// Признак юридического лица
    isJuridical = 1 << 7,
    /// Бонусы по инвест-токену запрещены
    gkeBonusBlock = 1 << 8,

    /// Запрещает использовать все варианты сетей вывода и ввода
    blockAll = withdrawBlock | topUpBlock | exchangeBlock | innerTransferBlock | investBlock | logInBlock | gkeBonusBlock,

    /// Блокировки для юридических лиц
    JuridicalBlock = investBlock | gkeBonusBlock,

    /// Удаленная учетная запись, архив
    deleted = 1 << 31
}

export const testRightsUser = (value, $const) => value >= $const
