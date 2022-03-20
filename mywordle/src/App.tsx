import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import logo from './pictures/woman.jpg';
import { answerList } from './utils/wordlist';

let gameNum: number = Math.round(Math.random() * answerList.length);
function App() {
  let empty: string[] = [];
  for (let i = 0; i < 30; i++) {
    empty.push(" ");
  }
  let anpty: string = '';
  let fake1: number[] = [];
  for (let i = 0; i < 30; i++) {
    fake1.push(0);
  }
  let fake2: number[] = [];
  for (let i = 0; i < 30; i++) {
    fake2.push(0);
  }
  let fake3: number[] = [];
  for (let i = 0; i < 30; i++) {
    fake3.push(0);
  }
  const [content, setContent] = useState(empty);
  const [firstRow, setFirstRow] = useState(empty.slice(0, 5));
  const [secondRow, setSecondRow] = useState(empty.slice(5, 10));
  const [thirdRow, setThirdRow] = useState(empty.slice(10, 15));
  const [fourthRow, setFourthRow] = useState(empty.slice(15, 20));
  const [fifthRow, setFifthRow] = useState(empty.slice(20, 25));
  const [sixthRow, setSixthRow] = useState(empty.slice(25, 30));
  const [cursor, setCursor] = useState(0);
  const [answer, setAnswer] = useState(anpty);
  const [played, setPlayed] = useState(fake1);
  const [relevant, setRelevant] = useState(fake2);
  const [position, setPosition] = useState(fake3);
  const [rowNum, setRowNum] = useState(0);
  const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const row3 = ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Delete'];
  const judge = () => {
    return cursor % 5 == 0 && cursor !== 0;
  }
  const compare = (answer: string, solution: string) => {
    answer = answer.toLowerCase();
    solution = solution.toLowerCase();
    if (answer === solution) return 1;
    else {
      for (let i = 0; i < answerList.length; i++) {
        if (answerList[i] === answer) {
          return 0;
        }
      }
      return -1;
    }
  }
  const flush = () => {
    let temp: string[] = empty;
    setContent(temp);
    setFirstRow(temp.slice(0, 5));
    setSecondRow(temp.slice(5, 10));
    setThirdRow(temp.slice(10, 15));
    setFourthRow(temp.slice(15, 20));
    setFifthRow(temp.slice(20, 25));
    setSixthRow(temp.slice(25, 30));
    setCursor(0);
    setRowNum(0);
    setPlayed(fake1);
    setRelevant(fake2);
    setPosition(fake3);
    setAnswer('');
    gameNum = Math.round(Math.random() * answerList.length);
  }
  const handleKeyDown = (key: string) => {
    console.log(answerList[gameNum]);
    if ((key == 'q' || key == 'w' || key == 'e' || key == 'r' || key == 't' || key == 'y' || key == 'u' || key == 'i' || key == 'o' || key == 'p' || key == 'a' || key == 's' || key == 'd' || key == 'f' || key == 'g' || key == 'h' || key == 'j' || key == 'k' || key == 'l' || key == 'z' || key == 'x' || key == 'c' || key == 'v' || key == 'b' || key == 'n' || key == 'm') && !judge()) {
      let temp = content;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] === ' ') {
          temp[i] = key;
          setCursor(prev => prev + 1);
          break;
        }
      }
      setAnswer(prev => prev + key);
      setContent(temp);
      setFirstRow(temp.slice(0, 5));
      setSecondRow(temp.slice(5, 10));
      setThirdRow(temp.slice(10, 15));
      setFourthRow(temp.slice(15, 20));
      setFifthRow(temp.slice(20, 25));
      setSixthRow(temp.slice(25, 30));
    }
    if ((key === 'Backspace' || key === 'delete' || key === 'Delete') && cursor >= 1) {
      let temp = content;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] === ' ') {
          temp[i - 1] = ' ';
          setCursor(prev => prev - 1);
          break;
        }
        if (i === temp.length - 1) {
          temp[i] = ' ';
          setCursor(prev => prev - 1);
          break;
        }
      }
      let deal = answer;
      setAnswer(deal.substring(0, deal.length - 1));
      setContent(temp);
      setFirstRow(temp.slice(0, 5));
      setSecondRow(temp.slice(5, 10));
      setThirdRow(temp.slice(10, 15));
      setFourthRow(temp.slice(15, 20));
      setFifthRow(temp.slice(20, 25));
      setSixthRow(temp.slice(25, 30));
    }
    if (answer.length === 5 && key === 'Enter') {
      //单词输入无效的情况
      if (compare(answer, answerList[gameNum]) === -1) {//很巧妙，在这里我想到了调用五个删除键来实现重新键入的功能
        alert('Invalid Word!');
        for (let i = 0; i < 5; i++) {
          handleKeyDown('Delete');
        }
        setAnswer(anpty);
      }
      //单词输入正确，匹配字母的情况
      if (compare(answer, answerList[gameNum]) === 0) {
        let ans = answer.split('');
        let lis = answerList[gameNum].split('');
        let played1: number[] = played;
        let relevant1: number[] = relevant;
        let position1: number[] = position;
        for (let i = rowNum * 5; i < rowNum * 5 + 5; i++) {
          played1[i] = 1;//这五个位置被填写了
        }
        for (let i = rowNum * 5; i < rowNum * 5 + 5; i++) {
          if (ans[i - rowNum * 5] === lis[i - rowNum * 5]) {
            position1[i] = 1; //填对位置的改成绿色
          }
          else {
            position1[i] = 0;
          }
        }
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 5; j++) {
            if (lis[j] === ans[i]) {
              relevant1[i + rowNum * 5] = 1;
            }
          }
        }
        setPlayed(played1);
        setRelevant(relevant1);
        setPosition(position1);
        setCursor(0);
        setAnswer(anpty);
        setRowNum(prev => prev + 1);
      }
      //单词输入正确且匹配的情况
      if (compare(answer, answerList[gameNum]) === 1) {
        for (let i = rowNum * 5; i < rowNum * 5 + 5; i++) {
          played[i] = 1;
          position[i] = 1;
          relevant[i] = 1;
        }
        setPlayed(played);
        setRelevant(relevant);
        setPosition(position);
        setCursor(0);
        setTimeout("alert('Absolute Corrrrrrrrrrrrrrrect!')", 200);
        setTimeout(() => { flush() }, 1000);
      }
    }
  }
  return (
    <div
      style={{ height: "100vh", backgroundImage: `url(${logo})` }}
      tabIndex={0}
      onKeyDown={(event) => handleKeyDown(event.key)}
    >
      <div className='gridRow'>
        {
          firstRow.map((value, index) => (
            <h1 className='letter' key={index} style={{ backgroundColor: played[index] ? (relevant[index] ? (position[index] ? 'green' : 'yellow') : 'grey') : 'white' }}>{value}</h1>
          ))
        }
      </div>
      <div className='gridRow'>
        {
          secondRow.map((value, index) => (
            // <div className='grid'></div>
            <h1 className='letter' key={index} style={{ backgroundColor: played[5 + index] ? (relevant[5 + index] ? (position[5 + index] ? 'green' : 'yellow') : 'grey') : 'white' }}>{value}</h1>
          ))
        }
      </div>
      <div className='gridRow'>
        {
          thirdRow.map((value, index) => (
            // <div className='grid'></div>
            <h1 className='letter' key={index} style={{ backgroundColor: played[10 + index] ? (relevant[10 + index] ? (position[10 + index] ? 'green' : 'yellow') : 'grey') : 'white' }}>{value}</h1>
          ))
        }
      </div>
      <div className='gridRow'>
        {
          fourthRow.map((value, index) => (
            <h1 className='letter' key={index} style={{ backgroundColor: played[15 + index] ? (relevant[15 + index] ? (position[15 + index] ? 'green' : 'yellow') : 'grey') : 'white' }}>{value}</h1>
          ))
        }
      </div>
      <div className='gridRow'>
        {
          fifthRow.map((value, index) => (
            <h1 className='letter' key={index} style={{ backgroundColor: played[20 + index] ? (relevant[20 + index] ? (position[20 + index] ? 'green' : 'yellow') : 'grey') : 'white' }}>{value}</h1>
          ))
        }
      </div>
      <div className='gridRow'>
        {
          sixthRow.map((value, index) => (
            <h1 className='letter' key={index} style={{ backgroundColor: played[25 + index] ? (relevant[25 + index] ? (position[25 + index] ? 'green' : 'yellow') : 'grey') : 'white' }}>{value}</h1>
          ))
        }
      </div>
      <div style={{ margin: "50px" }}></div>
      <div className='butRow'>
        {
          row1.map((value, index) => (
            <button className='but' style={{ margin: "3px" }} onClick={(e) => handleKeyDown(value)}>{value}</button>
          ))
        }
      </div>
      <div className='butRow'>
        {
          row2.map((value, index) => (
            <button className='but' style={{ margin: "3px" }} onClick={(e) => handleKeyDown(value)}>{value}</button>
          ))
        }
      </div>
      <div className='butRow'>
        {
          row3.map((value, index) => (
            <button className='but' style={{ margin: "3px" }} onClick={(e) => handleKeyDown(value)}>{value}</button>
          ))
        }
      </div>
    </div >
  );
}

export default App;
