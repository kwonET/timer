import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
interface ButtonProps {
  isPlay?: boolean;
  isValid?: boolean;
  isStop?: boolean;
}
function App() {
  const [isPlay, setIsPlay] = useState<boolean>(false); // 타이머의 동작 상태 유무
  const [isStop, setIsStop] = useState<boolean>(false); // 타이머의 멈춤 상태 유무
  const [isValid, setIsValid] = useState<boolean>(false); // 타이머 input 값 유효한지
  const [hour, setHour] = useState<number>(0); //시
  const [minute, setMinute] = useState<number>(0); //분
  const [second, setSecond] = useState<number>(0); //초
  const [initTime, setInitTime] = useState<number>(0); //입력한 초기값
  const [totalTime, setTotalTime] = useState<number>(0); //초로 환산한 총 시간

  /**
   * input 에 관한 부분
   */
  //시 input
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (Number(e.target.value) <= 24 && Number(e.target.value) >= 0) {
      // 시 : 0 ~ 24
      setHour(Number(e.target.value));
    }
  };
  // 분 input
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (Number(e.target.value) < 60 && Number(e.target.value) >= 0) {
      // 분 : 0 ~ 59
      setMinute(Number(e.target.value));
    }
  };
  //초 input
  const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (Number(e.target.value) < 60 && Number(e.target.value) >= 0) {
      // 초 : 0 ~ 59
      setSecond(Number(e.target.value));
    }
  };

  /**
   * button 에 관한 부분
   */
  // 시작 버튼 누를 때 작동되는 함수
  const handlePlayClick = () => {
    setTotalTime(hour * 60 * 60 + minute * 60 + second);
    setInitTime(hour * 60 * 60 + minute * 60 + second);
    setIsPlay(true);
  };
  // 정지 버튼 누를 때 작동되는 함수
  const handleUnPlayClick = () => {
    setTotalTime(0);
    setIsPlay(false);
    setIsValid(false);
  };
  // 멈춤 버튼 누를 때 작동되는 함수
  const handleStopClick = () => {
    setIsPlay(!isPlay); //멈춤 -> isPlay false / 재시작 -> isPlay true
    setIsStop(!isStop);
  };
  // 초기화 버튼 누를 때 작동되는 함수
  const handleInitClick = () => {
    setTotalTime(initTime);
    setIsPlay(false);
  };

  /**
   * 시간, 타이머 에 관한 부분
   */
  /**
   * timetoHMS : 총 시간을 H M S로 바꿔줌
   */
  const timetoHMS = (totalTime: number) => {
    setHour(Math.floor(totalTime / 3600));
    setMinute(Math.floor((totalTime / 60) % 60));
    setSecond(Math.floor(totalTime % 60));
  };
  /**
   * useRef, setInterval을 이용한 타이머 구현
   */
  const savedCallback = useRef<(() => void) | null>(null);
  const callback = () => {
    setTotalTime((totalTime) => totalTime - 1);
  };
  useEffect(() => {
    savedCallback.current = callback;
  });
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    if (isPlay && isValid) {
      const timer = setInterval(tick, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlay, isValid]);

  // 시간에 대한 변경값이 있을 때마다 timetoHMS로 렌더링되는 시 분 초 조절
  useEffect(() => {
    timetoHMS(totalTime);
    // console.log(totalTime);
  }, [totalTime]);
  // 초기값을 저장해놓음 (초기화 버튼을 위해)
  useEffect(() => {
    timetoHMS(initTime);
  }, [initTime]);

  // 타이머의 input 값 유효 검사를 하는 부분
  useEffect(() => {
    // 시, 분, 초 중 1개 이상 생길 경우 활성화
    if (hour > 0 || minute > 0 || second > 0) {
      setIsValid(true);
    }
    if (hour === 0 && minute === 0 && second === 0) {
      setIsPlay(false);
    }
  }, [hour, minute, second]);

  return (
    <Wrapper>
      <TitleSection>타이머</TitleSection>
      <TimeSection>
        <SubtitleSection>시</SubtitleSection>
        <Hour onChange={handleHourChange} disabled={isPlay} value={hour}></Hour>
        <SubtitleSection>분</SubtitleSection>
        <Minute
          onChange={handleMinuteChange}
          disabled={isPlay}
          value={minute}
        ></Minute>
        <SubtitleSection>초</SubtitleSection>
        <Second
          onChange={handleSecondChange}
          disabled={isPlay}
          value={second}
        ></Second>
      </TimeSection>
      <ButtonSection>
        {isPlay ? (
          <PlayButton isValid={isValid} onClick={handleUnPlayClick}>
            정지
          </PlayButton>
        ) : (
          <PlayButton
            isValid={isValid}
            onClick={handlePlayClick}
            disabled={!isValid}
          >
            시작
          </PlayButton>
        )}
        {isStop ? (
          <StopButton isStop={isStop} onClick={handleStopClick}>
            재시작
          </StopButton>
        ) : (
          <StopButton
            isStop={isStop}
            onClick={handleStopClick}
            disabled={!isPlay}
          >
            멈춤
          </StopButton>
        )}
        <InitButton onClick={handleInitClick} disabled={!isPlay}>
          초기화
        </InitButton>
      </ButtonSection>
    </Wrapper>
  );
}

export default App;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TitleSection = styled.div`
  height: 5rem;
`;
const SubtitleSection = styled.div`
  margin: 0rem 1rem;
`;
const TimeSection = styled.section`
  display: flex;
`;
const Hour = styled.input``;
const Minute = styled.input``;
const Second = styled.input``;
const ButtonSection = styled.section`
  margin: 1rem;
`;
const PlayButton = styled.button<ButtonProps>`
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 3rem;
  cursor: ${(props) => (props.isValid ? "pointer" : "default")};
  background-color: ${(props) => (props.isValid ? "#4d4dff" : "#cedde1f")};
  color: ${(props) => (props.isValid ? "#ffffff" : "#cedde1f")};
`;
const StopButton = styled.button<ButtonProps>`
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 3rem;
  cursor: pointer;
  background-color: #4d4dff;
  color: #ffffff;
`;
const InitButton = styled.button<ButtonProps>`
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 3rem;
  cursor: pointer;
  background-color: #4d4dff;
  color: #ffffff;
`;
