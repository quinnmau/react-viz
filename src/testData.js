const scatter = () => {
  return [
    {
      name: 'steve',
      x: 1,
      y: 1
    },
    {
      name: 'steve',
      x: 2,
      y: 2
    },
    {
      name: 'steve',
      x: 3,
      y: 3
    },
    {
      name: 'steve',
      x: 0,
      y: 0
    },
    {
      name: 'wayne',
      x: 0,
      y: 3
    },
    {
      name: 'wayne',
      x: 1,
      y: 2
    },
    {
      name: 'wayne',
      x: 2,
      y: 1
    },
    {
      name: 'wayne',
      x: 3,
      y: 0
    }
  ];
}

const scatter2 = (width, height) => {
  let randomX = d3.random.normal(width / 2, 20);
  let randomY = d3.random.normal(height / 2, 20);
  let points = d3.range(10).map(() => { return {name: randID(), x: randomX(), y: randomY()}});
  console.log(points);
  return points;
}

const randID = () => {
  let random = Math.round(Math.random());
  if (random > 0) {
    return 'steve';
  }
  return 'james';
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
      name: 'steve',
      freq1: 12,
      freq2: 10,
      freq3: 14
    },
    {
      name: 'earl',
      freq1: 9,
      freq2: 13,
      freq3: 15
    },
    {
      name: 'jimi',
      freq1: 15,
      freq2: 12,
      freq3: 6
    }
  ];
}

const secondColumn = () => {
  return [
    {
      name: 'steve',
      freq1: 6,
      freq2: 17,
      freq3: 4
    },
    {
      name: 'earl',
      freq1: 15,
      freq2: 7,
      freq3: 9
    },
    {
      name: 'jimi',
      freq1: 9,
      freq2: 2,
      freq3: 14
    }
  ];
}

const nut = () => {
  return [
    {
      name: 'gomez',
      population: 74
    },
    {
      name: 'wong po',
      population: 88
    },
    {
      name: 'barret',
      population: 34
    }
  ];
}

const nutting = () => {
  return [
    {
      name: 'gomez',
      population: 50
    },
    {
      name: 'wong po',
      population: 30
    },
    {
      name: 'barret',
      population: 78
    }
  ];
}

const line = () => {
  return [
    {
      date: '2016-03',
      usa: 1,
      chn: 4,
      ger: 9
    },
    {
      date: '2016-04',
      usa: 0,
      chn: 2,
      ger: 8
    },
    {
      date: '2016-05',
      usa: 1,
      chn: 3,
      ger: 7
    },
    {
      date: '2016-06',
      usa: 12,
      chn: 1,
      ger: 9
    },
    {
      date: '2016-07',
      usa: 0,
      chn: 5,
      ger: 6
    },
    {
      date: '2016-08',
      usa: 1,
      chn: 10,
      ger: 4
    }
  ];
}

const l2 = () => {
  return [
    {
      date: '2016-03',
      usa: 4,
      chn: 2,
      ger: 7
    },
    {
      date: '2016-04',
      usa: 9,
      chn: 4,
      ger: 0
    },
    {
      date: '2016-05',
      usa: 3,
      chn: 3,
      ger: 1
    },
    {
      date: '2016-06',
      usa: 15,
      chn: 4,
      ger: 8
    },
    {
      date: '2016-07',
      usa: 4,
      chn: 0,
      ger: 9
    },
    {
      date: '2016-08',
      usa: 2,
      chn: 0,
      ger: 1
    }
  ];
}

export { scatter, column, line, bullet, nut, scatter2, l2, secondColumn, nutting };
