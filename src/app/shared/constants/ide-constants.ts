export enum LanguageCodes {
  JAVA = 'java',
  CPP = 'cpp',
  PYTHON = 'python3',
  C_SHARP = 'csharp',
  JAVASCRIPT = 'nodejs',
  PHP = 'php',
  RUBY = 'ruby',
  PERL = 'perl',
}
export enum AllLanguages {
  JAVA = 1,
  CPP = 2,
  PYTHON = 3,
  C_SHARP = 4,
  JAVASCRIPT = 5,
  PHP = 6,
}

export const DefaultLanguageCodes = {
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
