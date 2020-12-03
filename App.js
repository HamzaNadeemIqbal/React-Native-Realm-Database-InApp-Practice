/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
const Realm = require("realm");
class RealmDatabase extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null };
  }

  // package name is get through databasename.path or Realm.defaultpath which is usually project name such as /com.realmdatabaseinapppractice/
  // to see file path type command on console for android adb pull /data/data/<packagename>/files/
  // for ios
  // link for above https://medium.com/@agungsantoso/how-to-find-realm-file-3ecdce39a57b
  componentDidMount() {
    Realm.open({
      schema: [{ name: "Dog", properties: { name: "string" } }],
    }).then((realm) => {
      // console.log("db path ", realm.path);
      console.log("db file path is ", Realm.defaultPath);
      realm.write(() => {
        realm.create("Dog", { name: "Rex" });
      });
      this.setState({ realm });
    });
  }

  componentWillUnmount() {
    // Close the realm if there is one open.
    const { realm } = this.state;
    if (realm !== null && !realm.isClosed) {
      realm.close();
    }
  }

  render() {
    const info = this.state.realm
      ? "Number of dogs in this Realm: " +
        this.state.realm.objects("Dog").length
      : "Loading...";

    return (
      <View style={{ margin: 50 }}>
        <Text style={styles.welcome}>{info}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});

export default RealmDatabase;
