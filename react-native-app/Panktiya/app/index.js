import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppState,
  AsyncStorage
} from 'react-native';

import { Intro } from './layouts/intro';
import { Dashboard } from './layouts/dashboard';

import PankityaDBManager from './helpers/PankityaDBManager';
import PankityaNotificationsManager from './helpers/PankityaNotificationsManager';

lastSlide = false;

export class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            completedTutorial: false,
            currentAppState: null,
            notificationsCount: null
        };
    }
    async componentDidMount() {
        // AsyncStorage.setItem('@AppStore', 'null');
        AppState.addEventListener('change', this._handleAppStateChange.bind(this));
        try {
            const value = await AsyncStorage.getItem('@AppStore');

            if(value != null && value != 'null'){
                var AppStore = JSON.parse(value);
                this.setState({
                    loading: false,
                    completedTutorial: AppStore.completedTutorial,
                    notificationsCount: parseInt(AppStore.notificationsCount)
                });
            }
            else{
                this.setState({
                    loading: false
                });
            }
        } catch (error) {
        }

        this.onOpenNotification();
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
    }
    _handleAppStateChange(currentAppState) {
      if(currentAppState == 'background' && lastSlide && !this.state.completedTutorial){
        PankityaNotificationsManager.setInitialNotif();
        var AppStore = {
            "completedTutorial" : true,
            "notificationsCount": 5
        };
        AsyncStorage.setItem('@AppStore', JSON.stringify(AppStore));
        this.setState({
            completedTutorial: true,
            notificationsCount: 5
        });
      }
    }
    render(){
       if(this.state.loading){
            return(null);
       }
       if(!this.state.completedTutorial){
        return(
                <Intro onOpenNotification={this.onOpenNotification.bind(this)} 
                    onLastSlide={()=>{lastSlide = true}}
                    onNotLastSlide={()=>{lastSlide = false}} />
        );
       }
        return(
            <Dashboard ref={(dashboard) => {this._dashboard = dashboard;}}
                       count={this.state.notificationsCount} />
        );
       
    }

    onOpenNotification(){
        PankityaDBManager.getPankti(((pankti) => {
            // alert(JSON.stringify(pankti));
            this._dashboard.setPankti(pankti);
        }).bind(this));
    }
}

