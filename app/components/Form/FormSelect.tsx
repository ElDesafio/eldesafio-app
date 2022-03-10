import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import type {
  ActionMeta,
  GroupBase,
  MultiValue,
  SingleValue,
} from 'chakra-react-select';
import { Select } from 'chakra-react-select';
import { useField } from 'remix-validated-form';

type BaseOption = {
  label: string;
  value: string | number;
};

type FormSelectProps<Option extends BaseOption> = {
  name: string;
  label: string;
  isRequired?: boolean;
  helperText?: React.ReactNode;
  placeholder?: string;
  isMulti?: boolean;
  options: Option[];
  instanceId?: string;
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'purple' | 'gray';
  onChange?: (
    newValue: SingleValue<Option> | MultiValue<Option>,
    actionMeta: ActionMeta<Option>,
  ) => void;
};

export function FormSelect<Option extends BaseOption>({
  name,
  label,
  isRequired,
  helperText,
  options,
  isMulti = false,
  instanceId,
  onChange,
  color,
  ...rest
}: FormSelectProps<Option>) {
  const { validate, clearError, defaultValue, error } = useField(name);

  const cleanDefaultValue = defaultValue
    ? options.filter((option) => {
        if (typeof defaultValue === 'string' && 'value' in option) {
          const defaultValuesArray = defaultValue
            .split(',')
            .map((value) =>
              typeof value === 'string' ? value : Number(value),
            );
          return defaultValuesArray.includes(option.value);
        }
      })
    : defaultValue;

  let controlBg: string | undefined;
  let controlColor: string | undefined;

  switch (color) {
    case 'red':
      controlBg = 'red.500';
      controlColor = 'white';
      break;
    case 'blue':
      controlBg = 'blue.500';
      controlColor = 'white';
      break;
    case 'gray':
      controlBg = 'gray.500';
      controlColor = 'white';
    default:
      controlBg = undefined;
      controlColor = undefined;
      break;
  }

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select<Option, typeof isMulti, GroupBase<Option>>
        id={name}
        instanceId={instanceId}
        name={name}
        isMulti={isMulti}
        delimiter={','}
        options={options}
        // @ts-ignore
        onBlur={validate}
        onChange={(newValue, actionMeta) => {
          clearError();
          onChange?.(newValue, actionMeta);
        }}
        defaultValue={cleanDefaultValue}
        chakraStyles={{
          control: (provided) => ({
            ...provided,
            bg: controlBg,
            color: controlColor,
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            bg: 'transparent',
            px: 2,
            cursor: 'inherit',
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none',
          }),
        }}
        {...rest}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
