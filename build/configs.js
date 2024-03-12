"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_SENDER_ID_API = exports.CREATE_SENDER_ID_API = exports.GET_SMS_BALANCE_API = exports.GET_ACCESS_TOKEN_API = exports.SEND_SMS_API = exports.BASE_URL = void 0;
exports.BASE_URL = 'https://production.olympusmedia.co.zm/api/v1';
exports.SEND_SMS_API = `${exports.BASE_URL}/notify/channels/messages/compose?error_context=CONTEXT_API_ERROR_JSON`;
exports.GET_ACCESS_TOKEN_API = `${exports.BASE_URL}/authentication/gamebox/mobile/signin?error_context=CONTEXT_API_ERROR_JSON`;
exports.GET_SMS_BALANCE_API = `${exports.BASE_URL}/notify/sms-bundles/balance/fetch?error_context=CONTEXT_API_ERROR_JSON`;
exports.CREATE_SENDER_ID_API = `${exports.BASE_URL}/notify/sender-ids/create?error_context=CONTEXT_API_ERROR_JSON`;
exports.GET_SENDER_ID_API = `${exports.BASE_URL}/notify/sender-ids/fetch?error_context=CONTEXT_API_ERROR_JSON`;
