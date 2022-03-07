import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import type { GroupBase } from 'chakra-react-select';
import { Select } from 'chakra-react-select';
import { useField } from 'remix-validated-form';

type FormSelectProps<Option> = {
  name: string;
  label: string;
  isRequired?: boolean;
  helperText?: React.ReactNode;
  placeholder?: string;
  isMulti?: boolean;
  options: Option[];
  instanceId?: string;
};

export function FormSelect<Option>({
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
        defaultValue={defaultValue}
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
