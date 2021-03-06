import { Bowling } from "./bowling";

describe("Bowling", () => {
  describe("Check game can be scored correctly.", () => {
    test("should be able to score a game with all zeros", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.score()).toEqual(0);
    });

    test("should be able to score a game with no strikes or spares", () => {
      const rolls = [
        3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.score()).toEqual(90);
    });

    test("a spare followed by zeros is worth ten points", () => {
      const rolls = [
        6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.score()).toEqual(10);
    });

    test("points scored in the roll after a spare are counted twice", () => {
      const rolls = [
        6, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.score()).toEqual(16);
    });

    test("consecutive spares each get a one roll bonus", () => {
      const rolls = [
        5, 5, 3, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.score()).toEqual(31);
    });

    test("a spare in the last frame gets a one roll bonus that is counted once", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 7,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.score()).toEqual(17);
    });

    test("a strike earns ten points in a frame with a single roll", () => {
      const rolls = [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.score()).toEqual(10);
    });

    test("points scored in the two rolls after a strike are counted twice as a bonus", () => {
      const rolls = [10, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.score()).toEqual(26);
    });

    test("consecutive strikes each get the two roll bonus", () => {
      const rolls = [10, 10, 10, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.score()).toEqual(81);
    });

    test("a strike in the last frame gets a two roll bonues that is counted once", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 1,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.score()).toEqual(18);
    });

    test("rolling a spare with the two roll bonus does not get a bonus roll", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 3,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.score()).toEqual(20);
    });

    test("strikes with the two roll bonus do not get bonus rolls", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.score()).toEqual(30);
    });

    test("a strike with the one roll bonus after a spare in the last frame does not get a bonus", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 10,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.score()).toEqual(20);
    });

    test("all strikes is a perfect game", () => {
      const rolls = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.score()).toEqual(300);
    });
  });

  describe("Check game rules.", () => {
    test("rolls can not score negative points", () => {
      const bowling = new Bowling();
      expect(() => {
        bowling.roll(-1);
      }).toThrow(new Error("Negative roll is invalid"));
    });

    test("a roll can not score more than 10 points", () => {
      const bowling = new Bowling();
      expect(() => {
        bowling.roll(11);
      }).toThrow(new Error("Pin count exceeds pins on the lane"));
    });

    test("two rolls in a frame can not score more than 10 points", () => {
      const bowling = new Bowling();
      bowling.roll(5);
      expect(() => {
        bowling.roll(6);
      }).toThrow(new Error("Pin count exceeds pins on the lane"));
    });

    test("bonus roll after a strike in the last frame cannot score more than 10 points", () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(() => {
        bowling.roll(11);
      }).toThrow(new Error("Pin count exceeds pins on the lane"));
    });

    test("two bonus rolls after a strike in the last frame can not score more than 10 points", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 5,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(() => {
        bowling.roll(6);
      }).toThrow(new Error("Pin count exceeds pins on the lane"));
    });

    test("two bonus rolls after a strike in the last frame can score more than 10 points if one is a strike", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 6,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.score()).toEqual(26);
    });

    test("the second bonus rolls after a strike in the last frame can not be a strike if the first one is not a strike", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 6,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(() => {
        bowling.roll(10);
      }).toThrow(new Error("Pin count exceeds pins on the lane"));
    });

    test("second bonus roll after a strike in the last frame cannot score more than 10 points", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(() => {
        bowling.roll(11);
      }).toThrow(new Error("Pin count exceeds pins on the lane"));
    });

    test("an unstarted game can not be scored", () => {
      const bowling = new Bowling();
      expect(() => {
        bowling.score();
      }).toThrow(new Error("Score cannot be taken until the end of the game"));
    });

    test("an incomplete game can not be scored", () => {
      const rolls = [0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(() => {
        bowling.score();
      }).toThrow(new Error("Score cannot be taken until the end of the game"));
    });

    test("cannot roll if game already has ten frames", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(() => {
        bowling.roll(0);
      }).toThrow(new Error("Cannot roll after game is over"));
    });

    test("bonus rolls for a strike in the last frame must be rolled before score can be calculated", () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(() => {
        bowling.score();
      }).toThrow(new Error("Score cannot be taken until the end of the game"));
    });

    test("both bonus rolls for a strike in the last frame must be rolled before score can be calculated", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(() => {
        bowling.score();
      }).toThrow(new Error("Score cannot be taken until the end of the game"));
    });

    test("bonus roll for a spare in the last frame must be rolled before score can be calculated", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(() => {
        bowling.score();
      }).toThrow(new Error("Score cannot be taken until the end of the game"));
    });

    test("cannot roll after bonus roll for spare", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 2,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(() => {
        bowling.roll(2);
      }).toThrow(new Error("Cannot roll after game is over"));
    });

    test("cannot roll after bonus rolls for strike", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 3, 2,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(() => {
        bowling.roll(2);
      }).toThrow(new Error("Cannot roll after game is over"));
    });

    xtest("breakdown method should return an array of length 10", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });
      expect(bowling.breakdown()).toHaveLength(10);
    });

    xtest("breakdown method should send an array of ten zeros when all rolls are zero", () => {
      const rolls = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });

      const expected = new Array(10).fill(0);
      expect(bowling.breakdown()).toEqual(expected);
    });

    xtest("breakdown method should send an array of the score for each frame", () => {
      const rolls = new Array(20)
        .fill(3)
        .map((roll, idx) => (idx % 2 === 0 ? roll : 6));
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });

      const expected = new Array(10).fill(9);
      expect(bowling.breakdown()).toEqual(expected);
    });

    xtest("breakdown method should send an array of then thirty's when it's a perfect game", () => {
      const rolls = new Array(12).fill(10);
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });

      const expected = new Array(10).fill(30);
      expect(bowling.breakdown()).toEqual(expected);
    });

    test("Has a currentScore method that allows you to check the score before the game is finished", () => {
      const rolls = new Array(2).fill(0);
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });

      expect(bowling.currentScore()).toEqual(0);
    });

    test("Has a currentScore method that allows you to check the score after a frame has been rolled", () => {
      const rolls = new Array(2).fill(2);
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });

      expect(bowling.currentScore()).toEqual(4);
    });

    test("Has a currentScore method that allows you to check the score in a game containing strikes and spares", () => {
      const rolls = [5, 5, 10, 2, 4];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });

      expect(bowling.currentScore()).toEqual(42);
    });

    test("If I have bowled a strikle and have not rolled enough information to provide a score I wish to receive an 'xx'", () => {
      const rolls = [10];
      const bowling = new Bowling();
      rolls.forEach((roll) => {
        bowling.roll(roll);
      });

      expect(bowling.currentScore()).toEqual("xx");
    });

    test("If I have bowled a strikle and have not rolled enough information to provide a score I wish to receive an 'xx'", () => {
      const rolls = [10, 5, 3];
      const bowling = new Bowling();

      expect(
        rolls.map((roll) => {
          bowling.roll(roll);
          return bowling.currentScore();
        })
      ).toEqual(["xx", "xx", 26]);
    });

    test("If have not rolled enough information to provide a score I wish to receive an 'xx'", () => {
      const rolls = [3, 6, 3, 6];
      const bowling = new Bowling();

      expect(
        rolls.map((roll) => {
          bowling.roll(roll);
          return bowling.currentScore();
        })
      ).toEqual(["xx", 9, "xx", 18]);
    });
  });
});
