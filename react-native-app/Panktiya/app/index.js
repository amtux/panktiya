import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Dashboard } from './layouts/dashboard';


// import { Container, Content, Icon } from 'native-base/src/ui';

export class Index extends Component {
    render(){
       return(
            <Dashboard />
       );
    }
}

