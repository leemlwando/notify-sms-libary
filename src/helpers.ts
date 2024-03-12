import axios from 'axios';
import { NOTIFY_RECIEPIENT_TYPE_CHANNEL, NOTIFY_RECIEPIENT_TYPE_CONTACT_GROUP, NOTIFY_RECIEPIENT_TYPE_CUSTOM } from './constants';

/**
 * Type definition for the sendSMS function.
 */
export type ISendSMS = (
    args: { reciepientType: string; channel?: string; contactGroup?: string, senderId?: string; message: string; contacts?: string[] },
    configs: { URL: string; ACCESS_TOKEN: string }
) => Promise<{
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
export const sendSMS: ISendSMS = async (
    { reciepientType, channel, contactGroup, senderId, message, contacts },
    { URL, ACCESS_TOKEN }
) => {
    try {

        let data = { message } as any;

        switch(reciepientType){
            case NOTIFY_RECIEPIENT_TYPE_CUSTOM:
                data = { ...data, reciepients: contacts, senderId };
                break;
            case NOTIFY_RECIEPIENT_TYPE_CONTACT_GROUP:
                data = { ...data, contactGroup, senderId };
                break;
            case NOTIFY_RECIEPIENT_TYPE_CHANNEL:
                data = { ...data, channel };
                break;
            default:
                throw "Invalid reciepient type";
        }

        let axiosResponse = await axios({
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            },
            data: { reciepientType, ...data }
        });

        return {
            success: axiosResponse.data.success,
            payload: axiosResponse.data.payload,
            message: axiosResponse.data.message,
            error: axiosResponse.data.error
        };
    } catch (error) {
        return {
            success: false,
            error
        };
    }
};


/**
 * Type definition for the get access token function.
 */

export type IGetAccessToken = (
    args: { username: string; password: string },
    configs: { URL: string }
) => Promise<{
    success: boolean;
    message?: string;
    error?: any;
    payload?: { token: string };
}>;

/**
 * Gets the access token using the provided username and password.
 * @param username The username for the SMS API.
 * @param password The password for the SMS API.
 * @param URL The URL for the SMS API.
 * @returns A promise that resolves to an object with the success status, token, message, error, and payload.
 */
export const getAccessToken: IGetAccessToken = async (args, configs) => {
    try {
        let axiosResponse = await axios({
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
    } catch (error) {
        return {
            success: false,
            error
        };
    }
}


/**
 * Type definition for the get sms balance function.
 */

export type IGetSMSBalance = (
    args: { ACCESS_TOKEN: string, URL: string }
) => Promise<{
    success: boolean;
    message?: string;
    error?: any;
    payload?: { notifySMSBundleBalance: number };
}>;

/**
 * Gets the SMS balance using the provided access token.
 * @param ACCESS_TOKEN The access token for the SMS API.
 * @returns A promise that resolves to an object with the success status, message, error, and payload.
 */

export const getSMSBalance: IGetSMSBalance = async ({ACCESS_TOKEN, URL}) => {
    try {
        let axiosResponse = await axios({
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
    } catch (error) {
        return {
            success: false,
            error
        };
    }
}

/**
 * Type definition for the create sender ID function.
 */

export type ICreateSenderID = (
    args: { senderId: string, description?: string },
    configs: { URL: string, ACCESS_TOKEN: string }
) => Promise<{
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

export const createSenderID: ICreateSenderID = async ({senderId, description}, {URL, ACCESS_TOKEN}) => {
    try {
        let axiosResponse = await axios({
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
    } catch (error) {
        return {
            success: false,
            error
        };
    }
}

/**
 * Type definition for the get sender IDs function.
 */

export type IGetSenderIDs = (
    args: { ACCESS_TOKEN: string, URL: string }
) => Promise<{
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

export const getSenderIDs: IGetSenderIDs = async ({ACCESS_TOKEN, URL}) => {
    try {
        let axiosResponse = await axios({
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
    } catch (error) {
        return {
            success: false,
            error
        };
    }

}