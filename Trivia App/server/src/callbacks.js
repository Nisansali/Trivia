import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();


Empirica.onGameStart(({ game }) => {
  const round = game.addRound({
    name: "Round 1",
    task: "trivia01",
  });
  round.addStage({ name: "Answer", duration: 300 });
  round.addStage({ name: "Average", duration: 300 });
  round.addStage({ name: "RevisedAverage", duration: 120 });

  const round2 = game.addRound({
    name: "Round 2",
    task: "trivia02",
  });
  round2.addStage({ name: "Answer", duration: 300 });
  round2.addStage({ name: "Average", duration: 300 });
  round2.addStage({ name: "RevisedAverage", duration: 120 });
});

Empirica.onRoundStart(({ round }) => { });

Empirica.onStageStart(({ stage }) => { });

Empirica.onStageEnded(({ stage }) => { });

Empirica.onRoundEnded(({ round }) => { });

Empirica.onGameEnded(({ game }) => { });