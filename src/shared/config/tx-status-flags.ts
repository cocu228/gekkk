export enum TxStatusFlags {
    None = 'none',
    WithdrawCreated = 'withdrawCreated',
    NetworkConfirmed = 'networkConfirmed',
    NetworkUnConfirmed = 'networkUnConfirmed',
    FromNetwork = 'fromNetwork',
    AMLSended = 'amlSended',
    Blocked = 'blocked',
    Canceled = 'canceled',
    Failed = 'failed',
    Finished = 'finished'
}

/// Битовые флаги статуса транзакций
export const txStatusFlags = {
    /// Пусто
    none: 0,
    withdrawCreated: 1,
    networkConfirmed: 1 << 1,
    networkUnConfirmed: 1 << 2,
    fromNetwork: 1 << 3,
    amlSended: 1 << 4,
    blocked: 1 << 5,
    canceled: 1 << 6,
    failed: 1 << 7,
    finished: 1 << 7
}
