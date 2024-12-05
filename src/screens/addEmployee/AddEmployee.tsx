import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
 
} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import CheckBox from 'react-native-check-box';
const data = [
  {label: 'BA', value: 'BA'},
  {label: 'Development', value: 'Development'},
  {label: 'Designing', value: 'Designing'},
  {label: 'UI', value: 'UI'},
  {label: 'Testing', value: 'Testing'},
  {label: 'HR', value: 'HR'},
  {label: 'Manager', value: 'Manager'},
  {label: 'System Admin', value: 'System Admin'},
];
const admin = [
  {label: 'True', value: 'true'},
  {label: 'False', value: 'false'},
];
const AddEmployee = () => {
  const [department, setDepartment] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState('');

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Add Employee</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Employee Id:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your new employeeId"
            placeholderTextColor="gray"
          />
        </View>
        <View style={[styles.inputGroup, styles.nameContainer]}>
          <View style={styles.halfWidthInputGroup}>
            <Text style={styles.label}>First Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Jhon"
              placeholderTextColor="gray"
            />
          </View>
          <View style={styles.halfWidthInputGroup}>
            <Text style={styles.label}>Last Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Doe"
              placeholderTextColor="gray"
            />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Office Mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your office mail"
            placeholderTextColor="gray"
          />
        </View>
        <View
          style={[
            styles.inputGroup,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <Text style={[styles.label, {width: 120}]}>Department:</Text>
          <Dropdown
            data={data}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder="Select department"
            value={department}
            onChange={item => {
              setDepartment(item.value);
            }}
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            containerStyle={styles.dropdownContainer}
            itemTextStyle={styles.itemTextStyle}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Phone number"
            placeholderTextColor="gray"
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
        <View
          style={[
            styles.inputGroup,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>          
          <Text style={[styles.label,{width:100}]}>Admin:</Text>
          <Dropdown
            data={admin}
            maxHeight={100}
            labelField="label"
            valueField="value"
            placeholder="Select department"
            value={isAdmin}
            onChange={item => {
              setIsAdmin(item.value);
            }}
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            containerStyle={styles.dropdownContainer}
            itemTextStyle={styles.itemTextStyle}
          />
        </View>
        <TouchableOpacity
            style={{
              backgroundColor: '#3b56dc',
              alignItems: 'center',
              padding: 20,
              borderRadius: 50,
            }}>
            <Text style={{color: 'white', fontSize: 18}}>Signup</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '',
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidthInputGroup: {
    width: '48%',
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    fontSize: 18,
    height: 40,
    color: '#333',
  },
  dropdown: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 50,
    width: 200,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  selectedTextStyle: {
    fontSize: 18,
    color: '#333',
  },
  placeholderStyle: {
    fontSize: 18,
    color: 'gray',
  },
  dropdownContainer: {
    borderBottomWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  itemTextStyle: {
    fontSize: 18,
    padding: 10,
    color: '#333',
  },
});

export default AddEmployee;
