// Import the required modules using ESM syntax
import chai from 'chai';
import chaiHttp from 'chai-http';
import http from 'http';
import path from 'path';
import fs from 'fs';
import server from '../fileServer';

// Use the ESM syntax for expect from chai
const { expect } = chai;

// Use chaiHttp
chai.use(chaiHttp);

describe('API Endpoints', () => {
  let globalServer;

  before((done) => {
    if (globalServer) {
      globalServer.close();
    }
    globalServer = server.listen(3000, () => {
      console.log('Server started');
      done();
    });
  });

  after((done) => {
    globalServer.close(() => {
      console.log('Server closed');
      done();
    });
  });

  describe('GET /files', () => {
    it('should return a list of files', async () => {
      const res = await chai.request(server).get('/files');
      expect(res).to.have.status(200);
      expect(res.body.length).to.be.greaterThan(2);
    });

    it('should handle internal server error', async () => {
      // Mock the readdir function
      chai.spy.on(fs, 'readdir', () => {
        throw new Error('Mocked Internal Server Error');
      });

      const res = await chai.request(server).get('/files');
      expect(res).to.have.status(500);

      // Restore the readdir function after the test
      chai.spy.restore(fs);
    });
  });

  describe('GET /file/:filename', () => {
    const testFilePath = path.join(__dirname, '../files', 'test-file.txt');

    before(() => {
      // Create a test file
      fs.writeFileSync(testFilePath, 'Test file content');
    });

    after(() => {
      // Remove the test file after the tests
      fs.unlinkSync(testFilePath);
    });

    it('should serve the requested file', async () => {
      const res = await chai.request(server).get('/file/test-file.txt');
      expect(res).to.have.status(200);
      expect(res.text).to.equal('Test file content');
    });

    it('should handle file not found', async () => {
      const res = await chai.request(server).get('/file/non-existing-file.txt');
      expect(res).to.have.status(404);
      expect(res.text).to.equal('File not found');
    });
  });

  describe('Invalid Routes', () => {
    it('should return 404 for invalid routes', async () => {
      const res = await chai.request(server).get('/invalid');
      expect(res).to.have.status(404);
      expect(res.text).to.equal('Route not found');
    });
  });
});

