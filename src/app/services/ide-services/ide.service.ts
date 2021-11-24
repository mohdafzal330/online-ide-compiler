import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language } from 'src/app/models/LanguageModel';
import { baseApiRootUrl } from 'src/app/shared/constants/http-config';
import {
  AllLanguages,
  DefaultLanguageCodes,
  LanguageCodes,
} from './../../shared/constants/ide-constants';

@Injectable()
export class IdeService {
  constructor(private client: HttpClient) {}

  public run(data: any): any {
    return this.client.post(baseApiRootUrl + 'execute', data);
  }

  public getAllLanguages(): Language[] {
    return [
      {
        name: 'Java 11',
        id: AllLanguages.JAVA,
        languageCode: LanguageCodes.JAVA,
        modeName: 'ace/mode/java',
        defaultScript: DefaultLanguageCodes.java,
      },
      {
        name: 'C/C++',
        id: AllLanguages.CPP,
        languageCode: LanguageCodes.CPP,
        modeName: 'ace/mode/c_cpp',
        defaultScript: DefaultLanguageCodes.cpp,
      },
      {
        name: 'Python 3',
        id: AllLanguages.PYTHON,
        languageCode: LanguageCodes.PYTHON,
        modeName: 'ace/mode/python',
        defaultScript: DefaultLanguageCodes.python,
      },
      {
        name: 'C#',
        id: AllLanguages.C_SHARP,
        languageCode: LanguageCodes.C_SHARP,
        modeName: 'ace/mode/csharp',
        defaultScript: DefaultLanguageCodes.csharp,
      },
      {
        name: 'Node/JS',
        id: AllLanguages.JAVASCRIPT,
        languageCode: LanguageCodes.JAVA,
        modeName: 'ace/mode/javascript',
        defaultScript: DefaultLanguageCodes.javascript,
      },
      {
        name: 'PHP',
        id: AllLanguages.PHP,
        languageCode: LanguageCodes.PHP,
        modeName: 'ace/mode/php',
        defaultScript: DefaultLanguageCodes.php,
      },
    ];
  }
}
