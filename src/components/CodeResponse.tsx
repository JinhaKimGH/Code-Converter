import { Dispatch, SetStateAction, useState } from "react";
import Editor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import { darkThemeStyle, lightThemeStyle } from "../utils.ts/constant";

type CodeResponse = {
  isDarkTheme: boolean;
  response: string;
  setResponse: Dispatch<SetStateAction<string>>;
};

export const CodeResponse = ({ isDarkTheme, response, setResponse }: CodeResponse) => {

  const highlight = (code: string) => (
    <Highlight
      {...defaultProps}
      theme={isDarkTheme ? darkThemeStyle.codeTheme : lightThemeStyle.codeTheme}
      code={code}
      language="tsx"
    >
      {({ tokens, getLineProps, getTokenProps }) => (
        <>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </>
      )}
    </Highlight>
  );

  return (
    <Editor
      value={response}
      onValueChange={(response) => setResponse(response)}
      highlight={(response) => highlight(response)}
      padding={10}
      style={isDarkTheme ? darkThemeStyle.root : lightThemeStyle.root}
    />
  );
};
