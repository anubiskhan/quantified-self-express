const environment = process.env.NODE_ENV = 'development';
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('routes : api/v1/favorite_foods', () => {
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
  describe.skip('GET /api/v1/favorite_foods', () => {
    it('should return number of times each food has been eaten', (done) => {
      chai.request(app)
      .post('/api/v1/favorite_foods')
      .end((err, res) => {
      expect(res).to.be.json;
      expect(res.body).to.have.property('name')
      expect(res.body.name).to.equal('Breakfast')
      expect(res.body.foods[0].name).to.equal('Cabbage')
      });
      done();
    });
  });
});
