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
    Scanner scn = new Scanner(System.in);
    //  write your code here
  }

}`,
  cpp: `#include <iostream>
#include <math.h>

using namespace std;

int main(int argc, char **argv){

    //write your code here
    cout<<"The Code Planet";

}`,
  python: ` //your python code here

print("The code planet")`,
  csharp: `using System;

class Program
{
    static void Main() {

        //write your code here
        Console.WriteLine("The Code Planet");
    }

}`,
  javascript: `//write your javascript code here

  console.log('The Code Planet')`,
  php: `<?php

  //write php code here
  echo "The Code Planet";

?>`,
  ruby: `//write your ruby code here`,
  perl: `//write your perl code here`,
};
