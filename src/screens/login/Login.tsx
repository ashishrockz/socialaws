import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={{backgroundColor: 'lightblue'}}>
      <View style={{alignItems: 'center', padding: 10, marginTop: 50}}>
        <Image
          source={require('../../assets/empLogin.png')}
          style={{width: 250, height: 250}}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}>
        <View style={{paddingTop: 30, alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: '800'}}>Employee Login</Text>
        </View>
        <View style={{padding: 20}}>
          <View style={{marginBottom: 20}}>
            <Text style={{marginBottom: 5, fontSize: 18}}>Mail:</Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: 'gray',
                fontSize: 18,
              }}
              placeholder="Enter your mail"
            />
          </View>

          <View style={{marginBottom: 20}}>
            <Text style={{marginBottom: 5, fontSize: 18}}>Password:</Text>
            <View
              style={{
                borderBottomWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  width: '90%',
                  fontSize: 18,
                }}
                placeholder="Enter your password"
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}>
                <Image
                  style={{width: 25, height: 25}}
                  source={
                    passwordVisible
                      ? require('../../assets/Eye.png')
                      : require('../../assets/Eyeoff.png')
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={{marginBottom: 20, alignItems:'flex-end'}}>
            <Text style={{marginBottom: 5, fontSize:18, color:'blue',borderBottomWidth:1,borderColor:'blue'}}>Forgoot Paswword</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#3b56dc',
              alignItems: 'center',
              padding: 20,
              borderRadius: 50,
            }}>
            <Text style={{color: 'white', fontSize: 18}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Login;
