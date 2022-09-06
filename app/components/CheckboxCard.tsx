import type {
  BoxProps,
  StackProps,
  UseCheckboxGroupProps,
  UseCheckboxProps,
} from '@chakra-ui/react';
import {
  Box,
  Checkbox,
  Stack,
  useCheckbox,
  useCheckboxGroup,
  useId,
  useStyleConfig,
} from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { Children, cloneElement, isValidElement, useMemo } from 'react';

type CheckboxCardGroupProps = StackProps & UseCheckboxGroupProps;

export const CheckboxCardGroup = (props: CheckboxCardGroupProps) => {
  const { children, defaultValue, value, onChange, ...rest } = props;
  const { getCheckboxProps } = useCheckboxGroup({
    defaultValue,
    value,
    onChange,
  });

  const cards = useMemo(
    () =>
      Children.toArray(children)
        .filter<ReactElement<CheckboxCardProps>>(isValidElement)
        .map((card) => {
          return cloneElement(card, {
            checkboxProps: getCheckboxProps({
              value: card.props.value,
            }),
          });
        }),
    [children, getCheckboxProps],
  );

  return <Stack {...rest}>{cards}</Stack>;
};

interface CheckboxCardProps extends BoxProps {
  value: string;
  checkboxProps?: UseCheckboxProps;
}

export const CheckboxCard = (
  props: CheckboxCardProps & { dataTest?: string },
) => {
  const { checkboxProps, children, dataTest, ...rest } = props;
  const { getInputProps, getCheckboxProps, getLabelProps, state } =
    useCheckbox(checkboxProps);
  const id = useId(undefined, 'checkbox-card');
  const styles = useStyleConfig('RadioCard', props);

  return (
    <Box
      as="label"
      cursor="pointer"
      {...getLabelProps()}
      sx={{
        '.focus-visible + [data-focus]': {
          boxShadow: 'outline',
          zIndex: 1,
        },
      }}
      data-test={dataTest}
    >
      <input {...getInputProps()} aria-labelledby={id} />
      <Box
        sx={styles}
        height="100%"
        {...getCheckboxProps()}
        {...rest}
        aria-hidden={false}
      >
        <Stack direction="row">
          <Box flex="1">{children}</Box>
          <Checkbox
            pointerEvents="none"
            isFocusable={false}
            isChecked={state.isChecked}
            alignSelf="start"
          />
        </Stack>
      </Box>
    </Box>
  );
};
