export interface SlackMessage {
    client_msg_id: string,
    suppress_notification: false,
    type: 'message',
    subtype?: string,
    text: string,
    user: string,
    team: string,
    blocks: { type: string, block_id: string, elements: any[] }[],
    source_team: string,
    user_team: string,
    channel: string,
    event_ts: string,
    ts: string
}
