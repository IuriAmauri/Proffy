import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import styles from './styles';

function TeacherList() {
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoriteTeachers = JSON.parse(response);
                const favoriteTeachersIds = favoriteTeachers.map((teacher: Teacher) => {
                    return teacher.userId;
                });

                setFavorites(favoriteTeachersIds);
            }
        })
    }

    async function searchTeachers() {
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                weekDay,
                time
            }
        })

        setFiltersVisible(false);
        setTeachers(response.data);
    }

    function handleShowFilters() {
        setFiltersVisible(!filtersVisible);
    }

    return (
        <View style={ styles.container }>
            <PageHeader 
                title="Proffys disponíveis"
                headerComponent={ (
                    <BorderlessButton onPress={ handleShowFilters }>
                        <Feather 
                            name="filter" 
                            size={20} 
                            color={filtersVisible ? "#c1bccc" : "#FFF"}
                        />
                    </BorderlessButton>
                )}
            >
                { filtersVisible && (
                    <View style={ styles.searchForm }>
                        <Text style={ styles.label }>Matéria</Text>
                        <TextInput 
                            style={ styles.input }
                            placeholderTextColor="#c1bccc" 
                            placeholder="Matéria"
                            value={ subject }
                            onChangeText={ text => setSubject(text) }
                        />
                        <View style={ styles.inputGroup }>
                            <View style={ styles.inputBlock }>
                                <Text style={ styles.label }>Dia da semana</Text>
                                <TextInput 
                                    style={ styles.input }
                                    placeholderTextColor="#c1bccc" 
                                    placeholder="Dia"
                                    value={ weekDay }
                                    onChangeText={ text => setWeekDay(text) }
                                />
                            </View>
                            <View style={ styles.inputBlock }>
                                <Text style={ styles.label }>Horário</Text>
                                <TextInput 
                                    style={ styles.input }
                                    placeholderTextColor="#c1bccc" 
                                    placeholder="Hora"
                                    value={ time }
                                    onChangeText={ text => setTime(text) }
                                />
                            </View>
                        </View>
                        <RectButton style={ styles.submitButton } onPress={ searchTeachers }>
                            <Text style={ styles.submitButtonText }>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView 
                style={ styles.teacherList }
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16 }}>

                { teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={ teacher.userId }
                            teacher={ teacher }
                            favorite={favorites.includes(teacher.userId)}
                        />)
                }) }
            </ScrollView>
        </View>
    );
}

export default TeacherList;