import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';

import { IconButton } from '../../components';
import { Question, Option } from '../../components/Quizz';
import { COLORS, FONTS, SIZES, icons } from '../../constants';

import QuizeSingleChoice from 'react-native-react-native-quiz-single-choice';

const QuizSingleChoiceApp = () => {
    const data = [
        {
            question: 'Pendant la préhistoire, quelle période a suivi l’age de la pierre taillée ?',
            optionA: 'l’âge de la pierre polie',
            optionB: 'l’âge du fer',
            optionC: 'l’âge du bronze',
            optionD: 'l’âge de la pierre ponce',
            answer: 'l’âge de la pierre polie',
        },
        {
            question: 'Une personne qui parle couramment le français est :',
            optionA: 'Francilienne',
            optionB: 'Francophone',
            optionC: 'Tchatcheuse',
            optionD: 'Francophile',
            answer: 'Francophone',
        },
        {
            question: 'Quel petit signe place-t-on parfois sous la lettre C ?',
            optionA: 'Une virgule',
            optionB: 'Une cédille',
            optionC: 'Une apostrophe',
            optionD: 'Un petit cygne',
            answer: 'Une cédille',
        },
    ];
    return (
        <QuizeSingleChoice
            containerStyle={{ backgroundColor: COLORS.primary2, paddingTop: 30 }}
            questionTitleStyle={{ fontSize: 22, color: '#FFF' }}
            responseStyle={{
                borderRadius: 15,
                backgroundColor: '#FFF',
            }}
            responseTextStyle={{
                fontWeight: 'normal',
                color: '#000',
                ...FONTS.body3,
            }}
            selectedResponseStyle={{
                borderRadius: 15,
                backgroundColor: COLORS.primary,
                ...FONTS.body3,
            }}
            selectedResponseTextStyle={{
                fontSize: 14,
                fontWeight: 'normal',
                ...FONTS.body3,
            }}
            responseRequired={true}
            nextButtonText={'Next'}
            nextButtonStyle={{ backgroundColor: '#06d755' }}
            nextButtonTextStyle={{ color: '#FFF' }}
            prevButtonText={'Prev'}
            prevButtonStyle={{ backgroundColor: '#fa5541' }}
            prevButtonTextStyle={{ color: '#FFF' }}
            endButtonText={'Done'}
            endButtonStyle={{ backgroundColor: '#000' }}
            endButtonTextStyle={{ color: '#FFF' }}
            buttonsContainerStyle={{ marginTop: 'auto' }}
            onEnd={(results) => {
                console.log(results);
            }}
            data={data}
        />
    );
};
const DoExercise = ({ navigation, route }) => {
    // const { lesson } = route.params;
    return (
        // <View
        //     style={{
        //         flex: 1,
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         backgroundColor: COLORS.primary2,
        //     }}
        // >
        //     <IconButton
        //         icon={icons.back}
        //         iconStyle={{
        //             tintColor: COLORS.black,
        //         }}
        //         containerStyle={{
        //             position: 'absolute',
        //             top: 40,
        //             left: 20,
        //             width: 50,
        //             height: 50,
        //             alignItems: 'center',
        //             justifyContent: 'center',
        //             borderRadius: 25,
        //             backgroundColor: COLORS.white,
        //         }}
        //         onPress={() => navigation.navigate('DetailLesson', { selectedLesson: lesson })}
        //     />
        //     <Question />

        //     <Option value="option 1" onPress={(e) => console.log(e.target)} />
        //     <Option />
        //     <Option />
        //     <Option />
        // </View>
        <QuizSingleChoiceApp />
    );
};

export default DoExercise;
