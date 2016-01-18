# react-native-spring-carousel

Carousel component for React Native implemented by View instead of ScrollView.
Support IOS and Android.


## Install

```sh
$ npm install react-native-spring-carousel --save
```

## Usage
```js
require('react-native-spring-carousel');

...


render() {
          return (
                <Carousel width={width}
                pagerColor="#000"
                activePagerColor="#ff0000"
                pagerSize={10}
                pagerMargin={2}
                >
                   <View style={{width:width,height:300,backgroundColor:'#aaa',}}>
                     <Text>Page 1</Text>
                   </View>
                   <View style={{width:width,height:300,backgroundColor:'#bbb',}}>
                     <Text>Page 2</Text>
                   </View>
                   <View style={{width:width,height:300,backgroundColor:'#ccc',}}>
                     <Text>Page 3</Text>
                   </View>
                </Carousel>
          );
      }
