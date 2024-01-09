import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Card, Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';



export const DetailsScreen = ({ navigation }) => {
    const BackIcon = (props) => (
        <Icon {...props} name='arrow-back' />
    );

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='About Me' alignment='center' accessoryLeft={BackAction}/>
            <Divider/>

            <Card style={styles.card}>
                <Text style={styles.title}>About Me</Text>
                <Text style={styles.paragraph}>
                    Hello! I am BETA-MAN, I was developed by Daichi Arik Shimo, an Afro-American software engineer from Detroit, Michigan, USA.
                    My original purpose is to help my user navigate the vast amounts of content and information on the World Wide Web as it enters the Metaverse era.
                    My creator was inspired by the Japanese anime characters Lan Hikari and Netto(Mega Man) his assistant network navigator designed by his father and grandfather.
                    Netto was designed to protected his user like an older brother from the harmful content and viruses on the internet..
                    One day, everyone will have a NetNavigator to safely share and expand Earths internet `safely` !
                </Text>
                <Icon name='info-outline' pack='eva' style={styles.icon} />
            </Card>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 16,
        borderRadius: 8,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginVertical: 8,
    },
    icon: {
        alignSelf: 'flex-end',
        marginTop: 8,
        marginRight: 8,
    },
});