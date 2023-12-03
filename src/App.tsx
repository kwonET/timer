import React, { useEffect, useState } from "react";
import styled from "styled-components";
interface ButtonProps {
  isPlay?: boolean;
  isValid: boolean;
}
function App() {
  const [isPlay, setIsPlay] = useState<boolean>(false); // 타이머의 동작 상태 유무
  const [isValid, setIsValid] = useState<boolean>(false); // 타이머 input 값 유효한지
  const [hour, setHour] = useState<number>(0); //시
  const [minute, setMinute] = useState<number>(0); //분
  const [second, setSecond] = useState<number>(0); //초
  const handlePlay = () => {};
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (Number(e.target.value) <= 24 && Number(e.target.value) >= 0) {
      // 시 : 0 ~ 24
      setHour(Number(e.target.value));
    }
  };
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (Number(e.target.value) < 60 && Number(e.target.value) >= 0) {
      // 분 : 0 ~ 59
      setMinute(Number(e.target.value));
    }
  };
  const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (Number(e.target.value) < 60 && Number(e.target.value) >= 0) {
      // 초 : 0 ~ 59
      setSecond(Number(e.target.value));
    }
  };
  const handlePlayClick = () => {
    setIsPlay(true);
  };
  useEffect(() => {
    // 시, 분, 초 중 1개 이상 생길 경우 활성화
    if (hour || minute || second) {
      setIsValid(true);
    }
  }, [hour, minute, second]);
  return (
    <Wrapper>
      <TitleSection>타이머</TitleSection>
      <TimeSection>
        <SubtitleSection>시</SubtitleSection>
        <Hour onChange={handleHourChange} disabled={isPlay}></Hour>
        <SubtitleSection>분</SubtitleSection>
        <Minute onChange={handleMinuteChange} disabled={isPlay}></Minute>
        <SubtitleSection>초</SubtitleSection>
        <Second onChange={handleSecondChange} disabled={isPlay}></Second>
      </TimeSection>
      <ButtonSection>
        {isPlay ? (
          <PlayButton isValid={isValid} onClick={handlePlayClick}>
            시작
          </PlayButton>
        ) : (
          <PlayButton isValid={isValid} onClick={handlePlayClick}>
            정지
          </PlayButton>
        )}
        <StopButton>멈춤</StopButton>
        <InitButton>초기화</InitButton>
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
  cursor: ${(props) => (props.isValid ? "pointer" : "none")};
  background-color: ${(props) => (props.isValid ? "#4d4dff" : "#cedde1f")};
  color: ${(props) => (props.isValid ? "#ffffff" : "#cedde1f")};
`;
const StopButton = styled.button`
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 3rem;
`;
const InitButton = styled.button`
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 3rem;
`;
