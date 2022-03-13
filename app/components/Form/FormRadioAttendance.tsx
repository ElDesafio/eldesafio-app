import type { RadioGroupProps, RadioProps } from '@chakra-ui/react';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  RadioGroup,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';
import { ClassAttendanceStatus } from '@prisma/client';
import { useField } from 'remix-validated-form';

import { getAttendanceProps } from '~/util/utils';

export const ButtonRadio = (props: RadioProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Button
      {...checkbox}
      as="label"
      htmlFor={input.id}
      mr="-px"
      _checked={{
        bg: getAttendanceProps(props.value as ClassAttendanceStatus)
          .backgroundColor,
        color: getAttendanceProps(props.value as ClassAttendanceStatus)
          .textColor,
      }}
      _focus={{
        boxShadow: 'outline',
      }}
    >
      {getAttendanceProps(props.value as ClassAttendanceStatus).shortText}
      <input {...input} />
    </Button>
  );
};

type FormRadioAttendanceProps = {
  name: string;
  label?: string;
  isRequired?: boolean;
  redAnswer?: 'yes' | 'no' | 'dkna';
  helperText?: React.ReactNode;
};

export const FormRadioAttendance = ({
  name,
  label,
  isRequired,
  helperText,
  redAnswer,
  onChange,
  ...rest
}: FormRadioAttendanceProps & Omit<RadioGroupProps, 'children'>) => {
  const { validate, clearError, defaultValue, error } = useField(name);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
  });

  const group = getRootProps();

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <RadioGroup
        id={name}
        onBlur={validate}
        {...group}
        defaultValue={defaultValue}
        onChange={(value) => {
          if (onChange) {
            onChange(value);
          }
          clearError();
        }}
        {...rest}
      >
        <ButtonGroup isAttached variant="outline">
          <ButtonRadio
            value={ClassAttendanceStatus.PRESENT}
            {...getRadioProps({ value: ClassAttendanceStatus.PRESENT })}
          />
          <ButtonRadio
            value={ClassAttendanceStatus.ABSENT}
            {...getRadioProps({ value: ClassAttendanceStatus.ABSENT })}
          />
          <ButtonRadio
            value={ClassAttendanceStatus.LATE}
            {...getRadioProps({ value: ClassAttendanceStatus.LATE })}
          />
          <ButtonRadio
            value={ClassAttendanceStatus.EXCUSED}
            {...getRadioProps({ value: ClassAttendanceStatus.EXCUSED })}
          />
        </ButtonGroup>
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
