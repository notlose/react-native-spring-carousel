# react-native-spring-carousel

Carousel component for React Native implemented by View instead of ScrollView.

Support IOS and Android.

![My image](http://www.googledrive.com/host/0BwiaTbhy1w5COHdyWVBMcEJCRnc)

<a href="http://www.googledrive.com/host/0BwiaTbhy1w5CbXNDYXpQckxFZE0/">Buy me a coffee if you like this</a>

<a href="http://www.googledrive.com/host/0BwiaTbhy1w5CbXNDYXpQckxFZE0/"><img src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" border="0"></a>

## Install

```sh
$ npm install react-native-spring-carousel --save
```

## Usage
```js
require('react-native-spring-carousel');

...
onPressSlide(index){
  console.log(index);
},

render() {
          return (
                <Carousel
                width={width}
                height={height}
                pagerColor="#000"
                activePagerColor="#ff0000"
                pagerSize={10}
                pagerOffset={10}
                pagerMargin={2}
                speed={2000}
                onPress={this.onPressSlide}
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
```
## Update
0.3.2 remove listener onunmount

0.3.1 fixed onpress issue

0.3.0 added autoplay feature, you can define props - 'speed' to enable autoplay, remove speed to disable autoplay

0.2.1 bugs fixed

0.2.0 added onPress callback

## todo
custom styles
