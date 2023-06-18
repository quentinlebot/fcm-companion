<template>
    <div class="fixed w-[100] flex flex-col">
        <p>Mouse x:{{ xMouse }} y:{{ yMouse }}</p>
        <p>Selected: {{ selectedElementId }}</p>
        <p>Cell from point: {{ element }}</p>
        <p>Cell data: {{ cellHover }}</p>
        <p>Cell size: {{ bounding }}</p>
    </div>
    <div class="map flex flex-col gap-3 place-items-center justify-start pt-5 h-[calc(100vh-64px)]">
        <div class="join">
            <input class="join-item btn" type="radio" name="options" aria-label="2" value="2" v-model="nbPlayers" />
            <input class="join-item btn" type="radio" name="options" aria-label="3" value="3" v-model="nbPlayers" />
            <input class="join-item btn" type="radio" name="options" aria-label="4" value="4" v-model="nbPlayers" />
            <input class="join-item btn" type="radio" name="options" aria-label="5" value="5" v-model="nbPlayers" />
            <input class="join-item btn" type="radio" name="options" aria-label="6" value="6" v-model="nbPlayers" />
        </div>
        <div class="relative">
            <div :class="['grid', `grid-cols-${gridSize.tileWidth}`, `grid-rows-${gridSize.tileHeight}`, 'gap-0']">
                <Tile v-for="tile in tiles" img="" class="h-[200px] w-[200px]"
                    :style="`transform: rotate(${tile.rot}deg);`"></Tile>
            </div>
            <div
                :class="['absolute top-0 left-0', 'grid', `grid-cols-${gridSize.cellWidth}`, `grid-rows-${gridSize.cellHeight}`, 'gap-0']">
                <CellComponent v-for="cell in gridCells.flat()" :key="cell.id" :cell="cell" @hovered="cellHovered">
                </CellComponent>
            </div>
        </div>
        <Card id="restaurant" @selected="updateSelected"></Card>
        <p></p>
    </div>
</template>

<script setup lang="ts">
import { Cell } from '~/types/types';

const { x: xMouse, y: yMouse, sourceType } = useMouse()
// const { element } = useElementByPoint({ x: xMouse, y: yMouse })
let element = ref()
let cellHover = ref({ row: NaN, col: NaN, id: '', pointerSide: '' })
let bounding = ref()


let tiles: Ref<{ img: string, rot: number }[]> = ref([]);
let gridCells: Ref<Cell[][]> = ref([[]]);
let lastCellHovered: Cell[] = [];
const MAX_TILE = 26;
const mapSize: any = {
    '2': {
        width: 3,
        height: 3,
    },
    '3': {
        width: 4,
        height: 3,
    },
    '4': {
        width: 4,
        height: 4,
    },
    '5': {
        width: 5,
        height: 4,
    },
    '6': {
        width: 6,
        height: 4,
    },
}
let nbPlayers = ref('2');
let gridSize: Ref<{ tileWidth: number, tileHeight: number, cellWidth: number, cellHeight: number }> = ref({
    tileWidth: 3,
    tileHeight: 3,
    cellWidth: 15,
    cellHeight: 15,
});
let selectedElementId = ref('');

const generateMap = () => {
    while (tiles.value.length < gridSize.value.tileWidth * gridSize.value.tileHeight) {
        let randomName = Math.floor(Math.random() * MAX_TILE) + 1;
        let randomStr = randomName.toString().padStart(2, '0');
        let randomRot = Math.floor(Math.random() * 4) * 90;
        if (!tiles.value.find(elem => elem.img === `/img/map${randomStr}.jpg`))
            tiles.value.push({ img: `/img/map${randomStr}.jpg`, rot: randomRot });
    }
    for (let i = 0; i < gridSize.value.cellHeight; i++) {
        let row: Cell[] = [];
        for (let j = 0; j < gridSize.value.cellWidth; j++) {
            row.push({ id: i * gridSize.value.cellWidth + j, border: [false, false, false, false], row: i, col: j, pointerSide: '' });
        }
        gridCells.value[i] = row;
    }
}
const cellHovered = (cell: Cell) => {
    // while (lastCellHovered.length > 0) {
    //     const element = lastCellHovered.pop()!;
    //     element.border = [false, false, false, false];
    // }
    // let cell1: Cell | null = null;
    // let cell2: Cell | null = null;
    // let cell3: Cell | null = null;
    // switch (cell.pointerSide) {
    //     case 'TL':
    //         if (cell.row > 0 && cell.col > 0) {
    //             cell1 = getCell(cell.row - 1, cell.col - 1);
    //             cell1.border = setBorder('TL');
    //             cell2 = getCell(cell.row - 1, cell.col);
    //             cell2.border = setBorder('TR');
    //             cell3 = getCell(cell.row, cell.col - 1);
    //             cell3.border = setBorder('BL');
    //             cell.border = setBorder('BR');
    //             lastCellHovered.push(cell);
    //         }
    //         break;
    //     case 'TR':
    //         if (cell.row > 0 && cell.col < gridSize.value.cellWidth - 1) {
    //             cell1 = getCell(cell.row - 1, cell.col);
    //             cell1.border = setBorder('TL');
    //             cell2 = getCell(cell.row - 1, cell.col + 1);
    //             cell2.border = setBorder('TR');
    //             cell.border = setBorder('BL');
    //             cell3 = getCell(cell.row, cell.col + 1);
    //             cell3.border = setBorder('BR');
    //         }
    //         break;
    //     case 'BL':
    //         if (cell.row < gridSize.value.cellHeight - 1 && cell.col > 0) {
    //             cell1 = getCell(cell.row, cell.col - 1);
    //             cell1.border = setBorder('TL');
    //             cell.border = setBorder('TR');
    //             cell2 = getCell(cell.row + 1, cell.col - 1);
    //             cell2.border = setBorder('BL');
    //             cell3 = getCell(cell.row + 1, cell.col);
    //             cell3.border = setBorder('BR');
    //         }
    //         break;
    //     case 'BR':
    //         if (cell.row < gridSize.value.cellHeight - 1 && cell.col < gridSize.value.cellWidth - 1) {
    //             cell.border = setBorder('TL');
    //             cell1 = getCell(cell.row, cell.col + 1);
    //             cell1.border = setBorder('TR');
    //             cell2 = getCell(cell.row + 1, cell.col);
    //             cell2.border = setBorder('BL');
    //             cell3 = getCell(cell.row + 1, cell.col + 1);
    //             cell3.border = setBorder('BR');
    //         }
    //         break;
    // }
    // lastCellHovered.push(cell);
    // if (cell1)
    //     lastCellHovered.push(cell1);
    // if (cell2)
    //     lastCellHovered.push(cell2);
    // if (cell3)
    //     lastCellHovered.push(cell3);
}
const getCell = (row: number, col: number) => {
    return gridCells.value[row][col];
}
const setBorder = (side: string) => {
    return [side.at(0) == 'T', side.at(1) == 'R', side.at(0) == 'B', side.at(1) == 'L'];
}
const updateSelected = (selected: boolean, id: string) => {
    selectedElementId.value = selected ? id : '';
}
const getPointerSide = () => {
    let isLeft = bounding.value.x < xMouse.value && xMouse.value < bounding.value.x + bounding.value.width / 2;
    let isRight = bounding.value.x + bounding.value.width / 2 < xMouse.value && xMouse.value < bounding.value.x + bounding.value.width;
    let isTop = bounding.value.y < yMouse.value && yMouse.value < bounding.value.y + bounding.value.height / 2;
    let isBottom = bounding.value.y + bounding.value.height / 2 < yMouse.value && yMouse.value < bounding.value.y + bounding.value.height;
    let firstLetter = isTop ? 'T' : (isBottom ? 'B' : ' ');
    let secondLetter = isLeft ? 'L' : (isRight ? 'R' : ' ');
    return firstLetter + secondLetter;
}

watch(xMouse, (val) => {
    if (selectedElementId.value) {
        element.value = document.elementsFromPoint(val, yMouse.value)[2];
        bounding.value = useElementBounding(element);
        cellHover.value = {
            row: element.value.getAttribute('row'),
            col: element.value.getAttribute('col'),
            id: element.value.getAttribute('id'),
            pointerSide: getPointerSide(),
        };
    }
})
onMounted(() => {
    generateMap();
})
watch(xMouse, (val) => {
})
watch(nbPlayers, (val) => {
    let { width, height } = mapSize[val];
    gridSize.value = {
        tileWidth: width,
        tileHeight: height,
        cellWidth: width * 5,
        cellHeight: height * 5,
    }
    tiles.value = [];
    generateMap();
})
</script>

<style scoped>
.map {
    overflow: hidden;
}
</style>