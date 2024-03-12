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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSenderIDs = exports.createSenderID = exports.getSMSBalance = exports.getAccessToken = exports.sendSMS = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("./constants");
/**
 * Sends an SMS using the provided senderId, message, and contacts.
 * @param senderId The sender ID for the SMS.
 * @param message The message content of the SMS.
 * @param contacts The list of contacts to send the SMS to. e.g [ '20971234567', '0951234567', '961234567' , ... ]
 * @param URL The URL for the SMS API.
 * @param ACCESS_TOKEN The access token for the SMS API.
 * @returns A promise that resolves to an object with the success status, message, error, and payload.
 */
const sendSMS = ({ reciepientType, channel, contactGroup, senderId, message, contacts }, { URL, ACCESS_TOKEN }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = { message };
        switch (reciepientType) {
            case constants_1.NOTIFY_RECIEPIENT_TYPE_CUSTOM:
                data = Object.assign(Object.assign({}, data), { reciepients: contacts, senderId });
                break;
            case constants_1.NOTIFY_RECIEPIENT_TYPE_CONTACT_GROUP:
                data = Object.assign(Object.assign({}, data), { contactGroup, senderId });
                break;
            case constants_1.NOTIFY_RECIEPIENT_TYPE_CHANNEL:
                data = Object.assign(Object.assign({}, data), { channel });
                break;
            default:
                throw "Invalid reciepient type";
        }
        let axiosResponse = yield (0, axios_1.default)({
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            },
            data: Object.assign({ reciepientType }, data)
        });
        return {
            success: axiosResponse.data.success,
            payload: axiosResponse.data.payload,
            message: axiosResponse.data.message,
            error: axiosResponse.data.error
        };
    }
    catch (error) {
        return {
            success: false,
            error
        };
    }
});
exports.sendSMS = sendSMS;
/**
 * Gets the access token using the provided username and password.
 * @param username The username for the SMS API.
 * @param password The password for the SMS API.
 * @param URL The URL for the SMS API.
 * @returns A promise that resolves to an object with the success status, token, message, error, and payload.
 */
const getAccessToken = (args, configs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let axiosResponse = yield (0, axios_1.default)({
            method: 'POST',
            url: configs.URL,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username: args.username,
                password: args.password
            }
        });
        return {
            success: axiosResponse.data.success,
            payload: axiosResponse.data.payload,
            message: axiosResponse.data.message,
            error: axiosResponse.data.error
        };
    }
    catch (error) {
        return {
            success: false,
            error
        };
    }
});
exports.getAccessToken = getAccessToken;
/**
 * Gets the SMS balance using the provided access token.
 * @param ACCESS_TOKEN The access token for the SMS API.
 * @returns A promise that resolves to an object with the success status, message, error, and payload.
 */
const getSMSBalance = ({ ACCESS_TOKEN, URL }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let axiosResponse = yield (0, axios_1.default)({
            method: 'GET',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });
        return {
            success: axiosResponse.data.success,
            payload: axiosResponse.data.payload,
            message: axiosResponse.data.message,
            error: axiosResponse.data.error
        };
    }
    catch (error) {
        return {
            success: false,
            error
        };
    }
});
exports.getSMSBalance = getSMSBalance;
/**
 * Creates a sender ID using the provided sender ID.
 * @param senderId The sender ID for the SMS API.
 * @param URL The URL for the SMS API.
 * @param ACCESS_TOKEN The access token for the SMS API.
 * @returns A promise that resolves to an object with the success status, message, error, and payload.
 */
const createSenderID = ({ senderId, description }, { URL, ACCESS_TOKEN }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let axiosResponse = yield (0, axios_1.default)({
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            },
            data: {
                title: senderId,
                description
            }
        });
        return {
            success: axiosResponse.data.success,
            payload: axiosResponse.data.payload,
            message: axiosResponse.data.message,
            error: axiosResponse.data.error
        };
    }
    catch (error) {
        return {
            success: false,
            error
        };
    }
});
exports.createSenderID = createSenderID;
/**
 * Gets the sender IDs using the provided access token.
 * @param ACCESS_TOKEN The access token for the SMS API.
 * @returns A promise that resolves to an object with the success status, message, error, and payload.
 */
const getSenderIDs = ({ ACCESS_TOKEN, URL }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let axiosResponse = yield (0, axios_1.default)({
            method: 'GET',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });
        return {
            success: axiosResponse.data.success,
            payload: axiosResponse.data.payload,
            message: axiosResponse.data.message,
            error: axiosResponse.data.error
        };
    }
    catch (error) {
        return {
            success: false,
            error
        };
    }
});
exports.getSenderIDs = getSenderIDs;
