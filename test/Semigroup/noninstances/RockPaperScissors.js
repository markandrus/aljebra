var laws = require('../laws.js'),
    run = require('../../common/test.js').noninstance.run;

function RockPaperScissors(hand) {
  var hands = ['rock', 'paper', 'scissors'];
  if (hands.indexOf(hand) === -1)
    throw new Error('Invalid hand.');
  this.hand = hand;
  return this;
}

RockPaperScissors.prototype.concat = function winner(opp) {
  if ((this.hand === 'rock'     && opp.hand === 'scissors') ||
      (this.hand === 'scissors' && opp.hand === 'paper'   ) ||
      (this.hand === 'paper'    && opp.hand === 'rock'    ))
    return new RockPaperScissors(this.hand);
  else
    return new RockPaperScissors(opp.hand);
};

run(laws, 'Semigroup', {
  name: 'Rock, Paper, Scissors',
  domains: {'m a': [new RockPaperScissors('rock'), new RockPaperScissors('paper'), new RockPaperScissors('scissors')]},
  check: require('../../common/equality.js').simple
});
