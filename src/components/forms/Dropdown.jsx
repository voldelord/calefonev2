import {StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';

const Dropdown = ({
  items,
  defaultButtonText,
  disabled,
  buttonTextAfterSelection,
  rowTextForSelection,
  onSelect,
  onChange,
  name,
}) => {
  const handleSelect = (selectedItem, index) => {
    onSelect?.(selectedItem, index);

    onChange?.({target: {value: selectedItem, name}});
  };

  return (
    <SelectDropdown
      data={items}
      disabled={disabled}
      onSelect={handleSelect}
      defaultButtonText={defaultButtonText}
      buttonStyle={styles.dropdownBtnStyle}
      buttonTextStyle={styles.dropdownBtnTxtStyle}
      buttonTextAfterSelection={buttonTextAfterSelection}
      dropdownIconPosition={'right'}
      dropdownStyle={styles.dropdownDropdownStyle}
      rowStyle={styles.dropdownRowStyle}
      rowTextStyle={styles.dropdownRowTxtStyle}
      renderDropdownIcon={isOpened => (
        <Entypo name={isOpened ? 'chevron-up' : 'chevron-down'} size={24} />
      )}
      rowTextForSelection={rowTextForSelection}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#ccc',
    width: '100%',
  },
  dropdownBtnStyle: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderColor: '#444',
    paddingHorizontal: 0,
  },
  dropdownBtnTxtStyle: {color: '#444', textAlign: 'left', fontSize: 14},
  dropdownDropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdownRowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdownRowTxtStyle: {color: '#444', textAlign: 'left', fontSize: 14},
});

export default Dropdown;
