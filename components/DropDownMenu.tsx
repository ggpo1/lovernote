import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Emit from '../data/Emit';
import DropDownItems from '../data/DropDownItems';
import Page from '../models/Page';
import BackButtonPrevPage, { setBackPage } from '../data/BackButtonPrevPage';


export default class DropDownMenu extends React.Component {

    public itemClickHandle = (selectedPage: number) => {
        setBackPage(Page.PROFILE);
        Emit.emit('setIsDropDownMenuEmit', false);
        Emit.emit('routerSetPage', selectedPage);
    };

    render() {

        const top = 50,
            left = 0,
            padding = 10,
            width = '100%',
            height = '40%';


        let _dropDownItems: Array<JSX.Element> = [];
        DropDownItems.ru.forEach((el) => _dropDownItems.push(
            <TouchableOpacity key={`${el.page}_${el.title}`} style={[styles.titleOpacity, { width }]} onPress={() => this.itemClickHandle(el.page)}>
                <Text style={styles.menuTitles}>{el.title}</Text>
            </TouchableOpacity>
        ));

        return (
            <TouchableWithoutFeedback style={{ zIndex: 999999 }} onPress={() => Emit.emit('setIsDropDownMenuEmit', false)}>
                <View style={styles.container}>
                    <View style={[styles.menu, { top, left, width, height, padding, paddingLeft: padding + 20 }]}>
                        {_dropDownItems}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    menu: {
        position: 'absolute',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        borderRadius: 10,
        opacity: 0.95,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 11,
    },
    titleOpacity: {
        // backgroundColor: 'red',
        justifyContent: 'center'
    },
    menuTitles: {
        fontSize: 25,
        // letterSpacing: 2
    },
});

