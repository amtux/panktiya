import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import Slider from 'react-native-slider';

import { takeSnapshot, dirs } from "react-native-view-shot";
const { CacheDir } = dirs;
import Icon from 'react-native-vector-icons/FontAwesome';

import PankityaDBManager from '../helpers/PankityaDBManager';
import PankityaNotificationsManager from '../helpers/PankityaNotificationsManager';

import { Content, Button } from 'native-base';

import RNInstagramShare from 'react-native-instagram-share';

export class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            numberOfNotifcations: this.props.count,
            pankti: null
        };
        
    }
    setPankti(pankti){
        this.setState({ pankti });
    }
    render() {
        if(!this.state.pankti){
            return(
                <View style={styles.container}>
                {this.renderSlider()}
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Content contentContainerStyle={styles.content}>
                    {this.renderSlider()}
                    <View ref="pankti" style={{backgroundColor: '#F8F8F8', paddingBottom: 15}}>
                        {this.state.pankti.verses.map(this.renderVerse.bind(this))}
                        {this.renderWriter(this.state.pankti.writer)}
                    </View>
                    {this.renderShareButtons()}
                </Content>
            </View>
        );
    }
    renderSlider(){
        return(null);
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
                            var AppStore = {
                                "completedTutorial" : true,
                                "notificationsCount": value
                            };
                            AsyncStorage.setItem('@AppStore', JSON.stringify(AppStore));
                        }} />
                <Text>
                    You will receive {this.state.numberOfNotifcations == 1 ? this.state.numberOfNotifcations +' pankti' : this.state.numberOfNotifcations +' panktiya'} daily{this.state.numberOfNotifcations > 1 ? ' every '+(4-(this.state.numberOfNotifcations-4))+' hrs between 8 am and 8 pm.' : (this.state.numberOfNotifcations == 1 ? ' at 8 am.': '.')}
                </Text>
            </View>
        );
    }
    renderShareButtons(){
        return(
            <View style={styles.shareButtonsContainer}>
                <Text style={{marginBottom: 10, color: "#757474"}}>Spread Gurmat</Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={()=>{this.onPressSocialButton('instagram')}}>
                        <Icon name='instagram' size={30} color="gray" style={styles.button}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.onPressSocialButton('facebook')}}>
                        <Icon name='facebook' size={25} color="gray" style={[styles.button, {top: 3}]}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.onPressSocialButton('twitter')}}>
                        <Icon name='twitter' size={30} color="gray" style={styles.button}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.onPressSocialButton('whatsapp')}}>
                        <Icon name='whatsapp' size={30} color="gray" style={styles.button}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    renderVerse(verse, id){
        var gurmukhi = verse['gurmukhi'].replace('Â', '');
        return(
            <View key={id} style={[styles.verse, {borderBottomWidth: id == this.state.pankti.verses.length-1 ? 0 : 1}]}>
                {this.renderVishraamGurmukhi(gurmukhi, verse['vishraam'] ? verse['vishraam'].split(',') : null, verse['green_vishraam'] ? verse['green_vishraam'].split(',') : null)}
                {/*<Text style={styles.gurmukhi}>
                    {gurmukhi}
                </Text>*/}
                <Text style={styles.english_ssk}>
                    {verse['english_ssk']}
                </Text>
            </View>
        );
    }
    renderVishraamGurmukhi(gurmukhi, vishraam, green_vishraam, index = 0){
        if(vishraam || green_vishraam){
            var newVishraam = null;
            var newGreenVishraam = null;
            var vishraamColor = null;
            var i = null;
            if(vishraam && vishraam.length > 0 && !green_vishraam){
                i = vishraam.pop();
                vishraamColor = '#e74c3c';
                if(vishraam.length > 0){
                 newVishraam = vishraam;
                }
            }
            else if(!vishraam && green_vishraam.length > 0 && green_vishraam){
                i = green_vishraam.pop();
                vishraamColor = '#2ecc71';
                if(green_vishraam.length > 0){
                    newGreenVishraam = green_vishraam;
                }
            }
            else if(vishraam.length > 0 && green_vishraam.length > 0){
                // var i = null;
                if(vishraam[0] < green_vishraam[0]){
                    i = vishraam.pop();
                    vishraamColor = '#e74c3c';
                }
                else{
                    i = green_vishraam.pop();
                    vishraamColor = '#2ecc71';
                }

                if(vishraam.length > 0){
                    newVishraam = vishraam;
                }
                if(green_vishraam.length > 0){
                    newGreenVishraam = green_vishraam;
                }
            }

            var part1 = gurmukhi.substring(index, i-index-1);
            var part1LastIndexOfSpace = part1.lastIndexOf(' ');
            if(part1LastIndexOfSpace != -1){
                if((i - part1LastIndexOfSpace) != 1){
                    i = part1LastIndexOfSpace+1;
                    part1 = gurmukhi.substring(index, i-index-1);
                }
            }
            var vishraamNextSpaceIndex = (gurmukhi.substring(i-index, gurmukhi.length)).indexOf(' ');
            var vishraamWordEndIndex =  vishraamNextSpaceIndex != -1 ? part1.length+vishraamNextSpaceIndex+1 : gurmukhi.length;
            var part2 = gurmukhi.substring(i-index-1,  vishraamWordEndIndex);
            return(
                <Text style={styles.gurmukhi}>
                    {part1}
                    <Text style={[styles.gurmukhi, {color: vishraamColor}]}>
                        {part2}
                    </Text> 
                    {this.renderVishraamGurmukhi(gurmukhi.substring(vishraamWordEndIndex, gurmukhi.length), newVishraam, newGreenVishraam)}
                </Text>
            );
        }
        return(
            <Text style={styles.gurmukhi}>{gurmukhi}</Text>
        );
        
    }
    renderWriter(writer){
        return(
            <View style={{flexDirection: 'row'}}>
               <View style={{flex: 1, justifyContent: 'flex-end', paddingLeft: 10}}>
               {this.state.preScreenShot ? <Text style={{fontSize: 10, color: '#757474'}}>Panktiya App</Text> : null}
               </View>
               <View>
               <Text style={styles.writer}>— {writer}</Text>
               </View>
            </View>
        );
    }
    takeScreenShot(cb){
        this.setState({
            preScreenShot: true
        }, ()=>{
            setTimeout(()=>{
            takeSnapshot(this.refs['pankti'], { path: CacheDir+"/pankti_ss.png" })
            .then(
            uri => {
                this.setState({
                    preScreenShot: false
                });
                cb(uri);
            },
            error => console.error("Oops, snapshot failed", error)
            );
            }, 200);
        });
        
    }
    onPressSocialButton(platform){
        if(platform == 'instagram'){
            this.takeScreenShot((uri) => {
                RNInstagramShare.share(uri, null);
            });
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
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
    // fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'right',
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  shareButtonsContainer: {
      alignItems: 'center',
      marginTop: 70,
      marginBottom: -120
  },
  button:{
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10,
  }
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