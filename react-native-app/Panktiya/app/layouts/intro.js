import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text
} from 'react-native';

import AppIntro from 'react-native-app-intro';

import { Button, Text as TextNB } from 'native-base';

import PankityaNotificationsManager from '../helpers/PankityaNotificationsManager';

export class Intro extends Component {
      onSkipBtnHandle = (index) => {
    Alert.alert('Skip');
    console.log(index);
  }
  doneBtnHandle = () => {
    Alert.alert('Done');
  }
  nextBtnHandle = (index) => {
    Alert.alert('Next');
    console.log(index);
  }
  onSlideChangeHandle = (index, total) => {
    console.log(index, total);
  }
  render() {
    return (
      <AppIntro ref={(appintro) => {this._appintro = appintro;}}
                showSkipButton={false} 
                showDoneButton={true}
                lockedOn={[1]}>
        <View style={[styles.slide,{ backgroundColor: '#14C867' }]}>
          <View level={10}><Text style={[styles.fateh, styles.gurmukhi]}>vwihgurU jI kw Kwlsw</Text></View>
          <View level={15}><Text style={[styles.fateh, styles.gurmukhi]}>vwihgurU jI kI Piqh</Text></View>
          <View level={8} style={{marginTop: 30}}><Text style={styles.title}>Panktiya</Text></View>
          <View level={4}><Text style={styles.subtitle}>"Quotes"</Text></View>
          <View level={4} style={{marginTop: 20}}><Text style={styles.subtitle}>Notifications of Quotes from SGGS Ji</Text></View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#F8F8F8' }]}>
          <View level={-10}><Text style={styles.text}>Allow Push Notification</Text></View>
          <View level={5}><Text style={[styles.subtitle, { color: '#14C867', marginTop: 30 }]}>So you can be notified of new Panktiya</Text></View>
          <View level={1}><Button style={{marginTop: 30}} onPress={this.onPressOk.bind(this)}success><TextNB style={{fontSize: 20, color: '#fff'}}>OK</TextNB></Button></View>
        </View>
        <View style={[styles.slide,{ backgroundColor: '#fa931d' }]}>
          <View level={8}><Text style={styles.text}>Page 3</Text></View>
          <View level={0}><Text style={styles.text}>Page 3</Text></View>
          <View level={-10}><Text style={styles.text}>Page 3</Text></View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
          <View level={5}><Text style={styles.text}>Page 4</Text></View>
          <View level={10}><Text style={styles.text}>Page 4</Text></View>
          <View level={15}><Text style={styles.text}>Page 4</Text></View>
        </View>
      </AppIntro>
    );
  }
  onPressOk(){
    PankityaNotificationsManager.init((function(notification) {
        this.props.onOpenNotification();
    }).bind(this));
    this._appintro.goNext();
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  text: {
    color: '#14C867',
    fontSize: 30,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle:{
    color: '#fff',
    fontSize: 18,
  },
  desc:{
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  fateh:{
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  gurmukhi: {
    fontFamily: 'GurbaniAkharHeavy'
  }
});
