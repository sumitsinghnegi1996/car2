import React from 'react';
import { Text, View } from 'react-native';

const SecondUserNotificationScreen = ({route, navigation}) => {
    const noti_second_user_id = route.params.noti_second_user_id;
    const noti_user_id = route.params.noti_user_id;
    const noti_body = route.params.noti_body;


    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>{noti_second_user_id} - {noti_user_id} - {noti_body}</Text>
        </View>
    )
}
export default SecondUserNotificationScreen;