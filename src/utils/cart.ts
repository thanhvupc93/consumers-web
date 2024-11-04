
import { InventoryType } from "@/types/inventory";


export const findInventorySelectAndChangePrice = (data: InventoryType[], select_size: number, select_color: number): InventoryType[] => { 
        const inventory: InventoryType[] = data.filter((e) => {
            return e.size?.id === select_size && e.color?.id === select_color;
        });
        const stockElement = document.getElementById('produce_detail_stock');
        if (stockElement) {
            stockElement.textContent = `${inventory[0]?.quantity || 0} `
        }
        return inventory;

}