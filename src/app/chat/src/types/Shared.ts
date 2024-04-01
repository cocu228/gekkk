export type ChatConfig = {
    token: string;
    phone?: string;
}

export type MessageFile = {
    createdAt: number,
    downloadLink: string,
    id: number,
    name: string,
    path: string,
    picture: boolean,
    size: number,
    thumbLink: string,
}

export interface MessageFormValues {
    file: File[];
    message: string;
}

export type ChatMessage = {
    messageType: string;
    id: string,
    content: string,
    sender: string,
    role: string,
    createdAt: number,
    isRead?: boolean,
    file?: MessageFile,
}

export type StompChatUpdate = {
    eventType: string,
    chat: {
        id: number,
        founder: {
            id: number,
            username: string,
            name: string,
            phone: null | string,
            active: boolean,
            role: string,
            rank: null
        },
        priority: string,
        locale: string,
        createdAt: number,
        updatedAt: number,
        closedAt: string | null,
        frozenTill: string | null,
        session: {
            registrationStatus: string | null,
            accountInfo: string | null,
            ip: string,
            ua: string,
            appVersion: string,
            updatedAt: number,
            ipCountry: string | null,
            userId: number,
            email: string,
            appId: string,
            productId: string
        },
        assignedAt: number,
        organization: string | null,
        timing: string,
        level: 1,
        ticket: null,
        appId: string,
        productId: string,
        operators: [
            {
                operatorId: number,
                timestamp: number
            }
        ],
        operator: {
            id: number,
            username: string,
            name: string,
            phone: null,
            active: boolean,
            role: string,
            rank: string | null,
            online: boolean
        },
        processTime: number,
        statuses: [
            {
                status: string,
                timestamp: number
            },
            {
                status: string,
                timestamp: number
            }
        ],
        sessionId: number,
        lastMessage: {
            id: number,
            createdAt: number
        }
    }
}

export type StompCreateMessage = {
    eventType: 'messageCreate',
    messages: [
        {
            id: number,
            msgId: string,
            body: string,
            sender: {
                id: number,
                username: string,
                name: string,
                role: string,
                avatar: null
            },
            deliveredAt: number,
            readAt: number,
            createdAt: number,
            files: MessageFile[],
            messageType: string,
            sessionId: number,
            session: {
                id: number,
                appId: string,
                productId: string,
                userId: number,
                username: string
            },
            chatId: number,
            chat: {
                id: number,
                createdAt: number,
                product: string
            },
            statuses: [
                {
                    timestamp: number,
                    status: string
                },
                {
                    timestamp: number,
                    status: string
                },
                {
                    timestamp: number,
                    status: string
                }
            ]
        }
    ]
}
