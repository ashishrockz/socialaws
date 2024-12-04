import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';

const Login = () => {
  return (
    <SafeAreaView style={{backgroundColor: 'lightblue'}}>
      <View style={{alignItems: 'center', padding: 10, marginTop: 50}}>
        <Image
          source={require('../../assets/empLogin.png')}
          style={{width: 250, height: 250}}
        />
      </View>
      <View style={{backgroundColor: 'white',borderTopLeftRadius:50,borderTopRightRadius:50}}>
        <View style={{paddingTop: 30, alignItems: 'center'}}>
          <Text style={{fontSize: 20,fontWeight:'800'}}>Employee Login</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
