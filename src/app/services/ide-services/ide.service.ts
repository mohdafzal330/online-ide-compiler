import { Language } from 'src/app/models/LanguageModel';
enum AllLanguages {
  JAVA = 1,
  CPP = 2,
  PYTHON = 3,
  C_SHARP = 4,
  JAVASCRIPT = 5,
  PHP = 6,
}
enum LanguageCodes {
  JAVA = 'java',
  CPP = 'cpp',
  PYTHON = 'python3',
  C_SHARP = 'csharp',
  JAVASCRIPT = 'nodejs',
  PHP = 'php',
  RUBY = 'ruby',
  PERL = 'perl',
}
const DefaultLanguageCodes = {
  java: `import java.util.*;
public class Main{
  public static void main(String[] args){
    //  your code goes here
    System.out.println("Hello world");
  }
}`,
  cpp: `#include <iostream>
#include <math.h>
using namespace std;

int main(int argc, char **argv){
    //write your code here
}`,
  python: `//your python code here`,
  csharp: `using System;
class Program
{
    static void Main() {
        //write your code here
    }
}`,
  javascript: `//write your javascript code here`,
  php: `//write php code here`,
  ruby: `//write your ruby code here`,
  perl: `//write your perl code here`,
};
export class IdeService {
  public getLanguageDefaultCode(languageId: number): string {
    if (!languageId) {
      languageId = AllLanguages.JAVA;
    }
    return this.getLanguageSpecificCode(languageId ?? 1);
  }
  public getLanguageCode(languageId: number): string {
    if (!languageId) {
      languageId = AllLanguages.JAVA;
    }
    return this.languageCode(languageId ?? 1);
  }

  private getLanguageSpecificCode(languageId: number): string {
    switch (languageId) {
      case AllLanguages.JAVA:
        return DefaultLanguageCodes.java;
      case AllLanguages.CPP:
        return DefaultLanguageCodes.cpp;
      case AllLanguages.PYTHON:
        return DefaultLanguageCodes.python;
      case AllLanguages.C_SHARP:
        return DefaultLanguageCodes.csharp;
      case AllLanguages.JAVASCRIPT:
        return DefaultLanguageCodes.javascript;
      case AllLanguages.PHP:
        return DefaultLanguageCodes.php;
      default:
        return DefaultLanguageCodes.java;
    }
  }
  private languageCode(languageId: number): string {
    switch (languageId) {
      case AllLanguages.JAVA:
        return LanguageCodes.JAVA;
      case AllLanguages.CPP:
        return LanguageCodes.CPP;
      case AllLanguages.PYTHON:
        return LanguageCodes.PYTHON;
      case AllLanguages.C_SHARP:
        return LanguageCodes.C_SHARP;
      case AllLanguages.JAVASCRIPT:
        return LanguageCodes.JAVASCRIPT;
      case AllLanguages.PHP:
        return LanguageCodes.PHP;
      default:
        return LanguageCodes.JAVA;
    }
  }

  public getAllLanguages(): Language[] {
    return [
      { name: 'Java 11', id: AllLanguages.JAVA },
      { name: 'C/C++', id: AllLanguages.CPP },
      { name: 'Python 3', id: AllLanguages.PYTHON },
      // { name: 'C#', id: AllLanguages.C_SHARP },
      { name: 'NodeJS / JavaScript', id: AllLanguages.JAVASCRIPT },
      { name: 'PHP', id: AllLanguages.PHP },
    ];
  }
}
