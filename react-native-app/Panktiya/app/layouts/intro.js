import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import AppIntro from 'react-native-app-intro';

import Slider from 'react-native-slider';

import { Button, Text as TextNB } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import PankityaNotificationsManager from '../helpers/PankityaNotificationsManager';

export class Intro extends Component {
  constructor(props){
    super(props);
  }
  onSlideChangeHandle = (index, total) => {
    console.log(index, total);
  }
  render() {
    return (
      <AppIntro ref={(appintro) => {this._appintro = appintro;}}
                showSkipButton={false} 
                showDoneButton={true}
                lockedOn={[1, 2, 3]}>
        <View style={[styles.slide,{ backgroundColor: '#14C867' }]}>
          <View level={10}><Text style={[styles.fateh, styles.gurmukhi]}>vwihgurU jI kw Kwlsw</Text></View>
          <View level={15}><Text style={[styles.fateh, styles.gurmukhi]}>vwihgurU jI kI Piqh</Text></View>
          <View level={8} style={{marginTop: 30}}><Text style={styles.title}>Panktiya</Text></View>
          <View level={4}><Text style={styles.subtitle}>(Quotes)</Text></View>
          <View level={4} style={{marginTop: 20}}><Text style={styles.subtitle}>Notifications of Quotes from SGGS Ji</Text></View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#fff' }]}>
          <View level={-10}><Text style={styles.text}>Allow Push Notification</Text></View>
          <View level={5}><Text style={[styles.subtitle, { color: '#14C867', marginTop: 30, marginBottom: 15 }]}>So you can get notifications for new Panktiya (Quotes)</Text></View>
          <Image level={5} source={require('../images/pankti-notif-ios.png')} resizeMode={Image.resizeMode.contain} style={styles.iosPanktiNotif} />
          <View level={1}><Button style={{marginTop: 30}} onPress={this.onPressOk.bind(this)}success><TextNB style={{fontSize: 20, color: '#fff'}}>OK</TextNB></Button></View>
        </View>
        <View style={[styles.slide,{ backgroundColor: '#14C867' }]}>
          <View level={8}><Text style={styles.title}>One more thing...</Text></View>
          <View level={0}><Text style={[styles.subtitle, {marginTop: 30}]}>How many Panktiya (Quotes) would you like receive everyday?</Text></View>
          <View level={-10} style={{marginTop: 10, flexDirection: 'row'}}>
            <Button style={{marginRight: 3}} onPress={() => {this.onPressNumber.bind(this)(1)}} success><TextNB style={{fontSize: 20, color: '#fff'}}>1</TextNB></Button>
            <Button style={{marginRight: 3}} onPress={() => {this.onPressNumber.bind(this)(2)}} success><TextNB style={{fontSize: 20, color: '#fff'}}>2</TextNB></Button>
            <Button style={{marginRight: 3}} onPress={() => {this.onPressNumber.bind(this)(3)}} success><TextNB style={{fontSize: 20, color: '#fff'}}>3</TextNB></Button>
            <Button style={{marginRight: 3}} onPress={() => {this.onPressNumber.bind(this)(4)}} success><TextNB style={{fontSize: 20, color: '#fff'}}>4</TextNB></Button>
            <Button style={{marginRight: 3}} onPress={() => {this.onPressNumber.bind(this)(5)}} success><TextNB style={{fontSize: 20, color: '#fff'}}>5</TextNB></Button>
          </View>
          <View level={-10}><Text style={styles.text}>Page 3</Text></View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#fff' }]}>
          <View level={-10}><Text style={styles.text}>Try it out!</Text></View>
          <View level={8}><Text style={[styles.subtitle, {color: '#14C867', marginTop: 30, marginBottom: 80}]}>Press the HOME button to receive a new pankti.</Text></View>
          <Icon name='long-arrow-down' size={60} color="#01AB6C"/>
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
  onPressNumber(number){
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
    textAlign: 'center'
  },
  subtitle:{
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
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
  },
  iosPanktiNotif:{
    height: 70
  },
  line1:{
    height: 100,
    borderLeftWidth: 1,
    borderColor: '#01AB6C'
  },
  line2:{
    transform: [
      {rotate: '45deg'}
    ],
    height: 100,
    borderLeftWidth: 1,
    borderColor: '#01AB6C'
  }
});


var sliderStyles = StyleSheet.create({
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 30,
    height: 30,
    top: 22,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.35,
  }
});