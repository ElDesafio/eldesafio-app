import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import type { GroupBase } from 'chakra-react-select';
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
};

export function FormSelect<Option extends BaseOption>({
  name,
  label,
  isRequired,
  helperText,
  options,
  isMulti = false,
  instanceId,
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
        onChange={clearError}
        defaultValue={cleanDefaultValue}
        chakraStyles={{
          dropdownIndicator: (provided, state) => ({
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
