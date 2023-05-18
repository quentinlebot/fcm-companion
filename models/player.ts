import { Player } from '@/types/player'

// global state, created in module scope
const global = ref({
    players: [new Player(1), new Player(2), new Player(3), new Player(4), new Player(5), new Player(6)],
})

setDefaultTurnOrder();

function setDefaultTurnOrder() {
    global.value.players.forEach((player, index) => {
        player.turnOrder = index + 1
    })
}

function getPlayerById(playerId: number): Player | undefined {
    return global.value.players.find((player) => player.id === playerId);
}

export function usePlayer() {

    function setTurnOrder(playerId: number, turnOrder: number, newTurnOrder: number) {
        if (newTurnOrder > global.value.players.length) return;
        let oldPlayer = global.value.players.findIndex((player) => player.turnOrder === newTurnOrder)
        let player = global.value.players.findIndex((player) => player.id === playerId);
        if (oldPlayer === -1 || player === -1) return;
        global.value.players[oldPlayer].turnOrder = turnOrder;
        global.value.players[player].turnOrder = newTurnOrder;
    }

    return {
        global,
        setTurnOrder,
        getPlayerById
    }
}