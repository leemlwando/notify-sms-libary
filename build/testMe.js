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
exports.testMe = void 0;
var index_1 = require("./index");
var node_readline_1 = __importDefault(require("node:readline"));
var getCredentials = function () {
    var rl = node_readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(function (resolve, reject) {
        rl.question('Enter username: ', function (username) {
            rl.question('Enter password: ', function (password) {
                resolve({ username: username, password: password });
                rl.close();
            });
        });
    });
};
var getContacts = function () {
    var rl = node_readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(function (resolve, reject) {
        rl.question('Enter contacts (comma-separated): ', function (contacts) {
            resolve(contacts.split(',').map(function (contact) { return contact.trim(); }));
            rl.close();
        });
    });
};
var testMe = function () { return __awaiter(void 0, void 0, void 0, function () {
    var credentials, token, balance, senderIds, ids, contacts, smsResponse;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                console.log('[Noify SMS]:: Setting up credentials');
                return [4 /*yield*/, getCredentials()];
            case 1:
                credentials = _d.sent();
                index_1.SMS.setCredentials(credentials);
                return [4 /*yield*/, index_1.SMS.configureAccessToken()];
            case 2:
                token = _d.sent();
                console.log('[NOTIFY SMS]::configureAccessToken', token === null || token === void 0 ? void 0 : token.slice(0, 10), '..');
                return [4 /*yield*/, index_1.SMS.GET_SMS_BALANCE()];
            case 3:
                balance = _d.sent();
                console.log('[NOTIFY SMS]::GET_SMS_BALANCE', balance);
                return [4 /*yield*/, index_1.SMS.GET_SENDER_IDS()];
            case 4:
                senderIds = _d.sent();
                ids = (_a = senderIds === null || senderIds === void 0 ? void 0 : senderIds.payload) === null || _a === void 0 ? void 0 : _a.data;
                console.log('[NOTIFY SMS]::GET_SENDER_ID', (_b = senderIds === null || senderIds === void 0 ? void 0 : senderIds.payload) === null || _b === void 0 ? void 0 : _b.data.slice(0, 3), '\n...');
                return [4 /*yield*/, getContacts()];
            case 5:
                contacts = _d.sent();
                return [4 /*yield*/, index_1.SMS.SEND_SMS_TO_CUSTOM_CONTACTS({ contacts: contacts, senderId: (_c = ids[0]) === null || _c === void 0 ? void 0 : _c.identifier, message: 'Notify SMS::Test Message' })];
            case 6:
                smsResponse = _d.sent();
                console.log('[NOTIFY SMS]::SEND_SMS_TO_CUSTOM_CONTACTS', smsResponse);
                return [2 /*return*/];
        }
    });
}); };
exports.testMe = testMe;
var args = process.argv.slice(2); // Get command line arguments excluding the first two elements
if (args.includes('--terminal')) {
    (function (_) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, exports.testMe)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })();
}
else {
}
//# sourceMappingURL=testMe.js.map