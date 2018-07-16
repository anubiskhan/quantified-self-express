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
    database.migrate.latest()
    .then(() => {
      database.seed.run()
      .then(() => {
        done();
      })
    });
  });

  afterEach((done) => {
    database.migrate.rollback()
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
    it('should respond with all foods', (done) => {
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

});
