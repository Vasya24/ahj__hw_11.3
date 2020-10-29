/* eslint-disable */
const cards = Array.from(document.getElementsByClassName('card'));

for (let i = 0; i < cards.length; i++) {
  const flavour = cards[i].childNodes[1].childNodes[4].innerHTML;
  if (cards[i].classList.contains('disabled')) {
    cards[i].parentElement.childNodes[3].innerHTML = `Печалька, ${flavour} закончился`;
  } else if (cards[i].classList.contains('disabled') === false && cards[i].classList.contains('selected') === false) {
    cards[i].parentElement.childNodes[3].innerHTML = 'Чего сидишь? Порадуй котэ, <p class="buy">купи</p>';
  }

  function onCardClick() {
    cards[i].classList.toggle('selected');
    if (cards[i].classList.contains('selected') && cards[i].classList.contains('foie-gras') && cards[i].classList.contains('disabled') === false) {
      cards[i].parentElement.childNodes[3].innerHTML = 'Печень утки разварная с артишоками';
    } else if (cards[i].classList.contains('selected') && cards[i].classList.contains('fish') && cards[i].classList.contains('disabled') === false) {
      cards[i].parentElement.childNodes[3].innerHTML = 'Головы щучьи с чесноком да свежайшая сёмгушка';
    } else if (cards[i].classList.contains('selected') && cards[i].classList.contains('chicken') && cards[i].classList.contains('disabled') === false) {
      cards[i].parentElement.childNodes[3].innerHTML = 'Филе из цыплят с трюфелями в бульоне';
    } else if (cards[i].classList.contains('disabled') === false && cards[i].classList.contains('selected') === false) {
      cards[i].parentElement.childNodes[3].innerHTML = 'Чего сидишь? Порадуй котэ, <p class="buy">купи</p>';
    }
  }

  cards[i].addEventListener('click', onCardClick);
  cards[i].addEventListener('mouseover', function () {
    if (this.classList.contains('selected')) {
      this.children[0].children[0].innerHTML = 'Котэ не одобряет?';
      this.children[0].children[0].style.color = '#E52E7C';
    } else if (this.classList.contains('selected') === false) {
      this.children[0].children[0].innerHTML = 'Сказочное заморское яство';
      this.children[0].children[0].style.color = '#666666';
    }
  });
  cards[i].addEventListener('mouseout', function () {
    this.children[0].children[0].innerHTML = 'Сказочное заморское яство';
    this.children[0].children[0].style.color = '#666666';
  });
}

const buys = Array.from(document.getElementsByClassName('buy'));

for (let j = 0; j < buys.length; j++) {
  const card = buys[j].parentNode.parentElement.children[0];
  buys[j].addEventListener('click', () => {
    card.classList.add('selected');
    if (card.classList.contains('selected') && card.classList.contains('foie-gras') && card.classList.contains('disabled') === false) {
      card.parentElement.childNodes[3].innerHTML = 'Печень утки разварная с артишоками';
    } else if (card.classList.contains('selected') && card.classList.contains('fish') && card.classList.contains('disabled') === false) {
      card.parentElement.childNodes[3].innerHTML = 'Головы щучьи с чесноком да свежайшая сёмгушка';
    } else if (card.classList.contains('selected') && card.classList.contains('chicken') && card.classList.contains('disabled') === false) {
      card.parentElement.childNodes[3].innerHTML = 'Филе из цыплят с трюфелями в бульоне';
    } else if (card.classList.contains('disabled') === false && card.classList.contains('selected') === false) {
      card.parentElement.childNodes[3].innerHTML = 'Чего сидишь? Порадуй котэ, <p class="buy">купи</p>';
    }
  });
}
