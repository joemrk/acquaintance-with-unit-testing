import { ParserConfigDocument } from './../schemas/parser-config.schema';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { parserConfigStubs } from './stubs/parser-config.stub';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ParserConfigController } from '../parser-config.controller';
import { ParserConfigService } from '../parser-config.service';
import {
  ParserConfig,
  ParserConfigSchema,
} from '../schemas/parser-config.schema';
import { connect, disconnect, Connection, Model } from 'mongoose';
import { ParserStatus } from '../enum/parser-status.enum';
import { NotFoundException } from '@nestjs/common';

describe('ParserConfigController', () => {
  let controller: ParserConfigController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let parserConfigModel: Model<ParserConfig>;

  beforeEach(async () => {
    // for close main app connection
    await disconnect();

    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    parserConfigModel = mongoConnection.model(
      ParserConfig.name,
      ParserConfigSchema,
    );

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParserConfigController],
      providers: [
        ParserConfigService,
        {
          provide: getModelToken(ParserConfig.name),
          useValue: parserConfigModel,
        },
      ],
    }).compile();

    controller = module.get<ParserConfigController>(ParserConfigController);
  });

  afterAll(async (done) => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
    done();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    const connectionKeys = Object.keys(collections);
    for await (const key of connectionKeys) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/create', () => {
    const stub = parserConfigStubs()[0];

    it('should return a created object', async () => {
      const createdParserConfig = await controller.create(stub);

      expect(createdParserConfig.target).toEqual(stub.target);
    });
  });

  describe('/findOne', () => {
    let newParserConfig: ParserConfigDocument;
    const stub = parserConfigStubs()[0];

    beforeEach(async () => {
      newParserConfig = await controller.create(stub);
    });

    it('should be created', () => {
      expect(newParserConfig).toHaveProperty('target');
    });

    it('should return the find object', async () => {
      const findParserConfig = await controller.findOne({
        id: newParserConfig._id.toString(),
      });
      expect(findParserConfig._id).toEqual(newParserConfig._id);
    });

    it('should throw NotFoundException', () => {
      const removeResult = controller.remove({
        id: '63d2ec6b9a993afa7744611a',
      });

      expect(removeResult).rejects.toThrow(NotFoundException);
    });
  });

  describe('/findAll', () => {
    const stubs = parserConfigStubs();
    let all = [];

    beforeEach(async () => {
      for await (const stub of stubs) {
        const created = await controller.create(stub);
        all.push(created);
      }

      await controller.update(
        {
          id: all[1]._id.toString(),
        },
        {
          status: ParserStatus.BLOCKED,
          createdAt: new Date(),
        },
      );
    });

    afterEach(() => {
      all = [];
    });

    describe('without params', () => {
      it('should return an array of objects', async () => {
        const findParserConfigs = await controller.findAll({});

        // stub object != created document
        expect(findParserConfigs.length).toEqual(stubs.length);
      });
    });

    describe('with params {limit: 1}', () => {
      it("should return an array of objects with first stub's data", async () => {
        const findParserConfigs = await controller.findAll({
          limit: 1,
        });

        expect(findParserConfigs[0].target).toEqual(stubs[0].target);
      });
    });

    describe('with params {skip: 1}', () => {
      it("should return an array of objects with second stub's data", async () => {
        const findParserConfigs = await controller.findAll({
          skip: 1,
        });

        expect(findParserConfigs[0].target).toEqual(stubs[1].target);
      });
    });

    describe('with sort params {sort: createdAt||ASC}', () => {
      it("should return an array of objects with first stub's data", async () => {
        const findParserConfigs = await controller.findAll({
          sort: 'createdAt||ASC',
        });

        expect(findParserConfigs[0].target).toEqual(stubs[0].target);
      });
    });

    describe('with sort params {sort: createdAt||DESC}', () => {
      it("should return an array of objects with second stub's data", async () => {
        const findParserConfigs = await controller.findAll({
          sort: 'createdAt||DESC',
        });

        expect(findParserConfigs[0].target).toEqual(stubs[1].target);
      });
    });

    describe('with params {status: BLOCKED}', () => {
      it("should return an array of objects with second stub's data", async () => {
        const findParserConfigs = await controller.findAll({
          status: ParserStatus.BLOCKED,
        });

        expect(findParserConfigs[0].target).toEqual(stubs[1].target);
      });
    });

    describe('with multiple params {status: BLOCKED, skip: 1}', () => {
      it('should return an empty array', async () => {
        const findParserConfigs = await controller.findAll({
          status: ParserStatus.BLOCKED,
          skip: 1,
        });

        expect(findParserConfigs.length).toEqual(0);
      });
    });
  });

  describe('/update', () => {
    let newParserConfig: ParserConfigDocument;
    const stub = parserConfigStubs()[0];

    beforeEach(async () => {
      newParserConfig = await controller.create(stub);
    });

    it('should be created', () => {
      expect(newParserConfig).toHaveProperty('target');
    });

    it('should return the updated object', async () => {
      const findParserConfig = await controller.update(
        {
          id: newParserConfig._id.toString(),
        },
        { status: ParserStatus.BLOCKED },
      );
      expect(findParserConfig.status).toEqual(ParserStatus.BLOCKED);
    });

    it('should throw NotFoundException', () => {
      const removeResult = controller.update(
        {
          id: '63d2f2e2ad6ccfac486cbf22',
        },
        { status: ParserStatus.BLOCKED },
      );

      expect(removeResult).rejects.toThrow(NotFoundException);
    });
  });

  describe('/remove', () => {
    let newParserConfig: ParserConfigDocument;
    const stub = parserConfigStubs()[0];

    beforeEach(async () => {
      newParserConfig = await controller.create(stub);
    });

    it('should be created', () => {
      expect(newParserConfig).toHaveProperty('target');
    });

    it('should be removed', async () => {
      const removeResult = await controller.remove({
        id: newParserConfig._id.toString(),
      });

      expect(removeResult).toBeTruthy();
    });

    it('should throw NotFoundException', () => {
      const removeResult = controller.remove({
        id: newParserConfig._id.toString(),
      });

      expect(removeResult).rejects.toThrow(NotFoundException);
    });
  });
});
