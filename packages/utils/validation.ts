export const ValidationMessageType = {
  REQUIRED: 'required',
  MIN_COUNT: 'min-count',
} as const;

export type ValidationMessageType = (typeof ValidationMessageType)[keyof typeof ValidationMessageType];

const validationMessages: Record<ValidationMessageType, string> = {
  [ValidationMessageType.REQUIRED]: 'Required',
  [ValidationMessageType.MIN_COUNT]: 'Must select at least :0: value',
};

const getMessage = (type: ValidationMessageType, replace: string[] = []) => {
  let message = validationMessages[type];

  for (let i = 0; i < replace.length; i++) {
    message = message.replace(`:${i}:`, replace[i]);
  }

  return message;
};

export const validationUtils = {
  getMessage,
};
