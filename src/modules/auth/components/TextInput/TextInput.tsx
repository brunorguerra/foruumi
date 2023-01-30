import { Input, Box, Text } from '@chakra-ui/react';
import { forwardRef, type ForwardRefRenderFunction, type HTMLAttributes } from 'react';
import { type FieldError } from 'react-hook-form';

type TextInputProps = {
  type: string;
  label: string;
  error?: FieldError | null;
} & HTMLAttributes<HTMLInputElement>;

const TextInputElement: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  { type, label, error = null, ...props },
  ref,
) => {
  return (
    <Box>
      <Text as="label" htmlFor={props.id}>
        {label}
      </Text>

      <Input
        type={type}
        size="lg"
        variant="filled"
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
