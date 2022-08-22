import type { SelectProps } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import { useFetcher } from '@remix-run/react';
import type { OptionBase } from 'chakra-react-select';
import { Select } from 'chakra-react-select';
import { useState } from 'react';
import { useField } from 'remix-validated-form';

type FormSelectProps = {
  name: string;
  label: string;
  isRequired?: boolean;
  helperText?: React.ReactNode;
  placeholder?: string;
  searchFor: 'school';
  defaultSelectedLabel?: string;
  instanceId?: string;
};

interface Option extends OptionBase {
  label: string;
  value: number;
}

export const FormAutocomplete = ({
  name,
  label,
  isRequired,
  helperText,
  searchFor,
  defaultSelectedLabel,
  instanceId,
  ...rest
}: FormSelectProps & SelectProps) => {
  const { validate, clearError, defaultValue, error } = useField(name);
  const [inputValue, setInputValue] = useState<number | undefined>(
    defaultValue,
  );
  const [value, setValue] = useState({
    value: defaultValue,
    label: defaultSelectedLabel,
  });

  const schoolsSearch = useFetcher<{ id: number; name: string }[]>();

  let searchData: Option[];
  let isLoading: boolean = false;

  // eslint-disable-next-line sonarjs/no-small-switch
  switch (searchFor) {
    case 'school': {
      searchData =
        schoolsSearch.data?.map((school) => ({
          value: school.id,
          label: school.name,
        })) ?? [];
      isLoading = schoolsSearch.state === 'loading';
      break;
    }
    default:
      searchData = [];
  }

  const onInputChange = (value: string) => {
    if (searchFor === 'school') {
      return schoolsSearch.load(`/api/search/school?schoolName=${value}`);
    }
  };

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <input type="hidden" name={name} value={inputValue ?? ''} />
      <Select
        id={name}
        instanceId={instanceId}
        // @ts-ignore
        onBlur={validate}
        selectedOptionStyle="check"
        // @ts-ignore
        onChange={(option: Option) => {
          clearError();
          if (option) {
            setInputValue(option.value);
            setValue(option);
          }
        }}
        value={value}
        isLoading={isLoading}
        options={searchData}
        onInputChange={onInputChange}
        chakraStyles={{
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
};
