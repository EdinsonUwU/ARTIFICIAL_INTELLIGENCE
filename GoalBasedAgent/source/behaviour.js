export function oneStepOfBehavior(numberOfCells, matrix, history_matrix) {

    function findAgendCoordinates(matrix) {
        for (var i = 0; i < numberOfCells; i++)
            for (var j = 0; j < numberOfCells; j++)
                if (matrix[i][j] == 1)
                    return [i, j];
    }
    var currentAgentCoordinates = findAgendCoordinates(matrix);

    var agentX = currentAgentCoordinates[0];
    var agentY = currentAgentCoordinates[1];
    console.log("actual:")
    console.log(agentX, agentY)


    //SENSORS AGAINST WALLS
    var LEFT_SENSOR = "left";//"blocked"
    var UP_SENSOR = "up";//"blocked"
    var RIGHT_SENSOR = "right";//"blocked"
    var DOWN_SENSOR = "down";//"blocked"
    var POSSIBLE_MOVEMENTS = new Array(4);
    if (agentX > 0)
        if (matrix[agentX - 1][agentY] != 2)
            POSSIBLE_MOVEMENTS.push(LEFT_SENSOR);
    if (agentY > 0)
        if (matrix[agentX][agentY - 1] != 2)
            POSSIBLE_MOVEMENTS.push(UP_SENSOR);
    if (agentX + 1 < numberOfCells)
        if (matrix[agentX + 1][agentY] != 2)
            POSSIBLE_MOVEMENTS.push(RIGHT_SENSOR);
    if (agentY + 1 < numberOfCells)
        if (matrix[agentX][agentY + 1] != 2)
            POSSIBLE_MOVEMENTS.push(DOWN_SENSOR);

    //take L distance into account to make next move
    //->["left"]
    //->["left","up"]
    function get_current_possible_movements_after_L_distance(possible_moves, matrix) {
        function findGoalCoordinates(matrix) {
            for (var i = 0; i < numberOfCells; i++)
                for (var j = 0; j < numberOfCells; j++)
                    if (matrix[i][j] == 3)
                        return [i, j];
            return null;
        }

        var currentGoalCoordinates = findGoalCoordinates(matrix);


        var goalX = currentGoalCoordinates[0];
        var goalY = currentGoalCoordinates[1];

        var output = []
        if (possible_moves.includes(RIGHT_SENSOR)) {
            if (agentX > goalX)
                output.push([RIGHT_SENSOR, Math.abs(goalX - agentX) + 1 + Math.abs(goalY - agentY)])
            else if (agentX < goalX)
                output.push([RIGHT_SENSOR, Math.abs(goalX - agentX) - 1 + Math.abs(goalY - agentY)])
            else
                output.push([RIGHT_SENSOR, Math.abs(goalX - agentX) + Math.abs(goalY - agentY)])
        }
        if (possible_moves.includes(LEFT_SENSOR)) {
            if (agentX > goalX)
                output.push([LEFT_SENSOR, Math.abs(goalX - agentX) - 1 + Math.abs(goalY - agentY)])
            else if (agentX < goalX)
                output.push([LEFT_SENSOR, Math.abs(goalX - agentX) + 1 + Math.abs(goalY - agentY)])
            else
                output.push([LEFT_SENSOR, Math.abs(goalX - agentX) + Math.abs(goalY - agentY)])
        }
        if (possible_moves.includes(DOWN_SENSOR)) {
            if (agentY > goalY)
                output.push([DOWN_SENSOR, Math.abs(goalX - agentX) + Math.abs(goalY - agentY) + 1])
            else if (agentY < goalY)
                output.push([DOWN_SENSOR, Math.abs(goalX - agentX) + Math.abs(goalY - agentY) - 1])
            else
                output.push([DOWN_SENSOR, Math.abs(goalX - agentX) + Math.abs(goalY - agentY)])
        }
        if (possible_moves.includes(UP_SENSOR)) {
            if (agentY > goalY)
                output.push([UP_SENSOR, Math.abs(goalX - agentX) + Math.abs(goalY - agentY) - 1])
            else if (agentY < goalY)
                output.push([UP_SENSOR, Math.abs(goalX - agentX) + Math.abs(goalY - agentY) + 1])
            else
                output.push([UP_SENSOR, Math.abs(goalX - agentX) + Math.abs(goalY - agentY)])
        }
        console.log(output)
        //ordenar en orden descendente
        output.sort((a, b) => { return a[1] - b[1]; })
        if (output.length >= 2) {
            if (output[0][1] == output[1][1])
                possible_moves = [output[0][0], output[1][0]]
            else
                possible_moves = [output[0][0]]
        }
        else {
            possible_moves = [output[0][0]]
        }

        //console.log(output)
        return possible_moves


    }
    POSSIBLE_MOVEMENTS = get_current_possible_movements_after_L_distance(POSSIBLE_MOVEMENTS, matrix);



    function get_current_possible_movements_after_history(possible_moves) {
        var output = []
        if (possible_moves.includes(RIGHT_SENSOR)) {
            output.push([RIGHT_SENSOR, history_matrix[agentX + 1][agentY]])
        }
        if (possible_moves.includes(LEFT_SENSOR)) {
            output.push([LEFT_SENSOR, history_matrix[agentX - 1][agentY]])
        }
        if (possible_moves.includes(DOWN_SENSOR)) {
            output.push([DOWN_SENSOR, history_matrix[agentX][agentY + 1]])
        }
        if (possible_moves.includes(UP_SENSOR)) {
            output.push([UP_SENSOR, history_matrix[agentX][agentY - 1]])
        }
        //ordenar en orden descendente
        output.sort((a, b) => { return a[1] - b[1]; })
        possible_moves = [output[0][0]]
        //console.log(output)
        return possible_moves
    }
    POSSIBLE_MOVEMENTS = get_current_possible_movements_after_history(POSSIBLE_MOVEMENTS)
    //for (var i = 0; i < POSSIBLE_MOVEMENTS.length; i++) {
    if (POSSIBLE_MOVEMENTS.includes(RIGHT_SENSOR))
        matrix[agentX + 1][agentY] = 1;
    else if (POSSIBLE_MOVEMENTS.includes(DOWN_SENSOR))
        matrix[agentX][agentY + 1] = 1;
    else if (POSSIBLE_MOVEMENTS.includes(LEFT_SENSOR))
        matrix[agentX - 1][agentY] = 1;
    else if (POSSIBLE_MOVEMENTS.includes(UP_SENSOR))
        matrix[agentX][agentY - 1] = 1;
    //}
    //for (var i = 0; i < POSSIBLE_MOVEMENTS.length; i++) {
    //console.log(POSSIBLE_MOVEMENTS);
    history_matrix[agentX][agentY] = history_matrix[agentX][agentY] + 1;
    matrix[agentX][agentY] = 0;
    return matrix;
}