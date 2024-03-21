import {Text} from 'react-native';
import {COLORS} from '../../constants/theme';

const CalefonOnOffText = ({isDeviceOn}) => (
  <Text style={{fontSize: 18, color: COLORS.black, marginBottom: 10}}>
    Panel calefacor {isDeviceOn ? 'encendido' : 'apagado'}
  </Text>
);

export default CalefonOnOffText;
