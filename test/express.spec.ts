import 'mocha';
import { assert } from 'chai';
import request, { post } from 'request'
import { CardData } from '../src/cards/card.js';
import { Color } from '../src/cards/enums/color.js';
import { Line } from '../src/cards/enums/line.js';
import { Rarity } from '../src/cards/enums/rarity.js';
const localhost = "http://localhost:3000"

describe('GET Express server', function() {
  it('(GET) No deberia dar un error al mostrar las cartas de un usuario', function(done) {
    const getURL = localhost + "/cards/?name=larzt/"
    request.get(getURL, function(_, res) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })

  it('(GET) No deberia dar un error al mostrar una carta de un usuario', function(done) {
    const getURL = localhost + "/cards/?name=larzt&id=3"
    request.get(getURL, function(_, res) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })

  it('(GET) Deberia dar un error al mostrar las cartas de un usuario no existente', function(done) {
    const getURL = localhost + "/cards/?name=walkitalki"
    request.get(getURL, function(_, res) {
      assert.equal(res.statusCode, 500);
      done();
    })
  })

  it('(GET) Deberia dar un error al mostrar una carta no existente de un usuario', function(done) {
    const getURL = localhost + "/cards/?name=larzt&id=20"
    request.get(getURL, function(_, res) {
      assert.equal(res.statusCode, 500);
      done();
    })
  })
});

describe("POST Express Server", function() {
  it('No deberia dar un error al crear una carta de un usuario', function(done) {
    const postURL = localhost + "/cards/?name=larzt"
    const card: CardData = {
      cardOwner: "larzt", id: 20, name: "alpha", mana: 0,
      color: Color.BLUE, line: Line.ARTIFACT, rarity: Rarity.COMMON,
      rules: "Rules", price: 243, special: 0
    };
    request.post({url: postURL, json: true, body: card}, function(_, res) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
  it('No deberia dar un error al crear una carta de un usuario no existente', function(done) {
    const postURL = localhost + "/cards/?name=estrada"
    const card: CardData = {
      cardOwner: "larzt", id: 20, name: "alpha", mana: 0,
      color: Color.BLUE, line: Line.ARTIFACT, rarity: Rarity.COMMON,
      rules: "Rules", price: 243, special: 0
    };
    request.post({url: postURL, json: true, body: card}, function(_, res) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
})

describe("PATCH Express Server", function() {
  it('No deberia dar un error al modificar una carta de un usuario', function(done) {
    const postURL = localhost + "/cards/?name=estrada"
    const card: CardData = {
      cardOwner: "larzt", id: 20, name: "beta", mana: 0,
      color: Color.BLUE, line: Line.ARTIFACT, rarity: Rarity.COMMON,
      rules: "Rules", price: 243, special: 0
    };
    request.patch({url: postURL, json: true, body: card}, function(_, res) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
  
  it('Deberia dar un error al modificar una carta no existente de un usuario', function(done) {
    const postURL = localhost + "/cards/?name=estrada&id=1"
    const card: CardData = {
      cardOwner: "estrada", id: 1, name: "alpha", mana: 0,
      color: Color.BLUE, line: Line.ARTIFACT, rarity: Rarity.COMMON,
      rules: "Rules", price: 243, special: 0
    };
    request.patch({url: postURL, json: true, body: card}, function(_, res) {
      assert.equal(res.statusCode, 500);
      done();
    })
  })

  it('Deberia dar un error al modificar una carta de un usuario no existente', function(done) {
    const postURL = localhost + "/cards/?name=walkitalki&id=1"
    const card: CardData = {
      cardOwner: "walkitalki", id: 1, name: "alpha", mana: 0,
      color: Color.BLUE, line: Line.ARTIFACT, rarity: Rarity.COMMON,
      rules: "Rules", price: 243, special: 0
    };
    request.patch({url: postURL, json: true, body: card}, function(_, res) {
      assert.equal(res.statusCode, 500);
      done();
    })
  })
})

describe("DELETE Express Server", function() {
  it('No deberia dar un error al eliminar una carta de un usuario', function(done) {
    const getURL = localhost + "/cards/?name=estrada&id=20"
    request.delete(getURL, function(_, res) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })

  it('No deberia dar un error al eliminar una carta de un usuario', function(done) {
    const getURL = localhost + "/cards/?name=larzt&id=20"
    request.delete(getURL, function(_, res) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })

  it('Deberia dar un error al eliminar una carta no existente de un usuario', function(done) {
    const getURL = localhost + "/cards/?name=larzt&id=200"
    request.delete(getURL, function(_, res) {
      assert.equal(res.statusCode, 500);
      done();
    })
  })

  it('Deberia dar un error al eliminar una carta de un usuario no existente', function(done) {
    const getURL = localhost + "/cards/?name=walkitalki"
    request.delete(getURL, function(_, res) {
      assert.equal(res.statusCode, 500);
      done();
    })
  })
})