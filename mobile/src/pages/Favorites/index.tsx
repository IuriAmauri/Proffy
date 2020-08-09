import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import  AsyncStorage  from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import styles from './styles';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
      )
    
    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoriteTeachers = JSON.parse(response);
                const favoriteTeachersIds = favoriteTeachers.map((teacher: Teacher) => {
                    return teacher;
                });

                setFavorites(favoriteTeachersIds);
            }
        })
    }

    return (
        <View style={ styles.container }>
            <PageHeader title="Meus proffys favoritos"/>

            <ScrollView 
                style={ styles.teacherList }
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}>
                
                { favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={ teacher.id }
                            teacher={ teacher }
                            favorite
                        />)
                }) }
            </ScrollView>
        </View>
    );
}

export default Favorites;