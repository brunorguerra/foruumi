import { Box, Input, Text } from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction, HTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  type: string;
  error?: FieldError | null;
}

const TextInputElement: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  { type, error = null, ...props },
  ref,
) => {
  return (
    <Box>
      <Input
        type={type}
        placeholder={props.placeholder}
        size="lg"
        variant="outline"
        errorBorderColor="red.500"
        isInvalid={!!error}
        ref={ref}
        {...props}
      />

      {error?.message && (
        <Text fontSize="md" color="red.500">
          {error.message}
        </Text>
      )}
    </Box>
  );
};

export const TextInput = forwardRef(TextInputElement);
