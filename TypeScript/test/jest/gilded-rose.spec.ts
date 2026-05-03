import { Item, GildedRose } from '@/gilded-rose';

describe('GildedRose Characterization Tests', () => {

  describe('Ítems Normales', () => {
    it('1. Debe disminuir sellIn y quality en 1 para un item normal antes de la fecha de caducidad', () => {
      const gildedRose = new GildedRose([new Item('Normal Item', 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(19);
    });

    it('2. La quality debe degradar el doble de rápido (2) cuando el sellIn ha pasado (0 o menor)', () => {
      const gildedRose = new GildedRose([new Item('Normal Item', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(18);
    });

    it('3. La quality de un item normal nunca puede ser negativa', () => {
      const gildedRose = new GildedRose([new Item('Normal Item', 5, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  describe('Aged Brie', () => {
    it('4. Aged Brie incrementa su quality en 1 a medida que envejece', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(11);
    });

    it('5. Aged Brie incrementa su quality en 2 si el sellIn es negativo', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', -1, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(12);
    });

    it('6. La quality de un item nunca puede ser mayor a 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
  });

  describe('Sulfuras', () => {
    it('7. Sulfuras nunca cambia su quality (siempre 80) ni su sellIn', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(80);
    });
    
    it('8. Sulfuras con sellIn negativo mantiene sus valores intactos', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', -1, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(80);
    });
  });

  describe('Backstage passes', () => {
    it('9. Backstage passes incrementa su quality en 1 cuando sellIn es mayor a 10', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(21);
    });

    it('10. Backstage passes incrementa su quality en 2 cuando sellIn es 10 o menos', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(22);
    });

    it('11. Backstage passes incrementa su quality en 3 cuando sellIn es 5 o menos', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(23);
    });

    it('12. Backstage passes reduce su quality a 0 después del concierto (sellIn 0 o negativo)', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  describe('Casos Ambiguos / Desconocidos', () => {
    it('13. Un ítem con nombre desconocido se comporta exactamente como un ítem normal', () => {
      const gildedRose = new GildedRose([new Item('Bolis de Vainilla', 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(19);
    });
  });

  describe('Conjured Items (Nueva Funcionalidad)', () => {
    it('14. Conjured degrada el doble de rápido (2) antes del sellIn', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 5, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(18);
    });

    it('15. Conjured degrada el cuádruple de rápido (4) tras pasar el sellIn', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(16);
    });

    it('16. La quality de Conjured nunca cae por debajo de cero', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 5, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });
});