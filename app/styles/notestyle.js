import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'body': {
    'height': [{ 'unit': '%V', 'value': 1 }],
    'overflow': 'hidden'
  },
  'html': {
    'height': [{ 'unit': '%V', 'value': 1 }],
    'overflow': 'hidden'
  },
  'divboard': {
    'height': [{ 'unit': '%V', 'value': 1 }],
    'overflow': 'hidden'
  },
  'div#react-container': {
    'height': [{ 'unit': '%V', 'value': 1 }],
    'overflow': 'hidden'
  },
  'body': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'displ': {
    'margin': [{ 'unit': '%V', 'value': 0.03 }, { 'unit': '%H', 'value': 0.03 }, { 'unit': '%V', 'value': 0.03 }, { 'unit': '%H', 'value': 0.03 }],
    'display': 'inline',
    'float': 'left'
  },
  'pdispl': {
    'margin': [{ 'unit': '%V', 'value': 0.02 }, { 'unit': '%H', 'value': 0.02 }, { 'unit': '%V', 'value': 0.02 }, { 'unit': '%H', 'value': 0.02 }],
    'display': 'inline',
    'float': 'left'
  },
  'yellowNote': {
    'backgroundColor': '#FFF9C4'
  },
  'divnote': {
    'height': [{ 'unit': 'px', 'value': 150 }],
    'width': [{ 'unit': 'px', 'value': 150 }],
    'color': 'black',
    'backgroundColor': '#FFF9C4',
    'paddingBottom': [{ 'unit': 'px', 'value': 10 }],
    'margin': [{ 'unit': 'px', 'value': 6 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '!important' }, { 'unit': 'px', 'value': 0 }],
    'border': [{ 'unit': 'px', 'value': 20 }],
    'margin': [{ 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 0 }],
    'position': 'relative',
    'cursor': '-webkit-grab',
    'Transition': 'all .2s ease-in-out',
    'MozTransition': 'all .2s ease-in-out',
    'WebkitTransition': 'all .2s ease-in-out'
  },
  'note:hover': {
    'WebkitTransform': 'scale(1.4)',
    'MozTransform': 'scale(1.2)',
    'transform': 'scale(1.2)'
  },
  'divnote:active': {
    'cursor': '-webkit-grabbing'
  },
  'divnote p': {
    'fontSize': [{ 'unit': 'px', 'value': 18 }],
    'padding': [{ 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 5 }],
    'backgroundColor': '#FFF9C4',
    'wordWrap': 'break-word'
  },
  'divnote:hover > span': {
    'opacity': '1'
  },
  'divnote > span': {
    'position': 'absolute',
    'bottom': [{ 'unit': 'px', 'value': 2 }],
    'right': [{ 'unit': 'px', 'value': 2 }],
    'opacity': '0',
    'transition': 'opacity .25s linear'
  },
  'divnote button': {
    'margin': [{ 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 2 }]
  },
  'divnote > textarea': {
    'height': [{ 'unit': '%V', 'value': 0.75 }],
    'background': 'rgba(255, 255, 255, 0.5)'
  },
  'glyphicon-plus': {
    'position': 'fixed',
    'top': [{ 'unit': 'px', 'value': 10 }],
    'right': [{ 'unit': 'px', 'value': 10 }]
  }
});
