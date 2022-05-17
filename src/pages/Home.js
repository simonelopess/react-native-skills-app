/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    FlatList,
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

export function Home() {
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState([]);
    const [greetings, setGrettings] = useState('');

    function handleAddNewSkill() {
        setMySkills(oldState => [...oldState, newSkill]);
    }

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            setGrettings('Good morning');
        }
        else if (currentHour >= 12 && currentHour < 18) {
            setGrettings('Good afternoon');
        } else {
            setGrettings('Good night');
        }
    }, [mySkills]);

    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={styles.container}>
            <Text style={styles.title}>Olá, Simone</Text>
            <Text style={styles.greetings}>
                {greetings}
            </Text>
            <TextInput
                style={styles.input}
                placeholder="New skill"
                placeholderTextColor="#555"
                onChangeText={setNewSkill}
            />
            <Button onPress={handleAddNewSkill} />
            <Text style={[styles.title, { marginVertical: 50 }]}>
                My Skills
            </Text>

            {/* funcionamento semelhante a um map, porém com performance renderizando apenas o que é visivel em tela */}
            <FlatList data={mySkills} keyExtractor={item => item} renderItem={({ item }) => (
                <SkillCard skill={item} />
            )} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 30,
        paddingVertical: 70,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#1f1e25',
        color: '#fff',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#a370f7',
        padding: 15,
        borderRadius: 7,
        alignItems: 'center',
        marginTop: 20,
    },
    greetings: {
        color: '#fff'
    }
});
