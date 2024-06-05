export enum SessionFlags {
    None = 'none',
    Unknown = 'unknown',
    AdminPanelAvailable = 'adminPanelAvailable'
}

/// Битовые флаги разрешений для сессий
export const maskSessionFlags = {
    /// Пусто
    none: 0,
    /// Использование в структурных инвест продуктах для фиксирования курсов
    unknown: 1,
    /// Использование в операциях обмена на внутренней бирже
    adminPanelAvailable: 1 << 1
}
