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
exports.testMe = void 0;
const sms_1 = __importDefault(require("./sms"));
const node_readline_1 = __importDefault(require("node:readline"));
const rl = node_readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const getCredentials = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter username: ', (username) => {
            rl.question('Enter password: ', (password) => {
                resolve({ username, password });
                rl.close();
            });
        });
    });
};
const getContacts = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter contacts (comma-separated): ', (contacts) => {
            resolve(contacts.split(',').map(contact => contact.trim()));
            rl.close();
        });
    });
};
const testMe = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    console.log('[Noify SMS]:: Setting up credentials');
    const credentials = yield getCredentials();
    sms_1.default.setCredentials(credentials);
    const token = yield sms_1.default.configureAccessToken();
    console.log('[NOTIFY SMS]::configureAccessToken', token === null || token === void 0 ? void 0 : token.slice(0, 10), '..');
    const balance = yield sms_1.default.GET_SMS_BALANCE();
    console.log('[NOTIFY SMS]::GET_SMS_BALANCE', balance);
    const senderIds = yield sms_1.default.GET_SENDER_IDS();
    const ids = (_a = senderIds === null || senderIds === void 0 ? void 0 : senderIds.payload) === null || _a === void 0 ? void 0 : _a.data;
    console.log('[NOTIFY SMS]::GET_SENDER_ID', (_b = senderIds === null || senderIds === void 0 ? void 0 : senderIds.payload) === null || _b === void 0 ? void 0 : _b.data.slice(0, 3), '\n...');
    const contacts = yield getContacts();
    const smsResponse = yield sms_1.default.SEND_SMS_TO_CUSTOM_CONTACTS({ contacts, senderId: (_c = ids[0]) === null || _c === void 0 ? void 0 : _c._id, message: 'Notify SMS::Test Message' });
    console.log('[NOTIFY SMS]::SEND_SMS_TO_CUSTOM_CONTACTS', smsResponse);
});
exports.testMe = testMe;
const args = process.argv.slice(2); // Get command line arguments excluding the first two elements
if (args.includes('--terminal')) {
    ((_) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, exports.testMe)();
    }))();
}
else {
}
