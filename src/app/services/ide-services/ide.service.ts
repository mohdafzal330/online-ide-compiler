import { Language } from 'src/app/models/LanguageModel';
import {
  AllLanguages,
  DefaultLanguageCodes,
  LanguageCodes,
} from './../../shared/constants/ide-constants';

export class IdeService {
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
