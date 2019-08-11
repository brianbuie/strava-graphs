import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  bkg: '#282c34',
  text: '#a6a6a6',
  link: '#60dafb',
  white: 'white',
  stravaOrange: '#fc4c02',
  timing: 200
};

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 24px;
    color: ${theme.text};
    line-height: 1.5;
    background: ${theme.bkg};
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    padding: 0;
		min-height: 100vh;
  }
  a {
    text-decoration: none;
    color: ${theme.link};
  }
`;

const CustomTheme = ({ children }) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
);

export default CustomTheme;
