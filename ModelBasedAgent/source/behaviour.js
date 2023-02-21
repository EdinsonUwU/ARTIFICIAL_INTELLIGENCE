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

    function get_current_possible_movements(possible_moves) {
        var output = []
        if (possible_moves.includes(RIGHT_SENSOR)) {
            output.push([RIGHT_SENSOR, history_matrix[agentX + 1][agentY]])
        }
        if (possible_moves.includes(LEFT_SENSOR)) {
            output.push([LEFT_SENSOR, history_matrix[agentX - 1][agentY]])
        }
        if (possible_moves.includes(DOWN_SENSOR)) {
            output.push([DOWN_SENSOR, history_matrix[agentX][agentY+1]])
        }
        if (possible_moves.includes(UP_SENSOR)) {
            output.push([UP_SENSOR, history_matrix[agentX][agentY - 1]])
        }
        //ordenar en orden descendente
        output.sort((a, b) => { return a[1]-b[1];} )
        possible_moves = [output[0][0]]
        console.log(output)
        return possible_moves
    }
    POSSIBLE_MOVEMENTS = get_current_possible_movements(POSSIBLE_MOVEMENTS)
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
    console.log(POSSIBLE_MOVEMENTS);
    history_matrix[agentX][agentY] = history_matrix[agentX][agentY] + 1;
    matrix[agentX][agentY] = 0;
    return matrix;
}