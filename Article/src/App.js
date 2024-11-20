import "./App.scss";
import { Button, Input, Article, Loading } from "./components/";
import { articleTitle, articleWordCount, articleLanguage } from "./constants";
import React, { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [wordCount, setWordCount] = useState(100);
  const [language, setLanguage] = useState("English");
  const [responseMessage, setResponseMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("QQ", process.env.REACT_APP_ACCESS_KEY);

  const fetchData = () => {
    setIsLoading(true);
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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",
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: ` Generate a article on "${title}" about ${wordCount} in ${language} language`,
        temperature: 0,
        max_tokens: 3000,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponseMessage(data.choices[0].text);
        setIsLoading(false);
      });
  };

  return (
    <div className="app">
      <div className="app-form-box">
        {!isLoading ? (
          <>
            {" "}
            {!responseMessage ? (
              <div className="app-form-box-first-step">
                {" "}
                <Input
                  type={"text"}
                  datas={articleTitle}
                  dataChanged={(e) => setTitle(e.target.value)}
                />
                <Input
                  type={"select"}
                  datas={articleWordCount}
                  dataChanged={(e) => setWordCount(e.target.value)}
                />
                <Input
                  type={"select"}
                  datas={articleLanguage}
                  dataChanged={(e) => setLanguage(e.target.value)}
                />
                <Button buttonClicked={fetchData} value="Generate" />{" "}
              </div>
            ) : (
              <div className="app-form-box-article-area">
                <Article story={responseMessage} />
                <Button
                  buttonClicked={() => setResponseMessage(null)}
                  value="next Article"
                />
              </div>
            )}
          </>
        ) : (
          <div className="app-form-box-loading">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
