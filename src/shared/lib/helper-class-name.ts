export class HelperClassName {
  readonly styles: Record<string, any>;

  subject: any;

  classes: any;

  constructor(directive: object) {
    this.styles = directive;

    this.subject = new Map<number, any>();

    this.classes = new Map<number, string>();
  }

  while(subject: any) {
    this.subject.set(this.subject.size, subject);
    return { test: (value: any) => this.test.call(this, value), do: (classes: any) => this.do.call(this, classes) };
  }

  test(value: any) {
    if (this.subject.size === 0 || this.subject.size < this.classes.size) {
      throw new Error("Последовательность вызова методов нарушена или необходимо добавить условие while...");
    }

    this.subject.get(this.subject.size) === value && this.subject.set(this.subject.size, true);
    return { do: (classes: any) => this.do.call(this, classes) };
  }

  do(classes: string) {
    if (this.subject.size === 0 || this.subject.size < this.classes.size) {
      throw new Error("Последовательность вызова методов нарушена или необходимо добавить условие while...");
    }

    this.classes.set(this.classes.size, classes);

    return {
      while: (subject: any) => this.while.call(this, subject),
      done: (classes: string = "") => this.done.call(this, classes),
      scss: (str: string) => this.scss.call(this, str)
    };
  }

  done(classes: string = "") {
    this.filtration();

    const result = [...this.classes.values()].join(" ");

    return this.clear(`${result} ${classes}`);
  }

  scss(str: string) {
    const classes: Array<string> = [];
    const arr: Array<string> = `${str} ${this.done()}`.split(" ");

    arr.forEach(item => {
      Object.keys(this.styles).some(it => it === item) ? classes.push(this.styles[item]) : classes.push(item);
    });

    return this.clear(classes.join(" "));
  }

  private filtration() {
    this.classes.forEach((value: number, key: any) => this.subject.get(key) !== true && this.classes.delete(key));
  }

  private clear(result: string) {
    this.subject.clear();
    this.classes.clear();
    return result;
  }

  // valueOf() {
  //     const result = [...this.classes.values()].join(' ');
  //     return this.clear(result);
  // }
}
