import { ChildInt } from '../interfaces/Interfaces';
export default function importNativeNameGenerator(child: ChildInt) {
  switch (child.componentName) {
    case 'RNView':
      return 'View';
    case 'RNSafeAreaView':
      return 'SafeAreaView';
    case 'RNButton':
      return 'Button';
    case 'RNFlatList':
      return 'FlatList';
    case 'RNImage':
      return 'Image';
    case 'RNModal':
      return 'Modal';
    case 'RNSwitch':
      return 'Switch';
    case 'RNText':
      return 'Text';
    case 'RNTextInput':
      return 'TextInput';
    case 'RNTouchOpacity':
      return 'TouchableOpacity';
    default:
      return 'div';
  }
}
