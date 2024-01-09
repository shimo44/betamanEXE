import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {View, StyleSheet, SafeAreaView, Text, ScrollView, Alert} from 'react-native';
import {
    ApplicationProvider,
    Input,
    Button,
    Icon,
    TopNavigation,
    Divider,
    TopNavigationAction,
    Layout
} from '@ui-kitten/components';
import {Bubble, GiftedChat, InputToolbar, Message, Send} from 'react-native-gifted-chat';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useTheme } from '@ui-kitten/components/theme';
import { Configuration, OpenAIApi} from 'openai';
import {API_KEY} from '@env'

const configuration = new Configuration({
    apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);


const NetNaviScreen = ({navigation}) => {
    const [messages, setMessages] = useState([]);

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    useEffect(() => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [
            {
                _id: 1,
                text: 'Hello! My Name is BetaMan.. \nHow can I assist you today?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'BetaMan',
                    avatar: 'https://static.wikia.nocookie.net/megaman/images/3/39/Gutsman.EXE_MMBN.jpg/revision/latest?cb=20210312215939',
                    },
            },
            ]));
    }, []);

    const onSend = async (newMessages = []) => {
        try{
            setMessages(GiftedChat.append(messages, newMessages));

            const message = newMessages[0].text;

            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: message,
            });

            setMessages((previousMessages) => GiftedChat.append(previousMessages, [
                {
                    _id: messages.length + 1,
                    text: response.data.choices[0].text.trim(),
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        avatar: 'https://www.giantbomb.com/a/uploads/original/3/30446/1024010-normal_soul_guts.jpg',
                    },
                },
            ]));
        }catch (error) {
            console.log('OpenAI error:', error.response.status, error.response.data.message, error.response.data);
            console.log('API Key:', API_KEY)
            Alert.alert('Error', 'Strange, I encountered an issue trying to connect to my OpenAI engine...\nPlease try again later.');
        }

    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <TopNavigation title='BETAMAN.EXE' alignment='center' accessoryLeft={BackAction}/>
            <Divider/>
                <View style={{flex: 1}}>
                    <GiftedChat
                        messages={messages}
                        onSend={onSend}
                        user={{ _id: 3 }}
                        placeholder="Enter text here"
                        renderInputToolbar={renderInputToolbar}
                        renderSend={renderSend}
                        renderMessage={renderMessage}
                        renderBubble={renderBubble}
                        renderTime={renderTime}
                        renderChatEmpty={renderChatEmpty}
                    />
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
});

const renderInputToolbar = (props) => (
    <InputToolbar
        {...props}
        containerStyle={{
            backgroundColor: '#F4F6F9',
            borderTopWidth: 0,
            paddingBottom: 8,
        }}
        primaryStyle={{ alignItems: 'center' }}
    />
);

const renderSend = (props) => (
    <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
            <Icon name='paper-plane-outline' fill='#0084FF' width={32} height={32} />
        </View>
    </Send>
);

const renderMessage = (props) => (
    <Message
        {...props}
        containerStyle={{
            backgroundColor: '#FFF',
            borderRadius: 8,
            marginVertical: 4,
            marginHorizontal: 16,
            elevation: 4,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
        }}
        wrapperStyle={{
            flex: 1,
            height: 'auto',
            right: {
                backgroundColor: '#2e64e5',
            },
            left: {
                backgroundColor: '#f2f2f2',
            },
        }}
        wrapperProps={{
            style: {
                borderRadius: 8,
            },
        }}
        textStyle={{
            fontSize: 16,
            lineHeight: 16,
            color: '#222B45',
        }}
        textProps={{
            style: {
                color: '#fff',
                fontSize: 16,
                fontWeight: '500',
                textAlign: 'left',
                flexWrap: 'wrap'
            },
        }}
    />
);

const renderBubble = (props) => (
    <Bubble
        {...props}
        maxHeight = {null}
        truncateProps={null}
        wrapperStyle={{
            height: 'auto',
            right: {
                backgroundColor: '#2979FF',
            },
            left: {
                backgroundColor: '#4CAF50',
            }
        }}
        textStyle={{
            right: {
                fontSize: 16,
                color: '#fff',
                textAlign: 'right',
                overflow: 'hidden',
                padding: 8,
                backgroundColor: '#2979FF',
                borderRadius: 20,
            },
            left: {
                fontSize: 16,
                color: '#fff',
                textAlign: 'left',
                overflow: 'hidden',
                padding: 8,
                backgroundColor: '#4CAF50',
                borderRadius: 20,
            },
        }}
        multiline={true}
        textProps={{
            style: {
                fontSize: 16,
                lineHeight: 16,
                color: '#fff',
            },
        }}
        autoHeight={true}
        numberOfLines={null}
    />
    // <Layout {...props} style={{ borderRadius: 20, padding: 8 }}>
    //     <Text>{props.currentMessage.text}</Text>
    // </Layout>
)
const renderChatEmpty = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h6'>No chat history yet!</Text>
    </Layout>
)


const renderTime = (props) => (
    <View style={{marginLeft: 10, marginRight: 10}}>
        <Text style={{ fontSize: 10, color: 'white', marginBottom: 5, textAlign: 'auto' }}>
            {moment(props.currentMessage.createdAt).format('hh:mm A')}
        </Text>
    </View>

)

export default NetNaviScreen;
