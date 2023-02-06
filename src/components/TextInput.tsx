import { Input, Box, Text } from '@chakra-ui/react';
import {
  forwardRef,
  HTMLInputTypeAttribute,
  type ForwardRefRenderFunction,
  type HTMLAttributes,
} from 'react';
import { type FieldError } from 'react-hook-form';

type TextInputProps = {
  type?: HTMLInputTypeAttribute;
  label?: string | null;
  error?: FieldError | null;
} & HTMLAttributes<HTMLInputElement>;

const TextInputElement: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  { type = 'text', label = null, error = null, ...props },
  ref,
) => {
  return (
    <Box w="100%">
      {label && (
        <Text as="label" htmlFor={props.id}>
          {label}
        </Text>
      )}

      <Input
        type={type}
        placeholder={props.placeholder}
        size="lg"
        variant={label ? 'filled' : 'outline'}
        errorBorderColor="red.500"
        isInvalid={!!error}
        ref={ref}
        {...props}
      />
      {error && (
        <Text color="red.500" marginLeft={2} marginTop={1}>
          {error.message}
        </Text>
      )}
    </Box>
  );
};

export const TextInput = forwardRef(TextInputElement);
