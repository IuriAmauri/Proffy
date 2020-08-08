import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import styles from './styles';

function Landing() {
    return (
        <View style={ styles.container }>
            <Image source={ landingImg } style={ styles.banner }/>
            <Text style={ styles.title }>
                Seja bem-vindo, {'\n'}
                <Text style={ styles.titleBold }>O quer deseja fazer?</Text>
            </Text>
            <View style={ styles.buttonsContainer }>
                <TouchableOpacity style={ [styles.button, styles.buttonPrimary] }>
                    <Image source={ studyIcon }/>
                    <Text style={ styles.buttonText }>Estudar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ [styles.button, styles.buttonSecondary] }>
                    <Image source={ giveClassesIcon }/>
                    <Text style={ styles.buttonText }>Dar Aulas</Text>
                </TouchableOpacity>
            </View>
            <Text style={ styles.totalConnections }>
                Total de 285 conexões realizadas {' '}
                <Image source={heartIcon}></Image>
            </Text>
        </View>
    );
}

export default Landing;