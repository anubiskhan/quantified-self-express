const environment = process.env.NODE_ENV = 'development';
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('mealFoods endpoints', () => {
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

  describe('POST /api/v1/meals/1/foods/1', () => {
    it('should add food 1 to meal 1', (done) => {
      chai.request(app)
      .post('/api/v1/meals/1/foods/1')
      .end((err, res) => {
      expect(res).to.be.json;
      expect(res.body).to.have.property('name')
      expect(res.body.name).to.equal('Breakfast')
      expect(res.body.foods[0].name).to.equal('Cabbage')
      });
      done();
    });
  });

  describe('DELETE /api/v1/meals/1/foods/1', () => {
    it('should delete food 1 from meal 1', (done) => {
      chai.request(app)
      .delete('/api/v1/meals/1/foods/1')
      .end((err, res) => {
      expect(res).to.be.json;
      expect(res.message).to.have.equal("Successfully removed Cabbage from Breakfast")
      });
      done();
    });
  });

});
