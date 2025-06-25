import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { map } from "rxjs/operators";
import { extractDuckDuckGoSummary } from "src/utils/abstract-extraction";

@Injectable()
export class SearchService {
  constructor(private http: HttpService) {}

  async search(query: string): Promise<string> {
    const url = 'https://api.duckduckgo.com/';
    const obs = this.http.get(url, { params: { q: query, format: 'json' } }).pipe(map(resp => resp.data));
    const data = await lastValueFrom(obs);
    const summary = extractDuckDuckGoSummary(data, 1);
    console.log('Search response:\n', summary);
    return summary || '';
  }
}