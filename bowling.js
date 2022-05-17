const framesPerGame = 10;

const isSpare = (firstRoll, secondRoll) => firstRoll + secondRoll === 10;

const isStrike = (roll) => roll === 10;

const isFinalFrame = (frameStack) => frameStack.length === framesPerGame - 1;

const isFirstRoll = (frame) => frame.length === 1;

const isSecondRoll = (frame) => frame.length === 2;

const isThirdRoll = (frame) => frame.length === 3;

const getSpareScore = (nextRoll) => {
  return 10 + nextRoll;
};

const getStrikeScore = (nextRoll, nextRollOfNextRoll) => {
  return 10 + nextRoll + nextRollOfNextRoll;
};

const getFrameScore = (frame, nextRoll, nextRollOfNextRoll) => {
  if (isStrike(frame[0])) {
    return getStrikeScore(nextRoll, nextRollOfNextRoll);
  }
  if (isSpare(frame[0], frame[1])) {
    return getSpareScore(nextRoll);
  }
  return frame[0] + frame[1];
};

const getScoreOfFinalFrame = (frame) => {
  // This needs to be improved. We switch the nextRoll and NextofNext because technically we have a "SharedRoll" and a "StrikeOnlyRoll"
  return getFrameScore(frame, frame[2], frame[1]);
};

const getIsFinalFrameFinished = (frame) => {
  if (isFirstRoll(frame)) {
    return false;
  }
  if (
    isSecondRoll(frame) &&
    (isStrike(frame[0]) || isSpare(frame[0], frame[1]))
  ) {
    return false;
  }
  return true;
};

const sanatizeRoll = (roll) => {
  if (roll < 0) {
    throw new Error("Negative roll is invalid");
  }
  if (roll > 10) {
    throw new Error("Pin count exceeds pins on the lane");
  }
};

const sanatizeFrame = (frame) => {
  if (isSecondRoll(frame) && frame[0] + frame[1] > 10) {
    throw new Error("Pin count exceeds pins on the lane");
  }
};

const sanatizeFinalFrame = (frame) => {
  if (
    isThirdRoll(frame) &&
    isStrike(frame[0]) &&
    !isStrike(frame[1]) &&
    frame[1] + frame[2] > 10
  ) {
    throw new Error("Pin count exceeds pins on the lane");
  }
};

export class Bowling {
  constructor() {
    this.frameStack = [];
    this.frame = [];
    this.isStarted = false;
    this.isFinished = false;
  }

  roll(pins) {
    this.isStarted = true;
    if (this.isFinished) {
      throw new Error("Cannot roll after game is over");
    }

    sanatizeRoll(pins);
    this.frame.push(pins);

    if (isFinalFrame(this.frameStack)) {
      sanatizeFinalFrame(this.frame);
      this.isFinished = getIsFinalFrameFinished(this.frame);
      return;
    }

    if (isSecondRoll(this.frame) || isStrike(pins)) {
      sanatizeFrame(this.frame);
      this.frameStack.push(this.frame);
      this.frame = [];
      return;
    }
  }

  getArrayOfFrameScores(finalFrameScore) {
    return this.frameStack.reverse().reduce(
      (acc, frame) => {
        const frameScore = getFrameScore(
          frame,
          acc.nextRoll,
          acc.nextRollOfNextRoll
        );
        const nextRoll = frame[0];
        const nextRollOfNextRoll = isStrike(frame[0]) ? acc.nextRoll : frame[1];

        return {
          frameScoreStack: [frameScore, ...acc.frameScoreStack],
          nextRoll,
          nextRollOfNextRoll,
        };
      },
      {
        frameScoreStack: [finalFrameScore],
        nextRoll: this.frame[0],
        nextRollOfNextRoll: this.frame[1],
      }
    ).frameScoreStack;
  }

  score() {
    if (!this.isStarted || !this.isFinished) {
      throw new Error("Score cannot be taken until the end of the game");
    }

    const finalFrameScore = getScoreOfFinalFrame(this.frame);

    return this.getArrayOfFrameScores(finalFrameScore).reduce(
      (gameTotal, frameScore) => gameTotal + frameScore
    );
  }

  currentScore() {
    if (this.frame.length === 1) {
      return "xx";
    }
    return this.getArrayOfFrameScores(0).reduce((currentTotal, frameScore) => {
      if (isNaN(frameScore) || currentTotal === "xx") {
        return "xx";
      }
      return currentTotal + frameScore;
    }, 0);
  }
}
