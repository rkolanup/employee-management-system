import * as request from 'supertest';

import * as dotenv from 'dotenv';
dotenv.config();

describe('EmployeeModule (e2e)', () => {
  const baseUrl = `http://localhost:${process.env.PORT}/api`;
  let responseStatusCode: number;
  let responseBodyLength: number;
  let responseBody = [{}];

  describe('GET employee List', () => {
    beforeAll(async () => {
      const response = await request(baseUrl).get('/employees');
      responseStatusCode = response.statusCode;
      responseBodyLength = response.body.length;
      responseBody = response.body;
    });

    it('Response status code should be 200', async () => {
      expect(responseStatusCode).toEqual(200);
    });

    it('Response length should be greater than 0', async () => {
      expect(responseBodyLength).toBeGreaterThan(0);
    });

    /*it('Response length should be 2', async () => {
      expect(responseBodyLength).toBe(2);
    });*/

    it('Response should have all these expected properties', async () => {
      const employeesList = responseBody;
      employeesList.forEach((employee) => {
        expect(employee).toHaveProperty('id');
        expect(employee).toHaveProperty('firstName');
        expect(employee).toHaveProperty('lastName');
        expect(employee).toHaveProperty('email');
        expect(employee).toHaveProperty('departmentId');
        expect(employee).toHaveProperty('department');
      });
    });
  });

  describe('GET employees details by id', () => {
    beforeAll(async () => {
      const response = await request(baseUrl).get('/employees/7');
      responseStatusCode = response.statusCode;
      responseBodyLength = response.body.length;
      responseBody = response.body;
    });

    it('Response status code should be 200', async () => {
      expect(responseStatusCode).toEqual(200);
    });

    /* it('Response length should be greater than 0', async () => {
      console.log('responseBodyLength: ', responseBodyLength);
      expect(responseBodyLength).toBeGreaterThan(0);
    });
    /*it('Response length should be 1', async () => {
      expect(responseBodyLength).toBe(1);
    });*/
    it('Response should have all these expected properties', async () => {
      const employees = responseBody;
      expect(employees).toHaveProperty('id');
      expect(employees).toHaveProperty('firstName');
      expect(employees).toHaveProperty('lastName');
      expect(employees).toHaveProperty('email');
      expect(employees).toHaveProperty('departmentId');
      expect(employees).toHaveProperty('department');
    });
  });

  /* describe('Edit existing employee details by id endpoint', () => {
    beforeAll(async () => {
      const response = await request(baseUrl)
        .put('/employees/7')
        .set('body', `{email: rlalik@gmail.com}`);
      responseStatusCode = response.statusCode;
      responseBodyLength = response.body.length;
      responseBody = response.body;
    });

    it('Response status code should be 200', async () => {
      expect(responseStatusCode).toEqual(200);
    });
  });*/

  describe('Delete existing employee details by id endpoint', () => {
    beforeAll(async () => {
      const response = await request(baseUrl).delete('/employees/12');
      responseStatusCode = response.statusCode;
      responseBodyLength = response.body.length;
      responseBody = response.body;
    });

    it('Response status code should be 200', async () => {
      expect(responseStatusCode).toEqual(200);
    });
  });
});
