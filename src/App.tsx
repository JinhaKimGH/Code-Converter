import { useRef, useState } from "react";
import "./App.css";
import {config} from "./config.js";
import { CodeEditor } from "./components/CodeEditor";
import { BsSun, BsMoonFill, BsArrowRepeat } from "react-icons/bs";
import { BiConversation } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  darkThemeStyle,
  lightThemeStyle,
  Theme,
} from "./utils.ts/constant";
import { Header } from "./components/Header";
import { CodeResponse } from "./components/CodeResponse";
import axios from "axios";

export default function App() {
  const [theme, setTheme] = useState(Theme.DARK);
  const isDarkTheme = theme === Theme.DARK;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textAreaBackground = isDarkTheme
    ? darkThemeStyle.backgroundColor
    : lightThemeStyle.backgroundColor;
  
  const [response, setResponse] = useState('');
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

  const submitChatgptRequest = async (isConvert: boolean) => {
    if (code) {
      axios.post('https://api.openai.com/v1/chat/completions', {
        messages: [{
          role: "user",
          content: isConvert? `Convert this code into Python without explanation: ${code}` : `Explain this code: ${code}`
        }],
        max_tokens: 60,
        n: 1,
        stop: null,
        temperature: 0.7,
        model: "gpt-3.5-turbo"
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`,
        },
      })
        .then(res => {
          setResponse(res.data.choices[0].message.content);
        })
        .catch(err => {
          setResponse(err.message);
          console.error(err);
        });
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="editor">
        <div
          className="wrapper"
          ref={wrapperRef}
        >
          <div
            className="code-container editor-container"
            style={{
              backgroundImage: textAreaBackground,
            }}
          >
            <Header filename="request.cpp" />
            <CodeEditor isDarkTheme={isDarkTheme} code={code} setCode={setCode} />
          </div>

          <div
            className="code-container response-container"
            style={{
              backgroundImage: textAreaBackground,
            }}
          >
            <Header filename="response.py"/>
            <CodeResponse isDarkTheme={isDarkTheme} response={response} setResponse={setResponse} />
          </div>
        </div>
      </div>

      <div className="menu-container">
        <div
          className="menu-item"
          onClick={() => setTheme(isDarkTheme ? Theme.LIGHT : Theme.DARK)}
        >
          {isDarkTheme ? <BsMoonFill size={20} /> : <BsSun size={20} />}
          Theme
        </div>
        <div
          className="menu-item"
          onClick={() => submitChatgptRequest(true)}
        >
          <BsArrowRepeat size={20} />
          Convert
        </div>
        <div
          className="menu-item"
          onClick={() => submitChatgptRequest(false)}
        >
          <BiConversation size={20} />
          Explain
        </div>
      </div>
    </>
  );
}
