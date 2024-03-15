"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMS = exports.SMSClass = void 0;
var helpers_1 = require("./helpers");
var configs_1 = require("./configs");
var constants_1 = require("./constants");
/**
 * Represents an SMS object used for sending SMS messages.
 */
var SMSClass = /** @class */ (function () {
    /**
     * Creates an instance of the SMS class.
     * @param {Object} credentials - The username and password for authentication.
     * @param {string} credentials.username - The username for authentication.
     * @param {string} credentials.password - The password for authentication.
     */
    function SMSClass(_a) {
        var username = _a.username, password = _a.password;
        this.username = username;
        this.password = password;
    }
    /**
     * Configures the access token for authentication.
     * @returns {Promise<string | null>} A promise that resolves to the access token or null if the configuration fails.
     */
    SMSClass.prototype.configureAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, helpers_1.getAccessToken)({
                            username: this.username,
                            password: this.password
                        }, { URL: configs_1.GET_ACCESS_TOKEN_API })];
                    case 1:
                        accessToken = _b.sent();
                        if (accessToken.success && ((_a = accessToken === null || accessToken === void 0 ? void 0 : accessToken.payload) === null || _a === void 0 ? void 0 : _a.token)) {
                            this.accessToken = accessToken.payload.token;
                            return [2 /*return*/, this.accessToken];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    SMSClass.prototype.GET_SMS_BALANCE = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getBalanceResponse;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.accessToken)
                            throw "Access token not set";
                        return [4 /*yield*/, (0, helpers_1.getSMSBalance)({ ACCESS_TOKEN: this.accessToken, URL: configs_1.GET_SMS_BALANCE_API })];
                    case 1:
                        getBalanceResponse = _b.sent();
                        if (getBalanceResponse.success && ((_a = getBalanceResponse === null || getBalanceResponse === void 0 ? void 0 : getBalanceResponse.payload) === null || _a === void 0 ? void 0 : _a.notifySMSBundleBalance) !== undefined) {
                            return [2 /*return*/, getBalanceResponse.payload.notifySMSBundleBalance];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    SMSClass.prototype.CREATE_SENDER_ID = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var senderId = _b.senderId, description = _b.description;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.accessToken)
                            throw "Access token not set";
                        return [4 /*yield*/, (0, helpers_1.createSenderID)({ senderId: senderId, description: description }, { URL: configs_1.CREATE_SENDER_ID_API, ACCESS_TOKEN: this.accessToken })];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    SMSClass.prototype.GET_SENDER_IDS = function () {
        return __awaiter(this, void 0, void 0, function () {
            var senderIds;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.accessToken)
                            throw "Access token not set";
                        return [4 /*yield*/, (0, helpers_1.getSenderIDs)({ URL: configs_1.GET_SENDER_ID_API, ACCESS_TOKEN: this.accessToken })];
                    case 1:
                        senderIds = _c.sent();
                        return [2 /*return*/, __assign(__assign({}, senderIds), { payload: __assign(__assign({}, senderIds.payload), { data: (_b = (_a = senderIds.payload) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.map(function (x) { return ({ name: x.title, identifier: x._id }); }) }) })];
                }
            });
        });
    };
    SMSClass.prototype.SEND_SMS_TO_CUSTOM_CONTACTS = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var contacts = _b.contacts, senderId = _b.senderId, message = _b.message;
            return __generator(this, function (_c) {
                if (!this.accessToken)
                    throw "Access token not set";
                return [2 /*return*/, (0, helpers_1.sendSMS)({
                        reciepientType: constants_1.NOTIFY_RECIEPIENT_TYPE_CUSTOM,
                        contacts: contacts,
                        senderId: senderId,
                        message: message
                    }, { URL: configs_1.SEND_SMS_API, ACCESS_TOKEN: this.accessToken })];
            });
        });
    };
    SMSClass.prototype.SEND_SMS_TO_CHANNEL = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var channel = _b.channel, senderId = _b.senderId, message = _b.message;
            return __generator(this, function (_c) {
                if (!this.accessToken)
                    throw "Access token not set";
                return [2 /*return*/, (0, helpers_1.sendSMS)({
                        reciepientType: constants_1.NOTIFY_RECIEPIENT_TYPE_CHANNEL,
                        channel: channel,
                        senderId: senderId,
                        message: message
                    }, { URL: configs_1.SEND_SMS_API, ACCESS_TOKEN: this.accessToken })];
            });
        });
    };
    SMSClass.prototype.SEND_SMS_TO_CONTACT_GROUP = function (_a, options_1) {
        return __awaiter(this, arguments, void 0, function (_b, options) {
            var contactGroup = _b.contactGroup, senderId = _b.senderId, message = _b.message;
            return __generator(this, function (_c) {
                if (!this.accessToken)
                    throw "Access token not set";
                return [2 /*return*/, (0, helpers_1.sendSMS)({
                        reciepientType: constants_1.NOTIFY_RECIEPIENT_TYPE_CONTACT_GROUP,
                        contactGroup: contactGroup,
                        senderId: senderId,
                        message: message
                    }, __assign({ URL: configs_1.SEND_SMS_API, ACCESS_TOKEN: this.accessToken }, options))];
            });
        });
    };
    /** UTILS */
    /**
     * Sets the credentials for authentication.
     * @param {Object} credentials - The username and password for authentication.
     * @param {string} credentials.username - The username for authentication.
     * @param {string} credentials.password - The password for authentication.
     */
    SMSClass.prototype.setCredentials = function (_a) {
        var username = _a.username, password = _a.password;
        this.username = username;
        this.password = password;
    };
    SMSClass.getInstance = function (credentials) {
        if (!SMSClass.instance) {
            SMSClass.instance = new SMSClass(credentials);
        }
        return SMSClass.instance;
    };
    return SMSClass;
}());
exports.SMSClass = SMSClass;
if (!process.env.NOTIFY_SMS_USERNAME || !process.env.NOTIFY_SMS_PASSWORD) {
    console.warn("[Notify SMS]::SMS credentials not set");
    console.warn("[Notify SMS]::Please set process.env.NOTIFY_SMS_USERNAME and process.env.NOTIFY_SMS_PASSWORD in your .env file");
}
exports.SMS = SMSClass.getInstance({ username: process.env.NOTIFY_SMS_USERNAME, password: process.env.NOTIFY_SMS_PASSWORD });
//# sourceMappingURL=sms.js.map