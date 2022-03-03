import type { TextareaProps } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { useHelpers } from '@remirror/react';
import { useField } from 'remix-validated-form';
import Editor from 'rich-markdown-editor';

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
    <pre>
      <code>{getMarkdown()}</code>
    </pre>
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
    // <FormControl isInvalid={!!error} isRequired={isRequired}>
    <Editor />
    //   {helperText && <FormHelperText>{helperText}</FormHelperText>}
    //   {error && <FormErrorMessage>{error}</FormErrorMessage>}
    // </FormControl>
  );
};
