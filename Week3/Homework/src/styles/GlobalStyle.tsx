import { Global, css } from "@emotion/react";

function GlobalStyle() {
  return (
    <Global
      styles={(theme) => css`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          line-height: 1.5;
          color: ${theme.colors.text};
          background-color: ${theme.colors.background};
        }

        h1,
        h2,
        p {
          margin: 0;
        }
      `}
    />
  );
}

export default GlobalStyle;
