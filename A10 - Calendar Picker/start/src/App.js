import React, {useState} from 'react';
import styled, {css} from 'styled-components'
import './App.css';

const calendarDates = Array(31)
  .fill(0)
  .map((e, i) => i);

export default function App() {

  const [choosingType, setChoosingType] = useState('start');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  function updateDate(chosenDay){
    // hndle if user chose before our current range
    if(startDate && chosenDay < startDate){
      setStartDate(chosenDay);
      return setChoosingType('end');
    }

    // handle if a user chose after our current range
    if(endDate && chosenDay > endDate){
      setEndDate(chosenDay);
      return setChoosingType('end');
    }

    // set start date
    if(choosingType === 'start'){
      setStartDate(chosenDay);
      return setChoosingType('end');
      
    }
    // set end date
    if(choosingType === 'end'){
      setEndDate(chosenDay);
    }
  }

  function checkInBetween(chosenDay){
    if(startDate && !endDate || startDate === endDate){
      return chosenDay > startDate && chosenDay < hoverDate;
    }
    if(chosenDay > startDate && chosenDay < endDate){
      return chosenDay;
    }
  }
  
  return (
    <>
      <StyledDateChooser>
        <StyledDateChooserButton className="date-chooser-button" onClick={() => setChoosingType('start')}
        isChoosing={choosingType  === 'start'}>
          Start Date <span>{startDate}</span>
        </StyledDateChooserButton>
        <StyledDateChooserButton className="date-chooser-button" onClick={() => setChoosingType('end')}
        isChoosing={choosingType === 'end'}>
          End Date <span>{endDate}</span>
        </StyledDateChooserButton>
      </StyledDateChooser>

      <StyledCalendar>
        {calendarDates.map((day, index) => {
          const dayNumber = day + 1;

          let isInBetween = checkInBetween(dayNumber);
          let isSelected = dayNumber === startDate || dayNumber === endDate;

          return <StyledCalendarDay key={index} isInBetween={isInBetween} isSelected={isSelected} onMouseOver={() => setHoverDate(dayNumber)} onClick={() => updateDate(dayNumber)}>{dayNumber}</StyledCalendarDay>;
        })}
      </StyledCalendar>
    </>
  );
}

const StyledDateChooser = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;
const StyledDateChooserButton = styled.button`
  color: #0b204c;
  text-transform: uppercase;
  flex: 1;
  padding: 15px;
  background: none;
  cursor: pointer;
  border: none;
  border-bottom: 2px solid rgba(11, 32, 76, 0.2);
  outline: none;
  border-color: ${props => (props.isChoosing ? '#bada55' : 'none')};

  span{
    display: block;
    min-height: 60px;
    font-size: 50px;
  }

`;
const StyledCalendar = styled.div`
  max-width: 400px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  background: #0b204c;
  color: #fff;
  padding: 20px;
`;
  
const StyledCalendarDay = styled.button`

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: 0.3s ease background;
  border: none;
  outline: none;
  cursor: pointer;
  color: #8096c1;
  background: none;

  ${(props)  =>
    props.isInBetween && css `
      background: #bada5520;
      color: #fff;
    `};

  ${(props)  =>
    props.isSelected && css `
      background: #bada55;
      border-radius: 0 50% 50% 0;
      color: black;
    `};

    &:nth-child(1){
      ${(props)  =>
    props.isSelected && css `
      background: #bada55;
      border-radius: 50% 0 0 50%;
      color: black;
    `};
    }
`;
