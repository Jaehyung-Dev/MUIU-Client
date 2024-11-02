import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

const EmotionDivCover = styled.div`
  width: 100%;
  min-height: 90vh;
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
`;

const SelectDiv = styled.div`
  margin-top: 0.5rem;
  width: 40%;
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e4e4e4;
  border-radius: 5px;
  @media screen and (max-width: 600px) {
    width: 50%;
  }
`;

const SelectPeriod = styled.button`
  width: 6vw;
  height: 90%;
  border-radius: 5px;
  background-color: ${(props) => (props.clicked ? "white" : "#e4e4e4")};
  transition: background-color 0.2s ease;
  margin: 0.1rem;
  border: none;
  p {
    margin: 0;
    color: black;
    font-size: 0.9rem;
  }

  @media screen and (max-width: 600px) {
    width: 15vw;
  }
`;

const GraphDiv = styled.div`
  width: 85%;
  height: 90vh;
  background-color: white;
  border-radius: 20px;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  @media screen and (max-width: 393px) {
    height: 60%;
  }
  
`;

const GraphPoint = styled.circle`
  fill: ${({ color }) => color};
`;

const GraphLine = styled.polyline`
  fill: none;
  stroke: gray;
  stroke-width: 2;
`;

const YearlyGraphContainer = styled.div`
  width: 90%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const YearlyGraph = styled.svg`
  width: 90%;
  height: 50vh;
  margin: 0 20px;
`;

const GridLine = styled.line`
  stroke: lightgray;
  stroke-width: 1;
`;

const GraphColumnDiv = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  color: gray;
  @media screen and (max-width: 393px) {
    margin-left: 3rem;
  }
`;

const GraphColumnDiv1 = styled.div`
  width: 68%;
  display: flex;
  justify-content: space-around;
  color: gray;
  margin-left: -30px;
  margin-top: -130px;
`;

const GraphColumnDiv2 = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  color: gray;
  margin-left: 0;
  margin-top: -100px;
`;

const EmotionGraph = () => {
    const [clickedIndex, setClickedIndex] = useState(0);
    const handleClick = (index) => setClickedIndex(index);
    const [isLoaded, setIsLoaded] = useState(false);

    const userId = useSelector((state) => state.memberSlice.id);

    // 상태 변수로 데이터 값 지정
    const [weeklyValues, setWeeklyValues] = useState([1,2,3,4,5]);
    const [monthlyValues, setMonthlyValues] = useState([]);
    

    const periodText = ["주간", "월간", "연간"];
    const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
    const weeksOfMonth = ["1주", "2주", "3주", "4주", "5주"];
    const monthsOfYear = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
    ];

    const monthlyData = [3, 4, 2, 5, 1];
    const yearlyData = [1, 2, 4, 5, 2, 3, 2, 1, 3, 5, 4, 1];

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(`http://localhost:9090/diaries/emotions/${userId}`, {
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
              },
              withCredentials: true,
              }); // API 엔드포인트
              const data = await response.json();

              console.log("Fetched data:", data); // 가져온 데이터 콘솔에 출력

            // 서버에서 가져온 데이터를 각각 주간 및 월간 데이터로 설정
            setWeeklyValues(data.item.weeklyValues); 
            setMonthlyValues(data.item.monthlyValues); 
              
              setIsLoaded(true);
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };

      fetchData();  
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행

    const getColorByValue = (value) => {
        switch (value) {
            case 5:
                return "#00C7BE";
            case 4:
                return "#34C759";
            case 3:
                return "#FFCC00";
            case 2:
                return "#FF9500";
            case 1:
                return "#FF3B30";
            default:
                return "gray";
        }
    };

    return (
        <EmotionDivCover>
            <SelectDiv>
                {periodText.map((text, index) => (
                    <SelectPeriod
                        key={index}
                        clicked={clickedIndex === index}
                        onClick={() => handleClick(index)}
                    >
                        <p>{text}</p>
                    </SelectPeriod>
                ))}
            </SelectDiv>
            <GraphDiv>
              {clickedIndex === 0 && (
                    <YearlyGraphContainer>
                        <YearlyGraph viewBox="0 0 400 200">
                            {[1, 2, 3, 4, 5].map((value, index) => (
                                <GridLine
                                    key={index}
                                    x1="0"
                                    y1={(index + 1) * 40}
                                    x2="100%"
                                    y2={(index + 1) * 40}
                                />
                                ))}
                                <GraphLine
                                    points={weeklyValues
                                        .map((value, index) =>
                                            value !== 0 ? `${(index + 1) * 50},${200 - value * 40}` : null
                                        )
                                        .filter(point => point !== null) // 0 값 제거
                                        .join(" ")}
                                />
                                {weeklyValues.map((value, index) =>
                                    value !== 0 ? (
                                        <GraphPoint
                                            key={index}
                                            cx={(index + 1) * 50}
                                            cy={200 - value * 40}
                                            r="5"
                                            color={getColorByValue(value)}
                                        />
                                    ) : null // 0 값일 경우 렌더링하지 않음
                                )}
                            </YearlyGraph>
                            <GraphColumnDiv>
                                {daysOfWeek.map((day, index) => (
                                    <p key={index}>{day}</p>
                                ))}
                            </GraphColumnDiv>
                      </YearlyGraphContainer>
                  )}
                {clickedIndex === 1 && (
                    <YearlyGraphContainer>
                        <YearlyGraph viewBox="0 0 400 200">
                            {[1, 2, 3, 4, 5].map((value, index) => (
                                <GridLine
                                    key={index}
                                    x1="0"
                                    y1={(index + 1) * 40}
                                    x2="100%"
                                    y2={(index + 1) * 40}
                                />
                            ))}
                            <GraphLine
                                points={monthlyValues
                                    .map((value, index) =>
                                        value !== 0 ? `${(index + 1) * 60},${200 - value * 40}` : null
                                    )
                                    .filter(point => point !== null) // 0 값 제거
                                    .join(" ")}
                            />
                            {monthlyValues.map((value, index) =>
                                value !== 0 ? (
                                    <GraphPoint
                                        key={index}
                                        cx={(index + 1) * 60}
                                        cy={200 - value * 40}
                                        r="5"
                                        color={getColorByValue(value)}
                                    />
                                ) : null // 0 값일 경우 렌더링하지 않음
                            )}
                        </YearlyGraph>
                        <GraphColumnDiv1>
                            {weeksOfMonth.map((week, index) => (
                                <p key={index}>{week}</p>
                            ))}
                        </GraphColumnDiv1>
                    </YearlyGraphContainer>
                )}
                {clickedIndex === 2 && (
                    <YearlyGraphContainer>
                        <YearlyGraph viewBox="0 0 400 200">
                            {[1, 2, 3, 4, 5].map((value, index) => (
                                <GridLine
                                    key={index}
                                    x1="0"
                                    y1={(index + 1) * 40}
                                    x2="100%"
                                    y2={(index + 1) * 40}
                                />
                            ))}
                            <GraphLine
                                points={yearlyData
                                    .map(
                                        (value, index) => `${(index + 1) * 30},${200 - value * 40}`
                                    )
                                    .join(" ")}
                            />
                            {yearlyData.map((value, index) => (
                                <GraphPoint
                                    key={index}
                                    cx={(index + 1) * 30}
                                    cy={200 - value * 40}
                                    r="5"
                                    color={getColorByValue(value)}
                                />
                            ))}
                        </YearlyGraph>
                        <GraphColumnDiv2>
                            {monthsOfYear.map((month, index) => (
                                <p key={index}>{month}</p>
                            ))}
                        </GraphColumnDiv2>
                    </YearlyGraphContainer>
                )}
            </GraphDiv>
        </EmotionDivCover>
    );
};

export default EmotionGraph;
