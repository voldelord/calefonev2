const {View, ActivityIndicator} = require('react-native');
const {COLORS} = require('../../constants/theme');

const LoadingView = () => (
  <View style={{flex: 1}}>
    <ActivityIndicator size={'large'} color={COLORS.primary} />
  </View>
);

export default LoadingView;
