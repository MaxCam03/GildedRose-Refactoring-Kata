export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

// 1. Constantes (Micro-paso B1)
const AGED_BRIE = 'Aged Brie';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';

// 2. Clase Base Abstracta (Micro-paso A1 - Polimorfismo)
abstract class ItemUpdater {
  constructor(protected item: Item) {}
  abstract update(): void;
}

// 3. Implementaciones concretas para cada ítem
class NormalItemUpdater extends ItemUpdater {
  update() {
    this.item.sellIn -= 1;
    const degradation = this.item.sellIn < 0 ? 2 : 1;
    this.item.quality = Math.max(0, this.item.quality - degradation);
  }
}

class AgedBrieUpdater extends ItemUpdater {
  update() {
    this.item.sellIn -= 1;
    const improvement = this.item.sellIn < 0 ? 2 : 1;
    this.item.quality = Math.min(50, this.item.quality + improvement);
  }
}

class SulfurasUpdater extends ItemUpdater {
  update() {
    // Sulfuras nunca cambia, no hace nada.
  }
}

class BackstagePassUpdater extends ItemUpdater {
  update() {
    this.item.sellIn -= 1;
    if (this.item.sellIn < 0) {
      this.item.quality = 0;
    } else if (this.item.sellIn < 5) {
      this.item.quality = Math.min(50, this.item.quality + 3);
    } else if (this.item.sellIn < 10) {
      this.item.quality = Math.min(50, this.item.quality + 2);
    } else {
      this.item.quality = Math.min(50, this.item.quality + 1);
    }
  }
}

// 4. Factory para orquestar la creación
export class UpdaterFactory {
  static create(item: Item): ItemUpdater {
    switch (item.name) {
      case AGED_BRIE:
        return new AgedBrieUpdater(item);
      case SULFURAS:
        return new SulfurasUpdater(item);
      case BACKSTAGE_PASSES:
        return new BackstagePassUpdater(item);
      default:
        return new NormalItemUpdater(item);
    }
  }
}

// 5. La clase original simplificada (¡Cumple SOLID y Open/Closed!)
export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      const updater = UpdaterFactory.create(item);
      updater.update();
    }
    return this.items;
  }
}