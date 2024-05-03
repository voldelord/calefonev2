export const MQTT_TOPICS = {
  ON_OFF: 'onoff',
  REFRESH: 'refresh',
  TEMPERATURE: 'temperature',
  TARGET_TEMPERATURE: 'target_temperature',
  TARGET_ECO: 'target_eco',
  TARGET_SMART: 'target_smart',
  POWER: 'power',
  TARGET_POWER: 'target_power',
  MODE: 'mode',
};

export const MQTT_DEVICE_MODES = {
  TEMPERATURE: 'Temperatura',
  SMART: 'Smart',
  ECHO: 'Eco',
  POWER: 'Potencia',
};

export const MQTT_MODE_TO_SCREEN = {
  [MQTT_DEVICE_MODES.TEMPERATURE]: 'TemperatureScreen',
  [MQTT_DEVICE_MODES.ECHO]: 'EcoScreen',
  [MQTT_DEVICE_MODES.POWER]: 'PowerScreen',
};
