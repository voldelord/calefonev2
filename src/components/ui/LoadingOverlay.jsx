import {useLoadingOverlayStore} from '../../stores/loadingOverlayStore';

const {ActivityIndicator} = require('react-native');
const {default: ReactNativeModal} = require('react-native-modal');
const {COLORS} = require('../../constants/theme');

const LoadingOverlay = () => {
  const isVisible = useLoadingOverlayStore(state => state.isLoading);

  return (
    <ReactNativeModal isVisible={isVisible}>
      <ActivityIndicator size={'large'} color={COLORS.primary} />
    </ReactNativeModal>
  );
};

export default LoadingOverlay;
