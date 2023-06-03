import React, { useState, useRef, useEffect } from "react";

function ChatBot() {
  //채팅창에 나타날 메시지들을 저장할 상태
  const [messages, setMessages] = useState([]);
  //입력창의 내용을 저장할 상태
  const [inputText, setInputText] = useState("");
  // textarea와 button 요소를 참조할 useRef
  const textareaRef = useRef();
  const buttonRef = useRef();
  // 채팅창 스크롤을 자동으로 아래로 내려주기 위한 useRef
  const messagesEndRef = useRef(null);

  //   handleSubmit 함수는 전송 버튼이나 엔터키를 눌렀을 때 호출되는 함수입니다.
  const handleSubmit = (event) => {
    event.preventDefault();
    setMessages([...messages, { text: inputText, isSent: true }]); // 사용자가 입력한 말 추가
    handleMessage(inputText);
    setInputText("");
  };

  const cityNameMap = {
    부산: "Busan",
    서울: "Seoul",
    대구: "Daegu",
    인천: "Incheon",
    광주: "Gwangju",
    대전: "Daejeon",
    울산: "Ulsan",
    세종: "Sejong",
    경기도: "Gyeonggi-do",
    강원도: "Gangwon-do",
    충청북도: "Chungcheongbuk-do",
    충청남도: "Chungcheongnam-do",
    전라북도: "Jeollabuk-do",
    전라남도: "Jeollanam-do",
    경상북도: "Gyeongsangbuk-do",
    경상남도: "Gyeongsangnam-do",
    제주도: "Jeju-do",
    // 지원하는 도시들에 대해서 추가로 매핑 정보를 입력해주세요.
  };

  // 입력된 메시지를 분석하고 답변을 출력하는 함수
  const handleMessage = (inputText) => {
    // 사용자가 입력한 메시지
    const Message = { text: inputText, isSent: true };
    // 챗봇이 응답할 메시지
    let chatbotMessage = null;

    // 서울 또는 부산의 날씨 정보를 가져오는 API 호출 및 처리
    if (inputText.includes("날씨")) {
      const cityName = inputText.split(" ")[0]; // 첫 단어가 도시명
      const city = cityNameMap[cityName] || cityName;
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=08af5ae1fb652af67e2f91bdf5f1c641&units=metric&lang=en`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const { weather, main } = data;
          const description = weather[0].description;
          const temp = main.temp;
          chatbotMessage = {
            text: `${cityName}의 날씨는 ${description}, 온도는 ${temp}도 입니다.`,
            isSent: false,
          };
          // 메시지 배열에 사용자의 메시지와 챗봇의 응답을 추가
          setMessages((messages) => [...messages, chatbotMessage]);
        })

        .catch((error) => {
          console.error("날씨 정보를 가져오는 중 오류가 발생했습니다.", error);
          chatbotMessage = {
            text: `${cityName}의 날씨 정보를 가져올 수 없습니다. 영어도시명 날씨 라고 물어봐주세요. 띄어쓰기 해주세요. 한국 몇몇 주요도시는 한글지원이 됩니다.`,
            isSent: false,
          };
          // 메시지 배열에 사용자의 메시지와 챗봇의 응답을 추가
          setMessages((messages) => [...messages, chatbotMessage]);
        });
      return;
    }
    if (inputText.includes("이번 주")) {
      const cityName = inputText.split(" ")[0];
      const city = cityNameMap[cityName] || cityName;
      let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=08af5ae1fb652af67e2f91bdf5f1c641&units=metric&lang=en`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const forecastList = data.list;
          const forecastByDay = {};
          forecastList.forEach((forecast) => {
            const forecastDate = forecast.dt_txt.split(" ")[0];
            if (!forecastByDay[forecastDate]) {
              forecastByDay[forecastDate] = [];
            }
            forecastByDay[forecastDate].push(forecast);
          });

          let messageText = `${cityName}의 이번 주 날씨 정보입니다. \n\n`;
          Object.keys(forecastByDay).forEach((date) => {
            const forecastList = forecastByDay[date];
            const dateObj = new Date(date);
            const dateString = dateObj.toLocaleDateString("ko-KR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            messageText += `📅 ${dateString}\n`;

            forecastList.forEach((forecast) => {
              const time = forecast.dt_txt.split(" ")[1].slice(0, 5);
              const weather = forecast.weather[0];
              const description = weather.description;
              const temp = `${forecast.main.temp.toFixed(2)}℃`; // 소수점 둘째자리까지 표시
              messageText += `   ${time} ${description} ${temp}\n`;
            });

            messageText += "\n";
          });

          const chatbotMessage = {
            text: messageText.trim(),
            isSent: false,
          };

          setMessages((messages) => [...messages, chatbotMessage]);
        })
        .catch((error) => {
          console.error("날씨 정보를 가져오는 중 오류가 발생했습니다.", error);
          const chatbotMessage = {
            text: `${cityName}의 이번 주 날씨 정보를 가져올 수 없습니다. 영어도시명 이번 주 라고 물어봐주세요. 띄어쓰기 해주세요. 한국 주요도시는 한글지원이 됩니다.`,
            isSent: false,
          };
          setMessages((messages) => [...messages, chatbotMessage]);
        });
      return;
    } else {
      chatbotMessage = {
        text: "명령어 :\n 영어도시명 날씨\n 영어도시명 이번 주\n (한국 주요도시는 한글지원)",
        isSent: false,
      };
    }
    if (inputText.includes("업비트")) {
      chatbotMessage = {
        text: `https://www.upbit.com/`,
        isSent: false,
      };
    }
    if (inputText.includes("바이낸스")) {
      chatbotMessage = {
        text: `https://www.binance.com/`,
        isSent: false,
      };
    }

    // 메시지 배열에 사용자의 메시지와 챗봇의 응답을 추가
    setMessages((messages) => [...messages, chatbotMessage].filter(Boolean)); // filters out null values from array
  };

  // 채팅창 스크롤을 자동으로 아래로 내려주는 기능
  useEffect(() => {
    const messagesEnd = messagesEndRef.current;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = messagesEnd;
      if (scrollHeight - scrollTop === clientHeight) {
        messagesEnd.scrollTop = messagesEnd.scrollHeight;
      }
    };

    messagesEnd.addEventListener("scroll", handleScroll);

    return () => {
      messagesEnd.removeEventListener("scroll", handleScroll);
    };
  }, [messagesEndRef]);
  // 채팅창 높이를 동적으로 조절해주는 기능
  useEffect(() => {
    const container = document.querySelector(".messages-container");
    const chatbotContainer = document.querySelector(".chatbot-container");
    const inputContainer = document.querySelector(".input-container");

    const resizeHandler = () => {
      const chatbotContainerHeight = chatbotContainer.offsetHeight;
      const inputContainerHeight = inputContainer.offsetHeight;
      container.style.height = `${
        chatbotContainerHeight - inputContainerHeight
      }px`;
    };

    resizeHandler();

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  //handleInputChange 함수는 textarea에 입력된 값을 inputText 상태에 업데이트하는 역할을 합니다.
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  // 입력창의 값이 변경될 때마다 버튼 스타일을 변경해주는 기능
  useEffect(() => {
    const textarea = textareaRef.current;
    const button = buttonRef.current;
    textarea.addEventListener("input", function () {
      if (textarea.value.trim() !== "") {
        button.style.backgroundColor = "#FEE500";
        button.style.color = "#4D3636";
      } else {
        button.style.backgroundColor = "#f2f2f2";
        button.style.color = "#b4b4b4";
      }
    });
  }, [textareaRef, buttonRef]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      buttonRef.current.click();
      const button = buttonRef.current;
      button.style.backgroundColor = "#f2f2f2";
      button.style.color = "#b4b4b4";
    }
  };

  const renderMessage = (message, index) => {
    if (message.text.includes("https://")) {
      return (
        <div
          key={index}
          className={`message ${message.isSent ? "sent" : "received"}`}
        >
          <a
            href={message.text}
            target="_blank"
            rel="noopener noreferrer"
            className="message-bubble"
          >
            {message.text}
          </a>
        </div>
      );
    } else {
      return (
        <div
          key={index}
          className={`message ${message.isSent ? "sent" : "received"}`}
        >
          <div className="message-bubble">{message.text}</div>
        </div>
      );
    }
  };

  return (
    <div className="chatbot-container">
      <div className="messages-container" ref={messagesEndRef}>
        {messages
          .slice(0)
          .reverse()
          .map((message, index) => renderMessage(message, index))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <div className="input-box">
            <textarea
              id="myTextArea"
              className="input"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={textareaRef}
            ></textarea>

            <div className="button">
              <button id="myButton" className="send-button" ref={buttonRef}>
                전송
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChatBot;
