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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSenderIDs = exports.createSenderID = exports.getSMSBalance = exports.getAccessToken = exports.sendSMS = void 0;
var axios_1 = __importDefault(require("axios"));
var constants_1 = require("./constants");
/**
 * Sends an SMS using the provided senderId, message, and contacts.
 * @param senderId The sender ID for the SMS.
 * @param message The message content of the SMS.
 * @param contacts The list of contacts to send the SMS to. e.g [ '20971234567', '0951234567', '961234567' , ... ]
 * @param URL The URL for the SMS API.
 * @param ACCESS_TOKEN The access token for the SMS API.
 * @returns A promise that resolves to an object with the success status, message, error, and payload.
 */
var sendSMS = function (_a, _b) { return __awaiter(void 0, [_a, _b], void 0, function (_c, _d) {
    var data, axiosResponse, error_1;
    var reciepientType = _c.reciepientType, channel = _c.channel, contactGroup = _c.contactGroup, senderId = _c.senderId, message = _c.message, contacts = _c.contacts;
    var URL = _d.URL, ACCESS_TOKEN = _d.ACCESS_TOKEN;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 2, , 3]);
                data = { message: message };
                switch (reciepientType) {
                    case constants_1.NOTIFY_RECIEPIENT_TYPE_CUSTOM:
                        data = __assign(__assign({}, data), { reciepients: contacts, senderId: senderId });
                        break;
                    case constants_1.NOTIFY_RECIEPIENT_TYPE_CONTACT_GROUP:
                        data = __assign(__assign({}, data), { contactGroup: contactGroup, senderId: senderId });
                        break;
                    case constants_1.NOTIFY_RECIEPIENT_TYPE_CHANNEL:
                        data = __assign(__assign({}, data), { channel: channel });
                        break;
                    default:
                        throw "Invalid reciepient type";
                }
                return [4 /*yield*/, (0, axios_1.default)({
                        method: 'POST',
                        url: URL,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': "Bearer ".concat(ACCESS_TOKEN)
                        },
                        data: __assign({ reciepientType: reciepientType }, data)
                    })];
            case 1:
                axiosResponse = _e.sent();
                return [2 /*return*/, {
                        success: axiosResponse.data.success,
                        payload: axiosResponse.data.payload,
                        message: axiosResponse.data.message,
                        error: axiosResponse.data.error
                    }];
            case 2:
                error_1 = _e.sent();
                return [2 /*return*/, {
                        success: false,
                        error: error_1
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendSMS = sendSMS;
/**
 * Gets the access token using the provided username and password.
 * @param username The username for the SMS API.
 * @param password The password for the SMS API.
 * @param URL The URL for the SMS API.
 * @returns A promise that resolves to an object with the success status, token, message, error, and payload.
 */
var getAccessToken = function (args, configs) { return __awaiter(void 0, void 0, void 0, function () {
    var axiosResponse, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, axios_1.default)({
                        method: 'POST',
                        url: configs.URL,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            username: args.username,
                            password: args.password
                        }
                    })];
            case 1:
                axiosResponse = _a.sent();
                return [2 /*return*/, {
                        success: axiosResponse.data.success,
                        payload: axiosResponse.data.payload,
                        message: axiosResponse.data.message,
                        error: axiosResponse.data.error
                    }];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, {
                        success: false,
                        error: error_2
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAccessToken = getAccessToken;
/**
 * Gets the SMS balance using the provided access token.
 * @param ACCESS_TOKEN The access token for the SMS API.
 * @returns A promise that resolves to an object with the success status, message, error, and payload.
 */
var getSMSBalance = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var axiosResponse, error_3;
    var ACCESS_TOKEN = _b.ACCESS_TOKEN, URL = _b.URL;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, axios_1.default)({
                        method: 'GET',
                        url: URL,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': "Bearer ".concat(ACCESS_TOKEN)
                        }
                    })];
            case 1:
                axiosResponse = _c.sent();
                return [2 /*return*/, {
                        success: axiosResponse.data.success,
                        payload: axiosResponse.data.payload,
                        message: axiosResponse.data.message,
                        error: axiosResponse.data.error
                    }];
            case 2:
                error_3 = _c.sent();
                return [2 /*return*/, {
                        success: false,
                        error: error_3
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSMSBalance = getSMSBalance;
/**
 * Creates a sender ID using the provided sender ID.
 * @param senderId The sender ID for the SMS API.
 * @param URL The URL for the SMS API.
 * @param ACCESS_TOKEN The access token for the SMS API.
 * @returns A promise that resolves to an object with the success status, message, error, and payload.
 */
var createSenderID = function (_a, _b) { return __awaiter(void 0, [_a, _b], void 0, function (_c, _d) {
    var axiosResponse, error_4;
    var senderId = _c.senderId, description = _c.description;
    var URL = _d.URL, ACCESS_TOKEN = _d.ACCESS_TOKEN;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, axios_1.default)({
                        method: 'POST',
                        url: URL,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': "Bearer ".concat(ACCESS_TOKEN)
                        },
                        data: {
                            title: senderId,
                            description: description
                        }
                    })];
            case 1:
                axiosResponse = _e.sent();
                return [2 /*return*/, {
                        success: axiosResponse.data.success,
                        payload: axiosResponse.data.payload,
                        message: axiosResponse.data.message,
                        error: axiosResponse.data.error
                    }];
            case 2:
                error_4 = _e.sent();
                return [2 /*return*/, {
                        success: false,
                        error: error_4
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createSenderID = createSenderID;
/**
 * Gets the sender IDs using the provided access token.
 * @param ACCESS_TOKEN The access token for the SMS API.
 * @returns A promise that resolves to an object with the success status, message, error, and payload.
 */
var getSenderIDs = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var axiosResponse, error_5;
    var ACCESS_TOKEN = _b.ACCESS_TOKEN, URL = _b.URL;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, axios_1.default)({
                        method: 'GET',
                        url: URL,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': "Bearer ".concat(ACCESS_TOKEN)
                        }
                    })];
            case 1:
                axiosResponse = _c.sent();
                return [2 /*return*/, {
                        success: axiosResponse.data.success,
                        payload: axiosResponse.data.payload,
                        message: axiosResponse.data.message,
                        error: axiosResponse.data.error
                    }];
            case 2:
                error_5 = _c.sent();
                return [2 /*return*/, {
                        success: false,
                        error: error_5
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSenderIDs = getSenderIDs;
//# sourceMappingURL=helpers.js.map