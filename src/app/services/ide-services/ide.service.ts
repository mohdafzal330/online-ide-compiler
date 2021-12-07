import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language } from 'src/app/models/LanguageModel';
import { ListModel } from 'src/app/models/ListModel';
import { Theme } from 'src/app/models/ThemeModel';
import { baseApiRootUrl } from 'src/app/shared/constants/http-config';
import {
  AllLanguages,
  DefaultLanguageCodes,
  LanguageCodes,
} from './../../shared/constants/ide-constants';

@Injectable()
export class IdeService {
  getAllFonts(): ListModel[] {
    return [
      { id: 1, name: '12' },
      { id: 2, name: '13' },
      { id: 3, name: '14' },
      { id: 4, name: '15' },
      { id: 5, name: '16' },
      { id: 6, name: '17' },
      { id: 7, name: '18' },
      { id: 8, name: '19' },
      { id: 9, name: '20' },
      { id: 10, name: '22' },
      { id: 11, name: '25' },
      { id: 12, name: '30' },
      { id: 13, name: '35' },
      { id: 14, name: '40' },
      { id: 15, name: '50' },
    ];
  }
  getAllThemes(): Theme[] {
    return [
      { id: 5, name: 'Dracula', code: 'ace/theme/dracula' },
      {
        id: 1,
        name: 'Tomorrow Night',
        code: 'ace/theme/tomorrow_night',
      },
      { id: 7, name: 'Monokai', code: 'ace/theme/monokai' },
      { id: 2, name: 'Ambiance', code: 'ace/theme/ambiance' },
      { id: 15, name: 'Xcode', code: 'ace/theme/xcode' },
      { id: 4, name: 'Clouds Midnight', code: 'ace/theme/clouds_midnight' },
      { id: 8, name: 'Nord Dark', code: 'ace/theme/nord_dark' },
      { id: 17, name: 'Crimson Editor', code: 'ace/theme/crimson_editor' },
      {
        id: 10,
        name: 'Tomorrow Night Blue',
        code: 'ace/theme/tomorrow_night_blue',
      },
      {
        id: 11,
        name: 'Tomorrow Night Bright',
        code: 'ace/theme/tomorrow_night_bright',
      },
      { id: 12, name: 'Twilight', code: 'ace/theme/twilight' },
      { id: 13, name: 'Eclipse', code: 'ace/theme/eclipse' },
      { id: 14, name: 'GitHub', code: 'ace/theme/github' },
      { id: 3, name: 'Chaos', code: 'ace/theme/chaos' },
      { id: 16, name: 'SQL Server', code: 'ace/theme/sqlserver' },
      { id: 9, name: 'Terminal', code: 'ace/theme/terminal' },
      { id: 6, name: 'Green on Black', code: 'ace/theme/gob' },
    ];
  }
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
        languageCode: LanguageCodes.JAVASCRIPT,
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
