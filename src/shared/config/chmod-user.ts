// Флаги разрешений/типов по клиенту
export const constRights = {
    none: 0,
    /// Вывод запрещен
    withdrawBlock: 1,
    /// Пополнение запрещено
    topUpBlock: 2,
    /// Обмен запрещен
    exchangeBlock: 4,
    /// Внутрение переводы запрещены
    innerTransferBlock: 8,
    /// Инвестиции запрещены
    investBlock: 16,
    /// Вход в систему запрещен
    logInBlock: 32,
    /// Разрешает использовать все варианты сетей вывода и ввода в обход настроек в валютах
    allTokensNetworks: 64,

    /// Запрещает использовать все варианты сетей вывода и ввода
    blockAll: 63,

    /// Удаленная учетная запись, архив
    deleted: -2147483648
}

export const testRightsUser = (value, $const) => value >= $const
