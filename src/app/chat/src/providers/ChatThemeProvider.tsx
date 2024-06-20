import { ThemeProvider } from "styled-components";
import { PropsWithChildren } from "react";
import { GlobalStyle, darkTheme, lightTheme } from "../theme";

export default function ChatThemeProvider({ children }: PropsWithChildren) {
  // Todo: For Color Mode
  const mode: "dark" | "light" = "light";

  const themeMode = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
