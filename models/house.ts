import { House } from '@/types/house';

// global state, created in module scope
const global = ref({
    houses: [
        new House(1, true),
        new House(2),
        new House(3, true),
        new House(3.14),
        new House(4),
        new House(5),
        new House(6, true),
        new House(7),
        new House(8),
        new House(9, true),
        new House(9.75),
        new House(10),
        new House(11, true),
        new House(12),
        new House(13),
        new House(14, true),
        new House(15),
        new House(16),
        new House(17, true),
        new House(18),
        new House(19, true),
        new House(20),
        new House(21),
        new House(22),
        new House(23),
        new House(24),
        new House(25, true)],
})

export function useHouse() {
    return {
        global,
    }
}