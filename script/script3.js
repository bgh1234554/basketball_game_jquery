let computer={
  score: 0,
  percent2: 0.5,
  percent3: 0.333
};

let user={
  score: 0,
  percent2: 0.5,
  percent3: 0.333
};

let game = {
  userRemain: 15,
  isComputerTurn: true
};

function showText(s){
  let $textElement = $('#text');
  $textElement.fadeOut(400, function(){
    $textElement.html(s); //sentence or string
    $textElement.fadeIn();
  });
}

function updateComScore(score){
  computer.score+=score;
  let $comScoreElement = $('#computer-score');
  $comScoreElement.animateNumber({number: computer.score});
}

function updateUserScore(score){
  user.score+=score;
  let $userScoreElement = $('#user-score');
  $userScoreElement.animateNumber({number: user.score});
}

function disableComButton(flag){
  if(game.userRemain!==0){
    $('.btn-computer').prop('disabled',flag);
  }
}

function disableUserButton(flag){
  $('.btn-user').prop('disabled',flag);
}

function updateAI(diff){
  //if 조건문 순서 햇갈리지 않기.
  //범위가 좁은거부터 작성해야 한다.
  if(diff>=10){
    computer.percent2 = 0.30;
    computer.percent3 = 0.23;
  }
  else if(diff>=6){
    computer.percent2 = 0.4;
    computer.percent3 = 0.28;
  }
  else if(diff<=-10){
    computer.percent2=0.7;
    computer.percent3=0.43;
  }
  else if(diff<=-6){
    computer.percent2 = 0.6;
    computer.percent3 = 0.38;
  }
  else{
    computer.percent2 = 0.5;
    computer.percent3 = 0.333;
  }
}

//리팩토링이 적용되는 부분
function onComputerShoot(){
  let shootType = Math.random() < 0.5 ? 2:3;

  updateAI(computer.score-user.score);

  if(!game.isComputerTurn){
    alert("사용자의 차례입니다.");
    return;
  }
  if(Math.random()<computer['percent'+shootType]){
    showText('컴퓨터가 '+shootType+"점 슛을 성공했습니다");
    updateComScore(shootType);
  }
  else{
    showText('컴퓨터가 '+shootType+"점 슛을 실패했습니다");
  }
  game.isComputerTurn=false;

  disableComButton(true);
  disableUserButton(false);
}

function onUserShoot(shootType){
  let $userRemainElement = $('#shots-left');
  if(game.isComputerTurn){
    alert("컴퓨터의 차례입니다.");
    return;
  }
  if(shootType === 2){
    if(Math.random() < 0.5){
      showText("2점 슛을 성공했습니다!");
      updateUserScore(2);
    }
    else{
      showText("2점 슛을 실패했습니다!");
    }
  }
  else{
    if(Math.random()<0.333){
      showText("<b>3점 슛을 성공했습니다!</b>");
      updateUserScore(3);
    }
    else{
      showText("3점 슛을 실패했습니다!");
    }
  }
  game.userRemain--;
  //$userRemainElement.innerHTML = game.userRemain;
  $userRemainElement.html(game.userRemain);
  game.isComputerTurn=true;

  disableComButton(false);
  disableUserButton(true);
  if(game.userRemain===0){
    if(computer.score>user.score){
      showText('컴퓨터가 승리하였습니다!');
    }
    else if(computer.score<user.score){
      showText('당신이 승리하였습니다!');
    }
    else{
      showText('비겼습니다!');
    }
    return;
  }
}