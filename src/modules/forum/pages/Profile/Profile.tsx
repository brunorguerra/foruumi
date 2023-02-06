import { Button, Flex, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { IoReturnDownBackSharp } from 'react-icons/io5';

import { Layout } from '../../components';

import { FormProfile } from './components';

export const Profile = () => {
  return (
    <>
      <Head>
        <title>Foruumi - Meu Perfil</title>
      </Head>

      <Layout>
        <Link href="/">
          <Button leftIcon={<IoReturnDownBackSharp fontSize={20} />} mt={16} colorScheme="blue">
            Voltar
          </Button>
        </Link>

        <Flex direction="column" alignItems="flex-start" justifyContent="center" mt={20} gap={8}>
          <Heading>Dados de Perfil</Heading>

          <FormProfile />
        </Flex>
      </Layout>
    </>
  );
};
