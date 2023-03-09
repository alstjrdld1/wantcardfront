import React, {useState, useEffect} from 'react';
import type {Node} from 'react';

import constant from '../Constants';

import {SafeAreaView, Text} from 'react-native';

function Main({route, navigation}){
    const uid = route.params.uid;

    useEffect(() => {
        fetch(constant.BASEURL + '/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: uid,
            }),
        }).then((response) => response.json())
        .catch((error)=>{
            console.error(error);
        });
    }, []);

    return(
        <SafeAreaView>
            <Text>
                Hello Main! 
            </Text>
            <Text>
                UID : {uid}
            </Text>
        </SafeAreaView>
    );
};

export default Main;