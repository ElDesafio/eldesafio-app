import type { TextareaProps } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Textarea,
} from '@chakra-ui/react';
import { useHelpers } from '@remirror/react';
import { useField } from 'remix-validated-form';

import { MarkdownEditor } from '../MarkdownEditor/markdown-editor';

type FormRichTextEditorProps = {
  name: string;
  label?: string;
  isRequired?: boolean;
  helperText?: React.ReactNode;
};

type HiddenTextAreaProps = {
  name: string;
  validate: () => void;
  clearError: () => void;
  defaultValue: string;
};

const HiddenTextArea = ({
  name,
  validate,
  clearError,
  defaultValue,
  ...rest
}: HiddenTextAreaProps) => {
  const { getMarkdown } = useHelpers(true);

  return (
    <Textarea
      id={name}
      name={name}
      onBlur={validate}
      onChange={clearError}
      value={getMarkdown()}
      style={{ display: 'none' }}
      {...rest}
    />
  );
};

export const FormRichTextEditor = ({
  name,
  label,
  isRequired,
  helperText,
  ...rest
}: FormRichTextEditorProps & TextareaProps) => {
  const { validate, clearError, defaultValue, error } = useField(name);

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <MarkdownEditor
        placeholder="Empieza a tipear..."
        initialContent={defaultValue}
        {...rest}
      >
        <HiddenTextArea
          name={name}
          validate={validate}
          clearError={clearError}
          defaultValue={defaultValue}
        />
      </MarkdownEditor>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
