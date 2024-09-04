import {createStackNavigator} from "@react-navigation/stack";
import MentorBriefDetails from "../elements/MentorBriefDetails";
import MentorDetails from "./MentorDetails";
import {useNavigation} from "@react-navigation/native";

const Stack = createStackNavigator();

export default function StackMentorDetails() {

    // console.log('Rendering stack mentor details');
    return (
        <Stack.Navigator >
            {/*<Stack.Screen*/}
            {/*    name="MentorBriefDetails"*/}
            {/*    options={{ headerShown: false }}*/}
            {/*>*/}
            {/*    {(props) => (*/}
            {/*        <MentorBriefDetails*/}
            {/*            {...props}*/}
            {/*            navigateDetails={() => props.navigation.navigate('MentorDetails')}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*</Stack.Screen>*/}
            {/*<Stack.Screen*/}
            {/*    name='MentorDetails'*/}
            {/*    component={MentorDetails}*/}
            {/*    // options={{}}*/}
            {/*/>*/}
        </Stack.Navigator>
    )
}
