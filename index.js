var React = require('react-native')
var { PanResponder, View, StyleSheet, Dimensions, PropTypes} = React
var {height, width} = Dimensions.get('window');
var rebound = require('rebound');
var released = true;
var distinct = 0;
var previousPage=0;
var timer = null;
var carousel = React.createClass({
  _panResponder: {},
  _previousLeft: 0,
  _currentPage:1,
  _scrollSpring:null,
  springSystem:null,
  getInitialState() {
    return {
      currentPage: 1,
    };
  },
  componentWillUnmount: function() {
    //console.log('remove listener')
    this._scrollSpring.removeAllListeners();
  },
  componentWillMount: function() {
    width = this.props.width;
    height = this.props.height;
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });

    this.springSystem = new rebound.SpringSystem();
    this._scrollSpring = this.springSystem.createSpring();
    var springConfig = this._scrollSpring.getSpringConfig();
    springConfig.tension = 110;
    springConfig.friction = 30;
    var that = this;
    this._scrollSpring.addListener({
      onSpringUpdate: () => {
        if(this.released){
          this._previousLeft = this._scrollSpring.getCurrentValue();
          this.refs.scrollPanel.setNativeProps({
            style:{
              left:this._scrollSpring.getCurrentValue()
            }
          })
        }
      },
      onSpringEndStateChange:()=>{
        var that = this;
        if(that.props.speed){
          timer = setTimeout(function(){
            var currentPage = Math.floor((that._previousLeft+ width/2) / width);

            currentPage--;
            if(currentPage<that.props.children.length*-1){
              currentPage = -1;
              that._scrollSpring.setCurrentValue((currentPage+1)*width);
            }
            that.movePage(currentPage);
          },that.props.speed);
        }
      }
    });
    if(this.props.speed){
      timer = setTimeout(function(){
        currentPage = -1;
        that._scrollSpring.setCurrentValue((currentPage+1)*width);
        that.released = true;
        that.movePage(currentPage);
      },this.props.speed);
    }


  },
  onPressSlide:function(index){
    if(this.props.onPress){
      this.props.onPress(index);
    }
  },
  componentDidMount: function() {
//    this._updatePosition();
    this.refs.scrollPanel.setNativeProps({
      style:{
        left:this._previousLeft
      }
    })
  },

  _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user presses down on the circle?
    distinct=0;
    if(timer){
      clearTimeout(timer);
    }
    return true;
  },

  _handlePanResponderMove: function(e: Object, gestureState: Object) {
    if(timer){
      clearTimeout(timer);
    }
    this.released = false;
    distinct+=gestureState.dx;
    if(gestureState.dx+this._previousLeft< -1*(width*this.props.children.length)){
        this._previousLeft=gestureState.dx*-1;
    }

    if(gestureState.dx+this._previousLeft>0){
        this._previousLeft=width*-this.props.children.length - gestureState.dx;
    }

    this.refs.scrollPanel.setNativeProps({
      style:{
        left:gestureState.dx+this._previousLeft
      }
    })
    this._scrollSpring.setCurrentValue(gestureState.dx+this._previousLeft);
//    this._updatePosition();
  },
  _handlePanResponderEnd: function(e: Object, gestureState: Object) {
  //  this._unHighlight();
    this.released = true;
    this._previousLeft += gestureState.dx;
    var currentPage = Math.floor((this._previousLeft+ width/2) / width);

    if(currentPage==previousPage){
        if(gestureState.dx >50){
          currentPage++;
        }else if(gestureState.dx <-50){
          currentPage--;
        }else{
          var realCurrentPage = (currentPage*-1 +1) % (this.props.children.length+1);
          if(realCurrentPage==0){
            realCurrentPage=1
          }
          if(Math.abs(gestureState.dx)<10 && Math.abs(gestureState.dy)<10){
            this.onPressSlide(realCurrentPage);
          }

        }
    }
    this.movePage(currentPage);
  },
  movePage(currentPage){

    previousPage = currentPage;
    this._scrollSpring.setEndValue( currentPage * width);

    this._currentPage = currentPage*-1 +1;
    if(this._currentPage > this.props.children.length){
      this._currentPage =1;
    }
    this.setState({currentPage:this._currentPage});
  },

  getPager() {
    var pager = [];
    var color;
    for (var i = 0; i < this.props.children.length; i++) {

      if(i+1==this.state.currentPage){
        color=this.props.activePagerColor;
      }else{
        color=this.props.pagerColor;
      }

      pager.push(
        <View key={i} style={{ borderRadius:this.props.pagerSize/2,width:this.props.pagerSize,height:this.props.pagerSize,margin:this.props.pagerMargin,backgroundColor:color }}></View>);
    }
    var left = (width - (this.props.children.length * (this.props.pagerSize+this.props.pagerMargin)))/2;
    return (
      <View style={{ flex: 1,width:width,flexDirection:'row', position:'absolute',bottom:this.props.pagerOffset,left:left,alignItems:'center',backgroundColor:'transparent' }}>
        {pager}
      </View>
    );
  },
  render() {

    return (
      <View style={{ width:this.props.width,height:this.props.height,flexDirection:'column',overflow:'hidden' }}
        {...this._panResponder.panHandlers}
        >
        <View ref="scrollPanel" style={{ flex: 1,width:width*this.props.children.length,flexDirection:'row', }}>
        {this.props.children[this.props.children-1]}
        {this.props.children}
        {this.props.children[0]}
        </View>

        {this.getPager()}
      </View>
    );
  },

})

module.exports = carousel
