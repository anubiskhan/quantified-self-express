const environment = process.env.NODE_ENV = 'development';
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('routes : api/v1/foods', () => {
  beforeEach((done) => {
    promises = [
      database.raw('TRUNCATE foods RESTART IDENTITY CASCADE'),
      database.seed.run()
    ]
    Promise.all(promises).then(() => {
      done()
    })
  });

  afterEach((done) => {
    database.seed.run()
    .then(() => {
      done();
    });
  });

  describe('GET /api/v1/foods', () => {
    it('should respond with all foods', (done) => {
      chai.request(app)
      .get('/api/v1/foods')
      .end((err, res) => {
      expect(res).to.be.json;
      expect(res.body[0]).to.have.property('name')
      expect(res.body[0]).to.have.property('calories')
      expect(res.body[0].name).to.equal('Cabbage')
      expect(res.body[0].calories).to.equal(40)
      });
      done();
    });
  });

  describe('GET /api/v1/foods/1', () => {
    it('should respond single food', (done) => {
      chai.request(app)
      .get('/api/v1/foods/1')
      .end((err, res) => {
      expect(res).to.be.json;
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('calories')
      expect(res.body.name).to.equal('Cabbage')
      expect(res.body.calories).to.equal(40)
      });
      done();
    });
  });

  describe('POST /api/v1/foods', () => {
    it('should respond with created food', (done) => {
      chai.request(app)
      .post('/api/v1/foods')
      .send({ "food": { "name": "coolfood", "calories": 123} })
      .end((err, res) => {
      expect(res).to.be.json;
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('calories')
      expect(res.body.name).to.equal('coolfood')
      expect(res.body.calories).to.equal(123)
      });
      done();
    });
  });

  describe('PATCH /api/v1/foods/1', () => {
    it('should respond with updated food', (done) => {
      chai.request(app)
      .patch('/api/v1/foods/1')
      .send({ "food": { "name": "coolfood", "calories": 321} })
      .end((err, res) => {
      expect(res).to.be.json;
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('calories')
      expect(res.body.name).to.equal('coolfood')
      expect(res.body.calories).to.equal(321)
      });
      done();
    });
  });

  describe('DELETE /api/v1/foods/1', () => {
    it('should delete food', (done) => {
      chai.request(app)
      .delete('/api/v1/foods/1')
      .end((err, res) => {
      expect(res).to.have.status(204)
      });
      done();
    });
  });

});
