const scatter = () => {
  return [
    {
      name: 'Steve',
      x: 1,
      y: 1
    },
    {
      name: 'Steve',
      x: 2,
      y: 2
    },
    {
      name: 'Steve',
      x: 3,
      y: 3
    },
    {
      name: 'Steve',
      x: 0,
      y: 0
    },
    {
      name: 'Wayne',
      x: 0,
      y: 3
    },
    {
      name: 'Wayne',
      x: 1,
      y: 2
    },
    {
      name: 'Wayne',
      x: 2,
      y: 1
    },
    {
      name: 'Wayne',
      x: 3,
      y: 0
    }
  ];
}

const scatter2 = (width, height) => {
  let randomX = d3.random.normal(width / 2, 20);
  let randomY = d3.random.normal(height / 2, 20);
  let points = d3.range(30).map(() => { return {name: randID(), x: randomX(), y: randomY()}});
  return points;
}

const randID = () => {
  let random = Math.round(Math.random());
  if (random > 0) {
    return 'Steve';
  }
  return 'James';
}

const bullet = () => {
  return [
    {
      id: 'USA',
      target: 16,
      actual: 17,
      range: 13
    }
  ];
}

const column = () => {
  return [
    {
      name: 'Elliott',
      Freq1: 12,
      Freq2: 10,
      Freq3: 14,
      Freq4: 11,
      Freq5: 9
    },
    {
      name: 'Tom',
      Freq1: 14,
      Freq2: 15,
      Freq3: 14,
      Freq4: 2,
      Freq5: 14
    },
    {
      name: 'Todd',
      Freq1: 17,
      Freq2: 16,
      Freq3: 15,
      Freq4: 17,
      Freq5: 20
    },
    {
      name: 'Elise',
      Freq1: 19,
      Freq2: 15,
      Freq3: 9,
      Freq4: 17,
      Freq5: 20
    },
    {
      name: 'Quinn',
      Freq1: 23,
      Freq2: 17,
      Freq3: 18,
      Freq4: 17,
      Freq5: 20
    }
  ];
}

const secondColumn = () => {
  return [
    {
      name: 'Steve',
      Freq1: 6,
      Freq2: 17,
      Freq3: 4
    },
    {
      name: 'earl',
      Freq1: 15,
      Freq2: 7,
      Freq3: 9
    },
    {
      name: 'jimi',
      Freq1: 9,
      Freq2: 2,
      Freq3: 14
    }
  ];
}

const nut = () => {
  return [
    {
      name: 'Gomez',
      population: 74
    },
    {
      name: 'Wong Po',
      population: 88
    },
    {
      name: 'Barret',
      population: 34
    }
  ];
}

const nutting = () => {
  return [
    {
      name: 'Gomez',
      population: 50
    },
    {
      name: 'Wong Po',
      population: 30
    },
    {
      name: 'Barret',
      population: 78
    }
  ];
}

const line = () => {
  return [
    {
      date: '2016-03',
      USA: 1,
      CHN: 4,
      GER: 9,
      JPN: 2,
      UK: 3
    },
    {
      date: '2016-04',
      USA: 0,
      CHN: 2,
      GER: 8,
      JPN: 5,
      UK: 4
    },
    {
      date: '2016-05',
      USA: 1,
      CHN: 3,
      GER: 7,
      JPN: 7,
      UK: 6
    },
    {
      date: '2016-06',
      USA: 12,
      CHN: 1,
      GER: 9,
      JPN: 4,
      UK: 2
    },
    {
      date: '2016-07',
      USA: 0,
      CHN: 5,
      GER: 6,
      JPN: 9,
      UK: 8
    },
    {
      date: '2016-08',
      USA: 1,
      CHN: 10,
      GER: 4,
      JPN: 3,
      UK: 2
    }
  ];
}

const l2 = () => {
  return [
    {
      date: '2016-03',
      USA: 4,
      CHN: 2,
      GER: 7
    },
    {
      date: '2016-04',
      USA: 9,
      CHN: 4,
      GER: 0
    },
    {
      date: '2016-05',
      USA: 3,
      CHN: 3,
      GER: 1
    },
    {
      date: '2016-06',
      USA: 15,
      CHN: 4,
      GER: 8
    },
    {
      date: '2016-07',
      USA: 4,
      CHN: 0,
      GER: 9
    },
    {
      date: '2016-08',
      USA: 2,
      CHN: 0,
      GER: 1
    }
  ];
}

export { scatter, column, line, bullet, nut, scatter2, l2, secondColumn, nutting };
