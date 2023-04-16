import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Btn from '../atoms/Btn';
import Icon from '../atoms/Icon';
import TextPar from '../atoms/TextPar';
import TextSpan from '../atoms/TextSpan';
import TextTitle from '../atoms/TextTitle';

const ListBar = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 50%;
transform: translateY(-50%);
background: #fff;
z-index: 99;
padding: 30px;
`;

const ListHeader = styled.header`
text-align: center;
position: relative;
line-height: 80px;
height: auto;
`;

const ListSection = styled.section`
margin-top: 30px;
width: 100%;


#open-btn-item:nth-child(4) {
  margin-bottom: 0;
}
`;

const OpenBtnItem = styled.div`
width: 100%;
height: 45px;
line-height: 45px;
text-align: center;
border: 1px solid #121121;
border-radius: 5px;
margin-bottom: 20px;

:hover {
  background: #eee;
}
`;

const BtnItem = styled.div`
width: 100%;
height: 45px;
line-height: 45px;
text-align: center;

:hover {
  background: #eee;
}
`;

const BgColor = styled.div`
position: fixed;
width: 100%;
height: 100%;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, .5);
`;

const Window = styled.div`
height: 450px;
background: #fff;
overflow-y: scroll;
position: fixed;
top: 30px;
left: 30px;
right: 30px;
z-index: 999;
::-webkit-scrollbar {
  display: none;
}
`;

const NextBtn = styled.div`
display: block;
width: 100px;
margin: 0 auto;
margin-top: 20px;
height: 45px;
border: 1px solid #121212;
border-radius: 30px;
`;

const BackBtn = styled.div`
position: absolute;
top: 50%;
transform: translateY(-50%);
right: 0;

svg {
  font-size: 20px;
}
`;

const ResultViewItem = styled.div`
width: 100%;
text-align: center;
margin-top: 20px;

p {
  padding-top: 10px;
}
`;

const ResulInner = styled.div`
height: 30px;
background: #eee;
border-radius: 30px;
overflow: hidden;
`;

const ResultColorBox = styled.div`
height: 100%;
`;
export default function StationListBar({ data, setBtnClick }) {
  const [click, setClick] = useState(false);
  const [timeBtnClick, setTimeBtnClick] = useState("현재시간");
  const [dayBtnClick, setDayBtnClick] = useState("평일");
  const [lineBtnClick, setLineBtnClick] = useState("");
  const [nextBtnClick, setNextBtnClick] = useState(false);
  const [windowType, setWindowType] = useState(null);
  const [resultText, setResultText] = useState("");
  const [lineData, setLineData] = useState([]);
  const [lineNumData, setLineNumData] = useState([]);
  const [lineNumBtnClick, setLineNumBtnClick] = useState("");

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      const arr = Object.entries(data[i]);

      for (let j = 0; j < arr.length; j++) {
        if (arr[j][0] === "호선") {
          lineNumData.push(arr[j][1]);
          const set1 = new Set(lineNumData);
          setLineNumData([...set1]);
          setLineNumBtnClick([...set1][0]);
          for (let k = 0; k < arr.length; k++) {
            if (arr[k][0] === "구분") {
              lineData.push(arr[k][1]);
              const set = new Set(lineData);
              setLineData([...set]);
              setLineBtnClick([...set][0]);
            };
          };
        };
      };
    };
  }, []);

  const openWindow = (target, type) => {
    setClick(true);
    setWindowType(type);
  };

  const resultView = () => {
    const btnText = document.querySelectorAll("#open-btn-item");
    const text1 = btnText[0].childNodes[0].childNodes[0].innerText;
    const text2 = btnText[1].childNodes[0].childNodes[0].innerText;
    const text3 = btnText[2].childNodes[0].childNodes[0].innerText;
    const text4 = btnText[3].childNodes[0].childNodes[0].innerText;

    for (let i = 0; i < data.length; i++) {
      const arr = Object.entries(data[i]);

      for (let i = 0; i < arr.length; i++) {
        if (String(arr[i][1]) === text2) {
          for (let j = 0; j < arr.length; j++) {
            if (arr[j][1] === text3) {
              for (let k = 0; k < arr.length; k++) {
                if (arr[k][1] === text4) {
                  for (let h = 0; h < arr.length; h++) {
                    if (arr[h][0] === (text1 === "현재시간" ? timeHandle() : text1)) {
                      console.log(timeHandle());
                      setResultText(arr[h][1]);
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };

  const timeHandle = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let min = 0;
    if (minutes < 15) {
      min = 0;
    } else if (minutes > 15) {
      min = 30;
    }

    return `${hours}시${min}분`;
  };

  return (
    <ListBar>
      <ListHeader>
        <TextTitle size={24} type={"l"}>{data[0].역명}역</TextTitle>
        <BackBtn onClick={() => {
          setBtnClick(false);
        }}><Btn><TextSpan size={16}><Icon type={"close"} /></TextSpan></Btn></BackBtn>
      </ListHeader>
      <ListSection>
        <OpenBtnItem id={"open-btn-item"} onClick={e => openWindow(e.target, 1)}><Btn><TextSpan size={18}>{timeBtnClick}</TextSpan></Btn></OpenBtnItem>
        <OpenBtnItem id={"open-btn-item"} onClick={e => lineNumData[1] ? openWindow(e.target, 2) : ""}><Btn><TextSpan size={18}>{lineNumBtnClick}</TextSpan></Btn></OpenBtnItem>
        <OpenBtnItem id={"open-btn-item"} onClick={e => openWindow(e.target, 3)}><Btn><TextSpan size={18}>{lineBtnClick}</TextSpan></Btn></OpenBtnItem>
        <OpenBtnItem id={"open-btn-item"} onClick={e => openWindow(e.target, 4)}><Btn><TextSpan size={18}>{dayBtnClick}</TextSpan></Btn></OpenBtnItem>
        {
          click ? (<BgColor onClick={() => {
            setClick(false);
          }}>
          </BgColor>) : null
        }
        {
          click ? (<>
            <Window>
              {
                windowType === 1 ? (<>
                  <BtnItem onClick={(e) => {
                    setTimeBtnClick(e.target.innerText);
                    setClick(false);
                  }}><TextPar size={18}>현재시간</TextPar></BtnItem>
                  {
                    Object.entries(data[0]).slice(6).map((item, index) => <React.Fragment key={index}>
                      <BtnItem onClick={e => {
                        setTimeBtnClick(e.target.innerText);
                        setClick(false);
                      }}><TextPar size={18}>{item[0]}</TextPar></BtnItem>
                    </React.Fragment>)
                  }
                </>) :
                  windowType === 2 ? (<>
                    {
                      lineNumData.map((item, index) => (
                        <React.Fragment key={index}>
                          <BtnItem onClick={e => {
                            setLineNumBtnClick(e.target.innerText);
                            setClick(false);
                          }}><TextPar size={18}>{item}</TextPar></BtnItem>
                        </React.Fragment>
                      ))
                    }
                  </>) :
                    windowType === 3 ? (<>
                      {
                        lineData.map((item, index) => (
                          <React.Fragment key={index}>
                            <BtnItem onClick={e => {
                              setLineBtnClick(e.target.innerText);
                              setClick(false);
                            }}><TextPar size={18}>{item}</TextPar></BtnItem>
                          </React.Fragment>
                        ))
                      }
                    </>) :
                      windowType === 4 ? (<>
                        <BtnItem onClick={e => {
                          setDayBtnClick(e.target.innerText);
                          setClick(false);
                        }}><TextPar size={18}>평일</TextPar></BtnItem>
                        <BtnItem onClick={e => {
                          setDayBtnClick(e.target.innerText);
                          setClick(false);
                        }}><TextPar size={18}>토요일</TextPar></BtnItem>
                        <BtnItem onClick={e => {
                          setDayBtnClick(e.target.innerText);
                          setClick(false);
                        }}><TextPar size={18}>일요일</TextPar></BtnItem>
                      </>) : ""
              }
            </Window>
          </>) : null
        }
        {
          nextBtnClick ? (<ResultViewItem>
            <ResulInner>
              <ResultColorBox style={{
                width: `${resultText}%`,
                backgroundColor: `${resultText < 34 ? "#3cb371" :
                  (resultText > 34 && resultText < 64) ? "#ff7f00" :
                    resultText > 64 ? "#ff0000" : ""}`
              }}>
              </ResultColorBox>
            </ResulInner>
            <TextPar size={16}>혼잡도: {resultText}%</TextPar>
            <TextPar size={16}>{resultText < 34 ? "오늘은 운이 좋네요! 편하게 갈 수 있겠어요." :
              (resultText > 34 && resultText < 64) ? "눈을 크게 뜨세요! 잘 보면 자리가 있을 거예요." :
                resultText > 64 ? "앉아서 간다면 당신은 행운아!" : ""}</TextPar>
          </ResultViewItem>) : null
        }
        <NextBtn onClick={() => {
          setNextBtnClick(true);
          resultView();
        }}><Btn><TextSpan size={16}>조회하기</TextSpan></Btn></NextBtn>
      </ListSection>
    </ListBar>
  );
};