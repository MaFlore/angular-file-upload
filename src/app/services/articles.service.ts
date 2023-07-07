import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/Article';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  formData: FormData = new FormData();
  public article: Article = new Article();
  url!: string;

  constructor(private httpClient: HttpClient) {
    const APIEndpoint = environment.APIEndpoint;
    this.url = APIEndpoint + 'api/';
  }

  //Ajout d'une occurrence d'un article;
  //url: http://localhost:9002/api/ajout/article
  addArticle(a: FormData): Observable<Article>{
    return this.httpClient.post<Article>(this.url + 'ajout/article', a);
  }

  //Affichage de toutes les occurrences d'articles;
  //url: http://localhost:9002/api/articles
  getAll(): Observable<Array<Article>>{
    return this.httpClient.get<Array<Article>>(this.url + 'articles');
  }

  //Recherche d'une occurrence d'article par la clé primaire ;
  //url: http://localhost:9002/api/article/{id}
  findById(id: number): Observable<Article>{
    return this.httpClient.get<Article>(this.url + 'article/' + id);
  }

  //Reconstruire une image d'un article par l'id de l'article ;
  //url: http://localhost:9002/api/image/article/{id}
  findGetImage(id: number): Observable<HttpResponse<Blob>> {
    const endpoint = this.url + 'image/article/' + id;

    return this.httpClient.get(endpoint, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}
