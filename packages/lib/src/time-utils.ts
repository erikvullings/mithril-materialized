/**
 * Shared utility functions for TimePicker and TimeRangePicker components
 */

export interface TimeValue {
  hours: number;
  minutes: number;
  amOrPm: 'AM' | 'PM';
}

export const addLeadingZero = (num: number): string => {
  return (num < 10 ? '0' : '') + num;
};

export const parseTime = (timeStr: string, twelveHour: boolean): TimeValue => {
  if (!timeStr) {
    return { hours: twelveHour ? 12 : 0, minutes: 0, amOrPm: 'AM' };
  }

  const parts = timeStr.trim().split(/[:\s]+/);
  if (parts.length < 2) {
    return { hours: twelveHour ? 12 : 0, minutes: 0, amOrPm: 'AM' };
  }

  let hours = parseInt(parts[0]) || 0;
  const minutes = parseInt(parts[1]) || 0;
  let amOrPm: 'AM' | 'PM' = 'AM';

  const upperStr = timeStr.toUpperCase();
  if (upperStr.includes('PM')) {
    amOrPm = 'PM';
  } else if (upperStr.includes('AM')) {
    amOrPm = 'AM';
  }

  if (twelveHour) {
    if (hours >= 12) {
      amOrPm = 'PM';
      if (hours > 12) hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
  }

  return { hours, minutes, amOrPm };
};

export const formatTime = (time: TimeValue, twelveHour: boolean): string => {
  if (!time) return '';

  const { hours, minutes, amOrPm } = time;
  const hoursStr = addLeadingZero(hours);
  const minutesStr = addLeadingZero(minutes);

  if (twelveHour) {
    return `${hoursStr}:${minutesStr} ${amOrPm}`;
  }

  let hours24 = hours;
  if (amOrPm === 'PM' && hours !== 12) {
    hours24 = hours + 12;
  } else if (amOrPm === 'AM' && hours === 12) {
    hours24 = 0;
  }

  return `${addLeadingZero(hours24)}:${minutesStr}`;
};

export const timeToMinutes = (time: TimeValue, twelveHour: boolean): number => {
  let h = time.hours;

  if (twelveHour) {
    if (time.amOrPm === 'PM' && h !== 12) h += 12;
    if (time.amOrPm === 'AM' && h === 12) h = 0;
  }

  return h * 60 + time.minutes;
};

export const generateHourOptions = (twelveHour: boolean, hourStep: number): number[] => {
  const start = twelveHour ? 1 : 0;
  const end = twelveHour ? 12 : 23;
  const hours: number[] = [];

  for (let i = start; i <= end; i += hourStep) {
    hours.push(i);
  }

  // Special case for 12-hour: include 12 first
  if (twelveHour && hourStep === 1) {
    return [12, ...hours.filter((h) => h !== 12)];
  }

  return hours;
};

export const generateMinuteOptions = (minuteStep: number): number[] => {
  const minutes: number[] = [];
  for (let i = 0; i < 60; i += minuteStep) {
    minutes.push(i);
  }
  return minutes;
};

export const isTimeDisabled = (
  hours: number,
  minutes: number,
  amOrPm: 'AM' | 'PM',
  minTime?: string,
  maxTime?: string,
  twelveHour?: boolean
): boolean => {
  if (!minTime && !maxTime) return false;

  const currentMins = timeToMinutes({ hours, minutes, amOrPm }, twelveHour || false);

  if (minTime) {
    const minParsed = parseTime(minTime, twelveHour || false);
    const minMins = timeToMinutes(minParsed, twelveHour || false);
    if (currentMins < minMins) return true;
  }

  if (maxTime) {
    const maxParsed = parseTime(maxTime, twelveHour || false);
    const maxMins = timeToMinutes(maxParsed, twelveHour || false);
    if (currentMins > maxMins) return true;
  }

  return false;
};

export const scrollToValue = (
  container: HTMLElement,
  index: number,
  itemHeight: number,
  animated: boolean = true
): void => {
  const scrollTop = index * itemHeight - (container.clientHeight / 2 - itemHeight / 2);

  if (animated) {
    container.scrollTo({ top: scrollTop, behavior: 'smooth' });
  } else {
    container.scrollTop = scrollTop;
  }
};

export const snapToNearestItem = (
  container: HTMLElement,
  itemHeight: number,
  onSnap: (index: number) => void
): void => {
  const scrollTop = container.scrollTop;
  const centerOffset = container.clientHeight / 2;
  const nearestIndex = Math.round((scrollTop + centerOffset - itemHeight / 2) / itemHeight);

  scrollToValue(container, nearestIndex, itemHeight, true);
  onSnap(nearestIndex);
};
