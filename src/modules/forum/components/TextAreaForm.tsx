import { Box, Text, Textarea } from '@chakra-ui/react';
import {
  forwardRef,
  type ForwardRefRenderFunction,
  type HTMLAttributes,
} from 'react';
import { type FieldError } from 'react-hook-form';

type TextareaFormProps = {
  error?: FieldError | null;
} & HTMLAttributes<HTMLTextAreaElement>;

const TextAreaFormElement: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaFormProps
> = ({ error = null, ...props }, ref) => {
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
