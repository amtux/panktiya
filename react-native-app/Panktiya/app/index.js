import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Slider from 'react-native-slider';

import PankityaDBManager from './helpers/PankityaDBManager';
import PankityaNotificationsManager from './helpers/PankityaNotificationsManager';

export class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            numberOfNotifcations: 0,
            loading: true,
            pankti: null
        };
        PankityaNotificationsManager.init((function(notification) {
            PankityaDBManager.getPankti((pankti) => {
                this.setState({ 
                    loading: false,
                    pankti
                });
            });
        }).bind(this));
    }
    render() {
        if(this.state.loading){
            return(
                <View style={styles.container}>
                {this.renderSlider()}
                </View>
            );
        }
        return (
            <View style={styles.container}>
            {this.renderSlider()}
            {this.state.pankti.verses.map(this.renderVerse.bind(this))}
            {this.renderWriter(this.state.pankti.writer)}
            </View>
        );
    }
    renderSlider(){
        return(
            <View style={{marginBottom: 60, padding: 15,}}>
                <Slider value={this.state.numberOfNotifcations}
                        trackStyle={iosStyles.track}
                        thumbStyle={iosStyles.thumb}
                        minimumTrackTintColor='#1073ff'
                        maximumTrackTintColor='#b7b7b7'
                        maximumValue={5}
                        step={1}
                        onValueChange={(value) => {
                            this.setState({numberOfNotifcations: value});
                            PankityaNotificationsManager.setNumberOfNotifications(value);
                        }} />
                <Text>
                    You will receive {this.state.numberOfNotifcations == 1 ? this.state.numberOfNotifcations +' pankti' : this.state.numberOfNotifcations +' panktiya'} daily{this.state.numberOfNotifcations > 1 ? ' every '+(4-(this.state.numberOfNotifcations-4))+' hrs between 8 am and 8 pm.' : (this.state.numberOfNotifcations == 1 ? ' at 8 am.': '.')}
                </Text>
            </View>
        );
    }
    renderVerse(verse, id){
        var gurmukhi = verse['gurmukhi'].replace('Â', '');
        return(
            <View key={id} style={[styles.verse, {borderBottomWidth: id == this.state.pankti.verses.length-1 ? 0 : 1}]}>
                <Text style={styles.gurmukhi}>
                    {gurmukhi}
                </Text>
                <Text style={styles.english_ssk}>
                    {verse['english_ssk']}
                </Text>
            </View>
        );
    }
    renderWriter(writer){
        return(
            <View>
               <Text style={styles.writer}>— {writer}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    // justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  verse:{
    borderBottomWidth: 1,
    padding: 15,
    borderBottomColor: 'gray'
  },
  gurmukhi: {
    fontSize: 23,
    textAlign: 'center',
    paddingBottom: 10,
    fontFamily: 'GurbaniAkharHeavy'
  },
  english_ssk: {
    fontSize: 15,
    textAlign: 'center',
  },
  writer: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'right',
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
});


var iosStyles = StyleSheet.create({
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