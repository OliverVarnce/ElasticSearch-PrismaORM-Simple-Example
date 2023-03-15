import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from '@services/search/search.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigSearch } from '@services/search/config/search.config';

const { ELASTIC_CLOUD_ID, ELASTIC_PASS } = process.env;

jest.mock('@nestjs/elasticsearch');

describe('SearchService', () => {
  let service: SearchService;
  let elasticsearchService: ElasticsearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchService],
    }).compile();

    ConfigSearch.searchConfig(ELASTIC_CLOUD_ID, ELASTIC_PASS);

    elasticsearchService = new ElasticsearchService(
      ConfigSearch.searchConfig('some-cloud-id', 'some-pass'),
    );
    const searchService = new SearchService(elasticsearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
