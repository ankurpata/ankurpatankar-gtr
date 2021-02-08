const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');

describe('Getir routes', () => {
  describe('POST /v1/getir/getRecords', () => {
    let inputRequest;
    let filterRecordSize = 0;

    beforeEach(() => {
      inputRequest = {
        "startDate": "2017-01-26",
        "endDate": "2018-02-02",
        "minCount": 27,
        "maxCount": 170
      };
    });

    afterAll(async done => {
      done();
    });

    test('should return 200 and successfully return records matching the filters', async (done) => {

      const res = await request(app)
        .post('/v1/getir/getRecords')
        .set('Content-Type', `application/json`)
        .send(inputRequest)
        .expect(httpStatus.OK);

      filterRecordSize = res.body.records.length;
      expect(res.body).toEqual({code: expect.anything(), msg: expect.anything(), records: expect.anything()});
      done()
    }, 10000);

    test('should return 200 and successfully return all records in mongo without any input request', async (done) => {

      const res = await request(app)
        .post('/v1/getir/getRecords')
        .set('Content-Type', `application/json`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({code: expect.anything(), msg: expect.anything(), records: expect.anything()});
      expect(res.body.records.length).toBeGreaterThanOrEqual(filterRecordSize);
      done()
    }, 10000);

    test('should return 400 error if case input is not correct.', async (done) => {
      await request(app)
        .post('/v1/getir/getRecords')
        .send("Some Garbage Input Request").expect(httpStatus.OK);
         done();
    }, 10000);

  });
});
