export function oneStepOfBehavior(numberOfCells, matriz) {
    console.log(matriz)
    function findAgendCoordinates(matriz) {
        for (var i = 0; i < numberOfCells; i++)
            for (var j = 0; j < numberOfCells; j++)
                if (matriz[i][j] == 1)
                    return [i, j];
    }
    var currentAgentCoordinates = findAgendCoordinates(matriz);

    var agentX = currentAgentCoordinates[0];
    var agentY = currentAgentCoordinates[1];
    var newAgentX = null;
    var newAgentY = null
    console.log("actual:")
    console.log(agentX, agentY)

    //SENSORS
    var LEFT_SENSOR = false;//"blocked"
    var UP_SENSOR = false;//"blocked"
    var RIGHT_SENSOR = false;//"blocked"
    var DOWN_SENSOR = false;//"blocked"
    if (agentX > 0)
        if (matriz[agentX - 1][agentY] != 2)
            LEFT_SENSOR = true;//"free";
    if (agentY > 0)
        if (matriz[agentX][agentY - 1] != 2)
            UP_SENSOR = true;//"free";
    if (agentX + 1< numberOfCells)
        if (matriz[agentX + 1][agentY] != 2)
            RIGHT_SENSOR = true;//"free";
    if (agentY + 1< numberOfCells)
        if (matriz[agentX][agentY + 1] != 2)
            DOWN_SENSOR = true;//"free";

    console.log(LEFT_SENSOR, UP_SENSOR, RIGHT_SENSOR, DOWN_SENSOR)

    //up
    if (LEFT_SENSOR && UP_SENSOR && RIGHT_SENSOR && DOWN_SENSOR) {
        newAgentX = agentX;
        newAgentY = agentY - 1;
    }
    //right
    else if (LEFT_SENSOR && UP_SENSOR && RIGHT_SENSOR && !DOWN_SENSOR) {
        newAgentX = agentX + 1;
        newAgentY = agentY;
    }
    //left
    else if (LEFT_SENSOR && UP_SENSOR && !RIGHT_SENSOR && DOWN_SENSOR) {
        newAgentX = agentX-1;
        newAgentY = agentY;
    }
    //up
    else if (LEFT_SENSOR && UP_SENSOR && !RIGHT_SENSOR && !DOWN_SENSOR) {
        newAgentX = agentX;
        newAgentY = agentY - 1;
    }
    //left
    else if (LEFT_SENSOR && !UP_SENSOR && RIGHT_SENSOR && DOWN_SENSOR) {
        newAgentX = agentX - 1;
        newAgentY = agentY;
    }
    //right
    else if (LEFT_SENSOR && !UP_SENSOR && RIGHT_SENSOR && !DOWN_SENSOR) {
        newAgentX = agentX + 1;
        newAgentY = agentY;
    }
    //left
    else if (LEFT_SENSOR && !UP_SENSOR && !RIGHT_SENSOR && DOWN_SENSOR) {
        newAgentX = agentX - 1;
        newAgentY = agentY;
    }
    //left
    else if (LEFT_SENSOR && !UP_SENSOR && !RIGHT_SENSOR && !DOWN_SENSOR) {
        newAgentX = agentX - 1;
        newAgentY = agentY;
    }
    //down
    else if (!LEFT_SENSOR && UP_SENSOR && RIGHT_SENSOR && DOWN_SENSOR) {
        newAgentX = agentX;
        newAgentY = agentY + 1;
    }
    //right
    else if (!LEFT_SENSOR && UP_SENSOR && RIGHT_SENSOR && !DOWN_SENSOR) {
        newAgentX = agentX + 1;
        newAgentY = agentY;
    }
    //down
    else if (!LEFT_SENSOR && UP_SENSOR && !RIGHT_SENSOR && DOWN_SENSOR) {
        newAgentX = agentX;
        newAgentY = agentY + 1;
    }
    //up
    else if (!LEFT_SENSOR && UP_SENSOR && !RIGHT_SENSOR && !DOWN_SENSOR) {
        newAgentX = agentX;
        newAgentY = agentY - 1;
    }
    //down
    else if (!LEFT_SENSOR && !UP_SENSOR && RIGHT_SENSOR && DOWN_SENSOR) {
        newAgentX = agentX;
        newAgentY = agentY + 1;
    }
    //right
    else if (!LEFT_SENSOR && !UP_SENSOR && RIGHT_SENSOR && !DOWN_SENSOR) {
        newAgentX = agentX + 1;
        newAgentY = agentY;
    }
    //down
    else if (!LEFT_SENSOR && !UP_SENSOR && !RIGHT_SENSOR && DOWN_SENSOR) {
        newAgentX = agentX;
        newAgentY = agentY + 1;
    }

    matriz[agentX][agentY] = 0;
    matriz[newAgentX][newAgentY] = 1
    console.log("nuevo:")
    console.log(newAgentX, newAgentY);
    return matriz;
}