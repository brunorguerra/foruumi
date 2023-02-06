import { Box, Button, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { forwardRef, type ForwardRefRenderFunction, type HTMLAttributes, useState } from 'react';
import { type FieldError } from 'react-hook-form';

type TextInputProps = {
  label?: string | null;
  error?: FieldError | null;
} & HTMLAttributes<HTMLInputElement>;

const PasswordInputElement: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  { label = null, error = null, ...props },
  ref,
) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  function handleShowPassword() {
    setIsShowPassword((oldState) => !oldState);
  }

  return (
    <Box w="100%">
      {label && (
        <Text as="label" htmlFor={props.id}>
          {label}
        </Text>
      )}

      <InputGroup>
        <Input
          type={isShowPassword ? 'text' : 'password'}
          id={props.id}
          placeholder={props.placeholder}
          size="lg"
          variant={label ? 'filled' : 'outline'}
          errorBorderColor="red.500"
          isInvalid={!!error}
          ref={ref}
          {...props}
        />

        <InputRightElement width="4.5rem" h="100%">
          <Button type="button" size="sm" variant="unstyled" onClick={handleShowPassword}>
            {isShowPassword ? 'Ocultar' : 'Mostrar'}
          </Button>
        </InputRightElement>
      </InputGroup>

      {error && (
        <Text color="red.500" marginLeft={2} marginTop={1}>
          {error.message}
        </Text>
      )}
    </Box>
  );
};

export const PasswordInput = forwardRef(PasswordInputElement);
