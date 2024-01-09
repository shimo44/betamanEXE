import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Divider, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    const navigateDetails = () => {
        navigation.navigate('Details');
    };

    const navigateHyperBounce = () => {
        navigation.navigate('HyperBounce');
    };

    const navigateChatbot = () => {
        navigation.navigate('Chat');
    };

    return (
        <SafeAreaView style={styles.container}>
            <TopNavigation title='NetNavi Home' alignment='center'/>
            <Divider/>

            <Layout style={styles.buttonContainer}>
                <Button style={styles.button} onPress={navigateDetails}>About</Button>
            </Layout>

            <Layout style={styles.buttonContainer}>
                <Button style={styles.button} onPress={navigateHyperBounce}>HyperBounce</Button>
            </Layout>

            <Layout style={styles.buttonContainer}>
                <Button style={styles.button} onPress={navigateChatbot}>
                    <Text style={styles.buttonText}>ACTIVATE</Text>
                </Button>
            </Layout>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3c1053',
        marginBottom: 10,
        borderRadius: 8,
        padding: 10,
    },
    button: {
        backgroundColor: 'transparent',
        borderColor: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
