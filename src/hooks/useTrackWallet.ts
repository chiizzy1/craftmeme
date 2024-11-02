// Create destination for Quick Alerts
export async function createAlertDestination(destinationName: string) {
    if (!process.env.NEXT_PUBLIC_QUICKNODE_API_KEY) {
        throw new Error("QuickNode API key is not defined");
    }

    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_QUICKNODE_API_KEY
    };

    const payload = {
        name: destinationName,
        to_url: process.env.NEXT_PUBLIC_WEBHOOK_URL,
        webhook_type: 'POST',
        service: 'webhook',
        payload_type: 1
    };

    try {
        const response = await fetch(
            'https://api.quicknode.com/quickalerts/rest/v1/destinations',
            {
                method: 'POST',
                headers,
                body: JSON.stringify(payload)
            }
        );

        const data = await response.json();
        console.log('Alert destination id:', data.id);
        return data.id;
    } catch (error) {
        console.error('Error creating alert destination:', error);
        throw error;
    }
}

// Create notification using destination ID
export async function createNotification(destinationId: string, walletAddress: string) {
    if (!process.env.NEXT_PUBLIC_QUICKNODE_API_KEY) {
        throw new Error("QuickNode API key is not defined");
    }

    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_QUICKNODE_API_KEY
    };

    // Create expression for monitoring wallet transactions
    // This creates an expression that monitors both incoming and outgoing transactions
    const expression = Buffer.from(
        `(tx_to == '${walletAddress}') || (tx_from == '${walletAddress}')`
    ).toString('base64');

    console.log(expression)

    const payload = {
        name: 'Wallet Transaction Monitor',
        expression: expression,
        network: 'ethereum-mainnet',
        destinationIds: [destinationId]
    };

    try {
        const response = await fetch(
            'https://api.quicknode.com/quickalerts/rest/v1/notifications',
            {
                method: 'POST',
                headers,
                body: JSON.stringify(payload)
            }
        );

        const data = await response.json();
        console.log('Notification created:', data);
        return data;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
}
