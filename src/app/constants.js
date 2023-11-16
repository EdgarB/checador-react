export const START_WORK_TIME = '09:00';
export const START_MEAL_TIME = '13:00';
export const END_MEAL_TIME   = '14:00';
export const END_WORK_TIME   = '18:00';

export const START_WORK_LOG_TYPE = 'Entrada del dia';
export const START_MEAL_LOG_TYPE = 'Salida a comer';
export const END_MEAL_LOG_TYPE = 'Regreso de comer';
export const END_WORK_LOG_TYPE = 'Salida del dia';

export const TIMES_BY_LOG_TYPE = {
  [START_WORK_LOG_TYPE]: START_WORK_TIME,
  [START_MEAL_LOG_TYPE]: START_MEAL_TIME,
  [END_MEAL_LOG_TYPE]: END_MEAL_TIME,
  [END_WORK_LOG_TYPE]: END_WORK_TIME,
}

export const ON_TIME_LOG_STATE = 'On time';
export const LATE_LOG_STATE = 'Late';
export const JUSTIFIED_LOG_STATE = 'Justified'