var React = require('react-native')
var { PanResponder, View, StyleSheet, Dimensions, PropTypes} = React
var {height, width} = Dimensions.get('window');
var rebound = require('rebound');
var released = true;
var carousel = React.createClass({
  _panResponder: {},
  _previousLeft: 0,
  _currentPage:1,
  getInitialState() {
    return {
      currentPage: 1,
    };
  },
  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });

    this.springSystem = new rebound.SpringSystem();
    this._scrollSpring = this.springSystem.createSpring();
    var springConfig = this._scrollSpring.getSpringConfig();
    springConfig.tension = 230;
    springConfig.friction = 10;

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
    });

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
    return true;
  },

  _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user moves a touch over the circle?
    return true;
  },

  _handlePanResponderGrant: function(e: Object, gestureState: Object) {
    //this._highlight();
  },
  _handlePanResponderMove: function(e: Object, gestureState: Object) {
    this.released = false;
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
    this._scrollSpring.setEndValue( currentPage * width);
    this._currentPage = currentPage*-1 +1;
    if(this._currentPage > this.props.children.length){
      this._currentPage =1;
    }
    this.setState({currentPage:this._currentPage});
    console.log(this._currentPage);
  //  this._previousTop += gestureState.dy;
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
        <View key={i} style={{ borderRadius:this.props.pagerSize,width:this.props.pagerSize,height:this.props.pagerSize,margin:this.props.pagerMargin,backgroundColor:color }}></View>);
    }
    var left = (width - (this.props.children.length * (this.props.pagerSize+this.props.pagerMargin)))/2;
    return (
      <View style={{ flex: 1,width:width,flexDirection:'row', marginTop:this.props.pagerOffset,left:left,alignItems:'center' }}>
        {pager}
      </View>
    );
  },
  render() {

    return (
      <View style={{ flex: 1,width:this.props.width,height:this.props.height,flexDirection:'column', }}
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
