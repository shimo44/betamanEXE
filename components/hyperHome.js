import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const HomeStack = createStackNavigator();

const HomeScreen = () => {
    const navigation = useNavigation();
    const [tweets, setTweets] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchTweets = async () => {
        // fetch tweets from API
        const response = await fetch('https://your-tweets-api.com/tweets');
        const data = await response.json();
        setTweets(data);
    };

    useEffect(() => {
        fetchTweets();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchTweets();
        setRefreshing(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.tweet} onPress={() => navigation.navigate('TweetDetails')}>
            <Text style={styles.tweetUsername}>{item.username}</Text>
            <Text style={styles.tweetText}>{item.text}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={tweets}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    );
};

const TweetDetailsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Tweet Details Screen</Text>
        </View>
    );
};

const HyperBounceHome = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{
                headerTitle: () => (
                    <Feather name="disc" size={30} color="#3c1053" />
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => console.log('Search button pressed')}>
                        <Feather name="search" size={24} color="#3c1053" style={styles.headerButton} />
                    </TouchableOpacity>
                ),
            }} />
            <HomeStack.Screen name="TweetDetails" component={TweetDetailsScreen} />
        </HomeStack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tweet: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tweetUsername: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    tweetText: {},
    headerButton: {
        marginRight: 16,
    },
});

export default HyperBounceHome;
