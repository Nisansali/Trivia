import { EmpiricaClassic } from "@empirica/core/player/classic";
import { EmpiricaContext } from "@empirica/core/player/classic/react";
import { EmpiricaMenu, EmpiricaParticipant } from "@empirica/core/player/react";
import React from "react";
import { Game } from "./Game";
import { ExitSurvey } from "./intro-exit/ExitSurvey";
import { Introduction } from "./intro-exit/Introduction";

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const playerKey = urlParams.get("participantKey") || "";

  const { protocol, host } = window.location;
  const url = `${protocol}//${host}/query`;

  function introSteps({ game, player }) {
    return [Introduction];
  }

  function exitSteps({ game, player }) {
    return [ExitSurvey];
  }

  function getTwoDistinctTriviaQuestions(arr) {

    const shuffledArray = arr.sort(() => Math.random() - 0.5);

    let firstQuestion = shuffledArray[0];
    let secondQuestion;

    for (let i = 1; i < shuffledArray.length; i++) {
      if (shuffledArray[i] !== firstQuestion) {
        secondQuestion = shuffledArray[i];
        break;
      }
    }

    return [firstQuestion, secondQuestion];
  }

  const questions = ["What is the answer for trivia question 01 ?", "What is the answer for trivia question 02 ?", "What is the answer for trivia question 03 ?"]
  const [firstQuestion, secondQuestion] = getTwoDistinctTriviaQuestions(questions);


  return (
    <EmpiricaParticipant url={url} ns={playerKey} modeFunc={EmpiricaClassic}>
      <div className="h-screen relative">
        <EmpiricaMenu position="bottom-left" />
        <div className="h-full overflow-auto">
          <EmpiricaContext introSteps={introSteps} exitSteps={exitSteps}>
            <Game first={firstQuestion} second={secondQuestion} />
          </EmpiricaContext>
        </div>
      </div>
    </EmpiricaParticipant>
  );
}
