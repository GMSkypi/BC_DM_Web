import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient){}
    sortClientSuffix = '&sortDir=asc&sort=id';

    mainSearchUrl = 'http://localhost:8080/document_search';
    


    getDocuments(requestBody, entriesPerPage: number, page: number){
        //return this.httpClient.post<any[]>(this.documentSearchUrl, {});
        return this.httpClient.post<any[]>(this.mainSearchUrl+'?page='+page+'&size='+entriesPerPage+this.sortClientSuffix, requestBody);
    }
}