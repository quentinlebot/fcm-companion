import { describe, test, expect } from "vitest";
import { setup } from '@nuxt/test-utils'
import { House } from "./house";

describe("House", async () => {
    await setup({
    })
    test("getMultiplier", () => {
        let house = new House(1)
        expect(house.getMultiplier()).toBe(1);
        house.setGarden();
        expect(house.getMultiplier()).toBe(2);
        house.setPark();
        expect(house.getMultiplier()).toBe(3);
        house.setGarden();
        expect(house.getMultiplier()).toBe(2);
    });
    test("setPark", () => {
        let house = new House(1)
        expect(house.park).toBe(false);
        house.setPark();
        expect(house.park).toBe(true);
        house.setPark();
        expect(house.park).toBe(false);
    });
    test("setGarden", () => {
        let house = new House(1)
        expect(house.garden).toBe(false);
        house.setGarden();
        expect(house.garden).toBe(true);
        house.setGarden();
        expect(house.garden).toBe(false);
    });
});