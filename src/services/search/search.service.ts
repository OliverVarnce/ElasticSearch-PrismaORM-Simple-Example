import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchServiceInterface } from './interface/search.service.interface';
import { ConfigSearch } from './config/search.config';

const { ELASTIC_CLOUD_ID, ELASTIC_PASS } = process.env;

@Injectable()
export class SearchService
  extends ElasticsearchService
  implements SearchServiceInterface<any>
{
  constructor() {
    super(ConfigSearch.searchConfig(ELASTIC_CLOUD_ID, ELASTIC_PASS));
  }

  async insertIndex(bulkData: any): Promise<any> {
    return await this.bulk(bulkData)
      .then((res) => res)
      .catch((e) => {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async updateIndex(updateData: any): Promise<any> {
    try {
      return await this.update(updateData)
        .then((res) => res)
        .catch((e) => {
          throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchIndex(searchData: any): Promise<any> {
    try {
      return await this.search(searchData)
        .then((res) => {
          // return res.body.hits.hits;
          return res.hits.hits;
        })
        .catch((e) => {
          throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteIndex(indexData: any): Promise<any> {
    try {
      return await this.indices
        .delete(indexData)
        .then((res) => res)
        .catch(() => {
          throw new HttpException(
            'Record does not exist!',
            HttpStatus.NOT_FOUND,
          );
        });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteDocument(indexData: any): Promise<any> {
    return Promise.resolve(undefined);
  }
}
