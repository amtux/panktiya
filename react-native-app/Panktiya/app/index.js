import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Intro } from './layouts/intro';
import { Dashboard } from './layouts/dashboard';


// import { Container, Content, Icon } from 'native-base/src/ui';

export class Index extends Component {
    render(){
       return(
            <Intro onOpenNotification={this.onOpenNotification} />
       );
       return(
            <Dashboard />
       );
    }

    onOpenNotification(){
        PankityaDBManager.getPankti((pankti) => {
            this.setState({ 
                loading: false,
                pankti
            });
        });
    }
}

