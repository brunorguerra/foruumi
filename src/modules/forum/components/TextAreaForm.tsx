import { Box, Text, Textarea } from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction, HTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface TextareaFormProps extends HTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError | null;
}

const TextAreaFormElement: ForwardRefRenderFunction<HTMLTextAreaElement, TextareaFormProps> = (
  { error = null, ...props },
  ref,
) => {
  return (
    <Box>
      <Textarea
        placeholder={props.placeholder}
        backgroundColor="transparent"
        resize="none"
        minH={40}
        errorBorderColor="red.500"
        isInvalid={!!error}
        ref={ref}
        _placeholder={{
          fontSize: 'lg',
        }}
        {...props}
      />

      {error && (
        <Text fontSize="md" color="red.500">
          {error.message}
        </Text>
      )}
    </Box>
  );
};

export const TextAreaForm = forwardRef(TextAreaFormElement);
