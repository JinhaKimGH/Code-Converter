import { Dispatch, SetStateAction, useState } from "react";
import Editor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import { darkThemeStyle, lightThemeStyle } from "../utils.ts/constant";

type CodeEditorProps = {
  isDarkTheme: boolean;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
};

export const CodeEditor = ({ isDarkTheme, code, setCode }: CodeEditorProps) => {

  const highlight = (code: string) => (
    <Highlight
      {...defaultProps}
      theme={isDarkTheme ? darkThemeStyle.codeTheme : lightThemeStyle.codeTheme}
      code={code}
      language="python"
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
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => highlight(code)}
      padding={10}
      style={isDarkTheme ? darkThemeStyle.root : lightThemeStyle.root}
    />
  );
};
