import 'mocha';
import {expect} from 'chai';
import { FileManager } from '../src/PE/magicCards/fileManager.js'
import { Color } from '../src/PE/magicCards/enums/color.js';
import { Line } from '../src/PE/magicCards/enums/line.js';
import { Rarity } from '../src/PE/magicCards/enums/rarity.js';
import { Card } from '../src/PE/magicCards/card.js';

describe('Asynchronous functions from magic cards', () => {
  it('Async Cuando se lee un archivo correctamente no deberia dar ningun problema', () => {
    return FileManager.Instance().readAsync('./src/database.json').then((data) => {
      expect(data).not.to.be.equal(undefined);
    });
  });

  it('Async Cuando se lee un archivo no existente deberia dar ningun undefined', () => {
    return FileManager.Instance().readAsync('./src/none.json').catch((err) => {
      expect(err).to.be.equal(undefined);
    });
  });

  it('Async Cuando se escribe una carta correctamente no deberia dar ningun problema', () => {
    const card = new Card("larzt", 1, "blackLotus", 100, Color.BLUE, Line.EARTH, Rarity.MYTHICAL, "none", 999)
    return FileManager.Instance().writeAsync('./src/database.json', card).then((data) => {            
      expect(data).to.be.equal("blackLotus");
    });
  });

  it('Async Cuando se escribe una carta en un archivo no existente deberia crearlo y escribir', () => {
    const card = new Card("larzt", 1, "blackLotus", 100, Color.BLUE, Line.EARTH, Rarity.MYTHICAL, "none", 999)
    return FileManager.Instance().writeAsync('./src/none.json', card).then((data) => {
      expect(data).not.to.be.equal(undefined);
    });
  });

  it('Promise Cuando se lee un archivo existente deberia no dar ningun error', () => {
    return FileManager.Instance().readPromise('./src/database.json').then((data) => {
      expect(data).not.to.be.equal(undefined);
    });
  });

  it('Promise Cuando se lee un archivo existente deberia no dar ningun error', () => {
    return FileManager.Instance().readPromise('./src/database.json').then((data) => {      
      expect(data).to.be.equal("blackLotus");
    });
  });

  it('Promise Cuando se lee un archivo no existente deberia dar ningun error', () => {
    return FileManager.Instance().readPromise('').catch((data) => {
      expect(data).to.be.equal('Path does not exist.');
    });
  });
});