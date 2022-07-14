import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth';
import {idLogin} from './../tookit/loginSlice'
const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState("cuong@gmail.com");
    const [password, setPassword] = useState('123456');
    const [result , setresult] = useState("")
    const [secure, setSecure] = useState(true);
    const onClickPressLogin = async() => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {

                database().ref(`users/${res.user.uid}`)
                .once('value')
                .then(snapshot => {
                  const data = Object.values(snapshot.val())
                  console.log(data)
                  if(data[2]){
                    navigation.navigate('ListUser', {
                    data: res.user
                });
                AsyncStorage.setItem("idUser",res.user.uid)
                  }else {
                    setresult("Tài khoản của bạn bị chặn đăng nhập")
                  }
                })
              
            })
            .catch(error => {
                console.log(error)
                if (error.code === 'auth/email-already-in-use') {
                    SimpleToast.show("Invalid Email Id!");
                }
                if (error.code === 'auth/invalid-email') {
                    SimpleToast.show("Invalid Password Id!");
                }
            });
    }
   
    const updateSecureTextEntry = () => {
        setSecure(!secure);
      };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>App Chat KMA </Text>
            </View>

            <Animatable.View
                animation="fadeInUp"
                style={[
                    styles.footer,
                ]}>
                  {
                    result.length>0 &&  <Text style={styles.block}>{result} </Text>
                  }
                <Text style={[styles.text_footer,]}>Email </Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user"
                        style={styles.iconUser}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Email"
                        placeholderTextColor="green"
                        style={[
                            styles.textInput,
                        ]}
                        autoCapitalize="none"
                        onChangeText={val => setEmail(val)}
                    />
                </View>

                <Text style={[styles.text_footer]}>
                    Password
                </Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        style={styles.iconUser}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="green"
                        style={[
                            styles.textInput,
                        ]}
                        autoCapitalize="none"
                        secureTextEntry={secure}
                        onChangeText={val => setPassword(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {secure ? (
                            <FontAwesome name="eye" style={styles.securystyle} size={20} />
                        ) : (
                            <FontAwesome
                                name="eye-slash"
                                style={styles.securystyle}
                                size={20}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                {/* button login  */}
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={onClickPressLogin}>
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}>
                            <Text
                                style={[
                                    styles.textSign,
                                    {
                                        color: '#fff',
                                    },
                                ]}>
                                Sign In
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>


            </Animatable.View>
        </View>
    );
};
export default SignInScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009385',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 10,
        padding: 1,
    },
    action: {
        flexDirection: 'row',
        marginTop: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
    },
    textInput: {
        flex: 1,
        paddingLeft: 13,
    },
    iconUser: {
        marginTop: 12,
    },
    securystyle: {
        marginTop: 12,
    },
    button: {
        marginTop: 50,
    },
    buttonRegister: {
        marginTop: 20,
    },
    signIn: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
    },
    textSign: {
        color: 'red',
    },
    registerstyle: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
    },
    block:{
        color:"red"
    }
});