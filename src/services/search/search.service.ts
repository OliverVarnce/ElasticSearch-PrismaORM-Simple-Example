import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchServiceInterface } from './interface/search.service.interface';
import { ConfigSearch } from './config/search.config';

const { ELASTIC_CLOUD_ID, ELASTIC_USER, ELASTIC_PASS } = process.env;

@Injectable()
export class SearchService
  extends ElasticsearchService
  implements SearchServiceInterface<any>
{
  constructor() {
    super(ConfigSearch.searchConfig(ELASTIC_CLOUD_ID, ELASTIC_PASS));
  }

  public async insertIndex(bulkData: any): Promise<any> {
    console.log('Object: ', JSON.stringify(bulkData));
    return await this.bulk(bulkData)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR, {
          cause: new Error('Insert Index Error'),
        });
      });
  }

  public async updateIndex(updateData: any): Promise<any> {
    return await this.update(updateData)
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR, {
          cause: new Error('Update Index Error'),
        });
      });
  }

  public async searchIndex(searchData: any): Promise<any> {
    return await this.search(searchData)
      .then((res) => {
        // return res.body.hits.hits;
        return res.hits.hits;
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR, {
          cause: new Error('Search Index Error'),
        });
      });
  }

  public async deleteIndex(indexData: any): Promise<any> {
    return await this.indices
      .delete(indexData)
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR, {
          cause: new Error('Delete Index Error'),
        });
      });
  }

  public async deleteDocument(indexData: any): Promise<any> {
    return await this.delete(indexData)
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR, {
          cause: new Error('Delete Document Error'),
        });
      });
  }
}
