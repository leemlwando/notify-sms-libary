import axios from 'axios';
import { createSenderID, getAccessToken, getSMSBalance, getSenderIDs, sendSMS } from './helpers';
import { CREATE_SENDER_ID_API, GET_ACCESS_TOKEN_API, GET_SENDER_ID_API, GET_SMS_BALANCE_API, SEND_SMS_API } from './configs';
import { NOTIFY_RECIEPIENT_TYPE_CHANNEL, NOTIFY_RECIEPIENT_TYPE_CONTACT_GROUP, NOTIFY_RECIEPIENT_TYPE_CUSTOM } from './constants';


/**
 * Represents an SMS object used for sending SMS messages.
 */
export class SMSClass {

    private username: string;
    private password: string;
    private accessToken?: string;
    private static instance: SMSClass;

    /**
     * Creates an instance of the SMS class.
     * @param {Object} credentials - The username and password for authentication.
     * @param {string} credentials.username - The username for authentication.
     * @param {string} credentials.password - The password for authentication.
     */
    constructor({username, password}: {username: string, password: string}){
        this.username = username;
        this.password = password;
    }

    /**
     * Configures the access token for authentication.
     * @returns {Promise<string | null>} A promise that resolves to the access token or null if the configuration fails.
     */
    public async configureAccessToken(): Promise<string | null> {
        let accessToken = await getAccessToken({
            username: this.username, 
            password: this.password
        }, { URL: GET_ACCESS_TOKEN_API });

        if(accessToken.success && accessToken?.payload?.token) {
            this.accessToken = accessToken.payload.token;
            return this.accessToken as string;
        }

        return null;
    }

    public async GET_SMS_BALANCE() {
        if(!this.accessToken) throw "Access token not set";
        const getBalanceResponse = await getSMSBalance({ ACCESS_TOKEN: this.accessToken, URL: GET_SMS_BALANCE_API});

        if(getBalanceResponse.success && getBalanceResponse?.payload?.notifySMSBundleBalance !== undefined) {
            return getBalanceResponse.payload.notifySMSBundleBalance;
        }

        return null;
    }

    public async CREATE_SENDER_ID({ senderId, description }: { senderId: string, description: string }) {
        if(!this.accessToken) throw "Access token not set";
        return await createSenderID({ senderId, description }, { URL: CREATE_SENDER_ID_API, ACCESS_TOKEN: this.accessToken });
    }
    
    public async GET_SENDER_IDS() {
        if(!this.accessToken) throw "Access token not set";
        const senderIds = await getSenderIDs({ URL: GET_SENDER_ID_API, ACCESS_TOKEN: this.accessToken });

        return {
            ...senderIds,
            payload:{
                ...senderIds.payload,
               data: senderIds.payload?.data?.map((x: any) => ({ name: x.title, identifier: x._id}))
            }
        }
    }

    public async SEND_SMS_TO_CUSTOM_CONTACTS({ contacts, senderId, message}: { contacts: string[], senderId: string, message: string }, options?: { useSenderIdName?: boolean }) {
        if(!this.accessToken) throw "Access token not set";
        return sendSMS({
            reciepientType: NOTIFY_RECIEPIENT_TYPE_CUSTOM,
            contacts,
            senderId,
            message
        }, { URL: SEND_SMS_API, ACCESS_TOKEN: this.accessToken, ...options });
    }


    public async SEND_SMS_TO_CHANNEL({channel, senderId, message}: { channel?: string, senderId: string, message: string}) {
        if(!this.accessToken) throw "Access token not set";
        return sendSMS({
            reciepientType: NOTIFY_RECIEPIENT_TYPE_CHANNEL,
            channel,
            senderId,
            message
        }, { URL: SEND_SMS_API, ACCESS_TOKEN: this.accessToken });
    }


    public async SEND_SMS_TO_CONTACT_GROUP({contactGroup, senderId, message}: { contactGroup?: string, senderId: string, message: string}, options?: { useSenderIdName?: boolean }) {
        if(!this.accessToken) throw "Access token not set";
        return sendSMS({
            reciepientType: NOTIFY_RECIEPIENT_TYPE_CONTACT_GROUP,
            contactGroup,
            senderId,
            message
        }, { URL: SEND_SMS_API, ACCESS_TOKEN: this.accessToken, ...options });
    }

    /** UTILS */

    /**
     * Sets the credentials for authentication.
     * @param {Object} credentials - The username and password for authentication.
     * @param {string} credentials.username - The username for authentication.
     * @param {string} credentials.password - The password for authentication.
     */
    public setCredentials({username, password}: {username: string, password: string}) {
        this.username = username;
        this.password = password;
    }

    public static getInstance(credentials: { username: string, password: string }): SMSClass {
        if (!SMSClass.instance) {
            SMSClass.instance = new SMSClass(credentials);
        }
        return SMSClass.instance;
    }


}

if(!process.env.NOTIFY_SMS_USERNAME || !process.env.NOTIFY_SMS_PASSWORD) {
    console.warn("[Notify SMS]::SMS credentials not set");
    console.warn("[Notify SMS]::Please set process.env.NOTIFY_SMS_USERNAME and process.env.NOTIFY_SMS_PASSWORD in your .env file");
}

export const SMS: SMSClass = SMSClass.getInstance({ username: process.env.NOTIFY_SMS_USERNAME as string, password: process.env.NOTIFY_SMS_PASSWORD as string });
