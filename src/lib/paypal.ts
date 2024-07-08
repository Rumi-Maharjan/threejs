import checkoutNodeJssdk from '@paypal/checkout-server-sdk'

const clientId = process.env.PAYPAL_CLIENT_ID as string | undefined;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET as string | undefined;

const configureEnvironment = function () {
    if (!clientId || !clientSecret) {
        throw new Error('PayPal client ID and client secret must be defined');
    }

    return process.env.NODE_ENV === 'production'
        ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
        : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

const client = function () {
    return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment());
}

export default client;
