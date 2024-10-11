// api.js

let nc = null;

export const initializeChat = async (projectId) => {
    if (!nc) {
        try {
            nc = new window.ncloudchat.Chat();
            await nc.initialize([projectId]);
            console.log('Chat initialized successfully');
        } catch (error) {
            console.error('Failed to initialize chat:', error);
        }
    }
};

export const connectUser = async (userId, userName, profileUrl) => {
    try {
        await nc.connect({
            userId,
            name: userName,
            profile: profileUrl,
            customField: 'json'
        });
        console.log('User connected successfully');
    } catch (error) {
        console.error('Failed to connect user:', error);
    }
};

export const createChannel = async (user1Id, user2Id) => {
    try {
        const channelName = `${user1Id}-${user2Id}`; // 고유 채널 이름 설정
        const channel = await nc.createChannel({
            type: 'PRIVATE', // PRIVATE 채널로 설정
            name: channelName,
            customField: 'customField'
        });
        return channel.channel.id;
    } catch (error) {
        console.error('Failed to create channel:', error);
    }
};

export const subscribeChannel = async (channelId) => {
    try {
        await nc.subscribe(channelId);
        console.log('Subscribed to channel:', channelId);
    } catch (error) {
        console.error('Failed to subscribe to channel:', error);
    }
};

export const sendMessage = async (channelId, messageContent) => {
    try {
        const response = await nc.sendMessage({
            channelId,
            type: "text",
            content: messageContent
        });
        return response;
    } catch (error) {
        console.error('Failed to send message:', error);
    }
};
