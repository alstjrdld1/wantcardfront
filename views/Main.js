import React, {useState, useEffect} from 'react';

import constant from '../Constants';

import {SafeAreaView, View, Text} from 'react-native';

function Main({route, navigation}){
    const [listItems, setListItems] = useState([]);

    const uid = route.params.uid;

    useEffect(() => {
        fetch(constant.BASEURL + 'card', { // from constant.js. Then load server URL for requesting API.
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: uid
            })
        })
        .then((response) => {
            if(response.status == 200){
                console.log("Card List Received!");
            }
            else{
                console.log(response.status);
            }
            return response.json();
        })
        .then((data) => {
            setListItems(data);
            console.log(data);
        });
    }, []);

    return(
        <SafeAreaView>
            {listItems.map((item, index) => (
                <Text key={index}>{item.card_file_name}{item.card_nickname}</Text>
            ))}
        </SafeAreaView>
    );
};

export default Main;