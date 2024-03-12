export const BASE_URL = 'https://production.olympusmedia.co.zm/api/v1';
export const SEND_SMS_API = `${BASE_URL}/notify/channels/messages/compose?error_context=CONTEXT_API_ERROR_JSON`;
export const GET_ACCESS_TOKEN_API = `${BASE_URL}/authentication/gamebox/mobile/signin?error_context=CONTEXT_API_ERROR_JSON`;
export const GET_SMS_BALANCE_API = `${BASE_URL}/notify/sms-bundles/balance/fetch?error_context=CONTEXT_API_ERROR_JSON`;
export const CREATE_SENDER_ID_API = `${BASE_URL}/notify/sender-ids/create?error_context=CONTEXT_API_ERROR_JSON`;
export const GET_SENDER_ID_API = `${BASE_URL}/notify/sender-ids/fetch?error_context=CONTEXT_API_ERROR_JSON`;