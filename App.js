import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';

import {COLORS, SIZES, FONTS, icons} from './constants';

const App = () => {
  const [SelectedCompany, setSelectedCompany] = useState(null);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        let areaData = data.map(item => {
          return {
            code: item.alpha2Code,
            name: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`,
          };
        });
        setAreas(areaData);
        if (areaData.length > 0) {
          let defaultData = areaData.filter(a => a.code === 'US');

          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      });
  }, []);

  function renderHeader() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{padding: 15, fontSize: 22, color: COLORS.white, ...FONTS.h1}}>
          Job Application
        </Text>
      </View>
    );
  }
  function renderForm() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 3,
          marginHorizontal: SIZES.padding * 3,
        }}>
        {/* Full Name */}
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{color: COLORS.white, ...FONTS.body2}}>Full Name</Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter Full name"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
          />
        </View>
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{color: COLORS.white, ...FONTS.body2}}>Email</Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter Email Address"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            keyboardType="email-address"
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: COLORS.white, ...FONTS.body2,marginVertical: SIZES.padding}}>
            Select Company
          </Text>
          <Picker
            selectedValue={SelectedCompany}
            style={styles.picker}
            onValueChange={text => setSelectedCompany(text)}>
            <Picker.Item label="PaisaWapas" value="PaisaWapas" />
            <Picker.Item label="Google" value="Google" />
            <Picker.Item label="Amazon" value="Amazon" />
            <Picker.Item label="MicroSoft" value="MicroSoft" />
            <Picker.Item label="Vedantu" value="Vedantu" />
          </Picker>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: COLORS.white, ...FONTS.body2,marginVertical: SIZES.padding}}>Select Role</Text>
          <Picker
            selectedValue={SelectedCompany}
            style={styles.picker}
            onValueChange={text => setSelectedCompany(text)}>
            <Picker.Item
              label="Application Developer"
              value="Application Developer"
            />
            <Picker.Item
              label="FrontEnd Developer"
              value="Frontend Developer"
            />
            <Picker.Item label="Backend Developer" value="Backend Developer" />
            <Picker.Item
              label="FullStack Developer"
              value="FullStack Developer"
            />
            <Picker.Item label="DataScientist" value="DataScientist" />
          </Picker>
        </View>

        {/* Phone Number */}
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{color: COLORS.white, ...FONTS.body2}}>
            Phone Number
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 50,
                marginHorizontal: 5,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                flexDirection: 'row',
                ...FONTS.body2,
              }}
              onPress={() => setModalVisible(true)}>
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={icons.down}
                  style={{
                    width: 10,
                    height: 10,
                    tintColor: COLORS.white,
                  }}
                />
              </View>
              <View style={{justifyContent: 'center', marginLeft: 5}}>
                <Image
                  source={{uri: selectedArea?.flag}}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
              <View style={{justifyContent: 'center', marginLeft: 5}}>
                <Text style={{color: COLORS.white, ...FONTS.body3}}>
                  {selectedArea?.callingCode}
                </Text>
              </View>
            </TouchableOpacity>

            <TextInput
              style={{
                color: COLORS.white,
                height: 40,
                borderBottomWidth: 1,
                borderBottomColor: COLORS.white,
                marginVertical: SIZES.padding,
              }}
              placeholder="Enter Phone Number"
              placeholderTextColor="white"
              selectionColor="white"
              keyboardType="number-pad"
            />
          </View>
        </View>
      </View>
    );
  }
  function renderButton() {
    return (
      <View style={{margin: 30}}>
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: 'black',
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => alert('submit')}>
          <Text style={{color: 'white', ...FONTS.h2}}>Apply</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderAreaCodesModal() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{padding: SIZES.padding, flexDirection: 'row'}}
          onPress={() => {
            setSelectedArea(item);
            setModalVisible(false);
          }}>
          <Image
            source={{uri: item.flag}}
            style={{
              width: 30,
              height: 30,
              marginRight: 10,
            }}
          />
          <Text style={{...FONTS.body4}}>{item.name}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                height: 400,
                width: SIZES.width * 0.8,
                backgroundColor: COLORS.lightGreen,
                borderRadius: SIZES.radius,
              }}>
              <FlatList
                data={areas}
                renderItem={renderItem}
                keyExtractor={item => item.code}
                showsVerticalScrollIndicator={false}
                style={{
                  padding: SIZES.padding * 2,
                  marginBottom: SIZES.padding * 2,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient colors={[COLORS.green, COLORS.emerald]} style={{flex: 1}}>
        <ScrollView>
          {renderHeader()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
      {renderAreaCodesModal()}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    borderColor: 'red',

    backgroundColor: 'white',
  },
});

export default App;
