"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const configs_1 = require("./configs");
const constants_1 = require("./constants");
/**
 * Represents an SMS object used for sending SMS messages.
 */
class SMS {
    /**
     * Creates an instance of the SMS class.
     * @param {Object} credentials - The username and password for authentication.
     * @param {string} credentials.username - The username for authentication.
     * @param {string} credentials.password - The password for authentication.
     */
    constructor({ username, password }) {
        this.username = username;
        this.password = password;
    }
    /**
     * Configures the access token for authentication.
     * @returns {Promise<string | null>} A promise that resolves to the access token or null if the configuration fails.
     */
    configureAccessToken() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let accessToken = yield (0, helpers_1.getAccessToken)({
                username: this.username,
                password: this.password
            }, { URL: configs_1.GET_ACCESS_TOKEN_API });
            if (accessToken.success && ((_a = accessToken === null || accessToken === void 0 ? void 0 : accessToken.payload) === null || _a === void 0 ? void 0 : _a.token)) {
                this.accessToken = accessToken.payload.token;
                return this.accessToken;
            }
            return null;
        });
    }
    GET_SMS_BALANCE() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.accessToken)
                throw "Access token not set";
            const getBalanceResponse = yield (0, helpers_1.getSMSBalance)({ ACCESS_TOKEN: this.accessToken, URL: configs_1.GET_SMS_BALANCE_API });
            if (getBalanceResponse.success && ((_a = getBalanceResponse === null || getBalanceResponse === void 0 ? void 0 : getBalanceResponse.payload) === null || _a === void 0 ? void 0 : _a.notifySMSBundleBalance) !== undefined) {
                return getBalanceResponse.payload.notifySMSBundleBalance;
            }
            return null;
        });
    }
    CREATE_SENDER_ID({ senderId, description }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.accessToken)
                throw "Access token not set";
            return yield (0, helpers_1.createSenderID)({ senderId, description }, { URL: configs_1.CREATE_SENDER_ID_API, ACCESS_TOKEN: this.accessToken });
        });
    }
    GET_SENDER_IDS() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.accessToken)
                throw "Access token not set";
            const senderIds = yield (0, helpers_1.getSenderIDs)({ URL: configs_1.GET_SENDER_ID_API, ACCESS_TOKEN: this.accessToken });
            return Object.assign(Object.assign({}, senderIds), { payload: Object.assign(Object.assign({}, senderIds.payload), { data: (_b = (_a = senderIds.payload) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.map((x) => ({ name: x.title, identifier: x._id })) }) });
        });
    }
    SEND_SMS_TO_CUSTOM_CONTACTS({ contacts, senderId, message }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.accessToken)
                throw "Access token not set";
            return (0, helpers_1.sendSMS)({
                reciepientType: constants_1.NOTIFY_RECIEPIENT_TYPE_CUSTOM,
                contacts,
                senderId,
                message
            }, { URL: configs_1.SEND_SMS_API, ACCESS_TOKEN: this.accessToken });
        });
    }
    SEND_SMS_TO_CHANNEL({ channel, senderId, message }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.accessToken)
                throw "Access token not set";
            return (0, helpers_1.sendSMS)({
                reciepientType: constants_1.NOTIFY_RECIEPIENT_TYPE_CHANNEL,
                channel,
                senderId,
                message
            }, { URL: configs_1.SEND_SMS_API, ACCESS_TOKEN: this.accessToken });
        });
    }
    SEND_SMS_TO_CONTACT_GROUP({ contactGroup, senderId, message }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.accessToken)
                throw "Access token not set";
            return (0, helpers_1.sendSMS)({
                reciepientType: constants_1.NOTIFY_RECIEPIENT_TYPE_CONTACT_GROUP,
                contactGroup,
                senderId,
                message
            }, { URL: configs_1.SEND_SMS_API, ACCESS_TOKEN: this.accessToken });
        });
    }
    /** UTILS */
    /**
     * Sets the credentials for authentication.
     * @param {Object} credentials - The username and password for authentication.
     * @param {string} credentials.username - The username for authentication.
     * @param {string} credentials.password - The password for authentication.
     */
    setCredentials({ username, password }) {
        this.username = username;
        this.password = password;
    }
    static getInstance(credentials) {
        if (!SMS.instance) {
            SMS.instance = new SMS(credentials);
        }
        return SMS.instance;
    }
}
if (!process.env.NOTIFY_SMS_USERNAME || !process.env.NOTIFY_SMS_PASSWORD) {
    console.warn("[Notify SMS]::SMS credentials not set");
    console.warn("[Notify SMS]::Please set process.env.NOTIFY_SMS_USERNAME and process.env.NOTIFY_SMS_PASSWORD in your .env file");
}
exports.default = SMS.getInstance({ username: process.env.NOTIFY_SMS_USERNAME, password: process.env.NOTIFY_SMS_PASSWORD });
