# react-native-spring-carousel

# Carousel component for React Native implemented by View



## Install

```sh
$ npm install react-native-spring-carousel --save
```

## Usage
```js
render() {
          return (
            <Drawer
              captureGestures={false}
              acceptPan={false}
              openDrawerThreshold={100}
              openDrawerOffset={0.2}
              relativeDrag={false}
              ref="drawer"
              content={<ControlPanel closeDrawer={this.closeControlPanel}/>}
              closeDrawer={this.closeControlPanel}
              >
              <View>
                <HeaderPanel onMenuPress={this.openControlPanel}/>
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
              </View>
            </Drawer>
          );
      }
