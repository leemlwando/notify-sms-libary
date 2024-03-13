/**
 * Type definition for the sendSMS function.
 */
export type ISendSMS = (args: {
    reciepientType: string;
    channel?: string;
    contactGroup?: string;
    senderId?: string;
    message: string;
    contacts?: string[];
}, configs: {
    URL: string;
    ACCESS_TOKEN: string;
}) => Promise<{
    success: boolean;
    message?: string;
    error?: any;
    payload?: any;
}>;
/**
 * Sends an SMS using the provided senderId, message, and contacts.
 * @param senderId The sender ID for the SMS.
 * @param message The message content of the SMS.
 * @param contacts The list of contacts to send the SMS to. e.g [ '20971234567', '0951234567', '961234567' , ... ]
 * @param URL The URL for the SMS API.
 * @param ACCESS_TOKEN The access token for the SMS API.
 * @returns A promise that resolves to an object with the success status, message, error, and payload.
 */
export declare const sendSMS: ISendSMS;
/**
 * Type definition for the get access token function.
 */
export type IGetAccessToken = (args: {
    username: string;
    password: string;
}, configs: {
    URL: string;
}) => Promise<{
    success: boolean;
    message?: string;
    error?: any;
    payload?: {
        token: string;
    };
}>;
/**
 * Gets the access token using the provided username and password.
 * @param username The username for the SMS API.
 * @param password The password for the SMS API.
 * @param URL The URL for the SMS API.
 * @returns A promise that resolves to an object with the success status, token, message, error, and payload.
 */
export declare const getAccessToken: IGetAccessToken;
/**
 * Type definition for the get sms balance function.
 */
export type IGetSMSBalance = (args: {
    ACCESS_TOKEN: string;
    URL: string;
}) => Promise<{
    success: boolean;
    message?: string;
    error?: any;
    payload?: {
        notifySMSBundleBalance: number;
    };
}>;
/**
 * Gets the SMS balance using the provided access token.
 * @param ACCESS_TOKEN The access token for the SMS API.
 * @returns A promise that resolves to an object with the success status, message, error, and payload.
 */
export declare const getSMSBalance: IGetSMSBalance;
/**
 * Type definition for the create sender ID function.
 */
export type ICreateSenderID = (args: {
    senderId: string;
    description?: string;
}, configs: {
    URL: string;
    ACCESS_TOKEN: string;
}) => Promise<{
    success: boolean;
    message?: string;
    error?: any;
    payload?: any;
}>;
/**
 * Creates a sender ID using the provided sender ID.
 * @param senderId The sender ID for the SMS API.
 * @param URL The URL for the SMS API.
 * @param ACCESS_TOKEN The access token for the SMS API.
 * @returns A promise that resolves to an object with the success status, message, error, and payload.
 */
export declare const createSenderID: ICreateSenderID;
/**
 * Type definition for the get sender IDs function.
 */
export type IGetSenderIDs = (args: {
    ACCESS_TOKEN: string;
    URL: string;
}) => Promise<{
    success: boolean;
    message?: string;
    error?: any;
    payload?: any;
}>;
/**
 * Gets the sender IDs using the provided access token.
 * @param ACCESS_TOKEN The access token for the SMS API.
 * @returns A promise that resolves to an object with the success status, message, error, and payload.
 */
export declare const getSenderIDs: IGetSenderIDs;
//# sourceMappingURL=helpers.d.ts.map