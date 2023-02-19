export function oneStepOfBehavior(numberOfCells, matriz) {
    console.log(matriz)
    function findAgendCoordinates(matriz) {
        console.log("hola")
        console.log(matriz)
        for (var i = 0; i < numberOfCells; i++)
            for (var j = 0; j < numberOfCells; j++)
                if (matriz[i][j] == 1)
                    return [i, j];
    }
    var currentAgentCoordinates = findAgendCoordinates(matriz);
    console.log(currentAgentCoordinates);
    var agentX = currentAgentCoordinates[0];
    var agentY = currentAgentCoordinates[1];
    var newAgentX = null;
    var newAgentY = null
    //right available first
    if ((agentX < numberOfCells - 1) && (matriz[agentX + 1][agentY] != 2)) {
        newAgentX = agentX + 1;
        newAgentY = agentY;
    }
    //left available second
    else if ((agentX > 0) && (matriz[agentX - 1][agentY] != 2)) {
        newAgentX = agentX - 1;
        newAgentY = agentY;
    }
    //up available third
    else if ((agentY > 0) && (matriz[agentX][agentY - 1] != 2)) {
        newAgentX = agentX;
        newAgentY = agentY - 1;
    }
    //down available fourth
    else if ((agentY < numberOfCells-1) && (matriz[agentX][agentY + 1] != 2)) {
        newAgentX = agentX;
        newAgentY = agentY + 1;
    }
    matriz[agentX][agentY] = 0;
    matriz[newAgentX][newAgentY] = 1
    return matriz;
}