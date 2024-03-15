/**
 * Represents an SMS object used for sending SMS messages.
 */
export declare class SMSClass {
    private username;
    private password;
    private accessToken?;
    private static instance;
    /**
     * Creates an instance of the SMS class.
     * @param {Object} credentials - The username and password for authentication.
     * @param {string} credentials.username - The username for authentication.
     * @param {string} credentials.password - The password for authentication.
     */
    constructor({ username, password }: {
        username: string;
        password: string;
    });
    /**
     * Configures the access token for authentication.
     * @returns {Promise<string | null>} A promise that resolves to the access token or null if the configuration fails.
     */
    configureAccessToken(): Promise<string | null>;
    GET_SMS_BALANCE(): Promise<number | null>;
    CREATE_SENDER_ID({ senderId, description }: {
        senderId: string;
        description: string;
    }): Promise<{
        success: boolean;
        message?: string | undefined;
        error?: any;
        payload?: any;
    }>;
    GET_SENDER_IDS(): Promise<{
        payload: any;
        success: boolean;
        message?: string | undefined;
        error?: any;
    }>;
    SEND_SMS_TO_CUSTOM_CONTACTS({ contacts, senderId, message }: {
        contacts: string[];
        senderId: string;
        message: string;
    }): Promise<{
        success: boolean;
        message?: string | undefined;
        error?: any;
        payload?: any;
    }>;
    SEND_SMS_TO_CHANNEL({ channel, senderId, message }: {
        channel?: string;
        senderId: string;
        message: string;
    }): Promise<{
        success: boolean;
        message?: string | undefined;
        error?: any;
        payload?: any;
    }>;
    SEND_SMS_TO_CONTACT_GROUP({ contactGroup, senderId, message }: {
        contactGroup?: string;
        senderId: string;
        message: string;
    }, options?: {
        useSenderIdName?: boolean;
    }): Promise<{
        success: boolean;
        message?: string | undefined;
        error?: any;
        payload?: any;
    }>;
    /** UTILS */
    /**
     * Sets the credentials for authentication.
     * @param {Object} credentials - The username and password for authentication.
     * @param {string} credentials.username - The username for authentication.
     * @param {string} credentials.password - The password for authentication.
     */
    setCredentials({ username, password }: {
        username: string;
        password: string;
    }): void;
    static getInstance(credentials: {
        username: string;
        password: string;
    }): SMSClass;
}
export declare const SMS: SMSClass;
//# sourceMappingURL=sms.d.ts.map