import { css, Global } from '@emotion/react';
import { Inter } from '@next/font/google';

const inter = Inter({
  preload: true,
  weight: ['100', '900'],
  style: 'normal',
});

const globalFonts = css`
  @font-face {
    font-family: ${inter.style.fontFamily};
    font-style: ${inter.style.fontStyle};
    font-weight: ${inter.style.fontWeight};
    font-display: optional;
    src: url(/fonts/inter-var-latin.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
      U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`;

export const Fonts = () => <Global styles={globalFonts} />;
