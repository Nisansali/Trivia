import {
    usePlayer,
    usePlayers,
    useStage,
} from "@empirica/core/player/classic/react";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import "../../node_modules/@empirica/core/dist/player-classic-react.css";


export function Trivia({ question }) {
    const player = usePlayer();
    const players = usePlayers();
    const stage = useStage();
    const [average, setAverage] = useState(0);

    useEffect(() => {
        setAverage((players.reduce((accumulator, { round }) => accumulator + round.get("guess"), 0) / players.length))
    }, [])

    function handleChange(e) {
        player.round.set("guess", e.target.valueAsNumber);
    }

    function handleSubmit() {
        player.stage.set("submit", true);
    }

    const isAvgResult = stage.get("name") === "Average";
    const isRevisedAvgResult = stage.get("name") === "RevisedAverage";

    return (
        <div className="md:min-w-96 lg:min-w-128 xl:min-w-192 flex flex-col items-center space-y-10">
            <p>
                {(isAvgResult || isRevisedAvgResult) ? `The average answer so far is ${average}` : `${question}`}
            </p>

            <input
                type="number"
                value={player.round.get("guess")}
                onChange={handleChange}
            />

            <Button handleClick={handleSubmit} primary>
                {isAvgResult ? "Update" : "Submit"}
            </Button>
        </div>
    )
}