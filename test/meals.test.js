const environment = process.env.NODE_ENV = 'development';
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('routes : api/v1/meals', () => {
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

  describe('GET /api/v1/meals', () => {
    it('should respond with all meals', (done) => {
      chai.request(app)
      .get('/api/v1/meals')
      .end((err, res) => {
      expect(res).to.be.json;
      expect(res.body[0]).to.have.property('name')
      expect(res.body[0].name).to.equal('Breakfast')
      expect(res.body[3].name).to.equal('Dinner')
      });
      done();
    });
  });

  describe('GET /api/v1/meals/1/foods', () => {
    it('should respond with meal 1 and its foods', (done) => {
      chai.request(app)
      .get('/api/v1/meals/1/foods')
      .end((err, res) => {
      expect(res).to.be.json;
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('foods')
      expect(res.body.name).to.equal('Breakfast')
      });
      done();
    });
  });

});
