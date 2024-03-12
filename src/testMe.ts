import sms from "./sms";
import readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getCredentials = (): Promise<{ username: string, password: string }> => {
    return new Promise((resolve, reject) => {
        rl.question('Enter username: ', (username) => {
            rl.question('Enter password: ', (password) => {
                resolve({ username, password });
                rl.close();
            });
        });
    });
};

const getContacts = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        rl.question('Enter contacts (comma-separated): ', (contacts) => {
            resolve(contacts.split(',').map(contact => contact.trim()));
            rl.close();
        });
    });
};

export const testMe = async () => {
    console.log('[Noify SMS]:: Setting up credentials');
    const credentials = await getCredentials();
    sms.setCredentials(credentials);

    const token = await sms.configureAccessToken();
    console.log('[NOTIFY SMS]::configureAccessToken', token?.slice(0, 10), '..');

    const balance = await sms.GET_SMS_BALANCE();
    console.log('[NOTIFY SMS]::GET_SMS_BALANCE', balance);

    const senderIds = await sms.GET_SENDER_IDS();
    const ids = senderIds?.payload?.data;
    console.log('[NOTIFY SMS]::GET_SENDER_ID', senderIds?.payload?.data.slice(0, 3), '\n...');

    const contacts = await getContacts();
    const smsResponse = await sms.SEND_SMS_TO_CUSTOM_CONTACTS({ contacts, senderId: ids[0]?._id, message: 'Notify SMS::Test Message' });
    console.log('[NOTIFY SMS]::SEND_SMS_TO_CUSTOM_CONTACTS', smsResponse);
};

const args = process.argv.slice(2); // Get command line arguments excluding the first two elements

if (args.includes('--terminal')) {
    (async _ => {
        await testMe();
    })();
} else {

}

