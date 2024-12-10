import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN } from './config.js';

const DynamoClient = new DynamoDBClient({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        sessionToken: AWS_SESSION_TOKEN
    }
});

const DynamoDB = DynamoDBDocumentClient.from(DynamoClient);

export const sessionLogin = async (sessionData) => {
    const params = {
        TableName: 'sesiones-alumnos',
        Item: sessionData,
        ReturnValues: "ALL_OLD"
    };

    try {
        return await DynamoDB.send(new PutCommand(params));
    } catch (error) {
        console.error('Error creating session', error);
    }
}

export const getSessionString = async (sessionString) => {
    console.log('Getting session', sessionString);
    const command = new QueryCommand({
        TableName: 'sesiones-alumnos',
        IndexName: 'sessionString-index', 
        KeyConditionExpression: 'sessionString = :sessionString',
        FilterExpression: 'active = :active',
        ExpressionAttributeValues: {
            ':sessionString': { S: sessionString },
            ':active': { BOOL: true }
        }
    });

    try {
        const response = await DynamoDB.send(command);
        console.log('Session retrieved successfully', response);
        return response.Items.length > 0 ? response.Items[0] : null;
    } catch (error) {
        console.error('Error retrieving session', error);
    }
}

export const sessionLogout = async (sessionString) => {
    const session = await getSessionString(sessionString);
    if (!session) {
        throw new Error('Session not found');
    }

    const params = {
        TableName: 'sesiones-alumnos',
        Key: {
            id: session.id.S 
        },
        UpdateExpression: 'SET active = :newActive',
        ExpressionAttributeValues: {
            ':newActive': false,
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const response = await DynamoDB.send(new UpdateCommand(params));
        console.log('Session updated successfully', response);
        return response;
    } catch (error) {
        console.error('Error updating session', error);
        throw new Error('Error updating session');
    }
}